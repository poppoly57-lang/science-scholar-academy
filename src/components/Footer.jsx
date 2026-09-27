import academyLogo from '../assets/saa logo.png'
import './Footer.css'

const quickLinks = [
	{ label: 'Home', href: '/#home' },
	{ label: 'About', href: '/about/' },
	{ label: 'Programs', href: '/courses/' },
	{ label: 'Learning Resources', href: '/#resources' },
	{ label: 'How It Works', href: '/#how-it-works' },
	{ label: 'FAQs', href: '/#faq' },
]

const subjects = [
	'Physics Paper 1 & 2',
	'Chemistry Paper 1 & 2',
	'Pure Mathematics Paper 1 & 2',
	'Biology Paper 1 & 2',
	'Submath',
	'ICT Paper 1 & 2',
	'Agriculture',
]

export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="site-footer__main">
				<div className="site-footer__brand">
					<a className="site-footer__logo-link" href="/#home" aria-label="Science Scholar Academy home">
						<img src={academyLogo} alt="" />
					</a>
					<h2>Science Scholar Academy</h2>
					<p>
						Online learning resources and academic support to help learners
						strengthen their understanding and reach their goals.
					</p>
				</div>

				<nav className="site-footer__links" aria-label="Footer navigation">
					<h3>Quick Links</h3>
					<ul>
						{quickLinks.map(({ label, href }) => (
							<li key={href}><a href={href}>{label}</a></li>
						))}
					</ul>
				</nav>

				<div className="site-footer__subjects">
					<h3>Subjects</h3>
					<ul>
						{subjects.map((subject) => <li key={subject}>{subject}</li>)}
					</ul>
				</div>

				<div className="site-footer__contact">
					<h3>Contact</h3>
					<p>For enquiries about joining, subjects, and learning resources, get in touch with the academy.</p>
					<a className="site-footer__contact-link" href="/#contact">Contact Us <span aria-hidden="true">→</span></a>
				</div>
			</div>

			<div className="site-footer__bottom">
				<p>© {new Date().getFullYear()} Science Scholar Academy. All rights reserved.</p>
				<div className="site-footer__bottom-actions">
					<a href="/#home">Back to Top <span aria-hidden="true">↑</span></a>
					<p className="site-footer__attribution">
						Designed &amp; Developed by{' '}
						<a href="https://polifolio.poppoly57.workers.dev/" target="_blank" rel="noopener noreferrer">
							Polycarp Prince Olupot
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}