import type { Metadata } from "next";
import Link from "next/link";
import "./process-page.css";

export const metadata: Metadata = {
  title: "Our process — Blyu",
  description:
    "See how Blyu moves from the first conversation to a product ready for what comes next.",
};

const stages = [
  {
    id: "discover",
    number: "01",
    name: "Discover",
    cue: "Start with the right questions.",
    description:
      "We listen, look closely at the challenge, and get clear on the people and goals behind it. Good work starts with a shared understanding of what matters.",
    focus: ["The challenge", "The audience", "The opportunity"],
  },
  {
    id: "shape",
    number: "02",
    name: "Shape",
    cue: "Make the direction visible.",
    description:
      "We turn what we learn into a focused plan and an experience you can react to. Ideas become priorities, flows, and a clear route into the build.",
    focus: ["A clear direction", "Key journeys", "A plan to make it real"],
  },
  {
    id: "build",
    number: "03",
    name: "Build",
    cue: "Bring the idea to life.",
    description:
      "Design and engineering move together. We make, review, and refine the product in working pieces, keeping the details and the bigger picture connected.",
    focus: ["Working product", "Thoughtful details", "Regular review"],
  },
  {
    id: "evolve",
    number: "04",
    name: "Evolve",
    cue: "Keep moving after launch.",
    description:
      "A launch is a beginning, not an ending. We look at what is working, learn from real use, and identify the next improvements worth making.",
    focus: ["Launch readiness", "What we learn", "What comes next"],
  },
];

export default function ProcessPage() {
  return (
    <main className="process-page">
      <header className="process-header shell">
        <Link className="brand brand-logo" href="/" aria-label="Blyu home" />
        <nav aria-label="Process page navigation">
          <Link href="/#work">Our Work</Link>
          <Link href="/services">Services</Link>
          <Link href="/process" aria-current="page">Process</Link>
        </nav>
        <Link className="button button-small" href="/start-project">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section className="process-hero shell" aria-labelledby="process-title">
        <p className="process-kicker"><span aria-hidden="true" /> HOW WE WORK / 01—04</p>
        <h1 id="process-title">From brief to <em>business advantage.</em></h1>
        <div className="process-hero-bottom">
          <p>
            One integrated team for strategy, design, engineering, and
            automation. A clear path forward, with room to learn along the way.
          </p>
          <a href="#the-process">Explore the process <span aria-hidden="true">↓</span></a>
        </div>
        <div className="process-hero-orbit" aria-hidden="true" />
      </section>

      <nav className="process-map shell" aria-label="Jump to a process stage">
        {stages.map((stage) => (
          <a href={`#${stage.id}`} key={stage.id}>
            <span>{stage.number}</span>
            <strong>{stage.name}</strong>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>

      <section className="process-intro shell" id="the-process">
        <p className="process-kicker"><span aria-hidden="true" /> THE WAY FORWARD</p>
        <h2>Make the hard parts <em>clear.</em></h2>
        <p>
          Each stage creates momentum for the next. We stay close to the work,
          make decisions together, and keep the experience in focus.
        </p>
      </section>

      <section className="process-stages shell" aria-label="The four stages of our process">
        {stages.map((stage) => (
          <article className="process-stage" id={stage.id} key={stage.id}>
            <div className="process-stage-mark">
              <span>{stage.number} / 04</span>
              <b aria-hidden="true">{stage.number}</b>
            </div>
            <div className="process-stage-content">
              <div>
                <p className="process-stage-cue">{stage.cue}</p>
                <h3>{stage.name}</h3>
              </div>
              <div className="process-stage-detail">
                <p>{stage.description}</p>
                <ul aria-label={`${stage.name} focus`}>
                  {stage.focus.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="process-close shell">
        <p>YOUR NEXT MOVE</p>
        <h2>Let’s make what’s next <em>happen.</em></h2>
        <div>
          <span>Tell us where you are. We’ll find the way forward together.</span>
          <Link className="button" href="/start-project">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <footer className="process-footer shell">
        <span>© Blyu</span>
        <Link href="/">Back to home ↑</Link>
      </footer>
    </main>
  );
}
