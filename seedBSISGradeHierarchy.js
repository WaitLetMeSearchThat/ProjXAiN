import { db } from './src/firebase/config.js'
import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { COLLECTIONS, PROGRAM_CODES } from './src/assets/constants.js'

const HIERARCHY_COLLECTION = 'prospectusHierarchy'
const PROGRAM_CODE = PROGRAM_CODES.BSIS

const normalize = (value) => String(value || '').replace(/\s+/g, '').toUpperCase()

const chunk = (items, size = 400) => {
  const parts = []
  for (let i = 0; i < items.length; i += size) {
    parts.push(items.slice(i, i + size))
  }
  return parts
}

async function commitDeletes(refs) {
  const parts = chunk(refs)
  for (const part of parts) {
    const batch = writeBatch(db)
    part.forEach((ref) => batch.delete(ref))
    await batch.commit()
  }
}

async function clearExistingHierarchy(programCode = PROGRAM_CODE) {
  const programRef = doc(db, HIERARCHY_COLLECTION, programCode)
  const subjectsRef = collection(db, HIERARCHY_COLLECTION, programCode, 'subjects')
  const subjectsSnap = await getDocs(subjectsRef)

  const refsToDelete = []
  for (const subjectDoc of subjectsSnap.docs) {
    const gradesRef = collection(db, HIERARCHY_COLLECTION, programCode, 'subjects', subjectDoc.id, 'grades')
    const gradesSnap = await getDocs(gradesRef)
    gradesSnap.forEach((gradeDoc) => refsToDelete.push(gradeDoc.ref))
    refsToDelete.push(subjectDoc.ref)
  }

  await commitDeletes(refsToDelete)

  const batch = writeBatch(db)
  batch.set(programRef, {
    program: programCode,
    parentCollection: COLLECTIONS.PROSPECTUS,
    updatedAt: new Date(),
    status: 'reconstructed'
  })
  await batch.commit()
}

async function reconstructBSISGradeHierarchy() {
  try {
    console.log(`Reconstructing hierarchy for ${PROGRAM_CODE}...`)

    await clearExistingHierarchy(PROGRAM_CODE)

    const [subjectsSnap, studentsSnap, gradesSnap, prospectusSnap] = await Promise.all([
      getDocs(query(collection(db, COLLECTIONS.SUBJECTS), where('program', '==', PROGRAM_CODE))),
      getDocs(query(collection(db, COLLECTIONS.STUDENTS), where('program', '==', PROGRAM_CODE))),
      getDocs(collection(db, COLLECTIONS.GRADES)),
      getDocs(collection(db, COLLECTIONS.PROSPECTUS))
    ])

    const studentMap = new Map()
    const bsisSubjectCodes = new Set()

    subjectsSnap.forEach((docSnap) => {
      const data = docSnap.data() || {}
      const code = String(data.code || data.subject || '').trim()
      if (code) bsisSubjectCodes.add(normalize(code))
    })

    studentsSnap.forEach((docSnap) => {
      const data = docSnap.data() || {}
      const studentId = String(data.studentId || docSnap.id || '').trim()
      if (!studentId) return
      studentMap.set(normalize(studentId), {
        studentId,
        fullName: data.fullName || '',
        yearLevel: data.yearLevel || '',
        section: data.section || '',
        program: data.program || PROGRAM_CODE
      })
    })

    const gradeMapBySubject = new Map()
    gradesSnap.forEach((docSnap) => {
      const grade = docSnap.data() || {}
      const sid = normalize(grade.studentId || '')
      const subjectCode = String(grade.subjectCode || '').trim()
      if (!subjectCode) return
      const subjectKey = normalize(subjectCode)
      if (!bsisSubjectCodes.has(subjectKey)) return

      const hasStudentProfile = studentMap.has(sid)
      const programYearSection = String(grade.programYearSection || '').toUpperCase()
      const looksLikeBSIS = programYearSection.includes(PROGRAM_CODE)
      if (!hasStudentProfile && studentMap.size && !looksLikeBSIS) return

      if (!gradeMapBySubject.has(subjectKey)) gradeMapBySubject.set(subjectKey, [])
      gradeMapBySubject.get(subjectKey).push({
        id: docSnap.id,
        ...grade,
        studentIdNormalized: sid,
        studentProfile: studentMap.get(sid) || null
      })
    })

    const programRef = doc(db, HIERARCHY_COLLECTION, PROGRAM_CODE)
    const writes = []

    // Parent (program) metadata under Prospectus hierarchy
    writes.push({
      ref: programRef,
      data: {
        program: PROGRAM_CODE,
        parentCollection: COLLECTIONS.PROSPECTUS,
        sourceProspectusCount: prospectusSnap.size,
        sourceSubjectsCount: subjectsSnap.size,
        sourceStudentsCount: studentMap.size,
        sourceGradesCount: gradesSnap.size,
        updatedAt: new Date(),
        status: 'ready'
      }
    })

    subjectsSnap.forEach((subjectDoc) => {
      const subject = subjectDoc.data() || {}
      const subjectCode = String(subject.code || subject.subject || '').trim()
      if (!subjectCode) return
      const subjectKey = normalize(subjectCode)
      const subjectRef = doc(db, HIERARCHY_COLLECTION, PROGRAM_CODE, 'subjects', subjectKey)
      const gradeRows = gradeMapBySubject.get(subjectKey) || []

      writes.push({
        ref: subjectRef,
        data: {
          code: subjectCode,
          title: subject.title || '',
          units: subject.units ?? '',
          yearLevel: subject.yearLevel || '',
          semesterOffered: subject.semesterOffered || [],
          subjectType: subject.subjectType || '',
          program: PROGRAM_CODE,
          totalGrades: gradeRows.length,
          updatedAt: new Date()
        }
      })

      gradeRows.forEach((grade) => {
        const gradeDocId = `${grade.studentIdNormalized}_${subjectKey}`
        const gradeRef = doc(db, HIERARCHY_COLLECTION, PROGRAM_CODE, 'subjects', subjectKey, 'grades', gradeDocId)
        writes.push({
          ref: gradeRef,
          data: {
            studentId: grade.studentId || grade.studentProfile?.studentId || '',
            studentIdNormalized: grade.studentIdNormalized,
            studentName: grade.studentName || grade.studentProfile?.fullName || '',
            studentYearLevel: grade.studentProfile?.yearLevel || '',
            studentSection: grade.studentProfile?.section || '',
            subjectCode: grade.subjectCode || subjectCode,
            subjectTitle: grade.subjectTitle || subject.title || '',
            academicYear: grade.academicYear || '',
            semester: grade.semester || '',
            midtermGrade: grade.midtermGrade ?? '',
            finalTermGrade: grade.finalTermGrade ?? '',
            finalGrade: grade.finalGrade ?? '',
            remarks: grade.remarks || '',
            instructor: grade.instructor || grade.instructorId || '',
            sourceGradeId: grade.id,
            updatedAt: new Date()
          }
        })
      })
    })

    const writeChunks = chunk(writes)
    for (const writeChunk of writeChunks) {
      const batch = writeBatch(db)
      writeChunk.forEach((item) => batch.set(item.ref, item.data))
      await batch.commit()
    }

    console.log(`Hierarchy reconstruction complete for ${PROGRAM_CODE}`)
    console.log(`Subjects: ${subjectsSnap.size}, Students: ${studentMap.size}`)
  } catch (error) {
    console.error('Error reconstructing BSIS hierarchy:', error)
  }
}

if (process.argv[2] === '--run') {
  reconstructBSISGradeHierarchy()
}

export { reconstructBSISGradeHierarchy }
