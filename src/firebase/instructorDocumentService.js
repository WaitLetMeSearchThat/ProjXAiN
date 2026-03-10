import { db } from './config'
import { COLLECTIONS } from '@/assets/constants'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore'

const COLLECTION = COLLECTIONS.INSTRUCTOR_DOCUMENTS

const normalizeEmail = (value) => String(value || '').trim().toLowerCase()
const normalizeText = (value) => String(value || '').trim()

export async function addInstructorDocumentLink({
  subjectLabel,
  url,
  uploaderEmail,
  uploaderName
}) {
  const normalizedSubject = normalizeText(subjectLabel)
  const normalizedUrl = normalizeText(url)
  const normalizedEmail = normalizeEmail(uploaderEmail)

  if (!normalizedSubject) {
    return { success: false, message: 'Subject label is required.' }
  }
  if (!normalizedUrl) {
    return { success: false, message: 'Document link is required.' }
  }
  if (!normalizedEmail) {
    return { success: false, message: 'Instructor email is required.' }
  }

  const ref = collection(db, COLLECTION)
  const payload = {
    subjectLabel: normalizedSubject,
    url: normalizedUrl,
    uploaderEmail: normalizedEmail,
    uploaderName: normalizeText(uploaderName) || 'Instructor',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }

  const docRef = await addDoc(ref, payload)
  return { success: true, id: docRef.id }
}

export async function listInstructorDocumentLinksByEmail(email, limitCount = 50) {
  const normalizedEmail = normalizeEmail(email)
  if (!normalizedEmail) {
    return { success: true, documents: [] }
  }

  const ref = collection(db, COLLECTION)
  const q = query(
    ref,
    where('uploaderEmail', '==', normalizedEmail),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  const snapshot = await getDocs(q)
  return {
    success: true,
    documents: snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
  }
}

export async function listAllInstructorDocumentLinks(limitCount = 300) {
  const ref = collection(db, COLLECTION)
  const q = query(ref, orderBy('uploaderEmail', 'asc'), orderBy('createdAt', 'desc'), limit(limitCount))
  const snapshot = await getDocs(q)
  return {
    success: true,
    documents: snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
  }
}

export async function deleteInstructorDocumentLink(id) {
  if (!id) return { success: false, message: 'Document ID is required.' }
  await deleteDoc(doc(db, COLLECTION, id))
  return { success: true }
}
