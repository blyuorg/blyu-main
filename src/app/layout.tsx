import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getSiteOrigin } from "@/lib/site-url";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: "Blyu — Digital agency",
  description:
    "Blyu builds the digital products ambitious businesses need next.",
  openGraph: {
    type: "website",
    siteName: "Blyu",
    title: "Blyu — Digital agency",
    description: "Blyu builds the digital products ambitious businesses need next.",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
