
import React, { useState } from "react";
import "./FAQ.css";

const questions = [
  {
    question: "How do I join Science Scholar Academy?",
    answer:
      "You can get started by contacting Science Scholar Academy to learn about registration and the available learning options. Follow the academy's registration guidance to begin your learning journey.",
  },
  {
    question: "Which subjects are available?",
    answer:
      "The academy covers Physics Paper 1 & 2, Chemistry Paper 1 & 2, Pure Mathematics Paper 1 & 2, Biology Paper 1 & 2, Submath, ICT Paper 1 & 2, and Agriculture.",
  },
  {
    question: "Can I learn using my phone?",
    answer:
      "Yes, you can access the website and its available learning materials using a smartphone, tablet, or computer with an internet connection.",
  },
  {
    question: "Are revision questions available?",
    answer:
      "The academy's learning resources can help you review topics and practise what you have studied. Check the available resources for the revision materials provided.",
  },
  {
    question: "Can I study more than one subject?",
    answer:
      "You can explore the subjects offered by the academy and contact the team for guidance on choosing the subjects that match your academic needs.",
  },
  {
    question: "How can I get more information?",
    answer:
      "Contact Science Scholar Academy for information about registration, available subjects, learning resources, and other enquiries.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-label">GOT QUESTIONS?</span>

          <h2>
            Frequently asked
            <span> questions.</span>
          </h2>

          <p>
            Find answers to common questions about Science Scholar
            Academy, our subjects, and online learning.
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  className={`faq-item ${isOpen ? "active" : ""}`}
                  key={item.question}
                >
                  <button
                    className="faq-question"
                    type="button"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="faq-question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="faq-question-text">
                      {item.question}
                    </span>

                    <span className="faq-toggle" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="faq-contact-card" id="contact">
            <div className="faq-contact-icon" aria-hidden="true">
              ?
            </div>

            <span className="faq-contact-label">NEED MORE HELP?</span>

            <h3>Still have questions?</h3>

            <p>
              Contact our team for more information about the academy
              and the learning opportunities available.
            </p>

            <a className="faq-contact-button" href="#contact">
              Get in touch <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}