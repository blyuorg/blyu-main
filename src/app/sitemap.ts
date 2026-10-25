import type { MetadataRoute } from "next";
import { oceanServices } from "@/lib/ocean-services";
import { getSiteOrigin } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  const pages = ["/", "/work", "/services", "/process", "/ocean", "/start-project"];
  const oceanPages = oceanServices.map(
    ({ slug }) => `/ocean/services/${slug}`,
  );

  return [...pages, ...oceanPages].map((path) => ({
    url: new URL(path, origin).toString(),
  }));
}
