import { db } from './config.js'
import { collection, addDoc, query, where, getDocs, orderBy, limit, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import * as XLSX from 'xlsx'
import { listAllInstructorDocumentLinks } from './instructorDocumentService'

const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase()
const normalizeSubjectCode = (value) => String(value || '').replace(/\s+/g, '').toUpperCase()
const isLikelyEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
const FIXED_HEADER_ROW_INDEX = 9 // Row 10
const FIXED_STUDENT_ID_COL_INDEX = 1 // Column B
const FIXED_EMAIL_COL_INDEX = 19 // Column T

const DEFAULT_GRADE_SHEET_LINKS = [
  'https://docs.google.com/spreadsheets/d/12HLJuCRT_IrLq4E9E01TwVXNK99zrkz5/edit',
  'https://docs.google.com/spreadsheets/d/1BCDEHWCI-qz1lNSDG7KPXgpVIyIL0Sfe/edit',
  'https://docs.google.com/spreadsheets/d/1E3x_ebYZZGNbOd6KzW0dr8m8DDyDZK1I/edit',
  'https://docs.google.com/spreadsheets/d/1Lw766u2vbw3amGXfNhbu_1vyd0Bn0Jyn/edit',
  'https://docs.google.com/spreadsheets/d/1nKyaqJ4SzmLYXynlfFyabXKSV2ktZTFG/edit'
]

const getConfiguredSheetLinks = async () => {
  const envLinks = String(import.meta.env.VITE_GRADE_SHEET_LINKS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  const baseLinks = envLinks.length ? envLinks : DEFAULT_GRADE_SHEET_LINKS

  try {
    const result = await listAllInstructorDocumentLinks(500)
    const instructorLinks = (result.documents || [])
      .map((doc) => String(doc?.url || '').trim())
      .filter(Boolean)

    return Array.from(new Set([...baseLinks, ...instructorLinks]))
  } catch (_) {
    return baseLinks
  }
}

const extractGoogleSheetId = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const byPath = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  if (byPath?.[1]) return byPath[1]
  if (/^[a-zA-Z0-9_-]{20,}$/.test(raw)) return raw
  return ''
}

const getSheetExportUrls = (sheetId) => [
  `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`,
  `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`
]

const buildStudentIdCandidates = (studentId) => {
  const raw = String(studentId || '').trim()
  const compact = raw.replace(/\s+/g, '')
  const normalized = normalizeStudentId(raw)

  return Array.from(
    new Set([
      raw,
      compact,
      compact.replace(/_/g, '-'),
      compact.replace(/-/g, '_'),
      normalized,
      normalized.replace(/_/g, '-'),
      normalized.replace(/-/g, '_')
    ].filter(Boolean))
  )
}

async function fetchWorkbookFromGoogleSheet(sheetId) {
  const urls = getSheetExportUrls(sheetId)

  for (const url of urls) {
    try {
      const response = await fetch(url, { method: 'GET' })
      if (!response.ok) continue
      const arrayBuffer = await response.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      if (workbook?.SheetNames?.length) return workbook
    } catch (error) {
      // Try the next export URL variant
      continue
    }
  }

  return null
}

export async function getStudentSheetEmailByStudentId(studentId, options = {}) {
  const candidates = buildStudentIdCandidates(studentId).map(normalizeStudentId)
  if (!candidates.length) {
    return { success: false, message: 'Student ID is required.' }
  }

  const candidateSet = new Set(candidates)
  const explicitLinks = Array.isArray(options.links)
    ? options.links.map((item) => String(item || '').trim()).filter(Boolean)
    : null
  const links = explicitLinks && explicitLinks.length
    ? explicitLinks
    : await getConfiguredSheetLinks()
  const sheetIds = Array.from(new Set(links.map(extractGoogleSheetId).filter(Boolean)))

  for (const sheetId of sheetIds) {
    const workbook = await fetchWorkbookFromGoogleSheet(sheetId)
    if (!workbook) continue

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' })

      const fixedStudentId = normalizeStudentId(rows[FIXED_HEADER_ROW_INDEX]?.[FIXED_STUDENT_ID_COL_INDEX])
      if (fixedStudentId && candidateSet.has(fixedStudentId)) {
        const emailFromFixedCell = String(rows[FIXED_HEADER_ROW_INDEX]?.[FIXED_EMAIL_COL_INDEX] || '').trim().toLowerCase()
        if (isLikelyEmail(emailFromFixedCell)) {
          return {
            success: true,
            email: emailFromFixedCell,
            source: `GoogleSheet:${sheetId} (${sheetName})`
          }
        }
      }

      for (const row of rows) {
        const normalizedRowCells = row.map((cell) => normalizeStudentId(cell))
        const hasStudentId = normalizedRowCells.some((cell) => candidateSet.has(cell))
        if (!hasStudentId) continue

        const emailFromColumnT = String(row[19] || '').trim().toLowerCase()
        if (isLikelyEmail(emailFromColumnT)) {
          return {
            success: true,
            email: emailFromColumnT,
            source: `GoogleSheet:${sheetId} (${sheetName})`
          }
        }
      }
    }
  }

  return { success: false, message: 'No spreadsheet email found for this student ID.' }
}

