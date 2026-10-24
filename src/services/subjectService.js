import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { firebaseAuth, firebaseDb } from '../firebase/firebase.js'
import { subjectSeed } from '../data/subjectSeed.js'

function requireStudent() {
  const user = firebaseAuth?.currentUser
  if (!user || !firebaseDb) {
    throw new Error('Sign in to access your subjects.')
  }
  return user
}

function requireDatabase() {
  if (!firebaseDb) {
    throw new Error('Firebase is not configured. Please try again later.')
  }
  return firebaseDb
}

export async function getPublishedSubjects() {
  requireStudent()
  const subjectsQuery = query(
    collection(requireDatabase(), 'subjects'),
    where('published', '==', true),
  )
  const snapshot = await getDocs(subjectsQuery)
  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((first, second) => Number(first.order || 0) - Number(second.order || 0))
}

export async function getPublishedSubject(subjectId) {
  requireStudent()
  const snapshot = await getDoc(doc(requireDatabase(), 'subjects', subjectId))
  if (!snapshot.exists() || snapshot.data().published !== true) {
    return null
  }
  return { id: snapshot.id, ...snapshot.data() }
}

export async function getPublishedTopics(subjectId) {
  requireStudent()
  const topicsQuery = query(
    collection(requireDatabase(), 'subjects', subjectId, 'topics'),
    where('published', '==', true),
  )
  const snapshot = await getDocs(topicsQuery)
  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((first, second) => Number(first.order || 0) - Number(second.order || 0))
}

export async function getStudentSubjectProgress(userId = requireStudent().uid) {
  const user = requireStudent()
  if (user.uid !== userId) {
    throw new Error('Students can only read their own learning progress.')
  }

  const snapshot = await getDoc(doc(requireDatabase(), 'studentProgress', user.uid))
  return snapshot.exists() ? snapshot.data().subjects || {} : {}
}

export async function seedSubjectsIfMissing() {
  const database = requireDatabase()
  const missing = []

  for (const subject of subjectSeed) {
    const subjectRef = doc(database, 'subjects', subject.id)
    const snapshot = await getDoc(subjectRef)
    if (!snapshot.exists()) {
      missing.push(setDoc(subjectRef, {
        ...subject,
        published: false,
        createdAt: serverTimestamp(),
      }))
    }
  }

  await Promise.all(missing)
  return { created: missing.length, existing: subjectSeed.length - missing.length }
}