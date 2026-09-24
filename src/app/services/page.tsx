import type { Metadata } from "next";
import Link from "next/link";
import "./services-page.css";

export const metadata: Metadata = {
  title: "Services — Blyu",
  description:
    "Explore Blyu's strategy, design, engineering, and automation services.",
};

const services = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy",
    tagline: "Clarity before execution",
    description:
      "We turn an ambitious idea into a clear direction. Together, we define the problem, understand the people it affects, and choose what to build first.",
    details: ["Discovery", "Product direction", "Roadmapping"],
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    tagline: "Interfaces people remember",
    description:
      "We shape digital experiences that feel effortless to use and unmistakably yours. Every detail has a purpose, from the first sketch to the final interaction.",
    details: ["User experience", "Visual identity", "Interfaces"],
  },
  {
    id: "engineering",
    number: "03",
    title: "Engineering",
    tagline: "Systems made to scale",
    description:
      "We build the foundations and the product people actually use. The work is thoughtful, dependable, and ready to grow as your needs change.",
    details: ["Web products", "Integrations", "Infrastructure"],
  },
  {
    id: "automation",
    number: "04",
    title: "Automation",
    tagline: "Work that keeps moving",
    description:
      "We find the repeated work slowing teams down and connect the right tools and processes, so people can spend more time on what matters.",
    details: ["Workflow design", "AI-assisted tools", "Process integration"],
  },
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <header className="services-page-header shell">
        <Link className="brand brand-logo" href="/" aria-label="Blyu home" />
        <nav aria-label="Services page navigation">
          <Link href="/#work">Our Work</Link>
          <Link href="/services" aria-current="page">Services</Link>
          <Link href="/#process">Process</Link>
        </nav>
        <Link className="button button-small" href="/start-project">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section className="services-hero shell" aria-labelledby="services-title">
        <p className="services-eyebrow"><span aria-hidden="true" /> BLYU / SERVICES</p>
        <h1 id="services-title">Everything it takes to <em>move forward.</em></h1>
        <div className="services-hero-bottom">
          <p>
            Strategy, design, engineering, and automation — four connected
            disciplines to make ideas real and keep them moving.
          </p>
          <span>Explore our services ↓</span>
        </div>
      </section>

      <nav className="services-index shell" aria-label="Jump to a service">
        {services.map((service) => (
          <a href={`#${service.id}`} key={service.id}>
            <span>{service.number}</span>{service.title}
          </a>
        ))}
      </nav>

      <section className="services-list shell" aria-label="What we do">
        {services.map((service) => (
          <article className="services-detail" id={service.id} key={service.id}>
            <div className="services-detail-heading">
              <span className="services-detail-number">{service.number}</span>
              <div>
                <p className="services-detail-label">BLYU / {service.title.toUpperCase()}</p>
                <h2>{service.title}</h2>
                <p className="services-detail-tagline">{service.tagline}</p>
              </div>
            </div>
            <div className="services-detail-body">
              <p>{service.description}</p>
              <ul aria-label={`${service.title} focus areas`}>
                {service.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="services-end shell">
        <p>BLYU / LET’S BUILD</p>
        <h2>Have something in mind?</h2>
        <Link className="button" href="/start-project">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <footer className="services-footer shell">
        <span>© Blyu</span>
        <Link href="/">Back to home ↑</Link>
      </footer>
    </main>
  );
}