function parseWorkbookToGrades(workbook, sourceLabel) {
  const grades = []

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName]
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' })
    const { headers, headerIndex } = detectHeaders(rows)
    const meta = extractMeta(rows, headerIndex)
    const dataRows = rows.slice(headerIndex + 1)
    const normalizedHeaders = headers.map((header, idx) => ({
      raw: header || `Column ${idx + 1}`,
      key: normalizeKey(header || `column${idx + 1}`)
    }))

    dataRows.forEach((row) => {
      const record = {}
      normalizedHeaders.forEach((header, idx) => {
        record[header.key] = row[idx]
      })

      const studentId = extractValue(record, [
        'studentid', 'studentno', 'studentnumber', 'idnumber', 'idno', 'id'
      ])
      const studentName = extractValue(record, [
        'studentname', 'name', 'fullname', 'fullnamer'
      ])
      const midtermGrade = extractValue(record, ['midtermgrade', 'midterm', 'midtermgrade'])
      const finalTermGrade = extractValue(record, ['finaltermgrade', 'finalterm', 'finaltermgrade'])
      const finalGrade = extractValue(record, ['finalgrade', 'final', 'grade'])
      const remarks = extractValue(record, ['remarks', 'remark'])

      if (studentId || studentName || finalGrade || remarks) {
        grades.push({
          studentId: String(studentId || '').trim(),
          studentName: String(studentName || '').trim(),
          subjectCode: meta.subjectCode,
          subjectTitle: meta.subjectTitle,
          academicYear: meta.academicYear,
          semester: meta.semester,
          programYearSection: meta.programYearSection,
          instructor: meta.instructor,
          midtermGrade: toNumberOrString(midtermGrade),
          finalTermGrade: toNumberOrString(finalTermGrade),
          finalGrade: toNumberOrString(finalGrade),
          remarks: String(remarks || '').trim(),
          source: `${sourceLabel} (${sheetName})`
        })
      }
    })
  })

  return grades
}

