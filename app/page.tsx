"use client";

import { useMemo, useState } from "react";

const tracks = [
  {
    id: "manual",
    label: "Manual Testing",
    title: "Sharper test design",
    time: "4 weeks",
    points: [
      "Requirement slicing and risk maps",
      "Boundary, equivalence, decision table and state transition design",
      "Exploratory charters, session notes and defect evidence",
    ],
  },
  {
    id: "automation",
    label: "Automation",
    title: "Reliable browser/API checks",
    time: "5 weeks",
    points: [
      "Locator strategy, waits and readable page objects",
      "API contract checks and test data control",
      "CI smoke suites, flaky test analysis and reporting",
    ],
  },
  {
    id: "career",
    label: "Engineer Growth",
    title: "Think like an SDET",
    time: "2 weeks",
    points: [
      "Test strategy reviews with developers and product managers",
      "Metrics that explain release risk",
      "Interview-ready stories from real testing work",
    ],
  },
];

const modules = [
  { name: "Risk-first planning", manual: 85, automation: 35 },
  { name: "Test case design", manual: 95, automation: 45 },
  { name: "Bug reporting", manual: 80, automation: 30 },
  { name: "API testing", manual: 50, automation: 85 },
  { name: "UI automation", manual: 35, automation: 95 },
  { name: "CI and reporting", manual: 45, automation: 80 },
];

const quiz = [
  {
    question:
      "A checkout page accepts quantity from 1 to 10. Which set gives the strongest boundary coverage?",
    options: ["0, 1, 10, 11", "1, 5, 10", "2, 9, 10"],
    answer: 0,
    reason: "It covers just-below, minimum, maximum and just-above values.",
  },
  {
    question:
      "Your Playwright test passes locally but fails randomly in CI after clicking Pay. What should you inspect first?",
    options: [
      "Waits, network state and selector stability",
      "Only increase timeout to 90 seconds",
      "Delete the test from CI",
    ],
    answer: 0,
    reason:
      "Flakiness usually points to synchronization, environment or unstable locator problems.",
  },
  {
    question:
      "A bug report says, 'Payment failed.' What is the biggest missing piece?",
    options: [
      "Steps, actual result, expected result and evidence",
      "The tester's name",
      "A longer title",
    ],
    answer: 0,
    reason:
      "Actionable reports make the defect reproducible and explain the business impact.",
  },
];

const scenarios = [
  {
    id: "checkout",
    title: "Checkout Flow",
    context:
      "Users can add coupons, choose delivery speed and pay by card or wallet.",
    risks: ["Money loss", "Coupon abuse", "Failed order confirmation"],
  },
  {
    id: "profile",
    title: "Profile Update",
    context:
      "A user can edit name, phone, avatar, password and notification settings.",
    risks: ["Privacy leak", "Bad validation", "Broken backward compatibility"],
  },
  {
    id: "search",
    title: "Product Search",
    context:
      "Users search by keyword, filters, sort order, location and availability.",
    risks: ["Wrong result ranking", "Slow response", "Filter mismatch"],
  },
];

const caseTypes = [
  "Positive path",
  "Negative path",
  "Boundary",
  "Data validation",
  "Regression",
  "Accessibility",
];

const kataSnippets = {
  ui: `test("user can apply a valid coupon", async ({ page }) => {
  await page.goto("/checkout");
  await page.getByLabel("Coupon code").fill("SAVE20");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Discount applied")).toBeVisible();
});`,
  api: `pm.test("order response is valid", () => {
  pm.response.to.have.status(201);
  const body = pm.response.json();
  pm.expect(body.orderId).to.be.a("string");
  pm.expect(body.total).to.be.greaterThan(0);
});`,
};

