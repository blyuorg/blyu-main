import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const contactEmail =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const brief = typeof body.brief === "string" ? body.brief.trim() : "";
    if (!name || !email.test(contactEmail) || !brief)
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    const supabase = getSupabaseServerClient();
    if (!supabase)
      return NextResponse.json(
        { error: "Lead capture is not configured" },
        { status: 503 },
      );
    const { error } = await supabase
      .from("project_enquiries")
      .insert({ name, email: contactEmail, brief });
    if (error) {
      console.error("Project enquiry insert failed", error.message);
      return NextResponse.json(
        { error: "Unable to send enquiry" },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
