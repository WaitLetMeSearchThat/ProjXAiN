import { db } from './config'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { COLLECTIONS } from '@/assets/constants'

const MAX_SUBJECTS = 2
const MAX_SECTIONS = 2

const normalize = (value) => String(value || '').trim().toLowerCase()
const normalizeJoinCode = (value) => String(value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '')

const enrollmentId = (studentId, classroomId) => {
  const studentKey = String(studentId || '').trim().replace(/[^a-zA-Z0-9_-]/g, '_')
  const classKey = String(classroomId || '').trim().replace(/[^a-zA-Z0-9_-]/g, '_')
  return `${studentKey}__${classKey}`
}

const sortOfferings = (rows) => {
  return [...rows].sort((a, b) => {
    const bySubject = String(a.subjectCode || '').localeCompare(String(b.subjectCode || ''))
    if (bySubject !== 0) return bySubject
    return String(a.section || '').localeCompare(String(b.section || ''))
  })
}

const sanitizeOffering = (input = {}, { useDefaults = false } = {}) => ({
  subjectCode: String(input.subjectCode || (useDefaults ? 'VCLASS' : '')).trim(),
  subjectTitle: String(input.subjectTitle || '').trim(),
  section: String(input.section || (useDefaults ? 'A' : '')).trim(),
  scheduleDay: String(input.scheduleDay || (useDefaults ? 'TBA' : '')).trim(),
  scheduleTime: String(input.scheduleTime || (useDefaults ? 'TBA' : '')).trim(),
  room: String(input.room || (useDefaults ? 'Virtual' : '')).trim(),
  instructorEmail: normalize(input.instructorEmail),
  instructorName: String(input.instructorName || '').trim(),
  kind: String(input.kind || (useDefaults ? 'virtual' : '')).trim()
})

const createJoinCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

const generateUniqueJoinCode = async () => {
  const offeringsRef = collection(db, COLLECTIONS.CLASSROOM_OFFERINGS)
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const code = createJoinCode()
    const existsSnapshot = await getDocs(query(offeringsRef, where('joinCode', '==', code)))
    if (existsSnapshot.empty) return code
  }
  return `${Date.now().toString(36).slice(-6).toUpperCase()}`
}

export async function getClassroomOfferings() {
  const offeringsRef = collection(db, COLLECTIONS.CLASSROOM_OFFERINGS)
  const snapshot = await getDocs(offeringsRef)
  const offerings = snapshot.docs
    .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
    .filter((item) => item.isActive !== false)

  return { success: true, offerings: sortOfferings(offerings) }
}

export async function getClassroomOfferingsByIds(classroomIds) {
  const ids = Array.from(new Set((classroomIds || []).map((id) => String(id || '').trim()).filter(Boolean)))
  if (!ids.length) return { success: true, offerings: [] }

  const offeringsRef = collection(db, COLLECTIONS.CLASSROOM_OFFERINGS)
  const offerings = []
  for (let index = 0; index < ids.length; index += 10) {
    const chunk = ids.slice(index, index + 10)
    const snapshot = await getDocs(query(offeringsRef, where('__name__', 'in', chunk)))
    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data()
      if (data?.isActive === false) return
      offerings.push({ id: docSnap.id, ...data })
    })
  }

  return { success: true, offerings: sortOfferings(offerings) }
}

export async function createVirtualClassroom(input) {
  const payload = sanitizeOffering(input, { useDefaults: true })
  if (!payload.instructorEmail) {
    return { success: false, message: 'Instructor email is required.' }
  }
  if (!payload.subjectCode) {
    return { success: false, message: 'Subject code is required.' }
  }
  if (!payload.subjectTitle) {
    return { success: false, message: 'Class title is required.' }
  }
  if (!payload.section) {
    return { success: false, message: 'Section is required.' }
  }

  const joinCode = await generateUniqueJoinCode()
  const createdRef = doc(collection(db, COLLECTIONS.CLASSROOM_OFFERINGS))
  const classroom = {
    ...payload,
    joinCode,
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }

  await setDoc(createdRef, classroom)

  return {
    success: true,
    classroom: {
      id: createdRef.id,
      ...payload,
      joinCode,
      isActive: true
    },
    message: `V-Classroom created. Join code: ${joinCode}`
  }
}

