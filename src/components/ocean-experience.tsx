"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OceanServiceCard } from "@/components/ocean-service-card";
import { oceanServices } from "@/lib/ocean-services";

const INTRO_DURATION = 3.95;

const workflow = [
  ["01 / BUSINESS BRIEF", "Understand what matters"],
  ["02 / STRATEGY SNAPSHOT", "Shape a practical plan"],
  ["03 / CAMPAIGN + LEADS", "Turn plans into action"],
];

const processSteps = [
  ["01", "Discover", "We learn what the business sells, who it serves, what it wants to improve, and how inquiries are handled today."],
  ["02", "Diagnose", "We look at the customer journey and available numbers to identify the main opportunity or point of friction."],
  ["03", "Propose", "We explain the recommended work, timing, costs, responsibilities, and the measures that will show progress."],
  ["04", "Deliver", "Once the scope is approved, the agreed work begins. Blyu can build supporting digital tools when the plan needs them."],
  ["05", "Review", "We compare actual activity with the plan and recommend what to continue, change, or stop."],
];

const questions = [
  ["Do we need ads right away?", "No. A clearer offer, better messaging, or faster follow-up may be the more useful first step. Ocean starts with the business problem."],
  ["Will Ocean guarantee sales or ROI?", "No. A proposal can include realistic scenarios and the assumptions behind them, but actual results depend on the offer, market, budget, and how inquiries are handled."],
  ["Who pays for ad spend?", "A proposal separates Ocean’s fee from money paid to ad platforms. The budget and account ownership should be agreed before any campaign begins."],
  ["Can Ocean call customers and close deals for us?", "Direct calling, negotiation, and closing are included only when a proposal specifically names that work and assigns someone qualified to do it."],
  ["Can you work with our existing website and team?", "Yes. Ocean can work with existing people and tools. Blyu can improve or build digital parts when the agreed plan calls for them."],
  ["How soon will we see results?", "That depends on the offer, channel, budget, and how long customers take to decide. The proposal should explain when early activity and business results can reasonably be reviewed."],
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
              <a className="ocean-secondary-cta" href="#ocean-services">Explore Ocean services ↓</a>
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

      <section className="ocean-section ocean-process" id="ocean-process" aria-labelledby="ocean-process-heading">
        <div className="ocean-section-intro ocean-section-intro-split">
          <div>
            <p className="ocean-eyebrow">A CLEAR WAY FORWARD</p>
            <h2 id="ocean-process-heading">Understand first.<br />Recommend with a reason.</h2>
          </div>
          <p>A useful growth plan begins with the business, not a list of tactics. The scope is shaped around your goals, team, and starting point.</p>
        </div>
        <ol className="ocean-process-list">
          {processSteps.map(([number, title, description]) => (
            <li key={number}>
              <span className="ocean-process-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ocean-section ocean-services" id="ocean-services" aria-labelledby="ocean-services-heading">
        <div className="ocean-section-intro ocean-section-intro-split">
          <div>
            <p className="ocean-eyebrow">WHAT OCEAN CAN HELP WITH</p>
            <h2 id="ocean-services-heading">A focused mix, built around what you need.</h2>
          </div>
          <p>Ocean recommends the work that fits the business goal. The exact deliverables, who does them, and any ongoing support are agreed in each proposal.</p>
        </div>
        <div className="ocean-service-grid">
          {oceanServices.map((service, index) => (
            <OceanServiceCard service={service} index={index} key={service.slug} />
          ))}
        </div>
      </section>

      <section className="ocean-section ocean-story" aria-labelledby="ocean-story-heading">
        <div className="ocean-story-heading">
          <p className="ocean-eyebrow">AN ILLUSTRATIVE EXAMPLE</p>
          <h2 id="ocean-story-heading">The gap between interest and a real opportunity.</h2>
          <p>This fictional renovation business shows the kind of problem Ocean can help a team think through. It is not a Blyu client or a claim of results.</p>
        </div>
        <div className="ocean-story-grid">
          <article><span>BEFORE</span><p>Referrals bring most of the work. Boosted posts generate messages, but quotes sit in chat threads and follow-up is inconsistent. The owner cannot tell which activity leads to jobs.</p></article>
          <article><span>THE FINDING</span><p>The ads describe the service too broadly, and good inquiries do not always get a timely second conversation.</p></article>
          <article><span>THE POSSIBLE PLAN</span><p>Focus on one service and area, make the offer clearer, create targeted ads and a short explanatory video, and record inquiries in a simple pipeline.</p></article>
        </div>
      </section>

      <section className="ocean-section ocean-blyu" aria-labelledby="ocean-blyu-heading">
        <div>
          <p className="ocean-eyebrow">OCEAN + BLYU</p>
          <h2 id="ocean-blyu-heading">The business plan and the tools to support it.</h2>
          <p>Ocean works on the customer and business side: who to reach, what to say, how to follow up, and what to measure. When the plan calls for a landing page, customer database, integration, or automated follow-up, Blyu’s technical team can build or improve it.</p>
        </div>
        <div className="ocean-blyu-map" aria-label="Ocean and Blyu roles">
          <div><span>OCEAN</span><strong>Understand → Plan → Reach → Measure</strong></div>
          <div><span>BLYU</span><strong>Design → Build → Integrate → Automate</strong></div>
          <p>One connected conversation about the business goal and the work needed to support it.</p>
        </div>
      </section>

      <section className="ocean-section ocean-measure" aria-labelledby="ocean-measure-heading">
        <p className="ocean-eyebrow">A PLAN YOU CAN EVALUATE</p>
        <h2 id="ocean-measure-heading">Know what the investment is for.</h2>
        <div className="ocean-measure-content">
          <p>A proposal should explain the business goal, recommended work, timeline, responsibilities, Ocean fees, ad spend, and other agreed costs. It should name the few measures that matter most — such as qualified inquiries, meetings, quotes, and deals won.</p>
          <p>When there is enough business data, Ocean can show a return-on-investment estimate with cautious, base, and best-case scenarios. Those scenarios are planning tools, not promised sales. Reviews compare actual results with the assumptions and recommend what to change next.</p>
        </div>
      </section>

      <section className="ocean-section ocean-faq" id="ocean-faq" aria-labelledby="ocean-faq-heading">
        <div className="ocean-section-intro ocean-section-intro-split">
          <div>
            <p className="ocean-eyebrow">COMMON QUESTIONS</p>
            <h2 id="ocean-faq-heading">Good questions deserve clear answers.</h2>
          </div>
          <p>We’ll confirm the exact scope, people responsible, and costs before any work begins.</p>
        </div>
        <div className="ocean-faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="ocean-close" aria-labelledby="ocean-close-heading">
        <div className="ocean-close-inner">
          <p className="ocean-eyebrow">LET’S FIND YOUR NEXT GROWTH MOVE</p>
          <h2 id="ocean-close-heading">What does your business need to grow?</h2>
          <p>Tell us about your business, the customers you want to reach, and the challenge you want to solve. The first step is understanding what you need.</p>
          <Link href="/start-project" className="ocean-close-link">Tell us what your business needs help with <span aria-hidden="true">↗</span></Link>
          <div className="ocean-close-bottom"><Link href="/" aria-label="Blyu home">Blyu / Ocean</Link><span>Business growth starts with understanding.</span></div>
        </div>
      </section>
      <OceanEntrance />
    </main>
  );
}
