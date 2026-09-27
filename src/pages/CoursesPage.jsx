import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import studentsImage from '../assets/barner.png'
import './CoursesPage.css'

const courses = [
	{
		id: 'physics',
		name: 'Physics',
		papers: ['Paper 1', 'Paper 2'],
		description: 'Explore motion, energy, forces, electricity, and the physical world.',
		icon: 'physics',
	},
	{
		id: 'chemistry',
		name: 'Chemistry',
		papers: ['Paper 1', 'Paper 2'],
		description: 'Study matter, chemical reactions, elements, and compounds.',
		icon: 'chemistry',
	},
	{
		id: 'pure-mathematics',
		name: 'Pure Mathematics',
		papers: ['Paper 1', 'Paper 2'],
		description: 'Develop mathematical reasoning through core concepts and problem-solving.',
		icon: 'mathematics',
	},
	{
		id: 'biology',
		name: 'Biology',
		papers: ['Paper 1', 'Paper 2'],
		description: 'Explore living organisms, ecology, human biology, and life processes.',
		icon: 'biology',
	},
	{
		id: 'submath',
		name: 'Submath',
		papers: [],
		description: 'Practise mathematical methods and apply them to structured problems.',
		icon: 'submath',
	},
	{
		id: 'ict',
		name: 'ICT',
		papers: ['Paper 1', 'Paper 2'],
		description: 'Learn about computers, digital systems, and information technology.',
		icon: 'ict',
	},
	{
		id: 'agriculture',
		name: 'Agriculture',
		papers: [],
		description: 'Explore agricultural learning and the knowledge behind food production and land use.',
		icon: 'agriculture',
	},
]

function CourseIcon({ type }) {
	if (type === 'physics') {
		return <><ellipse cx="24" cy="24" rx="18" ry="7" /><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" /><circle cx="24" cy="24" r="2.5" /></>
	}
	if (type === 'chemistry') {
		return <><path d="M18 8h12M21 8v13L11.5 37a2 2 0 0 0 1.8 3h21.4a2 2 0 0 0 1.8-3L27 21V8" /><path d="M16 31h16M19 25h10" /></>
	}
	if (type === 'mathematics') {
		return <><path d="M10 38 20 10l9 28M14 28h20M31 15h9M35.5 10.5v9" /><circle cx="35.5" cy="15" r="5" /></>
	}
	if (type === 'biology') {
		return <><path d="M38 10C24 10 14 14 11 22c-2 5 1 10 6 10 8 0 17-9 21-22Z" /><path d="M9 39c6-10 13-16 23-22M18 29l1 7M26 22l7 1" /></>
	}
	if (type === 'submath') {
		return <><path d="M11 13h26M11 24h26M11 35h26M17 9v30M31 9v30" /><circle cx="17" cy="24" r="2.5" /><circle cx="31" cy="13" r="2.5" /></>
	}
	if (type === 'ict') {
		return <><rect x="8" y="9" width="32" height="23" rx="2" /><path d="M18 39h12M24 32v7M14 15h20M14 20h8" /></>
	}
	return <><path d="M24 39V20M24 28c-8 0-13-5-13-13 8 0 13 5 13 13ZM24 23c0-8 5-13 13-13 0 8-5 13-13 13ZM15 39h18" /></>
}

export default function CoursesPage() {
	return (
		<>
			<Navbar />
			<main className="courses-page">
				<section className="courses-page__intro" aria-labelledby="courses-page-title">
					<div className="courses-page__intro-inner">
						<div className="courses-page__intro-copy">
							<p className="courses-page__eyebrow">Science Scholar Academy</p>
							<h1 id="courses-page-title">Explore Our Courses</h1>
							<p>
								Choose a subject to focus your studies. Our courses bring together
								learning resources, revision, and practice to support your academic journey.
							</p>
						</div>
						<figure className="courses-page__image">
							<img src={studentsImage} alt="Students learning and exploring together" />
						</figure>
					</div>
				</section>

				<section className="courses-page__catalog" aria-label="Available courses">
					<div className="courses-page__catalog-inner">
						<div className="courses-page__grid">
							{courses.map(({ id, name, papers, description, icon }, index) => (
								<article className="courses-page__card" key={id}>
									<div className="courses-page__card-top">
										<span className="courses-page__number">{String(index + 1).padStart(2, '0')}</span>
										<span className="courses-page__icon" aria-hidden="true">
											<svg viewBox="0 0 48 48"><CourseIcon type={icon} /></svg>
										</span>
									</div>
									<h2>{name}</h2>
									{papers.length > 0 && (
										<ul className="courses-page__papers" aria-label={`${name} papers`}>
											{papers.map((paper) => <li key={paper}>{paper}</li>)}
										</ul>
									)}
									<p>{description}</p>
								</article>
							))}
						</div>
						<div className="courses-page__cta">
							<div>
								<p className="courses-page__eyebrow">Ready to get started?</p>
								<h2>Take the next step in your learning.</h2>
							</div>
							<a className="courses-page__button" href="/#contact">
								Contact the Academy <span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}