import type { Metadata } from "next";
import Link from "next/link";
import { WorkShowcase } from "@/components/work-showcase";
import { SiteNav } from "@/components/site-nav";
import { projectCatalog } from "@/lib/project-catalog";

import "./work-page.css";

export const metadata: Metadata = {
  title: "Our Work — Blyu",
  description: "Explore Blyu's digital product concepts and project stories.",
};

const visibleProjects = projectCatalog.filter(
  (project) => project.slug !== "knowledge-assistant",
);

export default function WorkPage() {
  return (
    <main className="work-page">
      <SiteNav current="work" />

      <section className="work-page-hero shell" aria-labelledby="work-page-title">
        <p className="work-page-eyebrow"><span aria-hidden="true" /> OUR WORK / 01—{String(visibleProjects.length).padStart(2, "0")}</p>
        <h1 id="work-page-title">Explore the work <em>behind the ideas.</em></h1>
        <div className="work-page-hero-bottom">
          <p>Move through our projects, one story at a time.</p>
          <a href="#work-stories">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <WorkShowcase projects={visibleProjects} />

      <section className="work-page-end" aria-labelledby="work-page-end-title">
        <div className="shell work-page-end-inner">
          <p>THAT’S THE WORK / WHAT’S NEXT?</p>
          <h2 id="work-page-end-title">Let’s make something <em>matter.</em></h2>
          <Link className="button" href="/start-project">Start a project <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
