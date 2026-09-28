import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './AboutPage.css'

const learningPath = [
	{
		number: '01 / BUILD THE PICTURE',
		title: 'Make ideas connect',
		text: 'Return to notes and learning materials to place new information in context, rather than treating each fact as something to memorise on its own.',
	},
	{
		number: '02 / TEST YOUR THINKING',
		title: 'Practise with intention',
		text: 'Use questions and revision activities to apply concepts, spot uncertain areas, and decide what would be useful to revisit.',
	},
	{
		number: '03 / LOOK AHEAD',
		title: 'Get ready for assessment',
		text: 'Past-paper practice helps students meet exam-style questions and paper formats as part of their preparation.',
	},
]

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<main className="about-page">
				<section className="about-page__intro" aria-labelledby="about-page-title">
					<div className="about-page__intro-inner">
						<p className="about-page__eyebrow">Science Scholar Academy / About</p>
						<h1 id="about-page-title">A clearer way into the subjects that shape our world.</h1>
						<div className="about-page__intro-lower">
							<p className="about-page__intro-lead">
								Understanding grows when students have room to question, revisit, and
								connect what they are learning.
							</p>
							<p className="about-page__intro-detail">
								Science Scholar Academy brings online learning resources and academic
								support together so students can work through subjects with purpose,
								build confidence in their own understanding, and prepare for the next
								step in their studies.
							</p>
						</div>
						<div className="about-page__intro-mark" aria-hidden="true">
							<span>Understand</span><span>Practise</span><span>Progress</span>
						</div>
					</div>
				</section>

				<section className="about-page__purpose" aria-labelledby="about-purpose-title">
					<div className="about-page__purpose-inner">
						<p className="about-page__section-label">Why we are here</p>
						<div className="about-page__purpose-copy">
							<h2 id="about-purpose-title">Make the work of learning feel navigable.</h2>
							<div className="about-page__purpose-text">
								<p>
									A subject becomes easier to approach when there is a way to move from
									an unfamiliar idea to a question you can attempt for yourself. Our
									purpose is to support that movement with resources students can use
									to study, review, and practise.
								</p>
								<p>
									Learning also benefits from connection. Alongside independent study,
									our community gives students a place to exchange ideas and learn from
									one another in a supportive environment.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="about-page__approach" aria-labelledby="about-approach-title">
					<div className="about-page__approach-inner">
						<header className="about-page__approach-heading">
							<p className="about-page__eyebrow">How learning takes shape</p>
							<h2 id="about-approach-title">Progress is a practice, not a shortcut.</h2>
							<p>
								Students build a stronger grasp of a subject over time. Our resources
								are there to support each part of that process.
							</p>
						</header>
						<div className="about-page__path">
							{learningPath.map(({ number, title, text }) => (
								<article className="about-page__path-step" key={number}>
									<span className="about-page__path-number">{number}</span>
									<div>
										<h3>{title}</h3>
										<p>{text}</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="about-page__closing" aria-labelledby="about-closing-title">
					<div className="about-page__closing-inner">
						<p className="about-page__section-label">For every next question</p>
						<h2 id="about-closing-title">Confidence comes from knowing how to keep going.</h2>
						<p>
							We want students to leave a study session with more than completed notes:
							with a better sense of what they understand, what they can work on next,
							and how to approach a new challenge.
						</p>
						<a className="about-page__button" href="/#programs">
							Explore our programs <span aria-hidden="true">→</span>
						</a>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}