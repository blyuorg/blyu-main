"use client";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(Flip);

type SiteNavProps = {
  current?: "work" | "services" | "process";
};

export function SiteNav({ current }: SiteNavProps) {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let navTween: gsap.core.Tween | undefined;
    let flipTween: gsap.core.Timeline | undefined;
    let expandPreparation: gsap.core.Tween | undefined;

    const setCompact = (compact: boolean, prepared = false) => {
      if (nav.classList.contains("nav-compact") === compact) {
        if (compact && expandPreparation) {
          expandPreparation.kill();
          expandPreparation = undefined;
          gsap.to(nav, {
            height: window.matchMedia("(max-width: 700px)").matches ? 104 : 86,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        return;
      }

      expandPreparation?.kill();
      expandPreparation = undefined;
      navTween?.kill();
      flipTween?.kill();
      gsap.killTweensOf(nav);
      gsap.set(nav, {
        clearProps: prepared
          ? "backgroundColor,borderColor,boxShadow"
          : "height,backgroundColor,borderColor,boxShadow",
      });

      if (reducedMotion) {
        nav.classList.toggle("nav-compact", compact);
        return;
      }

      // Give the stacked links and large logo their full height before
      // moving them back out of the compact pill.
      if (!compact && !prepared) {
        expandPreparation = gsap.to(nav, {
          height: window.matchMedia("(max-width: 700px)").matches ? 148 : 164,
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

      const moving = nav.querySelectorAll(".brand-logo, .nav-links a, .button-small");
      const state = Flip.getState(moving);
      const before = getComputedStyle(nav);
      const from = {
        height: nav.getBoundingClientRect().height,
        backgroundColor: before.backgroundColor,
        borderColor: before.borderColor,
        boxShadow: before.boxShadow,
      };

      nav.classList.toggle("nav-compact", compact);
      const after = getComputedStyle(nav);
      const targetHeight = window.matchMedia("(max-width: 700px)").matches
        ? compact ? 104 : 148
        : compact ? 86 : 164;

      navTween = gsap.fromTo(nav, from, {
        height: targetHeight,
        backgroundColor: after.backgroundColor,
        borderColor: after.borderColor,
        boxShadow: after.boxShadow,
        duration: 0.72,
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: () => gsap.set(nav, { clearProps: "height,backgroundColor,borderColor,boxShadow" }),
      });
      flipTween = Flip.from(state, {
        duration: 0.72,
        ease: "power3.inOut",
        stagger: 0.025,
        absolute: false,
        prune: true,
      });
    };

    const onScroll = () => setCompact(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      navTween?.kill();
      flipTween?.kill();
      expandPreparation?.kill();
    };
  }, []);

  return (
    <nav ref={navRef} className="nav shell site-nav" aria-label="Main navigation">
      <Link className="brand brand-logo" href="/" aria-label="Blyu home" />
      <div className="nav-links">
        <Link href="/work" aria-current={current === "work" ? "page" : undefined}>Our Work</Link>
        <Link href="/services" aria-current={current === "services" ? "page" : undefined}>Services</Link>
        <Link href="/process" aria-current={current === "process" ? "page" : undefined}>Process</Link>
      </div>
      <div className="nav-actions">
        <Link className="button button-small" href="/start-project">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </nav>
  );
}
