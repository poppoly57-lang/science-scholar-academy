import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './CommunityPage.css'

const participationWays = [
	{
		number: '01',
		title: 'Collaborative learning',
		text: 'Share ideas and compare approaches. Hearing how someone else understands a topic can offer a useful new perspective.',
	},
	{
		number: '02',
		title: 'Peer support',
		text: 'Encourage classmates as they work through challenging concepts, and make space to ask questions without judgement.',
	},
	{
		number: '03',
		title: 'Knowledge sharing',
		text: 'Exchange revision strategies and explain subject ideas in your own words to help make learning clearer for everyone.',
	},
	{
		number: '04',
		title: 'Academic motivation',
		text: 'Support steady study habits, recognise the effort behind progress, and remind one another of the goals you are working toward.',
	},
]

const communityPrinciples = [
	'Respect different opinions and experiences.',
	'Be kind, patient, and constructive.',
	'Share information that is accurate and helpful.',
	'Encourage others; do not put them down.',
	'Keep conversations focused on learning.',
]

export default function CommunityPage() {
	return (
		<>
			<Navbar />
			<main className="community-page">
				<section className="community-page__hero" aria-labelledby="community-page-title">
					<div className="community-page__hero-inner">
						<div className="community-page__hero-copy">
							<p className="community-page__eyebrow">Science Scholar Academy / Community</p>
							<h1 id="community-page-title">Learning Is Better Together</h1>
							<p>
								Discover a learning community where students can share ideas,
								encourage one another, and grow in their academic journey.
							</p>
							<a className="community-page__button community-page__button--hero" href="#community-opportunities">
								Explore ways to connect <span aria-hidden="true">↓</span>
							</a>
						</div>
						<div className="community-page__hero-art" aria-hidden="true">
							<div className="community-page__orbit community-page__orbit--outer" />
							<div className="community-page__orbit community-page__orbit--inner" />
							<span className="community-page__node community-page__node--one">Ask</span>
							<span className="community-page__node community-page__node--two">Share</span>
							<span className="community-page__node community-page__node--three">Grow</span>
							<div className="community-page__hero-core">
								<span>Learn</span>
								<span>together</span>
							</div>
						</div>
					</div>
				</section>

				<section className="community-page__opportunities" id="community-opportunities" aria-labelledby="community-opportunities-title">
					<div className="community-page__opportunities-inner">
						<header className="community-page__section-heading">
							<p className="community-page__eyebrow">Ways to participate</p>
							<h2 id="community-opportunities-title">Make learning a shared effort.</h2>
							<p>There are many simple ways students can make study more encouraging and collaborative.</p>
						</header>
						<div className="community-page__ways">
							{participationWays.map(({ number, title, text }) => (
								<article className="community-page__way" key={number}>
									<span className="community-page__way-number">{number}</span>
									<div>
										<h3>{title}</h3>
										<p>{text}</p>
									</div>
									<span className="community-page__way-mark" aria-hidden="true">↗</span>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="community-page__learning" aria-labelledby="community-learning-title">
					<div className="community-page__learning-inner">
						<div className="community-page__learning-intro">
							<p className="community-page__eyebrow">Learning together</p>
							<h2 id="community-learning-title">A conversation can change how an idea lands.</h2>
							<p>
								Explaining a concept, hearing another approach, or asking one more
								question can help turn uncertainty into a plan for what to study next.
							</p>
						</div>
						<div className="community-page__learning-sequence">
							<div className="community-page__sequence-item">
								<span>01</span><p><strong>Ask</strong> about the part that feels unclear.</p>
							</div>
							<div className="community-page__sequence-item">
								<span>02</span><p><strong>Explain</strong> your thinking and listen to another point of view.</p>
							</div>
							<div className="community-page__sequence-item">
								<span>03</span><p><strong>Encourage</strong> one another to keep working toward your goals.</p>
							</div>
						</div>
					</div>
				</section>

				<section className="community-page__principles" aria-labelledby="community-principles-title">
					<div className="community-page__principles-inner">
						<div className="community-page__principles-heading">
							<p className="community-page__eyebrow">A thoughtful learning culture</p>
							<h2 id="community-principles-title">Good discussion makes room for everyone.</h2>
						</div>
						<ol className="community-page__principles-list">
							{communityPrinciples.map((principle, index) => (
								<li key={principle}>
									<span>{String(index + 1).padStart(2, '0')}</span>
									{principle}
								</li>
							))}
						</ol>
					</div>
				</section>

				<section className="community-page__closing" aria-labelledby="community-closing-title">
					<div className="community-page__closing-inner">
						<div>
							<p className="community-page__eyebrow">Stay curious. Keep encouraging.</p>
							<h2 id="community-closing-title">Find out more about learning with Science Scholar Academy.</h2>
							<p>Students and parents are welcome to get in touch with questions about the academy and its learning support.</p>
						</div>
						<a className="community-page__button" href="/#contact">Contact the Academy <span aria-hidden="true">→</span></a>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}