import { firebaseAuth, initializeFirebase, getDbInstance } from '../firebase/firebase.js'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { getPublishedSubjects } from './subjectService.js'

const dashboardSubjectNames = {
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
  'pure mathematics': 'Mathematics',
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

export async function getAssignedSubjects(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const db = await getDbInstance()
    const subjectsRef = collection(db, 'subjects')
    const subjectsQuery = query(subjectsRef, where('studentIds', 'array-contains', userId))
    const snapshot = await getDocs(subjectsQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.error('Firestore error:', { code: error?.code, message: error?.message, name: error?.name })
    return []
  }
}

export async function getStudentLessons(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const db = await getDbInstance()
    const lessonsRef = collection(db, 'lessons')
    const lessonsQuery = query(lessonsRef, where('studentIds', 'array-contains', userId))
    const snapshot = await getDocs(lessonsQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.error('Firestore error:', { code: error?.code, message: error?.message, name: error?.name })
    return []
  }
}

export async function getStudentProgress(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const db = await getDbInstance()
    const progressSnapshot = await getDoc(doc(db, 'studentProgress', userId))

    return progressSnapshot.exists() ? [{ id: progressSnapshot.id, ...progressSnapshot.data() }] : []
  } catch (error) {
    console.error('Firestore error:', { code: error?.code, message: error?.message, name: error?.name })
    return []
  }
}

export async function getPracticeResults(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const db = await getDbInstance()
    const resultsRef = collection(db, 'practiceResults')
    const resultsQuery = query(resultsRef, where('userId', '==', userId), orderBy('completedAt', 'desc'))
    const snapshot = await getDocs(resultsQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.error('Firestore error:', { code: error?.code, message: error?.message, name: error?.name })
    return []
  }
}

export async function getRecentActivities(userId) {
  const { configured } = await initializeFirebase()
  if (!configured || !userId) {
    return []
  }

  try {
    const db = await getDbInstance()
    const activitiesRef = collection(db, 'studentActivity')
    const activitiesQuery = query(activitiesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(activitiesQuery)

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
  } catch (error) {
    console.error('Firestore error:', { code: error?.code, message: error?.message, name: error?.name })
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
    const [lessons, progress, practice, activity, publishedSubjects] = await Promise.all([
      getStudentLessons(userId),
      getStudentProgress(userId),
      getPracticeResults(userId),
      getRecentActivities(userId),
      getPublishedSubjects(),
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
    const progressBySubject = progress[0]?.subjects || {}
    const dashboardSubjects = publishedSubjects.map((subject) => {
      const subjectProgress = progressBySubject[subject.id] || {}
      const progressValue = Number(subjectProgress.percentage ?? subjectProgress.progress)
      const subjectPercentage = Number.isFinite(progressValue)
        ? Math.max(0, Math.min(100, Math.round(progressValue)))
        : 0

      return {
        ...subject,
        name: dashboardSubjectNames[subject.id] || subject.name || subject.id,
        paper: subject.paper || (Array.isArray(subject.papers) ? subject.papers.join(' + ') : '') || 'Course',
        icon: subject.icon || (subject.id === 'pure mathematics' ? 'mathematics' : subject.id),
        progress: subjectPercentage,
        status: subjectProgress.status || (subjectPercentage > 0 ? 'In progress' : 'Not started'),
      }
    })
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
      subjects: dashboardSubjects,
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
