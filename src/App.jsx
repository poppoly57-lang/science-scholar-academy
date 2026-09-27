import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'

export default function App() {
	const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

	if (pathname === '/about') {
		return <AboutPage />
	}
	if (pathname === '/courses') {
		return <CoursesPage />
	}

	return <Home />
}
