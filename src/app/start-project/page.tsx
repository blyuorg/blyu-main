import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageMotion } from "@/components/page-motion";

export const metadata: Metadata = {
  title: "Start a project — Blyu",
  description: "Tell Blyu what you are building and start a conversation.",
};

export default function StartProjectPage() {
  return (
    <PageMotion>
      <main className="project-page">
        <header className="project-page-header shell">
          <Link className="brand brand-logo" href="/" aria-label="Blyu home" />
          <Link className="project-page-back" href="/">
            ← Back to home
          </Link>
        </header>
        <section className="contact project-contact shell" data-fade>
          <div>
            <div className="eyebrow">
              <span />
              Let’s build
            </div>
            <h1>
              Ready when <em>you are.</em>
            </h1>
            <p>
              Tell us what you’re making. We’ll bring the thinking, the craft,
              and the way forward.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
    </PageMotion>
  );
}
