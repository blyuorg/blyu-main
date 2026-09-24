"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import FlipCard from "@/components/flip-card";

gsap.registerPlugin(ScrollTrigger);

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

const cardSurfaces = {
  "card-blue": { background: "#1215dc", color: "#ffffff" },
  "card-black": { background: "#202027", color: "#ffffff" },
  "card-sand": { background: "#b3aa9f", color: "#151519" },
  "card-white": { background: "#fdfdfc", color: "#111115" },
} as const;

export function WorkRail() {
  const rail = useRef<HTMLDivElement>(null);
  const autoplay = useRef<gsap.core.Tween | null>(null);
  const restartAutoplay = useRef<() => void>(() => {});
  const drag = useRef({ active: false, x: 0, left: 0 });

  useLayoutEffect(() => {
    const element = rail.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const createTween = () =>
      gsap.to(element, {
        scrollLeft: () =>
          Math.max(0, element.scrollWidth - element.clientWidth),
        duration: 24,
        ease: "none",
        repeat: -1,
        yoyo: true,
        paused: true,
      });

    const tween = createTween();
    autoplay.current = tween;
    restartAutoplay.current = () => {
      autoplay.current?.kill();
      autoplay.current = createTween();
      autoplay.current.play();
    };

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => autoplay.current?.play(),
      onEnterBack: () => autoplay.current?.play(),
      onLeave: () => autoplay.current?.pause(),
      onLeaveBack: () => autoplay.current?.pause(),
    });

    return () => {
      trigger.kill();
      autoplay.current?.kill();
      autoplay.current = null;
      restartAutoplay.current = () => {};
    };
  }, []);

  const down = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = rail.current;
    if (!element) return;
    autoplay.current?.pause();
    if ((event.target as HTMLElement).closest(".flip-card")) return;
    drag.current = { active: true, x: event.clientX, left: element.scrollLeft };
    element.setPointerCapture(event.pointerId);
  };

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = rail.current;
    if (!element || !drag.current.active) return;
    element.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };

  const end = () => {
    drag.current.active = false;
    restartAutoplay.current();
  };

  return (
    <div
      ref={rail}
      className="work-rail"
      onPointerDownCapture={down}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      aria-label="Selected work. Cards scroll automatically; drag to browse."
      tabIndex={0}
    >
      {projects.map(([title, description, role, company, tone], index) => {
        const surface = cardSurfaces[tone];

        return (
          <FlipCard
            key={title}
            className={`work-card ${tone}`}
            width={365}
            height={460}
            radius={24}
            background={surface.background}
            color={surface.color}
            axis="y"
            flipOnClick
            draggable
            tilt
            glare
            glareOpacity={0.12}
            hoverScale={1.02}
            perspective={1100}
            stiffness={180}
            damping={22}
            ariaLabel={`${title} case study. Flip for details.`}
            front={
              <div className="work-card-face work-card-front">
                <div className="work-card-preview" aria-hidden="true" />
                <div className="work-card-copy">
                  <span>0{index + 1} / CASE STUDY</span>
                  <h3>{title}</h3>
                </div>
              </div>
            }
            back={
              <div className="work-card-face work-card-back">
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
              </div>
            }
          />
        );
      })}
    </div>
  );
}
