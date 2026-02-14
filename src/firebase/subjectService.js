import { db } from './config.js'
import { collection, getDocs, query, where, orderBy, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { COLLECTIONS } from '@/assets/constants'

export async function getSubjectsByProgram(programCode) {
  try {
    const subjectsRef = collection(db, COLLECTIONS.SUBJECTS)
    const q = query(subjectsRef, where('program', '==', programCode))
    const snap = await getDocs(q)
    const subjects = []
    snap.forEach((doc) => {
      subjects.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, subjects }
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return { success: false, message: 'Failed to fetch subjects.' }
  }
}

export async function listSubjects() {
  try {
    const subjectsRef = collection(db, COLLECTIONS.SUBJECTS)
    const q = query(subjectsRef, orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    const subjects = []
    snap.forEach((docSnap) => {
      subjects.push({ id: docSnap.id, ...docSnap.data() })
    })
    return { success: true, subjects }
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return { success: false, message: 'Failed to fetch subjects.' }
  }
}

export async function createSubject(subjectData) {
  try {
    const subjectsRef = collection(db, COLLECTIONS.SUBJECTS)
    const docRef = await addDoc(subjectsRef, subjectData)
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error creating subject:', error)
    return { success: false, message: 'Failed to create subject.' }
  }
}

export async function updateSubject(id, subjectData) {
  try {
    const ref = doc(db, COLLECTIONS.SUBJECTS, id)
    await updateDoc(ref, subjectData)
    return { success: true }
  } catch (error) {
    console.error('Error updating subject:', error)
    return { success: false, message: 'Failed to update subject.' }
  }
}

export async function deleteSubjectById(id) {
  try {
    const ref = doc(db, COLLECTIONS.SUBJECTS, id)
    await deleteDoc(ref)
    return { success: true }
  } catch (error) {
    console.error('Error deleting subject:', error)
    return { success: false, message: 'Failed to delete subject.' }
  }
}
