import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { db, storage } from './config'

const announcementsCollection = collection(db, 'announcements')

const normalizeAnnouncement = (snapshot) => {
  const data = snapshot.data() || {}
  return {
    id: snapshot.id,
    title: data.title || '',
    category: data.category || 'general',
    content: data.content || '',
    author: data.author || 'Anonymous',
    isPinned: Boolean(data.isPinned),
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
    views: typeof data.views === 'number' ? data.views : 0,
    likes: typeof data.likes === 'number' ? data.likes : 0,
    likedBy: Array.isArray(data.likedBy) ? data.likedBy : [],
    comments: Array.isArray(data.comments) ? data.comments : [],
    images: Array.isArray(data.images) ? data.images : [],
    thumbnail: data.thumbnail || ''
  }
}

const subscribeAnnouncements = (callback) => {
  const announcementsQuery = query(announcementsCollection, orderBy('createdAt', 'desc'))
  return onSnapshot(announcementsQuery, (snapshot) => {
    const items = snapshot.docs.map(normalizeAnnouncement)
    callback(items)
  })
}

const createAnnouncement = async (payload) => {
  return addDoc(announcementsCollection, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

const updateAnnouncement = async (id, payload) => {
  const announcementRef = doc(db, 'announcements', id)
  return updateDoc(announcementRef, {
    ...payload,
    updatedAt: serverTimestamp()
  })
}

const deleteAnnouncement = async (id) => {
  return deleteDoc(doc(db, 'announcements', id))
}

const toggleLike = async (announcementId, userId, currentlyLiked) => {
  const announcementRef = doc(db, 'announcements', announcementId)

  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(announcementRef)
    if (!snapshot.exists()) return

    const data = snapshot.data() || {}
    const likedBy = Array.isArray(data.likedBy) ? data.likedBy : []
    const likes = typeof data.likes === 'number' ? data.likes : 0

    const nextLikedBy = currentlyLiked
      ? likedBy.filter((id) => id !== userId)
      : [...new Set([...likedBy, userId])]
    const nextLikes = Math.max(0, likes + (currentlyLiked ? -1 : 1))

    transaction.update(announcementRef, {
      likedBy: nextLikedBy,
      likes: nextLikes
    })
  })
}

const addComment = async (announcementId, comment) => {
  const announcementRef = doc(db, 'announcements', announcementId)
  return updateDoc(announcementRef, {
    comments: arrayUnion(comment),
    updatedAt: serverTimestamp()
  })
}

const uploadAnnouncementImages = async (files, announcementId) => {
  if (!files?.length) return []

  const uploads = await Promise.all(files.map(async (file) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const imageRef = storageRef(
      storage,
      `announcements/${announcementId}/${Date.now()}-${safeName}`
    )
    const snapshot = await uploadBytes(imageRef, file)
    return getDownloadURL(snapshot.ref)
  }))

  return uploads
}

export {
  subscribeAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleLike,
  addComment,
  uploadAnnouncementImages
}
