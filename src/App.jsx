import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'
import CommunityPage from './pages/CommunityPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { listenToAuthState } from './firebase/firebase.js'

function ProtectedDashboard() {
	const [authState, setAuthState] = useState({ status: 'checking', user: null, error: '' })

	useEffect(() => listenToAuthState(
		(user) => {
			if (user) {
				setAuthState({ status: 'authenticated', user, error: '' })
				return
			}

			setAuthState({ status: 'redirecting', user: null, error: '' })
			window.location.replace('/login')
		},
		() => setAuthState({
			status: 'error',
			user: null,
			error: 'Unable to verify your sign-in status. Please try logging in again.',
		}),
	), [])

	if (authState.status === 'error') {
		return (
			<div role="alert" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#0b6faa', fontWeight: 700 }}>
				<div>
					<p>{authState.error}</p>
					<a href="/login">Go to login</a>
				</div>
			</div>
		)
	}

	if (authState.status !== 'authenticated') {
		return (
			<div role="status" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#0b6faa', fontWeight: 700 }}>
				Checking your sign-in status...
			</div>
		)
	}

	return <DashboardPage key={authState.user.uid} authUser={authState.user} />
}

export default function App() {
	const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

	if (pathname === '/about') {
		return <AboutPage />
	}
	if (pathname === '/courses') {
		return <CoursesPage />
	}
	if (pathname === '/resources') {
		return <ResourcesPage />
	}
	if (pathname === '/community') {
		return <CommunityPage />
	}
	if (pathname === '/login') {
		return <LoginPage />
	}
	if (pathname === '/signup') {
		return <SignupPage />
	}
	if (pathname === '/dashboard') {
		return <ProtectedDashboard />
	}

	return <Home />
}