export async function updateClassroomOffering(classroomId, updates = {}) {
  if (!classroomId) return { success: false, message: 'Classroom ID is required.' }
  const payload = sanitizeOffering(updates)
  await updateDoc(doc(db, COLLECTIONS.CLASSROOM_OFFERINGS, classroomId), {
    ...payload,
    updatedAt: serverTimestamp()
  })
  return { success: true }
}

export async function deactivateClassroomOffering(classroomId) {
  if (!classroomId) return { success: false, message: 'Classroom ID is required.' }
  await updateDoc(doc(db, COLLECTIONS.CLASSROOM_OFFERINGS, classroomId), {
    isActive: false,
    updatedAt: serverTimestamp()
  })
  return { success: true }
}

export async function regenerateClassroomJoinCode(classroomId) {
  if (!classroomId) return { success: false, message: 'Classroom ID is required.' }
  const joinCode = await generateUniqueJoinCode()
  await updateDoc(doc(db, COLLECTIONS.CLASSROOM_OFFERINGS, classroomId), {
    joinCode,
    updatedAt: serverTimestamp()
  })
  return { success: true, joinCode }
}

export async function getClassroomByJoinCode(joinCode) {
  const normalizedCode = normalizeJoinCode(joinCode)
  if (!normalizedCode) {
    return { success: false, message: 'Join code is required.' }
  }
  const ref = collection(db, COLLECTIONS.CLASSROOM_OFFERINGS)
  const snapshot = await getDocs(query(ref, where('joinCode', '==', normalizedCode)))
  const found = snapshot.docs
    .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
    .find((row) => row.isActive !== false)
  if (!found) {
    return { success: false, message: 'Invalid classroom code.' }
  }
  return { success: true, classroom: found }
}

export async function getStudentEnrollments(studentId) {
  const normalizedStudentId = String(studentId || '').trim()
  if (!normalizedStudentId) return { success: true, enrollments: [] }
  const enrollmentsRef = collection(db, COLLECTIONS.CLASSROOM_ENROLLMENTS)
  const snapshot = await getDocs(query(enrollmentsRef, where('studentId', '==', normalizedStudentId)))
  return {
    success: true,
    enrollments: snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
  }
}

export async function getClassroomMemberCounts(classroomIds) {
  const ids = Array.from(new Set((classroomIds || []).map((id) => String(id || '').trim()).filter(Boolean)))
  if (!ids.length) return { success: true, counts: {} }

  const counts = {}
  const enrollmentsRef = collection(db, COLLECTIONS.CLASSROOM_ENROLLMENTS)
  for (let index = 0; index < ids.length; index += 10) {
    const chunk = ids.slice(index, index + 10)
    const snapshot = await getDocs(query(
      enrollmentsRef,
      where('classroomId', 'in', chunk),
      where('status', '==', 'approved')
    ))
    snapshot.docs.forEach((docSnap) => {
      const classroomId = String(docSnap.data()?.classroomId || '').trim()
      if (!classroomId) return
      counts[classroomId] = (counts[classroomId] || 0) + 1
    })
  }

  return { success: true, counts }
}

