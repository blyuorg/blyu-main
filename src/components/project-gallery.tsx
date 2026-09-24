"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projectCatalog, type Project } from "@/lib/project-catalog";

import "./project-gallery.css";

function ProjectTile({
  project,
  index,
  duplicate,
  flipped,
  onFlip,
}: {
  project: Project;
  index: number;
  duplicate: boolean;
  flipped: boolean;
  onFlip: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="project-tile" data-tone={project.tone}>
      <button
        type="button"
        className={`project-tile-card${flipped ? " is-flipped" : ""}`}
        onClick={onFlip}
        aria-label={`${flipped ? "Show front of" : "Read brief for"} ${project.title}`}
        aria-pressed={flipped}
        tabIndex={duplicate ? -1 : 0}
      >
        <span className="project-tile-rotor">
          <span className="project-tile-face project-tile-front" aria-hidden={flipped}>
            <span className="project-tile-kicker">PROJECT / {number}</span>
            <span className="project-tile-art" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="project-tile-face-bottom">
              <span>{project.category}</span>
              <span>Flip to read ↗</span>
            </span>
          </span>
          <span className="project-tile-face project-tile-back" aria-hidden={!flipped}>
            <span className="project-tile-kicker">PROJECT / {number} — BRIEF</span>
            <span className="project-tile-brief">{project.brief}</span>
            <span className="project-tile-face-bottom">
              <span>Concept preview</span>
              <span>Flip back ↗</span>
            </span>
          </span>
        </span>
      </button>
      <div className="project-tile-meta">
        <span>{number} / {project.category}</span>
        <h3>
          <Link href={`/work/${project.slug}`} tabIndex={duplicate ? -1 : 0}>
            {project.title} <span aria-hidden="true">↗</span>
          </Link>
        </h3>
        <p>{project.teaser}</p>
      </div>
    </article>
  );
}

export function ProjectGallery() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const cycleWidth = useRef(0);
  const visible = useRef(false);
  const hovered = useRef(false);
  const focused = useRef(false);
  const pressed = useRef(false);
  const resumeAt = useRef(0);
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);

  useEffect(() => {
    const container = rail.current;
    const items = firstSet.current;
    const row = track.current;
    const wrapper = section.current;
    if (!container || !items || !row || !wrapper) return;

    const measure = () => {
      cycleWidth.current =
        items.getBoundingClientRect().width +
        parseFloat(getComputedStyle(row).columnGap || "0");
    };
    measure();

    const resize = new ResizeObserver(measure);
    resize.observe(items);
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(wrapper);

    let frame = 0;
    let previous = 0;
    let position = container.scrollLeft;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const tick = (time: number) => {
        const delta = previous ? Math.min(time - previous, 50) : 0;
        previous = time;
        const distance = cycleWidth.current;

        if (distance > 0 && container.scrollLeft >= distance) {
          container.scrollLeft -= distance;
        }
        if (Math.abs(container.scrollLeft - position) > 1) {
          position = container.scrollLeft;
        }
        if (
          visible.current &&
          !hovered.current &&
          !focused.current &&
          !pressed.current &&
          time >= resumeAt.current
        ) {
          position += delta * 0.028;
          if (distance > 0 && position >= distance) position -= distance;
          container.scrollLeft = position;
        } else {
          position = container.scrollLeft;
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#project-library") return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById("project-library");
      if (!target) return;
      rail.current?.scrollTo({ left: 0, behavior: "instant" });
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 110,
        behavior: "instant",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const nudge = (direction: -1 | 1) => {
    const container = rail.current;
    if (!container) return;
    const distance = cycleWidth.current;
    const step = container.querySelector<HTMLElement>(".project-tile")?.offsetWidth ?? 310;
    resumeAt.current = performance.now() + 1800;
    if (direction < 0 && distance > 0 && container.scrollLeft < step + 20) {
      container.scrollLeft += distance;
    }
    container.scrollBy({ left: direction * (step + 18), behavior: "smooth" });
  };

  return (
    <section className="project-gallery" id="project-library" ref={section} aria-labelledby="project-gallery-title">
      <div className="shell project-gallery-header">
        <div>
          <p className="eyebrow"><span /> Our projects </p>
          <h2 id="project-gallery-title">Explore the work <em>behind the ideas.</em></h2>
          <p className="project-gallery-intro">
            Tap a card for its brief. Tap the project name to open its page.
          </p>
        </div>
        <div className="project-gallery-controls" aria-label="Browse projects">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous projects">←</button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next projects">→</button>
        </div>
      </div>
      <div
        className="project-gallery-rail"
        ref={rail}
        role="region"
        aria-label="Project concepts, automatically scrolling"
        tabIndex={0}
        onPointerEnter={() => { hovered.current = true; }}
        onPointerLeave={() => { hovered.current = false; }}
        onPointerDown={() => { pressed.current = true; }}
        onPointerUp={() => { pressed.current = false; }}
        onPointerCancel={() => { pressed.current = false; }}
        onFocusCapture={() => { focused.current = true; }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) focused.current = false;
        }}
      >
        <div className="project-gallery-track" ref={track}>
          {[false, true].map((duplicate) => (
            <div
              className="project-gallery-set"
              ref={duplicate ? undefined : firstSet}
              key={duplicate ? "repeat" : "original"}
              aria-hidden={duplicate || undefined}
            >
              {projectCatalog.map((project, index) => (
                <ProjectTile
                  key={project.slug}
                  project={project}
                  index={index}
                  duplicate={duplicate}
                  flipped={flippedSlug === project.slug}
                  onFlip={() => setFlippedSlug((current) => current === project.slug ? null : project.slug)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="shell project-gallery-note">Concept content can be replaced with final project details.</div>
    </section>
  );
}