async function getGradesByStudentIdFromGoogleSheets(studentId, options = {}) {
  const normalized = normalizeStudentId(studentId)
  if (!normalized) return { success: false, message: 'Student ID is required.', grades: [] }
  const allowedSubjectCodes = new Set(
    (options.allowedSubjectCodes || [])
      .map((code) => normalizeSubjectCode(code))
      .filter(Boolean)
  )

  const links = await getConfiguredSheetLinks()
  const sheetIds = Array.from(
    new Set(
      links.map(extractGoogleSheetId).filter(Boolean)
    )
  )

  const allRows = []
  const failures = []

  for (const sheetId of sheetIds) {
    const workbook = await fetchWorkbookFromGoogleSheet(sheetId)
    if (!workbook) {
      failures.push(sheetId)
      continue
    }
    const rows = parseWorkbookToGrades(workbook, `GoogleSheet:${sheetId}`)
    allRows.push(...rows)
  }

  const filtered = allRows.filter((row) => {
    if (normalizeStudentId(row.studentId) !== normalized) return false
    if (allowedSubjectCodes.size) {
      const subjectCode = normalizeSubjectCode(row.subjectCode || row.subject || '')
      return subjectCode && allowedSubjectCodes.has(subjectCode)
    }
    return true
  })
  const deduped = new Map()
  filtered.forEach((row) => {
    const key = [
      normalizeStudentId(row.studentId),
      String(row.subjectCode || '').trim().toUpperCase(),
      String(row.semester || '').trim().toUpperCase(),
      String(row.academicYear || '').trim().toUpperCase(),
      String(row.finalGrade ?? '').trim()
    ].join('|')
    if (!deduped.has(key)) deduped.set(key, row)
  })

  return {
    success: true,
    grades: Array.from(deduped.values()),
    failedSheetIds: failures,
    filterMeta: {
      studentYearLevel: options.studentYearLevel || '',
      ticketCount: Number(options.ticketCount || 0),
      enrolledSubjectCount: Number(options.enrolledSubjectCount || 0),
      allowedSubjectCodeCount: allowedSubjectCodes.size
    }
  }
}

// Upload grades to Firestore
export async function uploadGrades(grades, meta = {}) {
  try {
    const gradesCollection = collection(db, 'grades')
    const uploadPromises = grades.map(grade => {
      const studentIdNormalized = normalizeStudentId(grade.studentId)
      return addDoc(gradesCollection, { ...grade, studentIdNormalized })
    })
    await Promise.all(uploadPromises)
    const uploadsCollection = collection(db, 'gradeUploads')
    await addDoc(uploadsCollection, {
      fileNames: meta.fileNames || [],
      totalRecords: grades.length,
      uploadedBy: meta.uploadedBy || '',
      uploadedByEmail: meta.uploadedByEmail || '',
      uploadedAt: serverTimestamp()
    })
    return { success: true, message: `Successfully uploaded ${grades.length} grade records.` }
  } catch (error) {
    console.error('Error uploading grades:', error)
    return { success: false, message: 'Failed to upload grades. Please check permissions.' }
  }
}

// Query grades by student ID
export async function getGradesByStudentId(studentId, options = {}) {
  try {
    const sheetsResult = await getGradesByStudentIdFromGoogleSheets(studentId, options)
    if (!sheetsResult.success) {
      return { success: false, message: sheetsResult.message || 'Failed to fetch grade records from spreadsheets.' }
    }
    if (!sheetsResult.grades.length && sheetsResult.failedSheetIds?.length) {
      return {
        success: false,
        message: 'No grade records found. Verify spreadsheet sharing is set to Anyone with the link (Viewer).'
      }
    }
    return { success: true, grades: sheetsResult.grades }
  } catch (error) {
    console.error('Error fetching grades:', error)
    return { success: false, message: 'Failed to fetch grades.' }
  }
}

// Parse Excel file and return grade records
export function parseGradeFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        resolve(parseWorkbookToGrades(workbook, file.name))
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

