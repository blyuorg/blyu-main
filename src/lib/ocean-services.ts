export type OceanService = {
  slug: string;
  title: string;
  description: string;
  detail: string;
  includes: [string, string, string];
};

export const oceanServices: OceanService[] = [
  {
    slug: "business-market-research",
    title: "Business and market research",
    description: "Understand customers, competitors, the current offer, and where the business has room to improve.",
    detail: "We begin by learning how the business works today. Research helps identify the people to reach, the alternatives they consider, and the questions a useful plan should answer.",
    includes: ["Customer and audience understanding", "Competitor and market context", "A clearer view of the current offer"],
  },
  {
    slug: "brand-strategy-messaging",
    title: "Brand strategy and messaging",
    description: "Make the offer easier to understand and explain why it matters to the right customer.",
    detail: "A strong message connects what the business offers with what its customers actually need. We shape a clear direction that can guide the website, campaigns, and sales conversations.",
    includes: ["Positioning and key messages", "Offer clarity", "A consistent voice across touchpoints"],
  },
  {
    slug: "ads-campaigns",
    title: "Ads and campaigns",
    description: "Plan the audience, message, creative idea, budget, destination, and measure for a campaign.",
    detail: "A campaign should have a reason to exist and a way to be evaluated. We connect its audience, creative, landing destination, and budget to an agreed business goal.",
    includes: ["Audience and channel planning", "Campaign message and creative direction", "Measures for review and improvement"],
  },
  {
    slug: "short-infographic-videos",
    title: "Short infographic videos",
    description: "Explain a service, process, or customer question with simple words, visuals, and movement.",
    detail: "Some ideas are easier to grasp when they move. We plan short visual explanations around one useful message, keeping the story understandable without unnecessary complexity.",
    includes: ["A focused message and script", "Visual explanation and storyboard", "Short-form motion content"],
  },
  {
    slug: "content-search",
    title: "Content and search",
    description: "Plan useful articles, posts, website copy, and search improvements around real customer questions.",
    detail: "Useful content meets people where their questions begin. We organize topics and website language around what customers need to understand before taking the next step.",
    includes: ["Customer-question research", "Website and article planning", "Search-focused content improvements"],
  },
  {
    slug: "lead-qualification",
    title: "Lead qualification",
    description: "Agree on what makes an inquiry a good fit and how it moves to the right person for follow-up.",
    detail: "More inquiries are not always better inquiries. We help define what a useful lead looks like and make the handoff and follow-up process easier to manage.",
    includes: ["Good-fit criteria", "Inquiry routing", "A practical follow-up process"],
  },
  {
    slug: "crm-sales-pipeline",
    title: "CRM and sales pipeline",
    description: "Keep customer conversations, next steps, and opportunities in a system the team can use.",
    detail: "A simple, usable pipeline helps a team see where each conversation stands. The aim is clearer ownership and next steps, not more administration for its own sake.",
    includes: ["Pipeline stages", "Conversation and opportunity tracking", "Clear next-step ownership"],
  },
  {
    slug: "outreach-sales-support",
    title: "Outreach and sales support",
    description: "Shape appropriate messages, presentations, and follow-up guidance for the client’s sales process.",
    detail: "Sales materials should help people have better conversations. We shape outreach and follow-up around the audience, the offer, and the way the client's team actually sells.",
    includes: ["Outreach messaging", "Presentation and sales material direction", "Follow-up guidance"],
  },
];

export function getOceanService(slug: string) {
  return oceanServices.find((service) => service.slug === slug);
}
