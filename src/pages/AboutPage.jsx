import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './AboutPage.css'

const offers = [
	{
		number: '01',
		icon: 'structure',
		title: 'Structured learning',
		text: 'Move through a subject with a clear sense of what to explore, practise, and revisit.',
	},
	{
		number: '02',
		icon: 'practice',
		title: 'Practice & revision',
		text: 'Apply what you have learned, notice what feels uncertain, and use that insight to guide your next study session.',
	},
	{
		number: '03',
		icon: 'library',
		title: 'Useful learning resources',
		text: 'Return to notes, revision materials, and past papers as you build understanding and prepare for assessment.',
	},
	{
		number: '04',
		icon: 'progress',
		title: 'Progress you can build on',
		text: 'Use each question and review to understand your next step and keep moving forward at your own pace.',
	},
]

const journey = [
	{ number: '01', title: 'Discover', text: 'Choose what you want to study.' },
	{ number: '02', title: 'Learn', text: 'Work through lessons and learning materials.' },
	{ number: '03', title: 'Practise', text: 'Test your understanding through practice.' },
	{ number: '04', title: 'Improve', text: 'Identify what to revisit and keep improving.' },
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

function OfferIcon({ type }) {
	if (type === 'structure') return <><path d="M7 9h25M7 17h18M7 25h25M7 33h16" /><circle cx="36" cy="9" r="3" /><circle cx="30" cy="17" r="3" /><circle cx="36" cy="25" r="3" /><circle cx="26" cy="33" r="3" /></>
	if (type === 'practice') return <><path d="M12 10h24v27H12z" /><path d="m18 21 3 3 6-7M18 31h12" /><path d="M18 10V7h12v3" /></>
	if (type === 'library') return <><path d="M9 11h26v25H9z" /><path d="M14 16h16M14 21h11M14 27h16M14 32h11" /><path d="M13 7h22" /></>
	return <><path d="M9 35V22h7v13M21 35V15h7v20M33 35V8h7v27" /><path d="M8 39h33" /></>
}

function LearningGlyph({ type }) {
	if (type === 'discover') return <><circle cx="24" cy="24" r="14" /><path d="m29 19-4 9-9 4 4-9 9-4Z" /></>
	if (type === 'learn') return <><path d="M8 13c7-2 12 0 16 4v20c-4-4-9-6-16-4V13ZM40 13c-7-2-12 0-16 4v20c4-4 9-6 16-4V13Z" /><path d="M13 19h6M13 24h6M29 19h6M29 24h6" /></>
	if (type === 'practice') return <><path d="M12 9h24v30H12z" /><path d="m18 22 4 4 8-9M18 33h12" /></>
	return <><path d="M8 32a17 17 0 1 1 5 5" /><path d="M8 23v9h9M24 14v11l7 4" /></>
}

export default function AboutPage() {
	return (
		<div className="about-page-shell">
			<Navbar />
			<main className="about-page">
				<section className="about-page__hero" aria-labelledby="about-page-title">
					<div className="about-page__hero-inner">
						<div className="about-page__hero-copy">
							<p className="about-page__eyebrow"><span /> About Science Scholar Academy</p>
							<h1 id="about-page-title">Learning should open <em>doors.</em></h1>
							<p className="about-page__hero-lead">SSA helps students find a clearer path through the subjects they are working to understand.</p>
							<a className="about-page__hero-link" href="#about-purpose">Our purpose <span aria-hidden="true">↓</span></a>
						</div>
						<div className="about-page__cover" aria-label="Illustration of study materials and a learning path">
							<div className="about-page__cover-index"><span>FIELD NOTES / 01</span><span>SSA</span></div>
							<div className="about-page__cover-art" aria-hidden="true">
								<div className="about-page__orbit about-page__orbit--one" />
								<div className="about-page__orbit about-page__orbit--two" />
								<div className="about-page__cover-disc"><span>Learn</span><b>with</b><span>purpose</span></div>
								<div className="about-page__cover-book about-page__cover-book--back"><span>SCIENCE<br />SCHOLAR</span><i>NOTES / VOL. 01</i></div>
								<div className="about-page__cover-book about-page__cover-book--front"><span>Make sense<br />of what you<br /><em>discover.</em></span><i>AN OPEN LEARNING JOURNAL</i></div>
								<div className="about-page__cover-spark">✳</div>
							</div>
							<div className="about-page__cover-foot"><span>CURIOUS MINDS, SUPPORTED</span><span>UG / SSA <b>↗</b></span></div>
						</div>
					</div>
					<div className="about-page__hero-bottom"><span>A platform for learning that keeps moving.</span><span>01 — THE SSA STORY</span></div>
				</section>

				<section className="about-page__purpose" id="about-purpose" aria-labelledby="about-purpose-title">
					<div className="about-page__purpose-inner">
						<div className="about-page__purpose-label"><p className="about-page__section-label">Why SSA exists</p><span>02 / PURPOSE</span></div>
						<div className="about-page__purpose-copy">
							<h2 id="about-purpose-title">Make learning more <em>accessible,</em> structured, and practical.</h2>
							<div className="about-page__purpose-detail"><p>A subject can feel like a lot to take in. We believe students deserve useful support that helps turn a big topic into a series of understandable steps.</p><p>Science Scholar Academy brings together learning materials, practice, and academic support so students can work through ideas with purpose, revisit what matters, and prepare for what comes next.</p></div>
						</div>
					</div>
				</section>

				<section className="about-page__offers" aria-labelledby="about-offers-title">
					<div className="about-page__offers-inner">
						<header className="about-page__offers-heading"><div><p className="about-page__eyebrow">A considered way to study</p><h2 id="about-offers-title">Support for the<br /><em>whole process.</em></h2></div><p>Learning is more than one lesson. SSA brings helpful parts of the study process together, so students have a place to begin, return, and keep going.</p></header>
						<div className="about-page__offer-list">
							{offers.map(({ number, icon, title, text }) => <article className="about-page__offer" key={number}><span className="about-page__offer-number">{number}</span><span className="about-page__offer-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><OfferIcon type={icon} /></svg></span><div className="about-page__offer-copy"><h3>{title}</h3><p>{text}</p></div><span className="about-page__offer-arrow" aria-hidden="true">↗</span></article>)}
						</div>
					</div>
				</section>

				<section className="about-page__approach" aria-labelledby="about-approach-title">
					<div className="about-page__approach-inner">
						<header className="about-page__approach-heading"><div><p className="about-page__eyebrow">The SSA learning experience</p><h2 id="about-approach-title">A path from <em>curiosity</em> to confidence.</h2></div><p>There is no single moment when understanding arrives. It grows through small, useful steps.</p></header>
						<div className="about-page__journey">{journey.map(({ number, title, text }, index) => <article className="about-page__journey-step" key={number}><div className="about-page__journey-marker"><span>{number}</span>{index < journey.length - 1 && <i />}</div><div className="about-page__journey-copy"><span className="about-page__journey-kicker">{title.toUpperCase()}</span><h3>{title}</h3><p>{text}</p><span className="about-page__journey-glyph" aria-hidden="true"><svg viewBox="0 0 48 48"><LearningGlyph type={['discover', 'learn', 'practice', 'improve'][index]} /></svg></span></div></article>)}</div>
					</div>
				</section>

				<section className="about-page__subjects" aria-labelledby="about-subjects-title">
					<div className="about-page__subjects-inner"><div className="about-page__subjects-copy"><p className="about-page__section-label">Room to explore</p><h2 id="about-subjects-title">Grounded in the subjects you study.</h2><p>SSA supports learning across science, mathematics, technology, and agriculture.</p><a href="/courses/">See all programmes <span aria-hidden="true">↗</span></a></div><ul>{subjects.map((subject, index) => <li key={subject}><span>0{index + 1}</span>{subject}<b aria-hidden="true">↗</b></li>)}</ul></div>
				</section>

				<section className="about-page__why" aria-labelledby="about-why-title">
					<div className="about-page__why-inner"><div className="about-page__why-heading"><p className="about-page__section-label">Why learn with SSA</p><h2 id="about-why-title">Make the next step <em>clearer.</em></h2><p>Good support does not promise shortcuts. It helps make the work of learning easier to approach and gives students practical ways to keep improving.</p></div><div className="about-page__why-list"><article><span>01</span><div><h3>Access that fits your day</h3><p>Use learning materials on a phone, tablet, or computer, wherever you have internet access.</p></div></article><article><span>02</span><div><h3>A structure you can return to</h3><p>Move between learning, revision, and practice with a study rhythm that makes sense.</p></div></article><article><span>03</span><div><h3>Progress built on understanding</h3><p>Review what you know, notice what needs attention, and choose a purposeful next step.</p></div></article></div></div>
				</section>

				<section className="about-page__closing" aria-labelledby="about-closing-title">
					<div className="about-page__closing-inner">
						<div className="about-page__closing-top"><p className="about-page__section-label">Every subject starts with a question</p><span>SSA / KEEP LEARNING</span></div><div className="about-page__closing-main"><h2 id="about-closing-title">Your next step can start <em>right here.</em></h2><div><p>Explore the platform, find a subject to focus on, and begin learning with Science Scholar Academy.</p><div className="about-page__closing-actions"><a className="about-page__button" href="/courses/">Explore subjects <span aria-hidden="true">↗</span></a><a className="about-page__text-button" href="/resources/">Browse resources <span aria-hidden="true">↗</span></a></div></div></div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}