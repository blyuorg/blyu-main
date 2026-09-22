"use client";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, Flip);

export function PageMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const nav = root.querySelector<HTMLElement>(".nav");
      if (nav) {
        const setCompact = (compact: boolean) => {
          if (nav.classList.contains("nav-compact") === compact) return;
          if (reducedMotion) {
            nav.classList.toggle("nav-compact", compact);
            return;
          }

          const state = Flip.getState(
            Array.from(
              nav.querySelectorAll(
                ".brand-logo, .nav-links, .nav-ocean, .button-small",
              ),
            ),
          );
          const current = getComputedStyle(nav);
          const from = {
            height: nav.getBoundingClientRect().height,
            backgroundColor: current.backgroundColor,
            borderColor: current.borderColor,
            boxShadow: current.boxShadow,
          };
          nav.classList.toggle("nav-compact", compact);
          const target = getComputedStyle(nav);
          gsap.fromTo(nav, from, {
            height: compact
              ? window.matchMedia("(max-width: 700px)").matches
                ? 68
                : 86
              : window.matchMedia("(max-width: 700px)").matches
                ? 118
                : 138,
            backgroundColor: target.backgroundColor,
            borderColor: target.borderColor,
            boxShadow: target.boxShadow,
            duration: 0.68,
            ease: "power3.inOut",
            overwrite: "auto",
          });
          Flip.from(state, {
            duration: 0.68,
            ease: "power3.inOut",
            nested: true,
            absolute: false,
            prune: true,
          });
        };

        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 180,
          onEnter: () => setCompact(true),
          onLeaveBack: () => setCompact(false),
        });
      }

      if (reducedMotion) return;

      const reveal = (target: Element, options: gsap.TweenVars = {}) => {
        gsap.from(target, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: target,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          ...options,
        });
      };

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".nav", { autoAlpha: 0, y: -12, duration: 0.55 })
        .from(
          ".hero .eyebrow",
          { autoAlpha: 0, y: 16, duration: 0.45 },
          "-=0.22",
        )
        .from(
          ".hero h1",
          {
            autoAlpha: 0,
            yPercent: 28,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
          },
          "-=0.12",
        )
        .from(
          ".hero-bottom > *",
          { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.12 },
          "-=0.3",
        );

      const serviceItems = gsap.utils.toArray<HTMLElement>(".service");
      gsap.from(serviceItems, {
        autoAlpha: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".service-strip",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      const processIntro = root.querySelector(".section-intro");
      const showreel = root.querySelector(".video-reserve");
      if (processIntro) reveal(processIntro, { x: -28, y: 0, duration: 0.8 });
      if (showreel)
        reveal(showreel, { x: 28, y: 0, duration: 0.85, delay: 0.08 });

      const workHeading = root.querySelector(".work-header > div");
      const workHint = root.querySelector(".work-header > p");
      if (workHeading) reveal(workHeading, { y: 30, duration: 0.7 });
      if (workHint)
        reveal(workHint, { x: 20, y: 0, duration: 0.6, delay: 0.08 });

      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      const rail = root.querySelector<HTMLElement>(".work-rail");
      if (cards.length && rail) {
        gsap.from(cards, {
          autoAlpha: 0,
          y: 30,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rail,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const manifesto = root.querySelector(".manifesto");
      if (manifesto) {
        const heading = manifesto.querySelector("h2");
        const copy = manifesto.querySelector(".manifesto-copy");
        if (heading)
          reveal(heading, {
            y: 35,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.85,
          });
        if (copy) reveal(copy, { x: 24, y: 0, duration: 0.7, delay: 0.08 });
      }

      const contact = root.querySelector(".contact");
      if (contact) {
        const intro = contact.querySelector(":scope > div");
        const form = contact.querySelector(".contact-form");
        if (intro) reveal(intro, { x: -24, y: 0, duration: 0.75 });
        if (form) reveal(form, { x: 24, y: 0, duration: 0.75, delay: 0.1 });
      }

      const footer = root.querySelector("footer");
      const footerColumns = footer?.querySelectorAll(
        ".footer-cta > *, .footer-grid > div, .footer-bottom > *",
      );
      if (footer && footerColumns?.length) {
        gsap.from(footerColumns, {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.utils.toArray<SVGElement>(".doodle").forEach((doodle, index) => {
        gsap.to(doodle, {
          y: index % 2 === 0 ? -22 : 22,
          rotation: index % 2 === 0 ? -3 : 3,
          ease: "none",
          scrollTrigger: {
            trigger: doodle.parentElement ?? doodle,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={scope}>{children}</div>;
}
