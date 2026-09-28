import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import studentsImage from '../assets/progi.png'
import './CoursesPage.css'

const courses = [
	{
		id: 'physics',
		name: 'Physics Paper 1 & 2',
		description: 'Study core ideas about forces, energy, motion, and electricity, and practise applying them to questions.',
		icon: 'physics',
	},
	{
		id: 'chemistry',
		name: 'Chemistry Paper 1 & 2',
		description: 'Explore matter, elements, compounds, and chemical change through concepts and relevant questions.',
		icon: 'chemistry',
	},
	{
		id: 'pure-mathematics',
		name: 'Pure Mathematics Paper 1 & 2',
		description: 'Build fluency with mathematical ideas and use logical steps to work through problems.',
		icon: 'mathematics',
	},
	{
		id: 'biology',
		name: 'Biology Paper 1 & 2',
		description: 'Learn about living systems and life processes, and practise interpreting biological information.',
		icon: 'biology',
	},
	{
		id: 'submath',
		name: 'Submath',
		description: 'Practise mathematical methods and apply them carefully to structured problems.',
		icon: 'submath',
	},
	{
		id: 'ict',
		name: 'ICT Paper 1 & 2',
		description: 'Develop understanding of computers, digital systems, and the use of information technology.',
		icon: 'ict',
	},
	{
		id: 'agriculture',
		name: 'Agriculture',
		description: 'Explore agricultural concepts related to food production, crops, livestock, and land use.',
		icon: 'agriculture',
	},
]

const learningSteps = [
	{
		number: '01',
		title: 'Understand the ideas',
		text: 'Work through subject concepts and connect new information to what you already know.',
	},
	{
		number: '02',
		title: 'Think it through',
		text: 'Use reasoning and analysis to examine a question and choose a way to approach it.',
	},
	{
		number: '03',
		title: 'Put knowledge to work',
		text: 'Practise relevant questions and apply subject knowledge in different contexts.',
	},
	{
		number: '04',
		title: 'Prepare with purpose',
		text: 'Review learning and become familiar with examination-style questions as part of preparation.',
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
							<p className="courses-page__eyebrow">Science Scholar Academy / Programmes</p>
							<h1 id="courses-page-title">Our Academic Programmes</h1>
							<p className="courses-page__intro-description">
								Study science, mathematics, and technology with support to build your
								understanding step by step. Work through key ideas, apply them to questions,
								and prepare for examinations with focused practice.
							</p>
							<a className="courses-page__button courses-page__button--hero" href="#subjects">
								Explore Our Subjects <span aria-hidden="true">↓</span>
							</a>
						</div>
						<figure className="courses-page__image">
							<img src={studentsImage} alt="Students discussing a lesson and studying together in a classroom" />
						</figure>
					</div>
				</section>

				<section className="courses-page__catalog" id="subjects" aria-labelledby="courses-subjects-title">
					<div className="courses-page__catalog-inner">
						<header className="courses-page__catalog-heading">
							<div>
								<p className="courses-page__eyebrow">Seven areas of study</p>
								<h2 id="courses-subjects-title">Find your subject</h2>
							</div>
							<p>Explore the subjects available and the skills each one invites you to develop.</p>
						</header>
						<div className="courses-page__grid">
							{courses.map(({ id, name, description, icon }, index) => (
								<article className="courses-page__card" key={id}>
									<div className="courses-page__card-top">
										<span className="courses-page__number">{String(index + 1).padStart(2, '0')}</span>
										<span className="courses-page__icon" aria-hidden="true">
											<svg viewBox="0 0 48 48"><CourseIcon type={icon} /></svg>
										</span>
									</div>
									<h2>{name}</h2>
									<p>{description}</p>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="courses-page__approach" aria-labelledby="courses-approach-title">
					<div className="courses-page__approach-inner">
						<div className="courses-page__approach-heading">
							<p className="courses-page__eyebrow">How we support learning</p>
							<h2 id="courses-approach-title">Strong foundations, built one idea at a time.</h2>
							<p>Understanding develops through learning, thinking, practice, and review.</p>
						</div>
						<div className="courses-page__approach-list">
							{learningSteps.map(({ number, title, text }) => (
								<article className="courses-page__approach-step" key={number}>
									<span>{number}</span>
									<div>
										<h3>{title}</h3>
										<p>{text}</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="courses-page__cta" aria-labelledby="courses-cta-title">
					<div className="courses-page__cta-inner">
						<div>
							<p className="courses-page__eyebrow">Your next step</p>
							<h2 id="courses-cta-title">Ready to Strengthen Your Academic Foundation?</h2>
							<p>Start a conversation with Science Scholar Academy about the available programmes.</p>
						</div>
						<a className="courses-page__button" href="/#contact">
							Contact the Academy <span aria-hidden="true">→</span>
						</a>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}