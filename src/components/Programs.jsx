import '../styles/Programs.css'

const subjects = [
	{
		id: 'physics',
		name: 'Physics',
		description:
			'Explore motion, energy, forces, electricity, and the physical world.',
		icon: 'physics',
		papers: ['Paper 1', 'Paper 2'],
	},
	{
		id: 'chemistry',
		name: 'Chemistry',
		description:
			'Study matter, chemical reactions, elements, and compounds.',
		icon: 'chemistry',
		papers: ['Paper 1', 'Paper 2'],
	},
	{
		id: 'pure-mathematics',
		name: 'Pure Mathematics',
		description:
			'Develop mathematical reasoning through core concepts and problem-solving.',
		icon: 'mathematics',
		papers: ['Paper 1', 'Paper 2'],
	},
	{
		id: 'biology',
		name: 'Biology',
		description:
			'Explore living organisms, ecology, human biology, and life processes.',
		icon: 'biology',
		papers: ['Paper 1', 'Paper 2'],
	},
	{
		id: 'submath',
		name: 'Submath',
		description:
			'Practise mathematical methods and apply them to structured problems.',
		icon: 'submath',
	},
	{
		id: 'ict',
		name: 'ICT',
		description:
			'Learn about computers, digital systems, and information technology.',
		icon: 'ict',
		papers: ['Paper 1', 'Paper 2'],
	},
]

function SubjectIcon({ subject }) {
	if (subject === 'biology') {
		return (
			<svg viewBox="0 0 48 48" aria-hidden="true">
				<path d="M37.5 9.5c-12.8.2-22.4 3.7-25.8 11.1-2.1 4.6.4 9.3 4.8 10.4 8.5 2.1 18.5-8.3 21-21.5Z" />
				<path d="M9.5 39c5.2-9.7 11.4-15.2 20.8-21" />
				<path d="m19 28 1.2 7.2M25.5 21.5l7.2 1.2" />
			</svg>
		)
	}

	if (subject === 'chemistry') {
		return (
			<svg viewBox="0 0 48 48" aria-hidden="true">
				<path d="M18 8h12M21 8v13L11.5 37a2 2 0 0 0 1.8 3h21.4a2 2 0 0 0 1.8-3L27 21V8" />
				<path d="M16 31h16M19 25h10" />
				<circle cx="22" cy="34" r="1" />
			</svg>
		)
	}

	if (subject === 'physics') {
		return (
			<svg viewBox="0 0 48 48" aria-hidden="true">
				<ellipse cx="24" cy="24" rx="18" ry="7.5" />
				<ellipse cx="24" cy="24" rx="18" ry="7.5" transform="rotate(60 24 24)" />
				<ellipse cx="24" cy="24" rx="18" ry="7.5" transform="rotate(120 24 24)" />
				<circle cx="24" cy="24" r="2.5" className="programs__icon-dot" />
			</svg>
		)
	}

	if (subject === 'ict') {
		return (
			<svg viewBox="0 0 48 48" aria-hidden="true">
				<rect x="8" y="9" width="32" height="23" rx="2" />
				<path d="M18 39h12M24 32v7M14 15h20M14 20h8" />
			</svg>
		)
	}

	if (subject === 'submath') {
		return (
			<svg viewBox="0 0 48 48" aria-hidden="true">
				<path d="M12 12h24M12 24h24M12 36h24M18 8v32M30 8v32" />
				<circle cx="18" cy="24" r="3" className="programs__icon-dot" />
				<circle cx="30" cy="12" r="3" className="programs__icon-dot" />
			</svg>
		)
	}

	return (
		<svg viewBox="0 0 48 48" aria-hidden="true">
			<path d="M10 13h27M10 24h18M10 35h27" />
			<path d="m30 21 4 6 5-9" />
			<circle cx="14" cy="13" r="2" className="programs__icon-dot" />
			<circle cx="14" cy="24" r="2" className="programs__icon-dot" />
			<circle cx="14" cy="35" r="2" className="programs__icon-dot" />
		</svg>
	)
}

export default function Programs() {
	return (
		<section
			className="programs"
			id="programs"
			aria-labelledby="programs-heading"
		>
			<div className="programs__inner">
				<header className="programs__header">
					<div>
						<p className="programs__eyebrow">Our Academic Programs</p>
						<h2 id="programs-heading">Explore What You Can Learn</h2>
					</div>
					<p className="programs__intro">
						Discover subjects and learning opportunities designed to help you
						strengthen your understanding and develop your scientific knowledge.
					</p>
				</header>

				<div className="programs__grid">
					{subjects.map(({ id, name, description, icon, papers }, index) => (
						<article className="program-card" id={id} key={id}>
							<div className="program-card__topline">
								<span className="program-card__index">
									{String(index + 1).padStart(2, '0')}
								</span>
								<span className="program-card__icon">
									<SubjectIcon subject={icon} />
								</span>
							</div>
							<h3>{name}</h3>
							{papers && (
								<ul className="program-card__papers" aria-label={`${name} papers`}>
									{papers.map((paper) => (
										<li key={paper}>{paper}</li>
									))}
								</ul>
							)}
							<p>{description}</p>
							<a href={`#${id}`} aria-label={`Explore ${name}`}>
								Explore Subject
								<span aria-hidden="true">→</span>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}