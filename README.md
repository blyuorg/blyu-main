# Blyu website

The Blyu website, built with Next.js, TypeScript, and Supabase-backed project intake.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configure Supabase

1. Create a Supabase project.
2. Run [the project-enquiries migration](supabase/migrations/20260921214615_create_project_enquiries.sql) in the Supabase SQL editor, or apply it with the Supabase CLI.
3. Copy `.env.example` to `.env.local` and set the project URL and server-only service-role key.

For the Start a Project flow, also apply [the project-intake migration](supabase/migrations/20260924213424_create_project_intake_flow.sql) and set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. The `client-dashboard` Supabase project already has this migration applied. Enable Google Auth in Supabase and allow both local and production `/auth/callback` redirect URLs.

The intake wizard saves a draft in the browser, then uses Google sign-in before storing the brief. Uploaded documents and voice notes go to a private Storage bucket. Only the signed-in owner can read their brief or attachments. The `/client-dashboard` route is an authenticated listing; the full dashboard is intentionally left for the next phase.

`SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser. The form writes through the server-side `/api/project-enquiries` route, while the table retains Row Level Security and has no direct browser privileges.

## Deploy to Vercel

1. Import this repository into a Vercel project or run `vercel link` after authenticating in the intended team.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as Vercel environment variables.
   Also add `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for Google sign-in and project intake. The publishable key is browser-safe; never expose the service-role key.
3. Deploy a preview, submit the contact form, and confirm the enquiry appears in `project_enquiries`.
4. Promote the verified preview to production and connect the Blyu domain.

## Checks

```bash
npm run lint
npm run build
```