// Helper functions for parsing
function detectHeaders(rows) {
  if (!rows.length) return { headers: [], headerIndex: 0 }
  const fixedHeaderRow = rows[FIXED_HEADER_ROW_INDEX] || []
  const hasFixedHeaderValues = fixedHeaderRow.some(cell => String(cell || '').trim())
  if (hasFixedHeaderValues) {
    const headers = fixedHeaderRow.map(cell => String(cell || '').trim())
    return { headers, headerIndex: FIXED_HEADER_ROW_INDEX }
  }

  let bestIndex = 0
  let bestScore = 0

  rows.forEach((row, index) => {
    const cells = row.map(cell => String(cell || '').trim()).filter(Boolean)
    if (!cells.length) return
    const joined = cells.join(' ').toLowerCase()
    const score =
      cells.length +
      (joined.includes('student') ? 2 : 0) +
      (joined.includes('id') ? 2 : 0) +
      (joined.includes('name') ? 1 : 0) +
      (joined.includes('grade') ? 1 : 0)
    if (score > bestScore) {
      bestScore = score
      bestIndex = index
    }
  })

  const headers = (rows[bestIndex] || []).map(cell => String(cell || '').trim())
  return { headers, headerIndex: bestIndex }
}

export async function listGrades() {
  try {
    const gradesCollection = collection(db, 'grades')
    const q = query(gradesCollection, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const grades = []
    snapshot.forEach((docSnap) => {
      grades.push({ id: docSnap.id, ...docSnap.data() })
    })
    return { success: true, grades }
  } catch (error) {
    console.error('Error listing grades:', error)
    return { success: false, message: 'Failed to load grades.' }
  }
}

export async function createGrade(gradeData) {
  try {
    const gradesCollection = collection(db, 'grades')
    const studentIdNormalized = normalizeStudentId(gradeData.studentId)
    const docRef = await addDoc(gradesCollection, { ...gradeData, studentIdNormalized })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error creating grade:', error)
    return { success: false, message: 'Failed to create grade.' }
  }
}

export async function updateGrade(id, gradeData) {
  try {
    const ref = doc(db, 'grades', id)
    const studentIdNormalized = normalizeStudentId(gradeData.studentId)
    await updateDoc(ref, { ...gradeData, studentIdNormalized })
    return { success: true }
  } catch (error) {
    console.error('Error updating grade:', error)
    return { success: false, message: 'Failed to update grade.' }
  }
}

export async function deleteGradeById(id) {
  try {
    const ref = doc(db, 'grades', id)
    await deleteDoc(ref)
    return { success: true }
  } catch (error) {
    console.error('Error deleting grade:', error)
    return { success: false, message: 'Failed to delete grade.' }
  }
}

export async function getGradeUploads(limitCount = 10) {
  try {
    const uploadsCollection = collection(db, 'gradeUploads')
    const q = query(uploadsCollection, orderBy('uploadedAt', 'desc'), limit(limitCount))
    const snapshot = await getDocs(q)
    const uploads = []
    snapshot.forEach((doc) => {
      uploads.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, uploads }
  } catch (error) {
    console.error('Error fetching grade uploads:', error)
    return { success: false, message: 'Failed to fetch upload history.' }
  }
}

function normalizeKey(key) {
  return String(key || '').toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function extractValue(record, keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== '') {
      return record[key]
    }
  }
  return ''
}

function toNumberOrString(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const num = Number(raw)
  return Number.isFinite(num) ? num : raw
}

function extractMeta(rows, headerIndex) {
  const metaRows = rows.slice(0, Math.max(0, headerIndex))
  return {
    subjectCode: findValue(metaRows, 'Subject Code:'),
    subjectTitle: findValue(metaRows, 'Subject Title:'),
    instructor: findValue(metaRows, 'Instructor:'),
    academicYear: findValue(metaRows, 'AY:'),
    semester: findValue(metaRows, 'Sem:'),
    programYearSection: findValue(metaRows, 'Prog/Yr/Sec:')
  }
}

function findValue(rows, label) {
  const target = String(label || '').toLowerCase()
  for (const row of rows) {
    const cells = row.map(cell => String(cell || '').trim())
    const idx = cells.findIndex(cell => cell.toLowerCase() === target)
    if (idx !== -1) {
      for (let i = idx + 1; i < cells.length; i++) {
        if (cells[i]) return cells[i]
      }
    }
  }
  return ''
}
