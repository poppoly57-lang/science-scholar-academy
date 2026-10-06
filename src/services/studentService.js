import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { firebaseAuth, firebaseDb } from '../firebase/firebase.js'

function getAuthenticatedStudent() {
  const user = firebaseAuth?.currentUser

  if (!user || !firebaseDb) {
    throw new Error('An authenticated student is required to load this profile.')
  }

  return user
}

function profileFromAuth(user, profile = {}) {
  return {
    ...profile,
    uid: user.uid,
    name: typeof profile.name === 'string' && profile.name.trim()
      ? profile.name.trim()
      : user.displayName?.trim() || '',
    email: user.email || profile.email || '',
  }
}

export async function getCurrentStudentProfile() {
  const user = getAuthenticatedStudent()
  const profileRef = doc(firebaseDb, 'students', user.uid)
  const profileSnapshot = await getDoc(profileRef)

  if (profileSnapshot.exists()) {
    const existingProfile = profileSnapshot.data()
    const profile = profileFromAuth(user, existingProfile)

    if (!existingProfile.uid || !existingProfile.name?.trim() || !existingProfile.email || !existingProfile.createdAt) {
      await setDoc(profileRef, {
        uid: profile.uid,
        name: profile.name,
        email: profile.email,
        createdAt: existingProfile.createdAt || serverTimestamp(),
      }, { merge: true })
    }

    return profile
  }

  const profile = {
    uid: user.uid,
    name: user.displayName?.trim() || '',
    email: user.email || '',
    createdAt: serverTimestamp(),
  }

  await setDoc(profileRef, profile)
  return profile
}

export async function updateCurrentStudentProfile(updates) {
  const user = getAuthenticatedStudent()
  const name = typeof updates?.name === 'string' ? updates.name.trim() : null

  if (name === null || !name) {
    throw new Error('A student name is required to update this profile.')
  }

  await updateDoc(doc(firebaseDb, 'students', user.uid), {
    name,
    updatedAt: serverTimestamp(),
  })

  return getCurrentStudentProfile()
}