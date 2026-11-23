export interface Service {
  id: "legal" | "registration" | "building";
  title: string;
  summary: string;
  points: string[];
}

export const services: Service[] = [
  {
    id: "legal",
    title: "Legal advice",
    summary:
      "Get a property lawyer to review the paperwork before you commit, so there are no surprises after you pay.",
    points: [
      "Title verification and ownership chain review",
      "Encumbrance and pending-dispute checks",
      "Review of sale agreements and builder-buyer agreements",
      "Guidance for NRI buyers and sellers",
    ],
  },
  {
    id: "registration",
    title: "Property registration",
    summary:
      "We guide you through stamp duty, documentation and the sub-registrar's visit, from agreement to registered deed.",
    points: [
      "Document checklist and drafting support",
      "Stamp duty and registration fee estimate",
      "Slot booking and on-the-day guidance",
      "Mutation and post-registration follow-up",
    ],
  },
  {
    id: "building",
    title: "Building plan & permits",
    summary:
      "Building on your own plot? Get a plan drawn up and the permits sorted by experienced professionals.",
    points: [
      "Architectural plan and elevation design",
      "Local body approvals and building permit support",
      "Estimation and construction guidance",
      "Interior and landscaping referrals",
    ],
  },
];
