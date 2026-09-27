import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import academyImage from '../assets/abt.png'
import './AboutPage.css'

const approachSteps = [
	{
		number: '01',
		title: 'Learn',
		text: 'Build understanding with clear learning resources and focused study across the subjects offered by the academy.',
	},
	{
		number: '02',
		title: 'Practise',
		text: 'Strengthen new knowledge by reviewing concepts and working through revision questions and practice activities.',
	},
	{
		number: '03',
		title: 'Prepare',
		text: 'Use structured revision and past-paper practice to become familiar with exam-style questions and paper formats.',
	},
]

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<main className="about-page">
				<section className="about-page__intro" aria-labelledby="about-page-title">
					<div className="about-page__intro-inner">
						<div className="about-page__intro-copy">
							<p className="about-page__eyebrow">About the Academy</p>
							<h1 id="about-page-title">Learning with purpose. Growing with confidence.</h1>
							<p>
								Science Scholar Academy is an online learning platform providing
								academic resources and support for students. We help learners explore
								subjects, deepen their understanding, and build steady study habits.
							</p>
							<a className="about-page__button" href="/#programs">
								Explore our programs <span aria-hidden="true">→</span>
							</a>
						</div>
						<figure className="about-page__image">
							<img src={academyImage} alt="Students learning together outdoors" />
						</figure>
					</div>
				</section>

				<section className="about-page__purpose" aria-label="Our mission and vision">
					<div className="about-page__purpose-inner">
						<article className="about-page__purpose-item">
							<span className="about-page__section-label">01 / Our Mission</span>
							<h2>Make meaningful learning more accessible.</h2>
							<p>
								We provide useful online learning resources and academic support
								that help students understand their subjects, practise with purpose,
								and take an active role in their education.
							</p>
						</article>
						<article className="about-page__purpose-item">
							<span className="about-page__section-label">02 / Our Vision</span>
							<h2>A confident, curious community of learners.</h2>
							<p>
								We aim to encourage a supportive learning environment where students
								can keep asking questions, developing their knowledge, and working
								toward their academic goals.
							</p>
						</article>
					</div>
				</section>

				<section className="about-page__approach" aria-labelledby="about-approach-title">
					<div className="about-page__approach-inner">
						<header className="about-page__approach-heading">
							<p className="about-page__eyebrow">Our Approach</p>
							<h2 id="about-approach-title">A steady path from understanding to exam preparation.</h2>
							<p>
								Learning takes time. We bring resources, practice, and revision
								together to support students throughout their studies.
							</p>
						</header>
						<div className="about-page__steps">
							{approachSteps.map(({ number, title, text }) => (
								<article className="about-page__step" key={number}>
									<span className="about-page__step-number">{number}</span>
									<h3>{title}</h3>
									<p>{text}</p>
								</article>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}