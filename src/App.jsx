import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'
import CommunityPage from './pages/CommunityPage.jsx'

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

	return <Home />
}
