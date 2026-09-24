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
        const navActions = nav.querySelector<HTMLElement>(".nav-actions");
        const oceanSource = nav.querySelector<HTMLElement>(
          ".nav-links a:last-child",
        );
        const oceanDestination = nav.querySelector<HTMLElement>(
          ".nav-ocean-compact",
        );
        let navTransition: gsap.core.Timeline | undefined;
        let flipTransition: gsap.core.Timeline | undefined;
        let oceanTraveler: HTMLElement | undefined;
        let expandPreparation: gsap.core.Tween | undefined;
        const isMobileNav = () => window.matchMedia("(max-width: 700px)").matches;
        const compactHeight = () => (isMobileNav() ? 104 : 86);
        const expandedHeight = () => (isMobileNav() ? 148 : 164);

        const setCompact = (compact: boolean, prepared = false) => {
          if (nav.classList.contains("nav-compact") === compact) {
            if (compact && expandPreparation) {
              expandPreparation.kill();
              expandPreparation = undefined;
              gsap.to(nav, {
                height: compactHeight(),
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
            return;
          }
          expandPreparation?.kill();
          expandPreparation = undefined;
          navTransition?.kill();
          flipTransition?.kill();
          oceanTraveler?.remove();
          oceanTraveler = undefined;
          gsap.killTweensOf([nav, navActions, oceanSource, oceanDestination]);
          gsap.set([oceanSource, oceanDestination].filter(Boolean), {
            clearProps: "opacity,visibility,transform,flexBasis",
          });
          if (navActions) gsap.set(navActions, { clearProps: "width,height" });

          if (reducedMotion) {
            nav.classList.toggle("nav-compact", compact);
            return;
          }

          // On the way back, make room for the stacked links and large logo
          // before switching from the compact flex layout to the tall grid.
          if (!compact && !prepared) {
            expandPreparation = gsap.to(nav, {
              height: expandedHeight(),
              duration: 0.3,
              ease: "power2.inOut",
              overwrite: "auto",
              onComplete: () => {
                expandPreparation = undefined;
                setCompact(false, true);
              },
            });
            return;
          }

          const departingOcean = compact ? oceanSource : oceanDestination;
          const arrivingOcean = compact ? oceanDestination : oceanSource;
          const oceanFrom = departingOcean?.getBoundingClientRect();
          const oceanStyle = departingOcean
            ? getComputedStyle(departingOcean)
            : undefined;
          const actionsFrom = navActions?.getBoundingClientRect();
          const state = Flip.getState(
            Array.from(
              nav.querySelectorAll(
                ".brand-logo, .nav-links a:not(:last-child), .button-small",
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
          const actionsTo = navActions?.getBoundingClientRect();
          const oceanTo = arrivingOcean?.getBoundingClientRect();
          const navRect = nav.getBoundingClientRect();
          const travelDuration = 0.72;

          navTransition = gsap.timeline({
            onComplete: () => {
              oceanTraveler?.remove();
              oceanTraveler = undefined;
              if (arrivingOcean) {
                gsap.set(arrivingOcean, {
                  clearProps: "opacity,visibility,transform,flexBasis",
                });
              }
              if (navActions) {
                gsap.set(navActions, { clearProps: "width,height" });
              }
            },
          });
          navTransition.fromTo(nav, from, {
            height: compact ? compactHeight() : expandedHeight(),
            backgroundColor: target.backgroundColor,
            borderColor: target.borderColor,
            boxShadow: target.boxShadow,
            duration: travelDuration,
            ease: "power3.inOut",
            overwrite: "auto",
          }, 0);

          if (navActions && actionsFrom && actionsTo) {
            navTransition.fromTo(navActions, {
              width: actionsFrom.width,
              height: actionsFrom.height,
            }, {
              width: actionsTo.width,
              height: actionsTo.height,
              duration: travelDuration,
              ease: "power3.inOut",
            }, 0);
          }
          if (oceanDestination && compact) {
            navTransition.fromTo(oceanDestination, {
              flexBasis: "0%",
            }, {
              flexBasis: "34%",
              duration: travelDuration,
              ease: "power3.inOut",
            }, 0);
          }

          flipTransition = Flip.from(state, {
            duration: travelDuration,
            ease: "power3.inOut",
            stagger: 0.025,
            absolute: false,
            prune: true,
          });

          if (departingOcean && arrivingOcean && oceanFrom && oceanTo && oceanStyle) {
            gsap.set(arrivingOcean, { autoAlpha: 0 });
            oceanTraveler = document.createElement("span");
            oceanTraveler.className = "nav-ocean-traveler";
            oceanTraveler.textContent = "Ocean";
            nav.appendChild(oceanTraveler);
            gsap.set(oceanTraveler, {
              left: oceanFrom.left - navRect.left,
              top: oceanFrom.top - navRect.top,
              width: oceanFrom.width,
              height: oceanFrom.height,
              color: oceanStyle.color,
              fontFamily: oceanStyle.fontFamily,
              fontSize: oceanStyle.fontSize,
              fontWeight: oceanStyle.fontWeight,
              lineHeight: oceanStyle.lineHeight,
            });
            navTransition.to(oceanTraveler, {
              left: oceanTo.left - navRect.left,
              top: oceanTo.top - navRect.top,
              width: oceanTo.width,
              height: oceanTo.height,
              color: compact ? "#fff" : "#111115",
              fontSize: getComputedStyle(arrivingOcean).fontSize,
              duration: travelDuration,
              ease: "power2.inOut",
            }, 0);
          }
        };

        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 1,
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
      serviceItems.forEach((service, index) => {
        const panel = service.querySelector<HTMLElement>(".service-copy");
        const number = service.querySelector<HTMLElement>(".service-number");
        const copy = panel?.querySelectorAll<HTMLElement>("h2, p");
        if (!panel || !number || !copy?.length) return;
        gsap.set(copy, { autoAlpha: 0, y: 12 });

        // Keep the row in place while its panel grows out of a thin strip.
        // The stagger is tied to each row's position, so scrolling back reverses it.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: "top 88%",
            end: "top 48%",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            panel,
            {
              clipPath: "inset(0 49% 0 49%)",
              xPercent: index % 2 === 0 ? 38 : 0,
            },
            {
              clipPath: "inset(0 0% 0 0%)",
              xPercent: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            0,
          )
          .fromTo(
            number,
            { x: index % 2 === 0 ? 20 : -20 },
            { x: 0, duration: 1.1, ease: "power2.out" },
            0,
          )
          .to(
            copy,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.36,
              ease: "power1.out",
            },
            0.6,
          );
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

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={scope}>{children}</div>;
}
