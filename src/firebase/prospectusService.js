import { db } from './config.js'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

// Upload prospectus data to Firestore
export async function uploadProspectus(prospectusData) {
  try {
    const prospectusCollection = collection(db, 'prospectus')
    const uploadPromises = prospectusData.map(item => addDoc(prospectusCollection, item))
    await Promise.all(uploadPromises)
    return { success: true, message: `Successfully uploaded ${prospectusData.length} prospectus entries.` }
  } catch (error) {
    console.error('Error uploading prospectus:', error)
    return { success: false, message: 'Failed to upload prospectus. Please check permissions.' }
  }
}

// Get all prospectus data
export async function getProspectus() {
  try {
    const prospectusCollection = collection(db, 'prospectus')
    const querySnapshot = await getDocs(prospectusCollection)
    const prospectus = []
    querySnapshot.forEach((doc) => {
      prospectus.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, prospectus }
  } catch (error) {
    console.error('Error fetching prospectus:', error)
    return { success: false, message: 'Failed to fetch prospectus.' }
  }
}

// Get prospectus by subject code
export async function getProspectusBySubject(subjectCode) {
  try {
    const prospectusCollection = collection(db, 'prospectus')
    const q = query(prospectusCollection, where('subject', '==', subjectCode))
    const querySnapshot = await getDocs(q)
    const prospectus = []
    querySnapshot.forEach((doc) => {
      prospectus.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, prospectus }
  } catch (error) {
    console.error('Error fetching prospectus by subject:', error)
    return { success: false, message: 'Failed to fetch prospectus for subject.' }
  }
}
