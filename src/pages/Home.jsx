import '../styles/App.css'
import Navbar from '../components/Navbar.jsx'
import FAQ from '../components/FAQ.jsx'
import Footer from '../components/Footer.jsx'
import './Home.css'

const ANDROID_APP_URL = ''
const IOS_APP_URL = ''

const appFeatures = [
	{ symbol: '▶', title: 'Interactive video lessons', detail: 'Learn with guided video content.' },
	{ symbol: '▤', title: 'Offline eLibrary', detail: 'Keep study materials close at hand.' },
	{ symbol: '✳', title: 'SSA AI Tutor', detail: 'Get support as you study.' },
	{ symbol: '▦', title: 'eClassroom', detail: 'Connect with your learning space.' },
	{ symbol: '✓', title: 'eExams', detail: 'Prepare with exam activities.' },
	{ symbol: '⌕', title: 'Learning resources', detail: 'Find useful material for your subjects.' },
]

const subjects = [
	{
		id: 'physics',
		name: 'Physics',
		papers: 'Paper 1 & 2',
		description: 'Explore motion, forces, energy, and electricity through clear explanations and practice.',
		icon: 'physics',
	},
	{
		id: 'chemistry',
		name: 'Chemistry',
		papers: 'Paper 1 & 2',
		description: 'Build understanding of matter, reactions, and the ideas behind chemical change.',
		icon: 'chemistry',
	},
	{
		id: 'pure-mathematics',
		name: 'Pure Mathematics',
		papers: 'Paper 1 & 2',
		description: 'Strengthen mathematical fluency and work through problems with confidence.',
		icon: 'mathematics',
	},
	{
		id: 'biology',
		name: 'Biology',
		papers: 'Paper 1 & 2',
		description: 'Understand living systems, life processes, and how to interpret biological information.',
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
		name: 'ICT',
		papers: 'Paper 1 & 2',
		description: 'Explore computers, digital systems, and the practical use of information technology.',
		icon: 'ict',
	},
	{
		id: 'agriculture',
		name: 'Agriculture',
		description: 'Study crops, livestock, food production, and the thoughtful use of land.',
		icon: 'agriculture',
	},
]

const learningSteps = [
	{ number: '01', title: 'Join the Academy', text: 'Get in touch and find out how to begin learning with SSA.' },
	{ number: '02', title: 'Choose Subjects', text: 'Focus on the subjects that matter to your academic goals.' },
	{ number: '03', title: 'Learn Online', text: 'Study from your phone, tablet, or computer, wherever you are.' },
	{ number: '04', title: 'Practise and Improve', text: 'Review what you learn and build confidence through practice.' },
]

function SubjectIcon({ type }) {
	if (type === 'physics') return <><ellipse cx="24" cy="24" rx="17" ry="7" /><ellipse cx="24" cy="24" rx="17" ry="7" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="17" ry="7" transform="rotate(120 24 24)" /><circle cx="24" cy="24" r="2" /></>
	if (type === 'chemistry') return <><path d="M18 8h12M21 8v13L11 37a2 2 0 0 0 2 3h22a2 2 0 0 0 2-3L27 21V8" /><path d="M16 31h16M19 25h10" /></>
	if (type === 'mathematics') return <><path d="m11 36 10-25 9 25M15 27h19M31 15h9M35 11v9" /></>
	if (type === 'biology') return <><path d="M38 10C24 10 14 14 11 22c-2 5 1 10 6 10 8 0 17-9 21-22Z" /><path d="M9 39c6-10 13-16 23-22M18 29l1 7M26 22l7 1" /></>
	if (type === 'submath') return <><path d="M12 15h24M12 24h24M12 33h24" /><circle cx="18" cy="15" r="2" /><circle cx="30" cy="24" r="2" /><circle cx="21" cy="33" r="2" /></>
	if (type === 'ict') return <><rect x="8" y="9" width="32" height="23" rx="2" /><path d="M18 39h12M24 32v7M14 15h20M14 20h8" /></>
	return <><path d="M24 39V20M24 28c-8 0-13-5-13-13 8 0 13 5 13 13ZM24 23c0-8 5-13 13-13 0 8-5 13-13 13ZM15 39h18" /></>
}

