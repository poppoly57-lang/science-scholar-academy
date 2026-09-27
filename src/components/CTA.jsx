
import React from "react";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="ssa-cta" id="get-started">
      <div className="ssa-cta-container">
        <div className="ssa-cta-content">
          <span className="ssa-cta-label">
            YOUR NEXT STEP STARTS HERE
          </span>

          <h2>
            Ready to take your
            <span> learning further?</span>
          </h2>

          <p>
            Explore our subjects, discover learning resources,
            and take the next step in your academic journey
            with Science Scholar Academy.
          </p>

          <div className="ssa-cta-buttons">
            <a className="ssa-cta-primary" href="#programs">
              Explore Subjects
              <span aria-hidden="true">→</span>
            </a>

            <a className="ssa-cta-secondary" href="#contact">
              Contact Us
            </a>
          </div>

          <div className="ssa-cta-note">
            <span className="ssa-cta-dot"></span>
            <span>Your learning journey starts with one step.</span>
          </div>
        </div>

        <div className="ssa-cta-visual" aria-hidden="true">
          <div className="ssa-cta-circle ssa-cta-circle-one"></div>
          <div className="ssa-cta-circle ssa-cta-circle-two"></div>

          <div className="ssa-cta-book">
            <div className="ssa-cta-book-top">
              <span>SSA</span>
              <span className="ssa-cta-book-mark">✦</span>
            </div>

            <div className="ssa-cta-book-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="ssa-cta-book-bottom">
              SCIENCE SCHOLAR ACADEMY
            </div>
          </div>

          <div className="ssa-cta-floating ssa-cta-floating-top">
            <span>∑</span>
            <small>Keep learning</small>
          </div>

          <div className="ssa-cta-floating ssa-cta-floating-bottom">
            <span>✓</span>
            <small>Keep improving</small>
          </div>
        </div>
      </div>
    </section>
  );
}