export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMins: number;
  /** ISO date. */
  publishedAt: string;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    slug: "documents-to-check-before-buying-property",
    title: "10 documents to check before you buy a property",
    excerpt:
      "A clean title is the most important thing you are paying for. Here is the paperwork to verify before you hand over an advance.",
    category: "Buying guide",
    readMins: 5,
    publishedAt: "2026-11-10",
    sections: [
      {
        heading: "Start with ownership",
        paragraphs: [
          "Ask the seller for the complete chain of title documents, not just the latest sale deed. You want to see how the property reached the current owner, and that every link in that chain is registered.",
        ],
        bullets: [
          "Sale deed or gift/partition deed, with all earlier deeds",
          "Encumbrance certificate for the last 13–30 years, showing no pending loans or claims",
          "Latest property tax receipts and utility bills in the seller's name",
        ],
      },
      {
        heading: "Check approvals",
        paragraphs: [
          "For apartments and new projects, make sure the builder has the permissions required to sell. Rules differ by state, so confirm with your local authority.",
        ],
        bullets: [
          "Approved building plan and commencement or occupancy certificate",
          "RERA registration number of the project, where applicable",
          "Society or association no-objection certificate for resale flats",
        ],
      },
      {
        heading: "Before you pay",
        paragraphs: [
          "Get a lawyer to review the documents, pay by traceable bank transfer, and put every agreed term — price, possession date, and what happens if either side backs out — in a written agreement.",
        ],
      },
    ],
  },
  {
    slug: "home-loan-emi-and-eligibility-explained",
    title: "Home loan EMI and eligibility, explained simply",
    excerpt:
      "How lenders decide how much you can borrow, what drives your monthly instalment, and how to keep the total interest down.",
    category: "Finance",
    readMins: 4,
    publishedAt: "2026-11-03",
    sections: [
      {
        heading: "What decides your EMI",
        paragraphs: [
          "Your EMI depends on three things: the loan amount, the interest rate and the tenure. A longer tenure lowers the monthly amount but increases the total interest you pay over the life of the loan.",
        ],
      },
      {
        heading: "How much can you borrow",
        paragraphs: [
          "Most lenders look at your income and existing obligations. A common rule of thumb is that all your EMIs together should not exceed about half of your monthly income. Our eligibility calculator uses this approach to give you a quick estimate.",
        ],
      },
      {
        heading: "Ways to reduce the burden",
        bullets: [
          "Make the largest down payment you can comfortably afford",
          "Compare rates from several lenders before choosing",
          "Prepay a part of the loan whenever you have surplus funds",
          "Clear small existing loans first to improve eligibility",
        ],
      },
    ],
  },
  {
    slug: "nri-property-buying-checklist",
    title: "NRI property buying checklist",
    excerpt:
      "Living abroad and planning to invest back home? Here is what to organise before you buy, from paperwork to power of attorney.",
    category: "NRI guide",
    readMins: 5,
    publishedAt: "2026-10-27",
    sections: [
      {
        heading: "Know the rules",
        paragraphs: [
          "Non-resident Indians can generally buy residential and commercial property, but there are restrictions on agricultural land, plantations and farmhouses. Check current regulations with a qualified advisor before you commit.",
        ],
      },
      {
        heading: "Organise your paperwork",
        bullets: [
          "Valid passport, visa or residence proof, and PAN card",
          "An NRE or NRO bank account for the payments",
          "A power of attorney for a trusted person if you cannot be present for registration",
          "Tax documents from both countries for future planning",
        ],
      },
      {
        heading: "Protect yourself",
        paragraphs: [
          "Insist on a lawyer-verified title, inspect the property (or have someone you trust do it), and avoid paying large cash amounts. Havenly's legal advice service can connect you with an advisor.",
        ],
      },
    ],
  },
  {
    slug: "property-registration-steps-and-costs",
    title: "Property registration: steps and costs at a glance",
    excerpt:
      "From stamp duty to the sub-registrar's office — the steps to make your purchase legally yours, and the costs to budget for.",
    category: "Legal",
    readMins: 4,
    publishedAt: "2026-10-18",
    sections: [
      {
        heading: "The basic steps",
        bullets: [
          "Agree the sale price and sign an agreement for sale",
          "Pay stamp duty and registration fee as per your state's rates",
          "Book a slot at the sub-registrar's office",
          "Both parties and two witnesses sign the sale deed in person",
          "Collect the registered deed and apply for mutation of records",
        ],
      },
      {
        heading: "Budget for the costs",
        paragraphs: [
          "Stamp duty and registration fees vary by state, property type and sometimes the buyer's profile. Always check the current rates with your state's registration department, and keep a buffer for legal and documentation fees.",
        ],
      },
      {
        heading: "After registration",
        paragraphs: [
          "Update the property tax records, transfer electricity and water connections, and store certified copies of the deed in a safe place.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
