import type { Metadata } from "next";
import { ProjectIntake } from "@/components/project-intake";
import "./start-project.css";

export const metadata: Metadata = {
  title: "Start a project — Blyu",
  description: "Tell us what you need, in your own way. Start a project with Blyu.",
};

export default function StartProjectPage() {
  return <ProjectIntake />;
}
