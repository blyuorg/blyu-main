import { getIntakeAttachment, removeIntakeAttachment } from "@/lib/intake-attachments";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export type IntakeDraft = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  services: string[];
  otherService: string;
  requirements: string;
};

export const intakeDraftKey = "blyu-project-intake-draft";
export const intakeStepKey = "blyu-project-intake-step";

export const blankIntakeDraft: IntakeDraft = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  services: [],
  otherService: "",
  requirements: "",
};

const bucket = "project-intake-attachments";

function extensionFor(type: string) {
  switch (type) {
    case "application/pdf": return "pdf";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return "docx";
    case "text/plain": return "txt";
    case "image/png": return "png";
    case "image/jpeg": return "jpg";
    case "audio/mp4": return "m4a";
    case "audio/ogg": return "ogg";
    default: return "webm";
  }
}

export async function saveProjectIntake(draft: IntakeDraft) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase is not configured on this site yet.");

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error("Please connect your Google account before sending your brief.");
  }

  const { data: existing, error: lookupError } = await supabase
    .from("project_intakes")
    .select("id")
    .eq("id", draft.id)
    .maybeSingle();
  if (lookupError) throw new Error("We could not check your brief. Please try again.");
  if (existing) {
    sessionStorage.removeItem(intakeDraftKey);
    sessionStorage.removeItem(intakeStepKey);
    await Promise.allSettled([
      removeIntakeAttachment("document"),
      removeIntakeAttachment("voice"),
    ]);
    return { id: existing.id as string, email: userData.user.email ?? draft.email };
  }

  const upload = async (kind: "document" | "voice") => {
    const attachment = await getIntakeAttachment(kind);
    if (!attachment) return null;
    const type = attachment.type.split(";")[0];
    const path = `${userData.user.id}/${draft.id}/${crypto.randomUUID()}-${kind}.${extensionFor(type)}`;
    const { error } = await supabase.storage.from(bucket).upload(path, attachment.blob, {
      contentType: type,
      upsert: false,
    });
    if (error) throw new Error(`Your ${kind} could not be uploaded. Please try again.`);
    return path;
  };

  const documentPath = await upload("document");
  const voicePath = await upload("voice");
  const { error: insertError } = await supabase.from("project_intakes").insert({
    id: draft.id,
    user_id: userData.user.id,
    first_name: draft.firstName.trim(),
    last_name: draft.lastName.trim(),
    email: draft.email.trim().toLowerCase(),
    phone: draft.phone.trim(),
    services: draft.services,
    other_service: draft.otherService.trim() || null,
    requirements: draft.requirements.trim() || null,
    document_path: documentPath,
    voice_path: voicePath,
  });
  if (insertError) throw new Error("Your brief could not be saved. Please try again.");

  sessionStorage.removeItem(intakeDraftKey);
  sessionStorage.removeItem(intakeStepKey);
  await Promise.allSettled([
    removeIntakeAttachment("document"),
    removeIntakeAttachment("voice"),
  ]);
  return { id: draft.id, email: userData.user.email ?? draft.email };
}
