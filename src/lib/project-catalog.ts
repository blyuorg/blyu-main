export type Project = {
  slug: string;
  title: string;
  category: string;
  teaser: string;
  brief: string;
  focus: readonly [string, string, string];
  tone: "blue" | "ink" | "sand" | "white" | "lavender";
};

// Editable concept content until the final project names and case studies arrive.
export const projectCatalog: readonly Project[] = [
  {
    slug: "ai-automation",
    title: "AI automation",
    category: "Intelligent systems",
    teaser: "Turn repeated operations into an advantage.",
    brief:
      "A concept for connecting scattered tasks into one clear, dependable workflow. The project page is ready for the real story, screens, and results.",
    focus: ["Workflow mapping", "AI-assisted tools", "Human oversight"],
    tone: "blue",
  },
  {
    slug: "digital-experience",
    title: "Digital experience",
    category: "Product design",
    teaser: "A sharper route from first click to real momentum.",
    brief:
      "A concept for a more intuitive digital journey, from the first interaction through the moments that matter most.",
    focus: ["User journeys", "Interface system", "Conversion flow"],
    tone: "ink",
  },
  {
    slug: "platform-engineering",
    title: "Platform engineering",
    category: "Engineering",
    teaser: "The reliable systems behind the next chapter.",
    brief:
      "A concept for a resilient platform that gives a growing team room to build, ship, and evolve with confidence.",
    focus: ["Architecture", "Developer experience", "Scalability"],
    tone: "sand",
  },
  {
    slug: "brand-interface",
    title: "Brand & interface",
    category: "Brand experience",
    teaser: "A digital identity built to be remembered.",
    brief:
      "A concept for bringing one distinct brand voice into a cohesive, usable digital product experience.",
    focus: ["Visual direction", "Design system", "Interaction design"],
    tone: "white",
  },
  {
    slug: "commerce-experience",
    title: "Commerce experience",
    category: "Digital commerce",
    teaser: "Make the path from discovery to decision feel effortless.",
    brief:
      "An editable concept for a commerce journey that makes browsing clear, selection simple, and checkout reassuring.",
    focus: ["Discovery", "Product pages", "Checkout flow"],
    tone: "lavender",
  },
  {
    slug: "data-dashboard",
    title: "Data dashboard",
    category: "Data products",
    teaser: "Give the important numbers a clearer point of view.",
    brief:
      "An editable concept for turning dense information into useful views and confident day-to-day decisions.",
    focus: ["Information design", "Reporting", "Decision support"],
    tone: "ink",
  },
  {
    slug: "client-portal",
    title: "Client portal",
    category: "Service platform",
    teaser: "One calm place for every next step.",
    brief:
      "An editable concept for a client space that keeps updates, requests, and shared work easy to find.",
    focus: ["Collaboration", "Account experience", "Status tracking"],
    tone: "blue",
  },
  {
    slug: "workflow-platform",
    title: "Workflow platform",
    category: "Operations",
    teaser: "Help complex work move without the friction.",
    brief:
      "An editable concept for coordinating people, approvals, and repeatable processes in one dependable system.",
    focus: ["Process design", "Automation", "Team visibility"],
    tone: "sand",
  },
  {
    slug: "knowledge-assistant",
    title: "Knowledge assistant",
    category: "Applied AI",
    teaser: "The right answer, closer to the work.",
    brief:
      "An editable concept for making trusted team knowledge easier to search, understand, and put to use.",
    focus: ["Knowledge structure", "Search experience", "Trust controls"],
    tone: "white",
  },
  {
    slug: "mobile-product",
    title: "Mobile product",
    category: "Mobile experience",
    teaser: "Useful moments designed for the smallest screen.",
    brief:
      "An editable concept for a focused mobile product that feels fast, familiar, and easy to return to.",
    focus: ["Mobile flows", "Interaction patterns", "Accessibility"],
    tone: "lavender",
  },
];
