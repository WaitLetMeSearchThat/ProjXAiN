import { db } from './config.js'
import { collection, doc, getDoc, getDocs, orderBy, query, addDoc, updateDoc, deleteDoc, where } from 'firebase/firestore'
import { COLLECTIONS } from '@/assets/constants'

export async function getStudentById(studentId) {
  try {
    const ref = doc(db, COLLECTIONS.STUDENTS, studentId)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      return { success: false, message: 'Student record not found.' }
    }
    return { success: true, student: { id: snap.id, ...snap.data() } }
  } catch (error) {
    console.error('Error fetching student:', error)
    return { success: false, message: 'Failed to fetch student record.' }
  }
}

export async function listStudents() {
  try {
    const colRef = collection(db, COLLECTIONS.STUDENTS)
    const q = query(colRef, orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    const students = []
    snap.forEach((docSnap) => {
      students.push({ id: docSnap.id, ...docSnap.data() })
    })
    return { success: true, students }
  } catch (error) {
    console.error('Error listing students:', error)
    return { success: false, message: 'Failed to load students.' }
  }
}

export async function createStudent(studentData) {
  try {
    const colRef = collection(db, COLLECTIONS.STUDENTS)
    const docRef = await addDoc(colRef, studentData)
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error creating student:', error)
    return { success: false, message: 'Failed to create student.' }
  }
}

export async function updateStudent(id, studentData) {
  try {
    const ref = doc(db, COLLECTIONS.STUDENTS, id)
    await updateDoc(ref, studentData)
    return { success: true }
  } catch (error) {
    console.error('Error updating student:', error)
    return { success: false, message: 'Failed to update student.' }
  }
}

export async function deleteStudentById(id) {
  try {
    const ref = doc(db, COLLECTIONS.STUDENTS, id)
    await deleteDoc(ref)
    return { success: true }
  } catch (error) {
    console.error('Error deleting student:', error)
    return { success: false, message: 'Failed to delete student.' }
  }
}

export async function updateStudentByStudentId(studentId, studentData) {
  try {
    const colRef = collection(db, COLLECTIONS.STUDENTS)
    const q = query(colRef, where('studentId', '==', studentId))
    const snap = await getDocs(q)
    if (snap.empty) {
      return { success: false, message: 'Student record not found.' }
    }
    const target = snap.docs[0]
    await updateDoc(target.ref, studentData)
    return { success: true, id: target.id }
  } catch (error) {
    console.error('Error updating student by studentId:', error)
    return { success: false, message: 'Failed to update student.' }
  }
}
