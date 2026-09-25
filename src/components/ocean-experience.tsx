"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const INTRO_DURATION = 3.95;

const workflow = [
  ["01 / BUSINESS BRIEF", "Understand what matters"],
  ["02 / STRATEGY SNAPSHOT", "Shape a practical plan"],
  ["03 / CAMPAIGN + LEADS", "Turn plans into action"],
];

const bubbles = [
  { id: "01", x: 21.47, y: 64.44, size: 19, start: 0.3241, end: 0.4304, rise: 74, mid: -18, finish: -94 },
  { id: "02", x: 27.71, y: 40.56, size: 36, start: 0.3494, end: 0.4557, rise: 74, mid: -18, finish: -94 },
  { id: "03", x: 35.52, y: 73.33, size: 13, start: 0.3747, end: 0.481, rise: 74, mid: -18, finish: -94 },
  { id: "04", x: 56.21, y: 32.22, size: 24, start: 0.4, end: 0.5063, rise: 74, mid: -18, finish: -94 },
  { id: "05", x: 66.35, y: 67.78, size: 48, start: 0.3392, end: 0.4456, rise: 86, mid: -28, finish: -105 },
  { id: "06", x: 78.38, y: 43.11, size: 17, start: 0.3671, end: 0.4734, rise: 86, mid: -28, finish: -105 },
  { id: "07", x: 86.5, y: 61.67, size: 29, start: 0.3949, end: 0.5013, rise: 86, mid: -28, finish: -105 },
  { id: "08", x: 49.57, y: 78.89, size: 11, start: 0.4228, end: 0.5291, rise: 86, mid: -28, finish: -105 },
] as const;

function OceanEntrance() {
  const reduceMotion = useReducedMotion();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setTimeout(() => setFinished(true), INTRO_DURATION * 1000);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (finished || reduceMotion) return null;

  return (
    <div className="ocean-entrance" aria-hidden="true">
      <motion.div
        className="ocean-entrance-canvas"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ opacity: { duration: INTRO_DURATION, times: [0, 0.7342, 0.8051, 1], ease: ["linear", "easeInOut", "linear"] } }}
      >
        <span className="ocean-entrance-logo" />
      </motion.div>

      <motion.div
        className="ocean-entrance-wave"
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "0%", "0%", "-100%", "-100%"] }}
        transition={{ y: { duration: INTRO_DURATION, times: [0, 0.3165, 0.7291, 0.9747, 1], ease: ["easeOut", "linear", "easeInOut", "linear"] } }}
      />

      {bubbles.map((bubble) => (
        <motion.span
          className="ocean-entrance-bubble"
          key={bubble.id}
          style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
          initial={{ opacity: 0, y: bubble.rise }}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
            y: [bubble.rise, bubble.rise, bubble.mid, bubble.finish, bubble.finish],
          }}
          transition={{
            opacity: { duration: INTRO_DURATION, times: [0, bubble.start, bubble.end, 0.6962, 0.8051, 1], ease: ["linear", "easeOut", "linear", "easeOut", "linear"] },
            y: { duration: INTRO_DURATION, times: [0, bubble.start, 0.6456, 0.8481, 1], ease: ["linear", "easeOut", "easeOut", "linear"] },
          }}
        >
          <Image src={`/ocean-bubble-${bubble.id}.svg`} width={bubble.size} height={bubble.size} alt="" unoptimized />
        </motion.span>
      ))}

      <div className="ocean-entrance-title-position">
        <motion.p
          className="ocean-entrance-title"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: [0, 0, 1, 1], y: [32, 0, 0, -1180, -1180] }}
          transition={{
            opacity: { duration: INTRO_DURATION, times: [0, 0.4051, 0.519, 1], ease: ["linear", "easeOut", "linear"] },
            y: { duration: INTRO_DURATION, times: [0, 0.519, 0.7291, 0.9747, 1], ease: ["easeOut", "linear", "easeInOut", "linear"] },
          }}
        >
          Ocean
        </motion.p>
      </div>
    </div>
  );
}

export function OceanExperience() {
  return (
    <main className="ocean-page">
      <div className="ocean-stage">
        <header className="ocean-header">
          <Link className="ocean-logo" href="/" aria-label="Blyu home" />
        </header>

        <section className="ocean-hero" aria-labelledby="ocean-heading">
          <div className="ocean-hero-copy">
            <p className="ocean-eyebrow">BLYU / OCEAN — BUSINESS GROWTH &amp; SALES</p>
            <h1 id="ocean-heading">
              <span>Understand the business.</span>
              <span>Build the growth plan.</span>
            </h1>
            <p className="ocean-description">
              Ocean works with Blyu’s clients to understand what the business needs, plan a practical strategy, and turn it into marketing and sales activity. From targeted ad campaigns and short infographic videos to qualified leads and a clear ROI proposal, every move starts with the business goal.
            </p>
            <p className="ocean-supporting-line">A clear plan, shaped around your business and its customers.</p>
            <div className="ocean-actions">
              <Link className="ocean-primary-cta" href="/start-project">
                Discuss a business challenge
                <Image src="/ocean-arrow.svg" width={18} height={18} alt="" unoptimized />
              </Link>
              <a className="ocean-secondary-cta" href="#ocean-workflow">Explore Ocean services ↓</a>
            </div>
          </div>

          <div className="ocean-workflow" id="ocean-workflow" aria-label="Illustrative Ocean workflow">
            {workflow.map(([step, description]) => (
              <div className="ocean-workflow-card" key={step}>
                <span>{step}</span>
                <p>{description}</p>
              </div>
            ))}
            <small>Illustrative concept — no client data shown</small>
          </div>
        </section>
      </div>
      <OceanEntrance />
    </main>
  );
}
