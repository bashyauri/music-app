// firebaseService.js
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, query } from 'firebase/firestore'
import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  uploadBytesResumable
} from 'firebase/storage' // Alias the ref as storageRef for clarity

const firebaseConfig = {
  apiKey: 'AIzaSyDyHTA_BWlJNX4eZ9yc08RA9sJTt9Qqp88',
  authDomain: 'music-app-8d394.firebaseapp.com',
  projectId: 'music-app-8d394',
  storageBucket: 'music-app-8d394.appspot.com',
  appId: '1:303693042476:web:0f2a6b6220c85b65631289',
  measurementId: 'G-ZTNZ34QTSE'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Analytics (optional)
const analytics = getAnalytics(app)

// Initialize Auth
const auth = getAuth(app)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Storage
const storage = getStorage(app)

// Define collections
const usersCollection = collection(db, 'users')
const songsCollection = collection(db, 'songs')

// Export firebase services and helpers
export {
  app,
  auth,
  analytics,
  db,
  usersCollection,
  songsCollection,
  storage,
  storageRef,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  query
}
