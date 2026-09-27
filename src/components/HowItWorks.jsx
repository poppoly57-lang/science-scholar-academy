import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Join the Academy",
    description:
      "Learn how to register and become part of Science Scholar Academy.",
  },
  {
    number: "02",
    title: "Choose Your Subjects",
    description:
      "Explore the subjects you want to study and focus on what matters to you.",
  },
  {
    number: "03",
    title: "Learn Online",
    description:
      "Access lessons and study materials from your phone, tablet, or computer.",
  },
  {
    number: "04",
    title: "Practise and Improve",
    description:
      "Use revision questions and practice activities to strengthen your understanding.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-heading">
          <span className="how-it-works-label">HOW IT WORKS</span>

          <h2>
            Your journey to
            <span> better learning.</span>
          </h2>

          <p>
            Science Scholar Academy makes online learning simple. Follow four
            easy steps and start building your knowledge with confidence.
          </p>
        </div>

        <div className="how-it-works-grid">
          {steps.map((step) => (
            <div className="how-it-works-card" key={step.number}>
              <div className="step-number">{step.number}</div>

              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              <div className="step-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;