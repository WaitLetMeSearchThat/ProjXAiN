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
  serverTimestamp
} from 'firebase/firestore'

const COLLECTION = COLLECTIONS.STUDENT_VALIDATION_LINKS

const normalizeText = (value) => String(value || '').trim()
const normalizeEmail = (value) => normalizeText(value).toLowerCase()

export async function addStudentValidationLink({
  label,
  url,
  uploaderEmail,
  uploaderName
}) {
  const normalizedLabel = normalizeText(label)
  const normalizedUrl = normalizeText(url)
  const normalizedEmail = normalizeEmail(uploaderEmail)

  if (!normalizedLabel) {
    return { success: false, message: 'Link label is required.' }
  }
  if (!normalizedUrl) {
    return { success: false, message: 'Spreadsheet link is required.' }
  }
  if (!normalizedEmail) {
    return { success: false, message: 'Uploader email is required.' }
  }

  const payload = {
    label: normalizedLabel,
    url: normalizedUrl,
    uploaderEmail: normalizedEmail,
    uploaderName: normalizeText(uploaderName) || 'Registrar',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }

  const docRef = await addDoc(collection(db, COLLECTION), payload)
  return { success: true, id: docRef.id }
}

export async function listAllStudentValidationLinks(limitCount = 300) {
  const q = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  const snapshot = await getDocs(q)
  return {
    success: true,
    links: snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
  }
}

export async function deleteStudentValidationLink(id) {
  if (!id) return { success: false, message: 'Link ID is required.' }
  await deleteDoc(doc(db, COLLECTION, id))
  return { success: true }
}