function DashboardPreview() {
	return (
		<div className="home-dashboard" aria-label="Preview of an SSA student learning dashboard">
			<div className="home-dashboard__topbar"><span className="home-dashboard__brand"><i>ss</i> scholar space</span><span className="home-dashboard__welcome">Good afternoon, learner <b>⌄</b></span><span className="home-dashboard__avatar">S</span></div>
			<div className="home-dashboard__layout">
				<aside className="home-dashboard__sidebar"><span className="home-dashboard__side-label">YOUR SPACE</span><b className="is-current"><i>⌂</i> Overview</b><b><i>▤</i> My subjects</b><b><i>✓</i> Practice</b><b><i>▧</i> Resources</b><div className="home-dashboard__sidebar-note"><span>KEEP GOING</span><strong>Every topic is progress.</strong><i><b /></i><small>Study streak <b>3 days</b></small></div></aside>
				<div className="home-dashboard__content">
					<div className="home-dashboard__greeting"><div><span>YOUR LEARNING OVERVIEW</span><h3>A good day to make progress.</h3><p>Pick up where you left off, or explore something new.</p></div><a href="#programs">View subjects <b>→</b></a></div>
					<div className="home-dashboard__summary">
						<article className="home-dashboard__current"><div className="home-dashboard__card-label"><span>CONTINUE LEARNING</span><b>•••</b></div><div className="home-dashboard__current-body"><span className="home-dashboard__subject-mark"><svg viewBox="0 0 48 48"><SubjectIcon type="biology" /></svg></span><div><small>BIOLOGY · PAPER 1</small><strong>Cell structure &amp; function</strong><span>Topic 04 <i /> 18 min left</span></div></div><div className="home-dashboard__bar"><i /></div><div className="home-dashboard__current-foot"><span>Lesson progress</span><b>68%</b></div></article>
						<article className="home-dashboard__progress"><div className="home-dashboard__card-label"><span>YOUR PROGRESS</span><b>THIS WEEK</b></div><div className="home-dashboard__progress-number">74<small>%</small></div><p>You’re building a great study rhythm.</p><div className="home-dashboard__chart" aria-label="Weekly progress chart"><i style={{ height: '40%' }} /><i style={{ height: '62%' }} /><i style={{ height: '49%' }} /><i style={{ height: '78%' }} /><i style={{ height: '92%' }} /><i style={{ height: '68%' }} /><i style={{ height: '100%' }} /></div><div className="home-dashboard__chart-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></article>
					</div>
					<div className="home-dashboard__lower"><article className="home-dashboard__practice"><span className="home-dashboard__card-label">READY WHEN YOU ARE</span><div><span className="home-dashboard__practice-icon">?</span><p><strong>Try a practice question</strong><small>Put what you know to work.</small></p><b>→</b></div></article><article className="home-dashboard__recent"><span className="home-dashboard__card-label">RECENT RESOURCES <a href="/resources/">See all</a></span><div><span className="home-dashboard__resource-icon">N</span><p><strong>Biology revision notes</strong><small>Study notes · 6 min read</small></p><b>↗</b></div></article></div>
				</div>
			</div>
		</div>
	)
}

function AppDownloadButton({ platform, url }) {
	const platformLabel = platform === 'Android' ? 'ANDROID APP' : 'iOS APP'
	const buttonContent = <><span className="home-app__store-mark" aria-hidden="true">{platform === 'Android' ? 'A' : 'i'}</span><span><small>{platformLabel}</small><strong>{url ? 'Get the app' : 'Link coming soon'}</strong></span><b aria-hidden="true">{url ? '↗' : '·'}</b></>

	if (!url) {
		return <button className="home-app__download" type="button" disabled aria-label={`${platform} app link coming soon`}>{buttonContent}</button>
	}

	return <a className="home-app__download" href={url} target="_blank" rel="noopener noreferrer">{buttonContent}</a>
}

