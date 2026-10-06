import { getApp, getApps, initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const requiredEnvKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

export const isFirebaseConfigured = requiredEnvKeys.every((key) => Boolean(import.meta.env[key]))
export const firebaseApp = isFirebaseConfigured
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null
export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null
export const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : null

export async function initializeFirebase() {
  return {
    firebaseApp,
    firebaseAuth,
    firebaseDb,
    configured: isFirebaseConfigured,
    ...(isFirebaseConfigured ? {} : { reason: 'Firebase environment variables are missing.' }),
  }
}

export async function getAuthInstance() {
  return firebaseAuth
}

export async function getDbInstance() {
  return firebaseDb
}

function requireAuth() {
  if (!firebaseAuth) {
    throw new Error('Firebase authentication is not configured. Check the VITE_FIREBASE_* environment variables.')
  }

  return firebaseAuth
}

export function signInWithEmailPassword(email, password) {
  return signInWithEmailAndPassword(requireAuth(), email, password)
}

export function signUpWithEmailPassword(email, password) {
  return createUserWithEmailAndPassword(requireAuth(), email, password)
}

export function signOutFromFirebase() {
  return signOut(requireAuth())
}

export function listenToAuthState(callback, onError) {
  if (!firebaseAuth) {
    callback(null)
    return () => {}
  }

  return onAuthStateChanged(firebaseAuth, callback, onError)
}

export function getCurrentUser() {
  if (!firebaseAuth) {
    return Promise.resolve(null)
  }

  return new Promise((resolve) => {
    let unsubscribe = () => {}
    unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export function getFriendlyAuthError(error) {
  const messages = {
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/user-not-found': 'No account was found with that email address.',
    'auth/wrong-password': 'The password is incorrect. Please try again.',
    'auth/invalid-credential': 'The email or password is incorrect. Please try again.',
    'auth/email-already-in-use': 'An account already exists with that email address.',
    'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  }

  return messages[error?.code] || error?.message || 'Something went wrong. Please try again.'
}

export { requiredEnvKeys }
