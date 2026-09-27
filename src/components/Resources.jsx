
import "./Resources.css";

const subjects = [
  "Physics Paper 1 & 2",
  "Chemistry Paper 1 & 2",
  "Pure Mathematics Paper 1 & 2",
  "Biology Paper 1 & 2",
  "Submath",
  "ICT Paper 1 & 2",
  "Agriculture",
];

const resources = [
  {
    number: "01",
    icon: "▤",
    title: "Study Notes",
    description:
      "Build a strong understanding of key concepts with organised notes designed to support your revision.",
    access: "PUBLIC PREVIEW",
    accessType: "public",
    action: "Request a sample",
  },
  {
    number: "02",
    icon: "✎",
    title: "Revision Questions",
    description:
      "Reinforce what you learn with questions that help you practise topics and identify areas to improve.",
    access: "LEARNER ACCESS",
    accessType: "members",
    action: "Ask about access",
  },
  {
    number: "03",
    icon: "▧",
    title: "Past Papers",
    description:
      "Prepare for examinations by familiarising yourself with exam-style questions and paper formats.",
    access: "LEARNER ACCESS",
    accessType: "members",
    action: "Ask about access",
  },
  {
    number: "04",
    icon: "✓",
    title: "Practice Quizzes",
    description:
      "Check your understanding and identify topics that may need more attention through regular practice.",
    access: "LEARNER ACCESS",
    accessType: "members",
    action: "Ask about access",
  },
];

function Resources() {
  return (
    <section className="ssa-resources" id="resources">
      <div className="ssa-resources-container">
        <div className="ssa-resources-heading">
          <span className="ssa-resources-eyebrow">
            LEARNING RESOURCES
          </span>

          <h2>
            Resources to Help You <span>Excel.</span>
          </h2>

          <p>
            Learning goes beyond the classroom. Explore study materials,
            revision questions and practice resources designed to support
            your academic journey.
          </p>
        </div>

        <div className="ssa-resources-grid" id="resource-categories">
          {resources.map((resource) => (
            <article
              className="ssa-resource-card"
              key={resource.number}
            >
              <div className="ssa-resource-card-top">
                <span className="ssa-resource-icon" aria-hidden="true">
                  {resource.icon}
                </span>

                <span className="ssa-resource-number">
                  {resource.number}
                </span>
              </div>

              <span
                className={`ssa-resource-access ${resource.accessType}`}
              >
                <span className="ssa-access-dot" />
                {resource.access}
              </span>

              <h3>{resource.title}</h3>

              <p>{resource.description}</p>

              <a
                className="ssa-resource-link"
                href="#contact"
              >
                {resource.action}
                <span aria-hidden="true"> ↗</span>
              </a>
            </article>
          ))}
        </div>

        <div className="ssa-resources-subjects">
          <div className="ssa-subjects-intro">
            <span className="ssa-resources-eyebrow">
              FIND YOUR SUBJECT
            </span>
            <h3>Learn with a clear focus.</h3>
            <p>
              Explore learning opportunities across the subjects
              offered at Science Scholar Academy.
            </p>
          </div>

          <div className="ssa-subject-tags">
            {subjects.map((subject) => (
              <span className="ssa-subject-tag" key={subject}>
                <span aria-hidden="true">＋</span>
                {subject}
              </span>
            ))}
          </div>
        </div>

        <div className="ssa-resources-cta">
          <div>
            <span className="ssa-cta-label">YOUR NEXT STEP</span>
            <h3>Make your next study session count.</h3>
            <p>
              Get in touch to learn more about available materials
              and how to join the academy.
            </p>
          </div>

          <a className="ssa-cta-button" href="#contact">
            Join the Academy <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resources;