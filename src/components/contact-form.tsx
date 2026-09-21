"use client";
import { FormEvent, useState } from "react";
export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/project-enquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    if (response.ok) {
      event.currentTarget.reset();
      setStatus("success");
    } else setStatus("error");
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <label htmlFor="name">Your name</label>
      <input id="name" name="name" required placeholder="Jane Smith" />
      <label htmlFor="email">Work email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="jane@company.com"
      />
      <label htmlFor="brief">What are you building?</label>
      <textarea
        id="brief"
        name="brief"
        required
        placeholder="Tell us a little about the challenge…"
      />
      <button className="button" disabled={status === "sending"} type="submit">
        {status === "sending" ? "Sending…" : "Send your brief"} <span>↗</span>
      </button>
      <p
        className={`form-status ${status === "error" ? "error" : ""}`}
        aria-live="polite"
      >
        {status === "success"
          ? "Thanks—we’ll be in touch shortly."
          : status === "error"
            ? "Something went wrong. Please email hello@blyu.net."
            : ""}
      </p>
    </form>
  );
}
