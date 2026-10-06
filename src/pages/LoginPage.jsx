import { useState } from 'react'
import { getFriendlyAuthError, signInWithEmailPassword } from '../firebase/firebase.js'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailPassword(form.email, form.password)
      window.location.href = '/dashboard'
    } catch (submitError) {
      setError(getFriendlyAuthError(submitError))
    } finally {
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
        <p style={{ margin: 0, color: '#0b6faa', fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Student access</p>
        <h1 style={{ margin: '12px 0 8px', fontSize: '2rem', letterSpacing: '-0.05em', color: '#08264a' }}>Student Login</h1>
        <p style={{ margin: '0 0 24px', color: '#5f7286', lineHeight: 1.6 }}>Sign in to continue your learning journey with Science Scholar Academy.</p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
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
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p style={{ margin: '18px 0 0', color: '#5f7286', textAlign: 'center' }}>
          Need an account?{' '}
          <a href="/signup" style={{ color: '#0b6faa', fontWeight: 700 }}>Create one</a>
        </p>
      </div>
    </div>
  )
}
