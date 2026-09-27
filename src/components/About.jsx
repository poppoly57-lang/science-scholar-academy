import academyImage from '../assets/abt.png'
import '../styles/About.css'

const academyFeatures = [
	{
		number: '01',
		title: 'Accessible Learning Resources',
		description:
			'Notes, revision materials, and learning resources to support independent study.',
	},
	{
		number: '02',
		title: 'Academic Growth',
		description:
			'Opportunities to practise, review concepts, and build confidence in science.',
	},
	{
		number: '03',
		title: 'A Connected Community',
		description:
			'A space for learners to exchange ideas and learn from one another.',
	},
]

export default function About() {
	return (
		<section className="about" id="about" aria-labelledby="about-heading">
			<div className="about__inner">
				<div className="about__content">
					<p className="about__eyebrow">About the Academy</p>
					<h2 id="about-heading">Making Science Easier to Understand.</h2>
					<p className="about__intro">
						Science Scholar Academy is an educational platform designed to help
						learners strengthen their understanding of science, access useful
						learning resources, and connect with other students in a supportive
						learning environment.
					</p>

					<ul className="about__features">
						{academyFeatures.map(({ number, title, description }) => (
							<li className="about__feature" id={number === '03' ? 'community' : undefined} key={number}>
								<span className="about__feature-number" aria-hidden="true">
									{number}
								</span>
								<div>
									<h3>{title}</h3>
									<p>{description}</p>
								</div>
							</li>
						))}
					</ul>

					<a className="about__cta" href="#programs">
						Discover Our Academy
						<span aria-hidden="true">→</span>
					</a>
				</div>

				<figure className="about__visual">
					<img
						src={academyImage}
						alt="Students gathered together in an outdoor learning environment"
						loading="lazy"
					/>
					<figcaption>Learning grows when we learn together.</figcaption>
				</figure>
			</div>
		</section>
	)
}