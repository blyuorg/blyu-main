# Blyu website

The production marketing site for Blyu, built with Next.js, TypeScript, and Supabase-ready project enquiries.

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

`SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser. The form writes through the server-side `/api/project-enquiries` route, while the table retains Row Level Security and has no direct browser privileges.

## Deploy to Vercel

1. Import this repository into a Vercel project or run `vercel link` after authenticating in the intended team.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as Vercel environment variables.
3. Deploy a preview, submit the contact form, and confirm the enquiry appears in `project_enquiries`.
4. Promote the verified preview to production and connect the Blyu domain.

## Checks

```bash
npm run lint
npm run build
```
