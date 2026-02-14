import { db } from './config.js'
import { collection, addDoc, query, where, getDocs, orderBy, limit, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import * as XLSX from 'xlsx'

const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase()

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
export async function getGradesByStudentId(studentId) {
  try {
    const gradesCollection = collection(db, 'grades')
    const normalized = normalizeStudentId(studentId)
    const q = query(gradesCollection, where('studentIdNormalized', '==', normalized))
    let querySnapshot = await getDocs(q)
    const grades = []
    querySnapshot.forEach((doc) => {
      grades.push({ id: doc.id, ...doc.data() })
    })
    if (!grades.length) {
      const fallback = query(gradesCollection, where('studentId', '==', studentId))
      querySnapshot = await getDocs(fallback)
      querySnapshot.forEach((doc) => {
        grades.push({ id: doc.id, ...doc.data() })
      })
    }
    return { success: true, grades }
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
        const grades = []

        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName]
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' })

          // Detect headers
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
                source: `${file.name} (${sheetName})`
              })
            }
          })
        })

        resolve(grades)
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
