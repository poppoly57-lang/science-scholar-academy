import { firebaseAuth, initializeFirebase, getDbInstance } from '../firebase/firebase.js'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const ssaSubjects = [
  { id: 'physics-1', name: 'Physics Paper 1', paper: 'Paper 1', icon: 'physics' },
  { id: 'physics-2', name: 'Physics Paper 2', paper: 'Paper 2', icon: 'physics' },
  { id: 'chemistry-1', name: 'Chemistry Paper 1', paper: 'Paper 1', icon: 'chemistry' },
  { id: 'chemistry-2', name: 'Chemistry Paper 2', paper: 'Paper 2', icon: 'chemistry' },
  { id: 'mathematics-1', name: 'Pure Mathematics Paper 1', paper: 'Paper 1', icon: 'mathematics' },
  { id: 'mathematics-2', name: 'Pure Mathematics Paper 2', paper: 'Paper 2', icon: 'mathematics' },
  { id: 'biology-1', name: 'Biology Paper 1', paper: 'Paper 1', icon: 'biology' },
  { id: 'biology-2', name: 'Biology Paper 2', paper: 'Paper 2', icon: 'biology' },
  { id: 'submath', name: 'Submath', paper: 'Course', icon: 'submath' },
  { id: 'ict-1', name: 'ICT Paper 1', paper: 'Paper 1', icon: 'ict' },
  { id: 'ict-2', name: 'ICT Paper 2', paper: 'Paper 2', icon: 'ict' },
  { id: 'agriculture', name: 'Agriculture', paper: 'Course', icon: 'agriculture' },
].map((subject) => ({ ...subject, progress: 0, status: 'Not started' }))

async function loadModule(moduleName) {
  try {
    return await new Function('moduleName', 'return import(moduleName)')(moduleName)
  } catch (error) {
    return null
  }
}

const emptyDashboard = {
  student: null,
  stats: [],
  subjects: [],
  lessons: [],
  practice: [],
  resources: [],
  weeklyProgress: [],
  recentActivity: [],
  continueLearning: null,
  notConfigured: false,
  error: '',
}

function toProgressNumber(value, fallback = 0) {
  const numericValue = Number(value)
  if (Number.isFinite(numericValue)) {
    return numericValue
  }

  return fallback
}

async function readCollectionByQuery(collectionName, queryBuilder) {
  const { configured } = await initializeFirebase()
  if (!configured) {
    return []
  }

  const firestoreModule = await loadModule('firebase/firestore')
  const { collection, getDocs, query, where } = firestoreModule ?? {}
  const db = await getDbInstance()

  if (!db) {
    return []
  }

  try {
    const collectionRef = collection(db, collectionName)
    const firestoreQuery = queryBuilder({ collectionRef, query, where })
    const snapshot = await getDocs(firestoreQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.warn(`Unable to load ${collectionName} data.`, error)
    return []
  }
}

export async function getAssignedSubjects(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const firestoreModule = await loadModule('firebase/firestore')
    const { collection, getDocs, query, where } = firestoreModule ?? {}
    if (!collection || !getDocs || !query || !where) {
      return []
    }

    const db = await getDbInstance()
    const subjectsRef = collection(db, 'subjects')
    const subjectsQuery = query(subjectsRef, where('studentIds', 'array-contains', userId))
    const snapshot = await getDocs(subjectsQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.warn('Unable to load student subjects.', error)
    return []
  }
}

export async function getStudentLessons(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const firestoreModule = await loadModule('firebase/firestore')
    const { collection, getDocs, query, where } = firestoreModule ?? {}
    if (!collection || !getDocs || !query || !where) {
      return []
    }

    const db = await getDbInstance()
    const lessonsRef = collection(db, 'lessons')
    const lessonsQuery = query(lessonsRef, where('studentIds', 'array-contains', userId))
    const snapshot = await getDocs(lessonsQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.warn('Unable to load student lessons.', error)
    return []
  }
}

export async function getStudentProgress(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const firestoreModule = await loadModule('firebase/firestore')
    const { doc, getDoc } = firestoreModule ?? {}
    if (!doc || !getDoc) {
      return []
    }

    const db = await getDbInstance()
    const progressSnapshot = await getDoc(doc(db, 'studentProgress', userId))

    return progressSnapshot.exists() ? [{ id: progressSnapshot.id, ...progressSnapshot.data() }] : []
  } catch (error) {
    console.warn('Unable to load student progress.', error)
    return []
  }
}

