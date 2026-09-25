import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageMotion } from "@/components/page-motion";
import { ProjectGallery } from "@/components/project-gallery";

const services = [
  ["Strategy", "Clarity before execution"],
  ["Design", "Interfaces people remember"],
  ["Engineering", "Systems made to scale"],
  ["Automation", "Work that keeps moving"],
];

export default function Home() {
  return (
    <PageMotion>
      <main className="home-page">
        <div className="site-content">
        <nav className="nav shell" aria-label="Main navigation" data-fade>
          <a className="brand brand-logo" href="#top" aria-label="Blyu home" />
          <div className="nav-links">
            <Link href="/work">Our Work</Link>
            <a href="/services">Services</a>
            <a href="/process">Process</a>
            <a href="#process">Ocean</a>
          </div>
          <div className="nav-actions" aria-label="Quick links">
            <a className="nav-ocean nav-ocean-compact" href="#process">
              Ocean
            </a>
            <a className="button button-small" href="/start-project">
              Start a project <span>↗</span>
            </a>
          </div>
        </nav>
        <section className="hero shell" id="top">
          <h1 data-fade>
            We build what others <em>can’t</em> imagine.
          </h1>
          <div className="hero-bottom" data-fade>
            <p>
              From intelligent automation to pixel-perfect interfaces, Blyu
              builds the digital products ambitious businesses need next.
            </p>
            <a className="button" href="/start-project">
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
        <div id="work">
          <ProjectGallery />
        </div>
        <section className="manifesto shell" data-fade>
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
        </div>
        <footer className="site-footer" data-fade>
          <div className="footer-map" aria-hidden="true" />
          <div className="shell footer-cta">
            <p>Making complex things beautiful.</p>
            <a className="button" href="/start-project">
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
              <Link href="/work">Work</Link>
              <a href="/services">Services</a>
            </div>
            <div>
              <span>Explore</span>
              <a href="/process">Process</a>
              <a href="#process">Ocean</a>
            </div>
            <div>
              <span>Connect</span>
              <a href="/start-project">Start a project</a>
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