export default function Home() {
  const [activeTrack, setActiveTrack] = useState(tracks[0].id);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Positive path",
    "Boundary",
  ]);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [kata, setKata] = useState<"ui" | "api">("ui");

  const active = tracks.find((track) => track.id === activeTrack) ?? tracks[0];
  const currentQuiz = quiz[quizIndex];

  const labScore = useMemo(() => {
    const riskScore = selectedScenario.risks.length * 8;
    const typeScore = selectedTypes.length * 12;
    const hasBoundary = selectedTypes.includes("Boundary") ? 14 : 0;
    const hasNegative = selectedTypes.includes("Negative path") ? 12 : 0;
    return Math.min(100, riskScore + typeScore + hasBoundary + hasNegative);
  }, [selectedScenario, selectedTypes]);

  function toggleType(type: string) {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9f6] text-[#17211b]">
      <section className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Interactive QA Growth Project</p>
            <h1>Testing Dojo for 2-3 Year Software Testing Engineers</h1>
            <p className="hero-text">
              Practice manual testing depth and automation confidence through
              scenario labs, quizzes, test-case design and clean automation
              examples built for working QA engineers.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a href="#lab" className="primary-action">
                Start lab
              </a>
              <a href="#automation" className="secondary-action">
                Open kata
              </a>
            </div>
          </div>

          <div className="command-center" aria-label="Learning progress">
            <div className="panel-header">
              <span>Skill Balance</span>
              <strong>11-week path</strong>
            </div>
            <div className="meter-row">
              <span>Manual strategy</span>
              <div className="meter">
                <i style={{ width: "82%" }} />
              </div>
            </div>
            <div className="meter-row">
              <span>Automation craft</span>
              <div className="meter">
                <i style={{ width: "74%" }} />
              </div>
            </div>
            <div className="signal-grid">
              <div>
                <b>36</b>
                <span>Practice tasks</span>
              </div>
              <div>
                <b>18</b>
                <span>Interview prompts</span>
              </div>
              <div>
                <b>9</b>
                <span>Release scenarios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="workspace">
        <div className="section-heading">
          <p className="eyebrow">Choose focus</p>
          <h2>Learn both sides of testing without losing the engineering thread</h2>
        </div>
        <div className="track-tabs" role="tablist" aria-label="Learning tracks">
          {tracks.map((track) => (
            <button
              key={track.id}
              className={track.id === activeTrack ? "active" : ""}
              onClick={() => setActiveTrack(track.id)}
              type="button"
            >
              {track.label}
            </button>
          ))}
        </div>
        <article className="track-detail">
          <div>
            <span>{active.time}</span>
            <h3>{active.title}</h3>
          </div>
          <ul>
            {active.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="matrix-section" aria-labelledby="matrix-title">
        <div className="section-heading">
          <p className="eyebrow">Curriculum map</p>
          <h2 id="matrix-title">Where manual skill and automation skill meet</h2>
        </div>
        <div className="module-list">
          {modules.map((module) => (
            <div className="module-row" key={module.name}>
              <strong>{module.name}</strong>
              <div className="stacked-bars">
                <span>
                  <i style={{ width: `${module.manual}%` }} />
                </span>
                <span>
                  <i style={{ width: `${module.automation}%` }} />
                </span>
              </div>
              <em>Manual {module.manual}% · Automation {module.automation}%</em>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-grid" id="lab">
        <div className="lab-panel scenario-panel">
          <div className="panel-header">
            <span>Test Case Lab</span>
            <strong>{labScore}/100</strong>
          </div>
          <div className="scenario-buttons" aria-label="Scenario selector">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={scenario.id === selectedScenario.id ? "active" : ""}
                onClick={() => setSelectedScenario(scenario)}
                type="button"
              >
                {scenario.title}
              </button>
            ))}
          </div>
          <h3>{selectedScenario.title}</h3>
          <p>{selectedScenario.context}</p>
          <div className="risk-list">
            {selectedScenario.risks.map((risk) => (
              <span key={risk}>{risk}</span>
            ))}
          </div>
          <div className="check-grid">
            {caseTypes.map((type) => (
              <label key={type} className="check-card">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          <div className="coach-note">
            {labScore >= 80
              ? "Strong coverage. Add traceability to requirement IDs and prioritize the highest business risk first."
              : "Coverage is forming. Add negative and boundary cases before calling this release-ready."}
          </div>
        </div>

        <div className="lab-panel quiz-panel">
          <div className="panel-header">
            <span>Quick Quiz</span>
            <strong>
              {quizIndex + 1}/{quiz.length}
            </strong>
          </div>
          <h3>{currentQuiz.question}</h3>
          <div className="quiz-options">
            {currentQuiz.options.map((option, index) => (
              <button
                key={option}
                className={
                  quizChoice === null
                    ? ""
                    : index === currentQuiz.answer
                      ? "correct"
                      : quizChoice === index
                        ? "wrong"
                        : ""
                }
                onClick={() => setQuizChoice(index)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          {quizChoice !== null && (
            <p className="answer-note">{currentQuiz.reason}</p>
          )}
          <button
            className="next-button"
            type="button"
            onClick={() => {
              setQuizIndex((quizIndex + 1) % quiz.length);
              setQuizChoice(null);
            }}
          >
            Next question
          </button>
        </div>
      </section>

      <section className="automation-section" id="automation">
        <div className="section-heading">
          <p className="eyebrow">Automation kata</p>
          <h2>Read clean test code, then improve it like an engineer</h2>
        </div>
        <div className="automation-grid">
          <div className="kata-switch" role="tablist" aria-label="Automation kata">
            <button
              className={kata === "ui" ? "active" : ""}
              onClick={() => setKata("ui")}
              type="button"
            >
              UI test
            </button>
            <button
              className={kata === "api" ? "active" : ""}
              onClick={() => setKata("api")}
              type="button"
            >
              API test
            </button>
          </div>
          <pre aria-label={`${kata.toUpperCase()} automation example`}>
            <code>{kataSnippets[kata]}</code>
          </pre>
          <div className="review-card">
            <span>Review checklist</span>
            <ul>
              <li>Does the test verify one business outcome?</li>
              <li>Are waits tied to user-visible or API state?</li>
              <li>Can failures explain what broke?</li>
              <li>Is test data isolated from other runs?</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
