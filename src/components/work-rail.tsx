"use client";
import { useRef } from "react";
const projects = [
  [
    "AI automation",
    "Turn repeated operations into an advantage.",
    "Strategy lead",
    "Confidential B2B team",
    "card-blue",
  ],
  [
    "Digital experience",
    "A sharper route from first click to real momentum.",
    "Product director",
    "Scaling services business",
    "card-black",
  ],
  [
    "Platform engineering",
    "The reliable systems behind the next chapter.",
    "Founder",
    "Growth-stage venture",
    "card-sand",
  ],
  [
    "Brand & interface",
    "A digital identity built to be remembered.",
    "Marketing lead",
    "Ambitious category brand",
    "card-white",
  ],
] as const;
export function WorkRail() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0 });
  const down = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = rail.current;
    if (!el) return;
    drag.current = { active: true, x: event.clientX, left: el.scrollLeft };
    el.setPointerCapture(event.pointerId);
  };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = rail.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };
  const end = () => {
    drag.current.active = false;
  };
  return (
    <div
      ref={rail}
      className="work-rail"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      aria-label="Selected work. Drag horizontally to browse."
    >
      {projects.map(([title, description, role, company, tone], index) => (
        <article key={title} className={`work-card ${tone}`}>
          <div>
            <span>0{index + 1} / CASE STUDY</span>
            <h3>{title}</h3>
          </div>
          <div>
            <p>{description}</p>
            <footer>
              <b>{role}</b>
              <small>{company}</small>
            </footer>
          </div>
        </article>
      ))}
    </div>
  );
}