export default function Home() {
	return (
		<div className="home-page">
			<Navbar />
			<main>
				<section className="home-hero" id="home" aria-labelledby="home-title">
					<div className="home-hero__grid" aria-hidden="true" />
					<div className="home-hero__inner">
						<div className="home-hero__copy">
							<p className="home-eyebrow"><span /> LEARN <i /> PRACTISE <i /> IMPROVE</p>
							<h1 id="home-title">Make learning<br />your <em>superpower.</em></h1>
							<p className="home-hero__description">The right support can change how a subject feels. Learn at your pace, practise with purpose, and see what you’re capable of.</p>
							<div className="home-hero__actions"><a className="home-button home-button--primary" href="#get-started">Start Learning <span aria-hidden="true">↗</span></a><a className="home-button home-button--outline" href="#programs">Explore Subjects <span aria-hidden="true">↓</span></a></div>
							<div className="home-hero__learners"><span className="home-hero__avatars" aria-hidden="true"><i>S</i><i>+</i><i>✓</i></span><span>Learn with structure.<br /><strong>Grow at your own pace.</strong></span></div>
						</div>
						<div className="home-hero__product"><DashboardPreview /><div className="home-hero__subject-float"><span className="home-hero__float-icon"><svg viewBox="0 0 48 48"><SubjectIcon type="physics" /></svg></span><span><small>UP NEXT</small><strong>Physics · Paper 2</strong></span><b>→</b></div><div className="home-hero__score-float"><span className="home-hero__score-ring"><b>82</b></span><span><small>WEEKLY PRACTICE</small><strong>Looking sharp</strong></span></div></div>
					</div>
					<div className="home-hero__bottom"><span>Science Scholar Academy</span><span>01 / A better way to study</span></div>
				</section>

				<section className="home-trust" aria-label="Learning benefits"><div className="home-trust__inner"><div><span className="home-trust__icon">↗</span><strong>Structured learning</strong></div><i /><div><span className="home-trust__icon">✓</span><strong>Practice resources</strong></div><i /><div><span className="home-trust__icon">▦</span><strong>Seven subject areas</strong></div><i /><div><span className="home-trust__icon">◷</span><strong>Learn at your pace</strong></div></div></section>

				<section className="home-intro" id="about" aria-labelledby="home-intro-title"><div className="home-intro__inner"><div className="home-intro__statement"><p className="home-eyebrow">A little about SSA</p><h2 id="home-intro-title">Big subjects.<br /><em>Clear next steps.</em></h2><span className="home-intro__index">01 — OUR APPROACH</span></div><div className="home-intro__story"><p className="home-intro__lead">Science Scholar Academy is a place to make learning feel more manageable and more rewarding.</p><p>Find useful explanations and study resources, work through questions, and build the kind of understanding you can take with you beyond the lesson.</p><a className="home-text-link" href="/about/">Get to know SSA <span aria-hidden="true">↗</span></a><div className="home-intro__features"><article><span>01</span><div><strong>Learn with clarity</strong><p>Take ideas one step at a time.</p></div></article><article id="community"><span>02</span><div><strong>Keep moving forward</strong><p>Practise, reflect, and improve.</p></div></article></div></div></div></section>

				<section className="home-subjects" id="programs" aria-labelledby="home-subjects-title">
					<div className="home-section-inner">
						<header className="home-section-heading"><div><p className="home-eyebrow">A syllabus of possibility</p><h2 id="home-subjects-title">Choose your direction.</h2></div><p>Seven areas to explore. Find the subject that’s on your mind and get started.</p></header>
						<div className="home-subjects__grid">
							{subjects.map(({ id, name, papers, description, icon }, index) => (
								<article className={`home-subject home-subject--${icon}`} id={id} key={id}>
									<div className="home-subject__top"><span className="home-subject__number">0{index + 1} <i> / SUBJECT</i></span><span className="home-subject__icon" aria-hidden="true"><svg viewBox="0 0 48 48"><SubjectIcon type={icon} /></svg></span></div>
									<h3>{name}</h3>
									<div className="home-subject__meta">{papers ? <span>{papers}</span> : <span>Build your skills</span>}<span aria-hidden="true">↗</span></div>
									<p>{description}</p>
								</article>
							))}
						</div>
						<div className="home-subjects__footer"><span>Curiosity is a good place to start.</span><a className="home-text-link" href="/courses/">Explore all programmes <span aria-hidden="true">↗</span></a></div>
					</div>
				</section>

				<section className="home-platform" id="why-choose-us" aria-labelledby="home-platform-title"><div className="home-platform__inner"><header className="home-platform__heading"><p className="home-eyebrow">Your learning, in one place</p><h2 id="home-platform-title">See how far<br /><em>you can go.</em></h2><p>Progress grows when it’s easy to see what you’ve done, what you’re learning, and where you can go next.</p><a className="home-button home-button--dark" href="/resources/">Explore Resources <span aria-hidden="true">↗</span></a></header><DashboardPreview /><div className="home-platform__caption"><span>SSA LEARNING SPACE</span><i /><span>LEARN · TRACK · REPEAT</span></div></div></section>

				<section className="home-app" id="ssa-app" aria-labelledby="home-app-title">
					<div className="home-app__inner">
						<div className="home-app__copy">
							<p className="home-eyebrow"><span /> Learn on the go</p>
							<h2 id="home-app-title">Take SSA<br /><em>with you.</em></h2>
							<p className="home-app__description">Keep your learning experience close. The SSA mobile app brings lessons, resources, and study activities to your phone.</p>
							<div className="home-app__downloads" aria-label="SSA app downloads">
								<p>GET THE SSA APP</p>
								<div><AppDownloadButton platform="Android" url={ANDROID_APP_URL} /><AppDownloadButton platform="iOS" url={IOS_APP_URL} /></div>
							</div>
						</div>
						<div className="home-app__visual" aria-label="Illustration of the SSA mobile app">
							<div className="home-app__note home-app__note--top"><span>✳</span><div><strong>SSA AI Tutor</strong><small>Support as you study</small></div></div>
							<div className="home-app__phone">
								<div className="home-app__phone-frame"><div className="home-app__phone-screen">
									<div className="home-app__status"><span>9:41</span><i /><i /><i /></div>
									<div className="home-app__appbar"><span className="home-app__logo-mark">ssa</span><span>Science Scholar<br /><b>Academy</b></span><i>•••</i></div>
									<div className="home-app__greeting"><small>YOUR LEARNING SPACE</small><strong>Keep your<br />curiosity going.</strong></div>
									<div className="home-app__progress"><div><span>THIS WEEK</span><strong>Learning progress</strong></div><b>68<small>%</small></b><i><span /></i></div>
									<div className="home-app__screen-heading"><strong>Pick up where you left off</strong><span>View all</span></div>
									<div className="home-app__lesson"><span className="home-app__lesson-icon">B</span><span><small>BIOLOGY · PAPER 1</small><strong>Cell structure</strong><i><b /></i></span><b>→</b></div>
									<div className="home-app__screen-heading"><strong>Explore your study tools</strong></div>
									<div className="home-app__tools"><span><i>▶</i>Video lessons</span><span><i>▤</i>eLibrary</span><span><i>✓</i>eExams</span></div>
									<div className="home-app__tabbar"><span><i>⌂</i>Home</span><span><i>▦</i>Class</span><span><i>▤</i>Library</span><span><i>◉</i>Profile</span></div>
								</div></div>
							</div>
							<div className="home-app__note home-app__note--bottom"><span>✓</span><div><strong>Practice as you go</strong><small>eExams &amp; revision</small></div></div>
							<div className="home-app__visual-label"><span>01</span><i /> LEARNING, IN YOUR POCKET</div>
						</div>
						<div className="home-app__features">
							<div className="home-app__features-heading"><p className="home-eyebrow">Made for your study rhythm</p><h3>Learning tools<br />that travel with you.</h3></div>
							<div className="home-app__feature-list">{appFeatures.map(({ symbol, title, detail }) => <article key={title}><span aria-hidden="true">{symbol}</span><div><h4>{title}</h4><p>{detail}</p></div></article>)}</div>
						</div>
					</div>
				</section>

				<section className="home-library" id="resources" aria-labelledby="home-library-title"><div className="home-library__inner"><header className="home-library__heading"><div><p className="home-eyebrow">The SSA resource library</p><h2 id="home-library-title">Useful things to<br /><em>come back to.</em></h2></div><div><p>Good study resources help you turn a difficult topic into a doable next step.</p><a className="home-text-link" href="/resources/">Browse all resources <span aria-hidden="true">↗</span></a></div></header><div className="home-library__shelf"><article className="home-library__card home-library__card--notes"><span className="home-library__card-number">01 / READ</span><div className="home-library__art home-library__art--notes" aria-hidden="true"><i /><i /><i /><b>N</b></div><div className="home-library__card-copy"><div><h3>Study notes</h3><p>Get to the heart of a topic with clear, useful explanations.</p></div><a href="/resources/" aria-label="Explore study notes">↗</a></div></article><article className="home-library__card home-library__card--papers"><span className="home-library__card-number">02 / PREPARE</span><div className="home-library__art home-library__art--papers" aria-hidden="true"><div><span>SSA / EXAM PRACTICE</span><b>PAST<br />PAPERS</b><i>QUESTION 01 — 2025</i></div></div><div className="home-library__card-copy"><div><h3>Past papers</h3><p>Get familiar with exam-style questions and paper formats.</p></div><a href="/resources/" aria-label="Explore past papers">↗</a></div></article><article className="home-library__card home-library__card--revision"><span className="home-library__card-number">03 / PRACTISE</span><div className="home-library__art home-library__art--revision" aria-hidden="true"><div><span>QUICK CHECK</span><strong>Which idea<br />fits best?</strong><i>○ &nbsp; Review the concept</i><i>✓ &nbsp; Apply what you know</i></div></div><div className="home-library__card-copy"><div><h3>Revision materials</h3><p>Revisit concepts and strengthen your understanding through practice.</p></div><a href="/resources/" aria-label="Explore revision materials">↗</a></div></article><article className="home-library__card home-library__card--study"><span className="home-library__card-number">04 / EXPLORE</span><div className="home-library__art home-library__art--study" aria-hidden="true"><div className="home-library__study-lines"><i /><i /><i /><i /></div><span className="home-library__study-tag">YOUR NEXT TOPIC</span><strong>Small steps<br />make strong roots.</strong><span className="home-library__study-arrow">→</span></div><div className="home-library__card-copy"><div><h3>Study resources</h3><p>Find support for the moments you need a little more help.</p></div><a href="/resources/" aria-label="Explore study resources">↗</a></div></article></div></div></section>

				<section className="home-steps" id="how-it-works" aria-labelledby="home-steps-title">
					<div className="home-section-inner">
						<header className="home-section-heading"><div><p className="home-eyebrow">A simple path forward</p><h2 id="home-steps-title">Start here. Keep going.</h2></div><p>A clear learning rhythm makes it easier to begin and easier to keep building.</p></header>
						<div className="home-timeline">{learningSteps.map(({ number, title, text }, index) => <article className="home-timeline__step" key={number}><div className="home-timeline__marker"><span>{number}</span>{index < learningSteps.length - 1 && <i />}</div><div className="home-timeline__content"><span className="home-timeline__label">STEP {number}</span><h3>{title}</h3><p>{text}</p></div></article>)}</div>
					</div>
				</section>

			<FAQ />
				<section className="home-cta" id="get-started" aria-labelledby="home-cta-title"><div className="home-cta__inner"><div className="home-cta__index">SSA <span> / 07 SUBJECTS / ONE NEXT STEP</span></div><p className="home-eyebrow">Your next chapter starts here</p><div className="home-cta__main"><h2 id="home-cta-title">Ready to see<br /><em>what you can do?</em></h2><div><p>Find your subject. Start with one idea. Build from there with Science Scholar Academy.</p><a className="home-button home-button--light" href="/#contact">Start Learning <span aria-hidden="true">↗</span></a></div></div><div className="home-cta__bottom"><span>LEARN WITH PURPOSE</span><span>GROW WITH CONFIDENCE <b>↗</b></span></div></div></section>
				</main>
			<Footer />
		</div>
	)
}
