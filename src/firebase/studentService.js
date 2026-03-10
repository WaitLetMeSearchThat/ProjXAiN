import { getStudentSheetEmailByStudentId } from './gradeService'
import { listAllStudentValidationLinks } from './studentValidationLinkService'
import * as XLSX from 'xlsx'

const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase()

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

const isLikelyEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())

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

const fetchWorkbookFromGoogleSheet = async (sheetId) => {
  const urls = getSheetExportUrls(sheetId)
  for (const url of urls) {
    try {
      const response = await fetch(url, { method: 'GET' })
      if (!response.ok) continue
      const arrayBuffer = await response.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      if (workbook?.SheetNames?.length) return workbook
    } catch (_) {
      continue
    }
  }
  return null
}

const getRegistrarValidationLinks = async () => {
  const linksResult = await listAllStudentValidationLinks(500)
  return (linksResult.links || [])
    .map((entry) => String(entry.url || '').trim())
    .filter(Boolean)
}

export async function listStudentsFromValidationLink(link, limitCount = 300) {
  const sheetId = extractGoogleSheetId(link)
  if (!sheetId) {
    return { success: false, message: 'Invalid spreadsheet link.', students: [] }
  }

  const workbook = await fetchWorkbookFromGoogleSheet(sheetId)
  if (!workbook) {
    return { success: false, message: 'Unable to read spreadsheet.', students: [] }
  }

  const byStudentId = new Map()
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName]
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' })

    for (const row of rows) {
      const studentId = String(row?.[1] || '').trim()
      const email = String(row?.[19] || '').trim().toLowerCase()
      const fullName = String(row?.[2] || '').trim()
      if (!studentId || !isLikelyEmail(email)) continue

      const normalizedId = normalizeStudentId(studentId)
      if (!normalizedId) continue

      const existing = byStudentId.get(normalizedId)
      const studentRecord = existing || {
        id: normalizedId,
        studentId,
        email,
        fullName
      }

      if (!studentRecord.fullName && fullName) {
        studentRecord.fullName = fullName
      }
      if (!studentRecord.email && email) {
        studentRecord.email = email
      }

      byStudentId.set(normalizedId, studentRecord)
      if (byStudentId.size >= limitCount) break
    }
    if (byStudentId.size >= limitCount) break
  }

  return { success: true, students: Array.from(byStudentId.values()) }
}

const collectStudentsFromRegistrarSheets = async () => {
  const links = await getRegistrarValidationLinks()
  if (!links.length) {
    return { success: false, message: 'Registrar has not configured student validation spreadsheet links yet.', students: [] }
  }
  const byStudentId = new Map()

  for (const link of links) {
    const result = await listStudentsFromValidationLink(link, 1000)
    if (!result.success) continue
    for (const item of result.students) {
      const normalizedId = normalizeStudentId(item.studentId)
      if (!normalizedId || byStudentId.has(normalizedId)) continue
      byStudentId.set(normalizedId, item)
    }
  }

  const students = Array.from(byStudentId.values()).sort((a, b) => String(a.studentId).localeCompare(String(b.studentId)))
  return { success: true, students, byStudentId }
}

export async function getStudentById(studentId) {
  try {
    const candidates = buildStudentIdCandidates(studentId)
    const sheetData = await collectStudentsFromRegistrarSheets()
    if (!sheetData.success) {
      return { success: false, message: sheetData.message || 'Student validation links are not configured.' }
    }

    const candidateSet = new Set(candidates.map(normalizeStudentId))
    for (const item of sheetData.students) {
      if (candidateSet.has(normalizeStudentId(item.studentId))) {
        return { success: true, student: item }
      }
    }

    return { success: false, message: 'Student record not found.' }
  } catch (error) {
    console.error('Error fetching student:', error)
    return { success: false, message: 'Failed to fetch student record.' }
  }
}

export async function verifyStudentIdentity(studentId, email, options = {}) {
  try {
    const requireSheetMatch = Boolean(options.requireSheetMatch)
    const normalizedStudentId = String(studentId || '').trim()
    const provided = String(email || '').trim().toLowerCase()
    if (!provided) {
      return { success: false, message: 'Email verification failed.' }
    }

    const registrarLinks = await getRegistrarValidationLinks()
    if (!registrarLinks.length) {
      return { success: false, message: 'Registrar has not configured student validation spreadsheet links yet.' }
    }

    const sheetResult = await getStudentSheetEmailByStudentId(studentId, { links: registrarLinks })
    if (sheetResult.success) {
      if (String(sheetResult.email || '').trim().toLowerCase() !== provided) {
        return { success: false, message: 'Student ID and email do not match our records.' }
      }
      return {
        success: true,
        student: {
          studentId: normalizedStudentId,
          email: provided
        }
      }
    }

    if (requireSheetMatch) {
      return { success: false, message: 'Student ID and email were not found in registrar spreadsheet records.' }
    }
    return { success: false, message: 'Student record not found.' }
  } catch (error) {
    console.error('Error verifying student identity:', error)
    return { success: false, message: 'Failed to verify student identity.' }
  }
}

export async function listStudents() {
  try {
    const sheetData = await collectStudentsFromRegistrarSheets()
    if (!sheetData.success) {
      return { success: false, message: sheetData.message || 'Failed to load student records from registrar spreadsheets.', students: [] }
    }
    return { success: true, students: sheetData.students }
  } catch (error) {
    console.error('Error listing students:', error)
    return { success: false, message: 'Failed to load students.' }
  }
}
