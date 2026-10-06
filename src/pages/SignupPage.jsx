import { useRef, useState } from 'react'
import { getFriendlyAuthError, signUpWithEmailPassword } from '../firebase/firebase.js'
import { createStudentAccount } from '../services/dashboardService.js'

function withRequestDeadline(request, message) {
  const deadline = AbortSignal.timeout(20000)

  return new Promise((resolve, reject) => {
    const rejectOnDeadline = () => reject(new Error(message))
    deadline.addEventListener('abort', rejectOnDeadline, { once: true })

    Promise.resolve(request).then(
      (result) => {
        deadline.removeEventListener('abort', rejectOnDeadline)
        resolve(result)
      },
      (error) => {
        deadline.removeEventListener('abort', rejectOnDeadline)
        reject(error)
      },
    )
  })
}

function getStudentProfileError(error) {
  if (error.message.includes('taking too long')) {
    return error.message
  }

  if (error.code === 'permission-denied') {
    return 'Your account was created, but Firestore denied saving your student profile. Please contact support.'
  }

  if (error.code === 'unavailable' || error.code === 'deadline-exceeded') {
    return 'Your account was created, but the student profile could not be saved because the service is unavailable. Check your connection and try again.'
  }

  return 'Your account was created, but we could not save your student profile. Check your connection and try again.'
}

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submissionInProgress = useRef(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submissionInProgress.current) return

    submissionInProgress.current = true
    setError('')
    setLoading(true)

    try {
      const result = await withRequestDeadline(
        signUpWithEmailPassword(form.email, form.password),
        'Firebase Authentication is taking too long to respond. Check your connection and try again.',
      )
      const user = result.user

      try {
        await withRequestDeadline(
          createStudentAccount(user.uid, {
            name: form.name.trim(),
            email: user.email,
            profileImage: '',
            joinedAt: new Date().toISOString(),
            classLevel: '',
            school: '',
            subjects: [],
            overallProgress: 0,
          }),
          'Saving your student profile is taking too long. Check your connection and try again.',
        )
      } catch (profileError) {
        setError(getStudentProfileError(profileError))
        return
      }

      window.location.href = '/dashboard'
    } catch (submitError) {
      setError(getFriendlyAuthError(submitError))
    } finally {
      submissionInProgress.current = false
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      padding: '32px 20px',
      background: 'linear-gradient(180deg, #edf6f9 0%, #f7fafc 100%)',
      color: '#153759',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        padding: '32px 24px',
        border: '1px solid #dfeaf1',
        borderRadius: '22px',
        background: '#fff',
        boxShadow: '0 22px 50px rgba(7, 26, 52, 0.08)',
      }}>
        <p style={{ margin: 0, color: '#0b6faa', fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>New student</p>
        <h1 style={{ margin: '12px 0 8px', fontSize: '2rem', letterSpacing: '-0.05em', color: '#08264a' }}>Create account</h1>
        <p style={{ margin: '0 0 24px', color: '#5f7286', lineHeight: 1.6 }}>Set up your account and keep your learning progress in one place.</p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <label style={{ display: 'grid', gap: '8px', fontWeight: 600 }}>
            Full name
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              style={{ minHeight: '48px', border: '1px solid #dfeaf1', borderRadius: '12px', padding: '0 14px', fontSize: '16px' }}
            />
          </label>

          <label style={{ display: 'grid', gap: '8px', fontWeight: 600 }}>
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              style={{ minHeight: '48px', border: '1px solid #dfeaf1', borderRadius: '12px', padding: '0 14px', fontSize: '16px' }}
            />
          </label>

          <label style={{ display: 'grid', gap: '8px', fontWeight: 600 }}>
            Password
            <input
              name="password"
              type="password"
              minLength={6}
              required
              value={form.password}
              onChange={handleChange}
              style={{ minHeight: '48px', border: '1px solid #dfeaf1', borderRadius: '12px', padding: '0 14px', fontSize: '16px' }}
            />
          </label>

          {error && (
            <div style={{ padding: '10px 12px', borderRadius: '10px', background: '#fff3f2', color: '#a9241f', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ minHeight: '48px', border: '0', borderRadius: '14px', background: 'linear-gradient(135deg, #19c5e5 0%, #7fe0f0 100%)', color: '#08264a', fontWeight: 800, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={{ margin: '18px 0 0', color: '#5f7286', textAlign: 'center' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#0b6faa', fontWeight: 700 }}>Login</a>
        </p>
      </div>
    </div>
  )
}