export async function getPracticeResults(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const firestoreModule = await loadModule('firebase/firestore')
    const { collection, getDocs, query, where, orderBy } = firestoreModule ?? {}
    if (!collection || !getDocs || !query || !where || !orderBy) {
      return []
    }

    const db = await getDbInstance()
    const resultsRef = collection(db, 'practiceResults')
    const resultsQuery = query(resultsRef, where('userId', '==', userId), orderBy('completedAt', 'desc'))
    const snapshot = await getDocs(resultsQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.warn('Unable to load practice results.', error)
    return []
  }
}

export async function getRecentActivities(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const firestoreModule = await loadModule('firebase/firestore')
    const { collection, getDocs, query, where, orderBy } = firestoreModule ?? {}
    if (!collection || !getDocs || !query || !where || !orderBy) {
      return []
    }

    const db = await getDbInstance()
    const activitiesRef = collection(db, 'studentActivity')
    const activitiesQuery = query(activitiesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(activitiesQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.warn('Unable to load recent activities.', error)
    return []
  }
}

export async function getStudentDashboard() {
  const { configured } = await initializeFirebase()

  if (!configured) {
    return {
      ...emptyDashboard,
      notConfigured: true,
      error: 'Firebase is not configured yet. Add your project credentials to the environment variables.',
    }
  }

  const userId = firebaseAuth?.currentUser?.uid
  if (!userId) {
    return {
      ...emptyDashboard,
      error: 'Student account is required to load the dashboard.',
    }
  }

  try {
    const [lessons, progress, practice, activity] = await Promise.all([
      getStudentLessons(userId),
      getStudentProgress(userId),
      getPracticeResults(userId),
      getRecentActivities(userId),
    ])

    const effectiveLessons = lessons.filter((lesson) => (
      toProgressNumber(lesson.progress ?? lesson.currentProgress, 0) > 0
      || Boolean(lesson.lastOpened)
      || lesson.completed === true
    ))
    const trackedProgress = progress.filter((item) => Number.isFinite(Number(item.progress)))
    const overallProgress = trackedProgress.length
      ? Math.round(trackedProgress.reduce((total, item) => total + toProgressNumber(item.progress), 0) / trackedProgress.length)
      : 0

    const completedLessons = progress.filter((item) => toProgressNumber(item.progress, 0) >= 100 || item.completed === true).length
    const subjectsStarted = new Set(progress
      .filter((item) => toProgressNumber(item.progress, 0) > 0 || item.completed === true)
      .map((item) => item.subjectId || item.subjectName || item.subject)
      .filter(Boolean)).size
    const latestLesson = effectiveLessons
      .slice()
      .sort((a, b) => toProgressNumber(b.lastOpened ?? b.updatedAt ?? 0, 0) - toProgressNumber(a.lastOpened ?? a.updatedAt ?? 0, 0))[0]

    const issueSummary = {
      stats: [
        { id: 'progress', icon: 'progress', value: `${overallProgress}%`, label: 'Overall Progress', detail: 'Across tracked learning' },
        { id: 'subjects', icon: 'subjects', value: `${subjectsStarted}`, label: 'Subjects Started', detail: 'Learning underway' },
        { id: 'lessons', icon: 'lessons', value: `${completedLessons}`, label: 'Lessons Completed', detail: 'Completed so far' },
        { id: 'score', icon: 'spark', value: `${practice.length}`, label: 'Practice Tests', detail: 'Completed attempts' },
      ],
      subjects: ssaSubjects,
      lessons: effectiveLessons,
      practice: practice.length > 0 ? practice : [],
      resources: [],
      weeklyProgress: [],
      recentActivity: activity,
      continueLearning: latestLesson
        ? {
            id: latestLesson.id,
            subject: latestLesson.subjectName || latestLesson.subject || 'Subject',
            title: latestLesson.title || 'Current lesson',
            progress: toProgressNumber(latestLesson.progress ?? latestLesson.currentProgress ?? 0, 0),
            paper: latestLesson.paper || 'Core',
          }
        : null,
      notConfigured: false,
      error: '',
    }

    return issueSummary
  } catch (error) {
    console.warn('Unable to load student dashboard.', error)
    return {
      ...emptyDashboard,
      error: 'The dashboard could not load data right now. Please try again.',
    }
  }
}

export async function createStudentAccount(userId, profile) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    throw new Error('Student profile could not be saved because Firebase is not configured.')
  }

  const db = await getDbInstance()
  const createdAt = serverTimestamp()
  const payload = {
    ...profile,
    uid: userId,
    createdAt,
    joinedAt: createdAt,
    updatedAt: createdAt,
  }

  await setDoc(doc(db, 'students', userId), payload, { merge: true })
  return true
}
