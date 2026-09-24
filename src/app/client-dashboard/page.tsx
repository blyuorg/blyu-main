import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import "./dashboard.css";

export const metadata: Metadata = { title: "Your projects | Blyu" };

export default async function ClientDashboardPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) redirect("/start-project");

  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      // A Server Component cannot set cookies. The OAuth callback writes the initial session.
      setAll() {},
    },
  });
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/start-project");

  const { data: projects, error: listError } = await supabase
    .from("project_intakes")
    .select("id, first_name, last_name, services, requirements, created_at, document_path, voice_path")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <main className="dashboard-page">
    <header className="dashboard-header shell">
      <Link href="/" className="dashboard-logo">BLYU<span>↗</span></Link>
      <span>CLIENT SPACE</span>
      <Link href="/">Back to home ↗</Link>
    </header>
    <section className="dashboard-main shell">
      <p className="dashboard-kicker">HELLO, {user.email?.split("@")[0]?.toUpperCase() ?? "FRIEND"}</p>
      <h1>Your next chapter <em>starts here.</em></h1>
      <p className="dashboard-intro">Your submitted project briefs are listed below. The full client dashboard is coming next.</p>
      <div className="dashboard-list-head"><h2>Your project briefs</h2><Link href="/start-project">Start another project ↗</Link></div>
      {listError ? <p className="dashboard-message">We couldn’t load your briefs right now. Please refresh this page.</p>
        : projects?.length ? <div className="dashboard-list">{projects.map((project, index) => <article key={project.id} className="dashboard-card">
          <span>{String(index + 1).padStart(2, "0")} / PROJECT BRIEF</span>
          <h3>{project.services.join(" + ")}</h3>
          <p>{project.requirements || "Brief shared as an attachment or voice note."}</p>
          <div><span>By {project.first_name} {project.last_name}</span><span>{new Date(project.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
          {(project.document_path || project.voice_path) && <small>{project.document_path ? "Document attached" : ""}{project.document_path && project.voice_path ? " · " : ""}{project.voice_path ? "Voice note attached" : ""}</small>}
        </article>)}</div>
        : <p className="dashboard-message">No briefs yet. When you submit one, it will appear here.</p>}
    </section>
  </main>;
}
