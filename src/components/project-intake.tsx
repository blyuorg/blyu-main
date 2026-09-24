"use client";

import Link from "next/link";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import {
  getIntakeAttachment,
  removeIntakeAttachment,
  saveIntakeAttachment,
} from "@/lib/intake-attachments";
import {
  blankIntakeDraft,
  intakeDraftKey,
  intakeStepKey,
  saveProjectIntake,
  type IntakeDraft,
} from "@/lib/project-intake";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const stepNames = ["Your name", "Your contact", "What you need", "Your brief", "Connect"];
const serviceChoices = [
  { title: "Strategy", note: "Direction and a clear plan" },
  { title: "Design", note: "Brand, UX, and interfaces" },
  { title: "Engineering", note: "Products and platforms" },
  { title: "Automation", note: "Smarter workflows" },
  { title: "Consultancy", note: "A partner to think it through" },
  { title: "Something else", note: "Tell us in your own words" },
];

const documentTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/png",
  "image/jpeg",
]);

type AttachmentInfo = { name: string; size: number };

export function ProjectIntake() {
  const [draft, setDraft] = useState<IntakeDraft>(blankIntakeDraft);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [documentInfo, setDocumentInfo] = useState<AttachmentInfo | null>(null);
  const [voiceInfo, setVoiceInfo] = useState<AttachmentInfo | null>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [busy, setBusy] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [error, setError] = useState("");
  const [connectedEmail, setConnectedEmail] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeStarted = useRef(false);

  useEffect(() => {
    let active = true;
    const restored = (() => {
      try {
        const saved = sessionStorage.getItem(intakeDraftKey);
        const parsed = saved ? JSON.parse(saved) as Partial<IntakeDraft> : {};
        return {
          ...blankIntakeDraft,
          ...parsed,
          id: parsed.id || crypto.randomUUID(),
          services: Array.isArray(parsed.services) ? parsed.services : [],
        };
      } catch {
        return { ...blankIntakeDraft, id: crypto.randomUUID() };
      }
    })();
    queueMicrotask(() => {
      if (!active) return;
      setDraft(restored);
      const savedStep = Number(sessionStorage.getItem(intakeStepKey));
      setStep(Number.isInteger(savedStep) ? Math.min(4, Math.max(0, savedStep)) : 0);
      setHydrated(true);
    });

    void Promise.all([getIntakeAttachment("document"), getIntakeAttachment("voice")])
      .then(([document, voice]) => {
        if (!active) return;
        if (document) setDocumentInfo({ name: document.name, size: document.blob.size });
        if (voice) setVoiceInfo({ name: voice.name, size: voice.blob.size });
      })
      .catch(() => {
        if (active) setError("This browser cannot keep attachments between pages. You can still type your brief.");
      });

    const params = new URLSearchParams(window.location.search);
    if (params.has("auth_error")) {
      queueMicrotask(() => {
        if (!active) return;
        setStep(4);
        setError("Google sign-in did not finish. Please try connecting again.");
      });
    } else if (params.get("connected") === "1" && !resumeStarted.current) {
      resumeStarted.current = true;
      queueMicrotask(() => {
        if (!active) return;
        setStep(4);
        setBusy(true);
      });
      void saveProjectIntake(restored)
        .then(({ id, email }) => {
          if (!active) return;
          setConnectedEmail(email);
          setSubmittedId(id);
          setStep(5);
        })
        .catch((cause: unknown) => {
          if (active) {
            setSaveFailed(true);
            setError(cause instanceof Error ? cause.message : "We could not send your brief. Please retry.");
          }
        })
        .finally(() => { if (active) setBusy(false); });
    }

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated || submittedId) return;
    sessionStorage.setItem(intakeDraftKey, JSON.stringify(draft));
    sessionStorage.setItem(intakeStepKey, String(step));
  }, [draft, step, hydrated, submittedId]);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
    if (recorder.current) {
      recorder.current.onstop = null;
      if (recorder.current.state === "recording") recorder.current.stop();
    }
    stream.current?.getTracks().forEach((track) => track.stop());
  }, []);

  const update = (field: keyof IntakeDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const toggleService = (choice: string) => {
    setDraft((current) => ({
      ...current,
      services: current.services.includes(choice)
        ? current.services.filter((item) => item !== choice)
        : [...current.services, choice],
    }));
    setError("");
  };

  const validate = () => {
    if (step === 0 && (!draft.firstName.trim() || !draft.lastName.trim())) {
      return "Please add your first and last name.";
    }
    if (step === 1) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) return "Please enter a valid email address.";
      if (draft.phone.replace(/\D/g, "").length < 7) return "Please enter a contact number.";
    }
    if (step === 2) {
      if (!draft.services.length) return "Choose at least one area where you need help.";
      if (draft.services.includes("Something else") && !draft.otherService.trim()) return "Tell us what else you need.";
    }
    if (step === 3 && !draft.requirements.trim() && !documentInfo && !voiceInfo) {
      return "Type a brief, attach a document, or record a voice note.";
    }
    return "";
  };

  const next = () => {
    const message = validate();
    if (message) return setError(message);
    setError("");
    setStep((current) => Math.min(current + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseDocument = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!documentTypes.has(file.type) || file.size > 10 * 1024 * 1024) {
      event.target.value = "";
      setError("Use a PDF, DOCX, TXT, PNG, or JPG file under 10 MB.");
      return;
    }
    setBusy(true);
    try {
      await saveIntakeAttachment("document", { name: file.name, type: file.type, blob: file });
      setDocumentInfo({ name: file.name, size: file.size });
      setError("");
    } catch {
      setError("This file could not be kept for sign-in. Try a smaller file or type your brief.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  const clearAttachment = async (kind: "document" | "voice") => {
    try {
      await removeIntakeAttachment(kind);
      if (kind === "document") setDocumentInfo(null);
      else setVoiceInfo(null);
    } catch {
      setError("We could not remove that attachment. Please try again.");
    }
  };

  const recordVoice = async () => {
    if (recording) {
      recorder.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Voice recording is unavailable in this browser. You can type or upload a brief instead.");
      return;
    }
    try {
      const microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = microphone;
      const preferred = ["audio/webm", "audio/mp4", "audio/ogg"]
        .find((type) => MediaRecorder.isTypeSupported(type));
      if (!preferred) {
        microphone.getTracks().forEach((track) => track.stop());
        setError("Voice recording is unavailable in this browser. You can type or upload a brief instead.");
        return;
      }
      const mediaRecorder = new MediaRecorder(microphone, { mimeType: preferred });
      recorder.current = mediaRecorder;
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      mediaRecorder.onstop = () => {
        if (timer.current) clearInterval(timer.current);
        microphone.getTracks().forEach((track) => track.stop());
        setRecording(false);
        const type = mediaRecorder.mimeType.split(";")[0] || "audio/webm";
        const blob = new Blob(chunks, { type });
        if (!blob.size) return setError("No audio was captured. Please try recording again.");
        if (blob.size > 10 * 1024 * 1024) return setError("Your voice note is over 10 MB. Please make a shorter recording.");
        setBusy(true);
        void saveIntakeAttachment("voice", {
          name: `voice-note.${type === "audio/mp4" ? "m4a" : type === "audio/ogg" ? "ogg" : "webm"}`,
          type,
          blob,
        }).then(() => {
          setVoiceInfo({ name: "Voice note", size: blob.size });
          setError("");
        }).catch(() => setError("Your voice note could not be kept. Please try again."))
          .finally(() => setBusy(false));
      };
      mediaRecorder.start();
      setSeconds(0);
      setRecording(true);
      setError("");
      timer.current = setInterval(() => {
        setSeconds((elapsed) => {
          if (elapsed >= 119 && mediaRecorder.state === "recording") mediaRecorder.stop();
          return elapsed + 1;
        });
      }, 1000);
    } catch {
      stream.current?.getTracks().forEach((track) => track.stop());
      stream.current = null;
      setError("Microphone permission was not granted. You can type or upload a brief instead.");
    }
  };

  const connectWithGoogle = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Google sign-in needs the Supabase URL and publishable key in this deployment.");
      return;
    }
    setBusy(true);
    setError("");
    sessionStorage.setItem(intakeDraftKey, JSON.stringify(draft));
    sessionStorage.setItem(intakeStepKey, "4");
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (signInError) {
        setError(signInError.message);
        setBusy(false);
      }
    } catch {
      setError("Google sign-in could not start. Please try again.");
      setBusy(false);
    }
  };

  const retrySave = async () => {
    setBusy(true);
    setSaveFailed(false);
    setError("");
    try {
      const { id, email } = await saveProjectIntake(draft);
      setConnectedEmail(email);
      setSubmittedId(id);
      setStep(5);
    } catch (cause) {
      setSaveFailed(true);
      setError(cause instanceof Error ? cause.message : "We could not send your brief.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="intake-page">
      <div className="intake-curtain" aria-hidden="true" />
      <header className="intake-header shell">
        <Link href="/" className="intake-brand" aria-label="Blyu home">BLYU<span>↗</span></Link>
        <span>START A PROJECT</span>
        <Link href="/" className="intake-exit">Exit <span aria-hidden="true">×</span></Link>
      </header>

      <div className="intake-shell shell">
        <aside className="intake-sidebar" aria-label="Your progress">
          <p>LET’S MAKE IT REAL.</p>
          <ol>
            {stepNames.map((name, index) => (
              <li key={name} className={step === index ? "active" : step > index ? "done" : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>{name}
              </li>
            ))}
          </ol>
          <small>Take your time. Your answers stay on this device until you sign in.</small>
        </aside>

        <section className="intake-content" aria-live="polite">
          {step < 5 ? (
            <div className="intake-step" key={step}>
              <p className="intake-step-count">QUESTION {String(step + 1).padStart(2, "0")} <span>/ 05</span></p>
              {step === 0 && <>
                <h1>What should we <em>call you?</em></h1>
                <p className="intake-lead">A good partnership starts with a hello.</p>
                <div className="intake-fields two">
                  <label>First name<input autoFocus autoComplete="given-name" value={draft.firstName} onChange={(event) => update("firstName", event.target.value)} placeholder="Your first name" maxLength={100} /></label>
                  <label>Last name<input autoComplete="family-name" value={draft.lastName} onChange={(event) => update("lastName", event.target.value)} placeholder="Your last name" maxLength={100} /></label>
                </div>
              </>}
              {step === 1 && <>
                <h1>How can we <em>reach you?</em></h1>
                <p className="intake-lead">Only for this project conversation. No noise.</p>
                <div className="intake-fields">
                  <label>Email address<input autoFocus type="email" autoComplete="email" value={draft.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" maxLength={254} /></label>
                  <label>Contact number<input type="tel" autoComplete="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91 98765 43210" maxLength={25} /></label>
                </div>
              </>}
              {step === 2 && <>
                <h1>What do you <em>need?</em></h1>
                <p className="intake-lead">Pick everything that feels relevant. We’ll figure out the details together.</p>
                <div className="intake-choices">
                  {serviceChoices.map((choice, index) => (
                    <button type="button" key={choice.title} className={draft.services.includes(choice.title) ? "selected" : ""} aria-pressed={draft.services.includes(choice.title)} onClick={() => toggleService(choice.title)}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{choice.title}</strong>
                      <small>{choice.note}</small>
                      <b aria-hidden="true">{draft.services.includes(choice.title) ? "✓" : "+"}</b>
                    </button>
                  ))}
                </div>
                {draft.services.includes("Something else") && <label className="intake-other">Tell us what else you have in mind<input value={draft.otherService} onChange={(event) => update("otherService", event.target.value)} placeholder="Something else you need..." maxLength={180} /></label>}
              </>}
              {step === 3 && <>
                <h1>Tell us the <em>details.</em></h1>
                <p className="intake-lead">Write it, attach it, or say it. Choose whichever is easiest.</p>
                <div className="intake-requirements">
                  <label className="intake-written">Write your brief<textarea value={draft.requirements} onChange={(event) => update("requirements", event.target.value)} placeholder="What are you trying to make or solve? What matters most?" maxLength={10000} rows={6} /></label>
                  <div className="intake-upload-row">
                    <label className="intake-upload"><span aria-hidden="true">↥</span><strong>Upload a document</strong><small>PDF, DOCX, TXT, PNG, JPG · 10 MB max</small><input type="file" accept=".pdf,.docx,.txt,.png,.jpg,.jpeg" onChange={chooseDocument} /></label>
                    <button className={`intake-record${recording ? " recording" : ""}`} type="button" onClick={recordVoice} disabled={busy}><span aria-hidden="true">{recording ? "■" : "●"}</span><strong>{recording ? "Stop recording" : "Record a voice note"}</strong><small>{recording ? `${seconds}s / 120s` : "Speak for up to two minutes"}</small></button>
                  </div>
                  {(documentInfo || voiceInfo) && <div className="intake-attachments">
                    {documentInfo && <div><span>DOCUMENT · {documentInfo.name}</span><button type="button" onClick={() => void clearAttachment("document")}>Remove</button></div>}
                    {voiceInfo && <div><span>VOICE NOTE · {(voiceInfo.size / 1024).toFixed(0)} KB</span><button type="button" onClick={() => void clearAttachment("voice")}>Remove</button></div>}
                  </div>}
                </div>
              </>}
              {step === 4 && <>
                <h1>One last <em>connection.</em></h1>
                <p className="intake-lead">Continue with Google so your brief belongs to you and can follow you into the client dashboard.</p>
                <div className="intake-review">
                  <span>YOUR BRIEF AT A GLANCE</span>
                  <p><b>Name</b>{draft.firstName} {draft.lastName}</p>
                  <p><b>Contact</b>{draft.email} · {draft.phone}</p>
                  <p><b>Looking for</b>{draft.services.join(", ")}</p>
                  <p><b>Requirements</b>{draft.requirements.trim() ? "Written brief" : ""}{documentInfo ? `${draft.requirements.trim() ? " · " : ""}Document` : ""}{voiceInfo ? " · Voice note" : ""}</p>
                </div>
                {saveFailed ? <button className="intake-google" type="button" onClick={() => void retrySave()} disabled={busy}>
                  {busy ? "Saving…" : "Retry saving your brief"}<b aria-hidden="true">↗</b>
                </button> : <button className="intake-google" type="button" onClick={() => void connectWithGoogle()} disabled={busy}>
                  <span aria-hidden="true">G</span>{busy ? "Connecting…" : "Continue with Google"}<b aria-hidden="true">↗</b>
                </button>}
                <p className="intake-privacy">Your document and voice note are uploaded to private storage only after you sign in.</p>
              </>}
              {error && <p className="intake-error" role="alert">{error}</p>}
              <div className="intake-actions">
                {step > 0 && <button type="button" className="intake-back" onClick={() => { setStep(step - 1); setError(""); }} disabled={busy || recording}>← Back</button>}
                {step < 4 && <button type="button" className="intake-next" onClick={next} disabled={busy || recording}>Next <span aria-hidden="true">↗</span></button>}
              </div>
            </div>
          ) : (
            <div className="intake-step intake-finished">
              <p className="intake-step-count">ALL SET <span>/ BLYU</span></p>
              <h1>Let’s make it <em>happen.</em></h1>
              <p className="intake-lead">Your project brief is saved. We’ll use it to start the conversation.</p>
              {connectedEmail && <p className="intake-connected">Connected with Google · {connectedEmail}</p>}
              <div className="intake-finish-actions">
                <Link href="/">Back to home <span aria-hidden="true">↗</span></Link>
                <Link href="/client-dashboard">Continue to client dashboard <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          )}
        </section>
      </div>
      <footer className="intake-footer shell"><span>© BLYU</span><span>GOOD THINGS START WITH A CONVERSATION.</span></footer>
    </main>
  );
}
