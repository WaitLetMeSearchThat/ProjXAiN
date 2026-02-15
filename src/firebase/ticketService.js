import { db } from './config'
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const TICKETS_COLLECTION = 'gradeInquiryTickets'

const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase()

const generateTicketId = () => {
  const rand = Math.floor(Math.random() * 900 + 100)
  return `TKT-${Date.now().toString(36).toUpperCase()}-${rand}`
}

export async function createInquiryTicket(payload = {}) {
  try {
    const studentId = String(payload.studentId || '').trim()
    const ticket = {
      ticketId: payload.ticketId || generateTicketId(),
      service: String(payload.service || '').trim(),
      studentId,
      studentIdNormalized: normalizeStudentId(studentId),
      status: payload.status || 'Submitted',
      processNote: payload.processNote || 'Submitted. Waiting for registrar verification.',
      details: payload.details || {},
      createdAt: serverTimestamp(),
      createdAtMillis: Date.now(),
      createdByUid: payload.createdByUid || '',
      createdByEmail: payload.createdByEmail || '',
      createdByName: payload.createdByName || ''
    }

    const docRef = await addDoc(collection(db, TICKETS_COLLECTION), ticket)
    return { success: true, id: docRef.id, ticket: { ...ticket, id: docRef.id } }
  } catch (error) {
    console.error('Error creating inquiry ticket:', error)
    return { success: false, message: 'Failed to create ticket.' }
  }
}

const mapTickets = (snapshot) => {
  const records = []
  snapshot.forEach((docSnap) => {
    const data = docSnap.data()
    records.push({
      id: docSnap.id,
      ...data
    })
  })
  records.sort((a, b) => Number(b.createdAtMillis || 0) - Number(a.createdAtMillis || 0))
  return records
}

export function subscribeRegistrarTickets(onData, onError) {
  const q = query(collection(db, TICKETS_COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => {
      onData(mapTickets(snapshot))
    },
    (error) => {
      console.error('Error subscribing registrar tickets:', error)
      if (onError) onError(error)
    }
  )
}

export function subscribeStudentTickets(studentId, onData, onError) {
  const normalized = normalizeStudentId(studentId)
  if (!normalized) {
    onData([])
    return () => {}
  }

  const q = query(
    collection(db, TICKETS_COLLECTION),
    where('studentIdNormalized', '==', normalized)
  )

  return onSnapshot(
    q,
    (snapshot) => {
      onData(mapTickets(snapshot))
    },
    (error) => {
      console.error('Error subscribing student tickets:', error)
      if (onError) onError(error)
    }
  )
}

export async function updateInquiryTicket(ticketId, payload = {}) {
  try {
    if (!ticketId) return { success: false, message: 'Ticket ID is required.' }
    const ref = doc(db, TICKETS_COLLECTION, ticketId)
    await updateDoc(ref, {
      ...payload,
      updatedAt: serverTimestamp(),
      updatedAtMillis: Date.now()
    })
    return { success: true }
  } catch (error) {
    console.error('Error updating inquiry ticket:', error)
    return { success: false, message: 'Failed to update ticket.' }
  }
}

export async function deleteInquiryTicket(ticketId) {
  try {
    if (!ticketId) return { success: false, message: 'Ticket ID is required.' }
    const ref = doc(db, TICKETS_COLLECTION, ticketId)
    await deleteDoc(ref)
    return { success: true }
  } catch (error) {
    console.error('Error deleting inquiry ticket:', error)
    return { success: false, message: 'Failed to delete ticket.' }
  }
}
