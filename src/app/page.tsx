import { ContactForm } from "@/components/contact-form";
import { PageMotion } from "@/components/page-motion";
import { WorkRail } from "@/components/work-rail";

const services = [
  ["Strategy", "Clarity before execution"],
  ["Design", "Interfaces people remember"],
  ["Engineering", "Systems made to scale"],
  ["Automation", "Work that keeps moving"],
];

export default function Home() {
  return (
    <PageMotion>
      <main>
        <nav className="nav shell" aria-label="Main navigation" data-fade>
          <a className="brand brand-logo" href="#top" aria-label="Blyu home" />
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
          </div>
          <div className="nav-actions" aria-label="Quick links">
            <a className="nav-ocean" href="#process">
              Ocean
            </a>
            <a className="button button-small" href="#contact">
              Start a project <span>↗</span>
            </a>
          </div>
        </nav>
        <section className="hero shell" id="top">
          <svg
            className="doodle doodle-hero-left"
            viewBox="0 0 220 180"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 58c24-46 58-38 44-8-15 33 35 13 18 46-13 25-43 8-26-7 20-18 52 5 45 31-6 22-29 23-34 7" />
            <path d="M20 139c21-12 45-11 64 2" />
          </svg>
          <svg
            className="doodle doodle-hero-right"
            viewBox="0 0 220 180"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M15 98c21-47 38-47 42-5s19 53 30 7 26-49 31-4 18 49 32 5 27-40 44-9" />
            <path d="M30 142c29 10 56 8 82-4" />
          </svg>
          <h1 data-fade>
            We build what others <em>can’t</em> imagine.
          </h1>
          <div className="hero-bottom" data-fade>
            <p>
              From intelligent automation to pixel-perfect interfaces, Blyu
              builds the digital products ambitious businesses need next.
            </p>
            <a className="button" href="#contact">
              Start a project <span>↗</span>
            </a>
          </div>
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
        </section>
        <section
          className="service-strip"
          id="services"
          aria-label="Blyu services"
          data-fade
        >
          <div className="shell service-grid">
            {services.map(([title, description], index) => (
              <div className="service" key={title}>
                <div className="service-copy">
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
                <span className="service-number">0{index + 1}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="video-section shell" id="process" data-fade>
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
        <section className="work-section" id="work" data-fade>
          <svg
            className="doodle doodle-work"
            viewBox="0 0 240 220"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M21 106c30-59 45 72 77 8s48 53 76-8 36 1 48 21" />
            <path d="M44 36c35 9 58 31 69 67-31-6-55-28-69-67Z" />
          </svg>
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
        <section className="manifesto shell" data-fade>
          <svg
            className="doodle doodle-manifesto"
            viewBox="0 0 240 220"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M19 111c0-51 40-91 91-91s91 40 91 91-40 91-91 91c-29 0-54-13-71-33" />
            <path d="M41 106c23-33 41 38 65 0s40 37 65-1" />
          </svg>
          <p className="eyebrow">
            <span />
            What makes us Blyu
          </p>
          <h2>Complex doesn’t have to feel complicated.</h2>
          <p className="manifesto-copy">
            We make the hard parts clear, useful, and beautiful—so your next
            move has a little more momentum behind it.
          </p>
        </section>
        <section className="contact shell" id="contact" data-fade>
          <div>
            <div className="eyebrow">
              <span />
              Let’s build
            </div>
            <h2>
              Ready when <em>you are.</em>
            </h2>
            <p>
              Tell us what you’re making. We’ll bring the thinking, the craft,
              and the way forward.
            </p>
          </div>
          <ContactForm />
        </section>
        <footer data-fade>
          <div className="shell footer-cta">
            <p>Making complex things beautiful.</p>
            <a className="button" href="#contact">
              Start a project <span>↗</span>
            </a>
          </div>
          <div className="shell footer-grid">
            <div className="footer-brand">
              <a
                className="brand brand-logo"
                href="#top"
                aria-label="Blyu home"
              />
            </div>
            <div>
              <span>Explore</span>
              <a href="#work">Work</a>
              <a href="#services">Services</a>
            </div>
            <div>
              <span>Explore</span>
              <a href="#process">Process</a>
              <a href="#process">Ocean</a>
            </div>
            <div>
              <span>Connect</span>
              <a href="#contact">Start a project</a>
            </div>
            <div>
              <span>Connect</span>
              <a href="mailto:hello@blyu.net">hello@blyu.net</a>
            </div>
          </div>
          <div className="shell footer-bottom">
            <span>© {new Date().getFullYear()} Blyu</span>
            <span>Built for the next signal.</span>
          </div>
        </footer>
      </main>
    </PageMotion>
  );
}
