import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectCatalog } from "@/lib/project-catalog";

import "./project-page.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectCatalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectCatalog.find((item) => item.slug === slug);
  return { title: project ? `${project.title} — Blyu` : "Project — Blyu" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projectCatalog.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projectCatalog[index];
  const next = projectCatalog[(index + 1) % projectCatalog.length];
  const number = String(index + 1).padStart(2, "0");

  return (
    <main className="project-page">
      <header className="shell project-page-nav">
        <Link className="project-page-logo" href="/" aria-label="Blyu home" />
        <Link className="project-page-back" href="/#project-library">← All projects</Link>
        <Link className="project-page-cta" href="/start-project">Start a project ↗</Link>
      </header>

      <section className="shell project-page-hero" aria-labelledby="project-title">
        <p className="project-page-eyebrow">{number} / CONCEPT PROJECT — {project.category}</p>
        <h1 id="project-title">{project.title}</h1>
        <div className="project-page-hero-bottom">
          <p>{project.teaser}</p>
          <span>Project UI preview / final details to follow</span>
        </div>
      </section>

      <div className="shell project-page-visual" data-tone={project.tone} aria-label={`${project.title} visual placeholder`}>
        <span className="project-page-visual-index">BLYU / {number}</span>
        <span className="project-page-visual-art" aria-hidden="true"><i /><i /></span>
        <span className="project-page-visual-caption">Space for final project imagery</span>
      </div>

      <section className="shell project-page-story" aria-label="Project brief">
        <p className="project-page-eyebrow">01 / The brief</p>
        <div>
          <h2>A starting point for the full story.</h2>
          <p>{project.brief}</p>
          <p className="project-page-placeholder-note">
            This is an editable concept preview. Client details, project images, and outcomes can be added here when ready.
          </p>
        </div>
      </section>

      <section className="shell project-page-focus" aria-labelledby="project-focus-title">
        <p className="project-page-eyebrow">02 / Focus areas</p>
        <div>
          <h2 id="project-focus-title">What this project could cover.</h2>
          <ul>
            {project.focus.map((item, focusIndex) => (
              <li key={item}><span>0{focusIndex + 1}</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="project-page-footer">
        <div className="shell project-page-footer-inner">
          <div>
            <span>UP NEXT / {String(((index + 1) % projectCatalog.length) + 1).padStart(2, "0")}</span>
            <Link href={`/work/${next.slug}`}>{next.title} ↗</Link>
          </div>
          <Link href="/#project-library">Back to all projects ↑</Link>
        </div>
      </footer>
    </main>
  );
}
