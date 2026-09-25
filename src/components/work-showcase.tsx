"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import type { Project } from "@/lib/project-catalog";

gsap.registerPlugin(ScrollTrigger);

export function WorkShowcase({ projects }: { projects: readonly Project[] }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      section.querySelectorAll<HTMLElement>(".work-story-panel").forEach((panel) => {
        const copy = panel.querySelector<HTMLElement>(".work-story-copy");
        const art = panel.querySelector<HTMLElement>(".work-story-art");
        if (!copy || !art) return;

        gsap.fromTo(
          [copy, art],
          { y: 52, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 100%",
              end: "top 55%",
              scrub: 0.35,
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="work-showcase" id="work-stories" ref={root} aria-label="Selected projects">
      {projects.map((project, index) => {
        const number = String(index + 1).padStart(2, "0");
        const total = String(projects.length).padStart(2, "0");

        return (
          <article
            className="work-story-panel"
            data-tone={project.tone}
            id={project.slug}
            key={project.slug}
            style={{ zIndex: index + 1 }}
            aria-labelledby={`work-story-${project.slug}`}
          >
            <div className="shell work-story-inner">
              <div className="work-story-copy">
                <div className="work-story-topline">
                  <span>{number} / {total}</span>
                  <span>{project.category}</span>
                </div>
                <div className="work-story-main">
                  <p className="work-story-overline">BLYU / SELECTED PROJECT</p>
                  <h2 id={`work-story-${project.slug}`}>{project.title}</h2>
                  <p className="work-story-teaser">{project.teaser}</p>
                </div>
                <div className="work-story-bottom">
                  <ul aria-label={`${project.title} focus areas`}>
                    {project.focus.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <Link href={`/work/${project.slug}`}>
                    Explore project <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
              <div className="work-story-art" aria-hidden="true">
                <div className="work-story-orbit work-story-orbit-outer" />
                <div className="work-story-orbit work-story-orbit-inner" />
                <span className="work-story-art-number">{number}</span>
                <span className="work-story-art-caption">SPACE FOR PROJECT VISUAL</span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