export async function joinClassroom({ classroom, studentId, studentName, studentEmail, autoApprove = false }) {
  if (!classroom?.id) {
    return { success: false, message: 'Invalid classroom selected.' }
  }
  if (!studentId) {
    return { success: false, message: 'Student ID is required to join a classroom.' }
  }

  const current = await getStudentEnrollments(studentId)
  if (!current.success) {
    return { success: false, message: 'Unable to read current classroom memberships.' }
  }

  const existing = current.enrollments || []
  const existingRecord = existing.find((row) => row.classroomId === classroom.id)
  if (existingRecord) {
    if (existingRecord.status === 'approved') {
      return { success: true, classroom, message: 'You are already joined in this classroom.' }
    }
    if (existingRecord.status === 'pending') {
      return { success: true, classroom, message: 'Your join request is pending instructor approval.' }
    }
  }

  const approved = existing.filter((row) => row.status === 'approved')
  const subjectSet = new Set(approved.map((row) => String(row.subjectCode || '').trim()).filter(Boolean))
  const sectionSet = new Set(approved.map((row) => String(row.section || '').trim()).filter(Boolean))
  subjectSet.add(String(classroom.subjectCode || '').trim())
  sectionSet.add(String(classroom.section || '').trim())

  if (subjectSet.size > MAX_SUBJECTS) {
    return { success: false, message: `You can only join up to ${MAX_SUBJECTS} subjects.` }
  }
  if (sectionSet.size > MAX_SECTIONS) {
    return { success: false, message: `You can only join up to ${MAX_SECTIONS} sections.` }
  }

  await setDoc(doc(db, COLLECTIONS.CLASSROOM_ENROLLMENTS, enrollmentId(studentId, classroom.id)), {
    classroomId: classroom.id,
    subjectCode: classroom.subjectCode || '',
    subjectTitle: classroom.subjectTitle || '',
    section: classroom.section || '',
    scheduleDay: classroom.scheduleDay || '',
    scheduleTime: classroom.scheduleTime || '',
    room: classroom.room || '',
    instructorEmail: classroom.instructorEmail || '',
    studentId: String(studentId).trim(),
    studentName: String(studentName || '').trim(),
    studentEmail: String(studentEmail || '').trim().toLowerCase(),
    status: autoApprove ? 'approved' : 'pending',
    requestedAt: serverTimestamp(),
    approvedAt: autoApprove ? serverTimestamp() : null,
    joinedAt: autoApprove ? serverTimestamp() : null
  })

  return {
    success: true,
    classroom,
    message: autoApprove
      ? 'Joined V-Classroom successfully.'
      : 'Join request submitted. Awaiting instructor approval.'
  }
}

export async function joinClassroomByCode({ joinCode, studentId, studentName, studentEmail }) {
  const lookup = await getClassroomByJoinCode(joinCode)
  if (!lookup.success) return lookup
  return joinClassroom({
    classroom: lookup.classroom,
    studentId,
    studentName,
    studentEmail,
    autoApprove: true
  })
}

export async function leaveClassroom({ classroomId, studentId }) {
  if (!classroomId || !studentId) return { success: false, message: 'Missing classroom or student.' }
  await deleteDoc(doc(db, COLLECTIONS.CLASSROOM_ENROLLMENTS, enrollmentId(studentId, classroomId)))
  return { success: true, message: 'Left classroom.' }
}

