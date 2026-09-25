import type { Metadata } from "next";
import { OceanExperience } from "@/components/ocean-experience";
import "./ocean-page.css";

export const metadata: Metadata = {
  title: "Ocean — Blyu",
  description:
    "Ocean helps Blyu clients understand business needs and turn a clear growth plan into marketing and sales momentum.",
};

export default function OceanPage() {
  return <OceanExperience />;
}
