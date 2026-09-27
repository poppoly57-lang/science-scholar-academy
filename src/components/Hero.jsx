import bannerImage from '../assets/barner.png'
import '../styles/Hero.css'

export default function Hero() {
	return (
		<main className="hero" id="home">
			<div className="hero__inner">
				<div className="hero__content">
					<p className="hero__eyebrow">Science Scholar Academy</p>
					<h1>Discover Science. Unlock Your Potential.</h1>
					<p className="hero__description">
						Explore learning resources, strengthen your understanding, and
						connect with a community of learners pursuing academic excellence.
					</p>
					<div className="hero__actions">
						<a className="hero__button hero__button--primary" href="#resources">
							Start Learning
							<span aria-hidden="true">→</span>
						</a>
						<a className="hero__button hero__button--secondary" href="#programs">
							Explore Programs
						</a>
					</div>
				</div>

				<div className="hero__visual">
					<img
						className="hero__image"
						src={bannerImage}
						alt="Students looking ahead together outside their school"
						fetchPriority="high"
					/>
					<div className="hero__image-caption" aria-hidden="true">
						<span>Curiosity opens new possibilities</span>
						<span className="hero__caption-rule" />
					</div>
				</div>
			</div>
		</main>
	)
}