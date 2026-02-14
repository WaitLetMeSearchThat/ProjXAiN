import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {

  apiKey: "AIzaSyDDQagjrBx2yA6rKBnXbJcRZ-zwa4mAkxQ",

  authDomain: "test-b467b.firebaseapp.com",

  projectId: "test-b467b",

  storageBucket: "test-b467b.firebasestorage.app",

  messagingSenderId: "182780770953",

  appId: "1:182780770953:web:c57897f32dda52cb4be458",

  measurementId: "G-6C5BHGL99Z"

};



const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider()

export { app, auth, db, storage, googleProvider }