export function subscribeClassroomMembers(classroomId, onData, onError) {
  const membersRef = collection(db, COLLECTIONS.CLASSROOM_ENROLLMENTS)
  const q = query(
    membersRef,
    where('classroomId', '==', classroomId),
    where('status', '==', 'approved'),
    orderBy('approvedAt', 'asc')
  )
  return onSnapshot(q, (snapshot) => {
    onData(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  }, onError)
}

export function subscribePendingRequestsForInstructor(instructorEmail, onData, onError) {
  const normalizedEmail = normalize(instructorEmail)
  if (!normalizedEmail) {
    onData([])
    return () => {}
  }

  const ref = collection(db, COLLECTIONS.CLASSROOM_ENROLLMENTS)
  const q = query(
    ref,
    where('instructorEmail', '==', normalizedEmail),
    where('status', '==', 'pending'),
    orderBy('requestedAt', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    onData(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  }, onError)
}

export async function approveClassroomEnrollment(enrollmentIdValue) {
  if (!enrollmentIdValue) return { success: false, message: 'Enrollment ID is required.' }
  await updateDoc(doc(db, COLLECTIONS.CLASSROOM_ENROLLMENTS, enrollmentIdValue), {
    status: 'approved',
    approvedAt: serverTimestamp(),
    joinedAt: serverTimestamp()
  })
  return { success: true, message: 'Enrollment approved.' }
}

export async function rejectClassroomEnrollment(enrollmentIdValue) {
  if (!enrollmentIdValue) return { success: false, message: 'Enrollment ID is required.' }
  await deleteDoc(doc(db, COLLECTIONS.CLASSROOM_ENROLLMENTS, enrollmentIdValue))
  return { success: true, message: 'Enrollment request rejected.' }
}

export function subscribeClassroomPosts(classroomId, onData, onError) {
  const postsRef = collection(db, COLLECTIONS.CLASSROOM_POSTS)
  const q = query(postsRef, where('classroomId', '==', classroomId), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    onData(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  }, onError)
}

export async function createClassroomPost({ classroomId, body, authorName, authorEmail, authorRole, studentId, isInstructor = false }) {
  const text = String(body || '').trim()
  if (!classroomId || !text) {
    return { success: false, message: 'Post body is required.' }
  }

  await addDoc(collection(db, COLLECTIONS.CLASSROOM_POSTS), {
    classroomId,
    body: text,
    authorName: String(authorName || 'User').trim(),
    authorEmail: normalize(authorEmail),
    authorRole: String(authorRole || '').trim(),
    studentId: String(studentId || '').trim(),
    isInstructor: Boolean(isInstructor),
    createdAt: serverTimestamp()
  })

  return { success: true }
}


export function subscribeClassroomActivities(classroomId, onData, onError) {
  const ref = collection(db, COLLECTIONS.CLASSROOM_ACTIVITIES)
  const q = query(ref, where('classroomId', '==', classroomId), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    onData(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  }, onError)
}

export async function createClassroomActivity({ classroomId, title, instructions, dueAt, points, authorName, authorEmail }) {
  const normalizedTitle = String(title || '').trim()
  if (!classroomId || !normalizedTitle) {
    return { success: false, message: 'Activity title is required.' }
  }

  await addDoc(collection(db, COLLECTIONS.CLASSROOM_ACTIVITIES), {
    classroomId,
    title: normalizedTitle,
    instructions: String(instructions || '').trim(),
    dueAt: dueAt ? new Date(dueAt) : null,
    points: Number.isFinite(Number(points)) ? Number(points) : null,
    authorName: String(authorName || 'Instructor').trim(),
    authorEmail: normalize(authorEmail),
    createdAt: serverTimestamp()
  })

  return { success: true }
}

export function subscribeClassroomModules(classroomId, onData, onError) {
  const ref = collection(db, COLLECTIONS.CLASSROOM_MODULES)
  const q = query(ref, where('classroomId', '==', classroomId), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    onData(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  }, onError)
}

export async function createClassroomModule({ classroomId, title, description, resourceUrl, authorName, authorEmail }) {
  const normalizedTitle = String(title || '').trim()
  if (!classroomId || !normalizedTitle) {
    return { success: false, message: 'Module title is required.' }
  }

  await addDoc(collection(db, COLLECTIONS.CLASSROOM_MODULES), {
    classroomId,
    title: normalizedTitle,
    description: String(description || '').trim(),
    resourceUrl: String(resourceUrl || '').trim(),
    authorName: String(authorName || 'Instructor').trim(),
    authorEmail: normalize(authorEmail),
    createdAt: serverTimestamp()
  })

  return { success: true }
}
export async function canAccessClassroom({ classroomId, studentId, email, isInstructor = false }) {
  const normalizedEmail = normalize(email)
  if (isInstructor) {
    return { success: true, reason: 'instructor' }
  }

  if (normalizedEmail && classroomId) {
    const classroomSnap = await getDoc(doc(db, COLLECTIONS.CLASSROOM_OFFERINGS, classroomId))
    const classroomData = classroomSnap.exists() ? classroomSnap.data() : null
    if (normalize(classroomData?.instructorEmail) === normalizedEmail) {
      return { success: true, reason: 'owner' }
    }
  }

  const id = enrollmentId(studentId, classroomId)
  const snap = await getDoc(doc(db, COLLECTIONS.CLASSROOM_ENROLLMENTS, id))
  if (snap.exists() && snap.data()?.status === 'approved') {
    return { success: true, reason: 'member' }
  }

  return { success: false, reason: 'not_approved' }
}

export const classroomConfig = {
  MAX_SUBJECTS,
  MAX_SECTIONS
}

