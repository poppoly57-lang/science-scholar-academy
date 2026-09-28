import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './ResourcesPage.css'

const resourceCategories = [
	{
		title: 'Topic summaries',
		description: 'Concise overviews help you recall the central ideas before you move into more detailed study.',
		icon: 'notes',
	},
	{
		title: 'Worked examples',
		description: 'Follow each step in a solution to see how a concept can be applied to a subject problem.',
		icon: 'revision',
	},
	{
		title: 'Practice questions',
		description: 'Try questions after reviewing a topic, then use your answers to spot what needs another look.',
		icon: 'practice',
	},
	{
		title: 'Exam revision',
		description: 'Bring topic review and question practice together as you prepare for examination-style work.',
		icon: 'exams',
	},
	{
		title: 'Time-management guides',
		description: 'Use simple planning strategies to divide study time and pace yourself through exam questions.',
		icon: 'guides',
	},
]

const subjects = [
	{
		name: 'Physics Paper 1 & 2',
		description: 'Review physical principles and practise applying them to calculations and explanations.',
	},
	{
		name: 'Chemistry Paper 1 & 2',
		description: 'Revisit matter, reactions, and the relationships between chemical ideas.',
	},
	{
		name: 'Pure Mathematics Paper 1 & 2',
		description: 'Strengthen methods, mathematical reasoning, and step-by-step problem solving.',
	},
	{
		name: 'Biology Paper 1 & 2',
		description: 'Connect biological structures and processes, then practise explaining how they work.',
	},
	{
		name: 'Submath',
		description: 'Work on core mathematical techniques and apply them accurately to problems.',
	},
	{
		name: 'ICT Paper 1 & 2',
		description: 'Review information technology concepts and practise explaining digital systems.',
	},
	{
		name: 'Agriculture',
		description: 'Revise agricultural principles connected to crops, livestock, and land use.',
	},
]

const revisionPlan = [
	{
		number: '01',
		title: 'Choose subjects for the week',
		text: 'Make a realistic plan that gives attention to different subjects and fits around your other commitments.',
	},
	{
		number: '02',
		title: 'Break a difficult topic down',
		text: 'Start with one idea or skill at a time. Check that part before adding the next.',
	},
	{
		number: '03',
		title: 'Attempt questions and learn from errors',
		text: 'Practise without looking at the answer first. Review mistakes to understand which step needs work.',
	},
	{
		number: '04',
		title: 'Return to topics over time',
		text: 'Revisit earlier learning in later sessions so you can keep ideas active and check your recall.',
	},
	{
		number: '05',
		title: 'Prepare before the final stretch',
		text: 'Begin revision early enough to review, practise, and ask questions instead of trying to cover everything at once.',
	},
]

function ResourceIcon({ type }) {
	if (type === 'notes') {
		return <><path d="M15 8h13l6 6v25H15z" /><path d="M28 8v7h6M20 23h9M20 29h9M20 35h6" /></>
	}
	if (type === 'revision') {
		return <><path d="M36 19a13 13 0 0 0-23-4l-3 4" /><path d="M10 12v7h7M12 29a13 13 0 0 0 23 4l3-4" /><path d="M38 36v-7h-7" /></>
	}
	if (type === 'practice') {
		return <><path d="m12 25 8 8 17-18" /><path d="M38 25v12H10V11h20" /></>
	}
	if (type === 'exams') {
		return <><path d="M15 9h18v30H15z" /><path d="M20 17h8M20 23h8M20 29h4" /><path d="m25 34 3 3 6-7" /></>
	}
	return <><path d="M11 13h26M11 24h26M11 35h26" /><circle cx="17" cy="13" r="3" /><circle cx="31" cy="24" r="3" /><circle cx="21" cy="35" r="3" /></>
}

export default function ResourcesPage() {
	return (
		<>
			<Navbar />
			<main className="resources-page">
				<section className="resources-page__hero" aria-labelledby="resources-page-title">
					<div className="resources-page__hero-inner">
						<div className="resources-page__hero-copy">
							<p className="resources-page__eyebrow">Science Scholar Academy / Student toolkit</p>
							<h1 id="resources-page-title">Your Study Toolkit</h1>
							<p>Use learning materials to revisit key ideas, practise applying what you know, and plan your study as you prepare for examinations.</p>
							<a className="resources-page__button resources-page__button--hero" href="#resource-categories">
								Browse study materials <span aria-hidden="true">↓</span>
							</a>
						</div>
						<div className="resources-page__hero-aside" aria-hidden="true">
							<span className="resources-page__hero-aside-label">A useful cycle</span>
							<div className="resources-page__rhythm">
								<span>Understand</span><i /><span>Apply</span><i /><span>Review</span>
							</div>
							<p>Move from a new idea to using it with confidence.</p>
						</div>
					</div>
				</section>

				<section className="resources-page__catalog" id="resource-categories" aria-labelledby="resource-categories-title">
					<div className="resources-page__container">
						<header className="resources-page__section-heading">
							<div>
								<p className="resources-page__eyebrow">Study materials and practice</p>
								<h2 id="resource-categories-title">Pick the kind of support your study needs.</h2>
							</div>
							<p>Use each resource type for a different part of learning. Ask the academy which materials are currently available; no downloads are listed here.</p>
						</header>
						<div className="resources-page__grid">
							{resourceCategories.map(({ title, description, icon }, index) => (
								<article className="resources-page__card" key={title}>
									<div className="resources-page__card-top">
										<span className="resources-page__card-number">{String(index + 1).padStart(2, '0')}</span>
										<span className="resources-page__icon" aria-hidden="true">
											<svg viewBox="0 0 48 48"><ResourceIcon type={icon} /></svg>
										</span>
									</div>
									<h3>{title}</h3>
									<p>{description}</p>
									<span className="resources-page__category-note">A way to study</span>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="resources-page__subjects" aria-labelledby="resources-subjects-title">
					<div className="resources-page__subjects-inner">
						<div className="resources-page__subjects-copy">
							<p className="resources-page__eyebrow">Find resources by subject</p>
							<h2 id="resources-subjects-title">Start with what you are studying.</h2>
							<p>Choose a subject focus, then decide whether you need to review an idea, see a method, or practise a question.</p>
						</div>
						<ul className="resources-page__subject-list">
							{subjects.map(({ name, description }, index) => (
								<li key={name}>
									<span>{String(index + 1).padStart(2, '0')}</span>
									<div><h3>{name}</h3><p>{description}</p></div>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="resources-page__support" aria-labelledby="resources-support-title">
					<div className="resources-page__support-inner">
						<header className="resources-page__support-heading">
							<p className="resources-page__eyebrow">A revision strategy</p>
							<h2 id="resources-support-title">A plan you can return to, step by step.</h2>
							<p>Keep revision active and manageable with a simple sequence you can adapt to your subjects.</p>
						</header>
						<div className="resources-page__tips">
							{revisionPlan.map(({ number, title, text }) => (
								<article className="resources-page__tip" key={number}>
									<span>{number}</span>
									<div><h3>{title}</h3><p>{text}</p></div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="resources-page__cta" aria-labelledby="resources-cta-title">
					<div className="resources-page__cta-inner">
						<div>
							<p className="resources-page__eyebrow">Help and academic support</p>
							<h2 id="resources-cta-title">Have a question about learning support?</h2>
							<p>Students and parents can contact Science Scholar Academy to ask about the resources and academic support available.</p>
						</div>
						<a className="resources-page__button" href="/#contact">Contact the Academy <span aria-hidden="true">→</span></a>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}