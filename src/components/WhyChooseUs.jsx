
import React from "react";
import "./WhyChooseUs.css";

const features = [
  {
    number: "01",
    title: "Student-Focused Learning",
    description:
      "Study at your own pace with learning materials designed to support your understanding and academic progress.",
    icon: "🎯",
  },
  {
    number: "02",
    title: "A Wide Range of Subjects",
    description:
      "Explore Physics, Chemistry, Pure Mathematics, Biology, Submath, ICT, and Agriculture in one learning platform.",
    icon: "📚",
  },
  {
    number: "03",
    title: "Learn from Anywhere",
    description:
      "Access your learning materials using a phone, tablet, or computer, wherever you have internet access.",
    icon: "💻",
  },
  {
    number: "04",
    title: "Practice and Revision",
    description:
      "Build confidence by reviewing your lessons, working through revision questions, and practising what you learn.",
    icon: "✍️",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us" id="why-choose-us">
      <div className="why-container">
        <div className="why-heading">
          <span className="why-label">WHY SCIENCE SCHOLAR ACADEMY</span>

          <h2>
            Learning designed
            <span> around you.</span>
          </h2>

          <p>
            Every learner deserves the opportunity to understand,
            practise, and grow. Our online learning resources help
            you take the next step in your academic journey.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feature) => (
            <article className="why-card" key={feature.number}>
              <div className="why-card-top">
                <span className="why-icon" aria-hidden="true">
                  {feature.icon}
                </span>

                <span className="why-number">{feature.number}</span>
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <div className="why-card-accent"></div>
            </article>
          ))}
        </div>

        <div className="why-bottom">
          <span className="why-bottom-dot"></span>
          <p>
            Your goals. Your learning journey. Your opportunity to grow.
          </p>
        </div>
      </div>
    </section>
  );
}