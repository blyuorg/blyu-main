export function getSiteOrigin(): string {
  const configured =
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!configured) return "http://localhost:3000";

  const address = /^https?:\/\//i.test(configured)
    ? configured
    : `https://${configured}`;
  return new URL(address).origin;
}
