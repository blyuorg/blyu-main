import { ContactForm } from "@/components/contact-form";
import { WorkRail } from "@/components/work-rail";

const services = [
  ["Strategy", "Clarity before execution"],
  ["Design", "Interfaces people remember"],
  ["Engineering", "Systems made to scale"],
  ["Automation", "Work that keeps moving"],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand brand-logo" href="#top" aria-label="Blyu home" />
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
        </div>
        <a className="button button-small" href="#contact">
          Start a project <span>↗</span>
        </a>
      </nav>
      <section className="hero shell" id="top">
        <div className="eyebrow">
          <span />
          Blyu / Digital agency
        </div>
        <h1>
          We build what others <em>can’t</em> imagine.
        </h1>
        <div className="hero-bottom">
          <p>
            From intelligent automation to pixel-perfect interfaces, Blyu builds
            the digital products ambitious businesses need next.
          </p>
          <a className="button" href="#contact">
            Start a project <span>↗</span>
          </a>
        </div>
        <div className="scroll-prompt">
          Scroll to explore <b>↓</b>
        </div>
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
      </section>
      <section
        className="service-strip"
        id="services"
        aria-label="Blyu services"
      >
        <div className="shell service-grid">
          {services.map(([title, description], index) => (
            <div className="service" key={title}>
              <span>0{index + 1}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="video-section shell" id="process">
        <div className="section-intro">
          <div className="eyebrow">
            <span />
            How we work
          </div>
          <h2>
            From brief to <em>business advantage.</em>
          </h2>
          <p>
            One integrated team for strategy, design, engineering, and
            automation.
          </p>
        </div>
        <div
          className="video-reserve"
          role="img"
          aria-label="Reserved space for Blyu showreel video"
        >
          <span className="video-no">001 / SHOWREEL</span>
          <button aria-label="Play showreel placeholder">▶</button>
          <div>
            <b>Video space reserved</b>
            <p>Upload your second video here</p>
          </div>
          <span className="video-lines" />
        </div>
      </section>
      <section className="work-section" id="work">
        <div className="shell work-header">
          <div>
            <div className="eyebrow">
              <span />
              Selected work
            </div>
            <h2>
              Build with people who <em>refuse average.</em>
            </h2>
          </div>
          <p>
            Drag to explore <b>→</b>
          </p>
        </div>
        <WorkRail />
      </section>
      <section className="manifesto shell">
        <p className="eyebrow">
          <span />
          What makes us Blyu
        </p>
        <h2>Complex doesn’t have to feel complicated.</h2>
        <p className="manifesto-copy">
          We make the hard parts clear, useful, and beautiful—so your next move
          has a little more momentum behind it.
        </p>
      </section>
      <section className="contact shell" id="contact">
        <div>
          <div className="eyebrow">
            <span />
            Let’s build
          </div>
          <h2>
            Ready when <em>you are.</em>
          </h2>
          <p>
            Tell us what you’re making. We’ll bring the thinking, the craft, and
            the way forward.
          </p>
        </div>
        <ContactForm />
      </section>
      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <a
              className="brand brand-logo"
              href="#top"
              aria-label="Blyu home"
            />
            <p>Making complex things beautiful.</p>
          </div>
          <div>
            <span>Explore</span>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
          </div>
          <div>
            <span>Connect</span>
            <a href="mailto:hello@blyu.net">hello@blyu.net</a>
            <a href="#contact">Start a project</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Blyu</span>
          <span>Built for the next signal.</span>
        </div>
      </footer>
    </main>
  );
}
