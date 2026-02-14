import { db } from './firebase/config.js'
import { collection, addDoc } from 'firebase/firestore'

// Sample prospectus data
const sampleProspectus = [
  {
    subject: 'DM 103',
    professor: 'Santiago',
    room: 'CL 3'
  },
  {
    subject: 'GE 3',
    professor: 'Senining',
    room: 'RM 1'
  },
  {
    subject: 'RIZAL',
    professor: 'Apawan',
    room: 'RM 4'
  },
  {
    subject: 'ADV 01',
    professor: 'Salem',
    room: 'RM 3 / RM 7'
  },
  {
    subject: 'ADV 02',
    professor: 'Salem',
    room: 'RM 3 / RM 7'
  },
  {
    subject: 'GE 2',
    professor: 'Ariston',
    room: 'RM 7'
  },
  {
    subject: 'GE ELEC 1',
    professor: 'Ferreras / Soliva',
    room: 'RM 2 / RM 5 / RM 7'
  }
]

async function seedProspectus() {
  try {
    const prospectusCollection = collection(db, 'prospectus')
    for (const item of sampleProspectus) {
      await addDoc(prospectusCollection, item)
      console.log(`Added prospectus for ${item.subject} with professor ${item.professor}`)
    }
    console.log('Prospectus seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding prospectus:', error)
  }
}

// Run the seeding function
seedProspectus()
