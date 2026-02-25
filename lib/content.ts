export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "image"; alt: string; src: string };




export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  minutes: number;
  updatedAt: string;
  category: "Port operations" | "Operational risk" | "Crew & welfare" | "Communication";
  content: ArticleBlock[];
};



export const articles: Article[] = [
  {
    slug: "ciqp-clearance-indonesia",
    title: "CIQP Clearance in Indonesia: What Usually Shapes the First Six Hours of a Port Call",
    excerpt:
      "Most port call delays begin quietly. The first hours of CIQP clearance often determine how smoothly the entire operation unfolds.",
    minutes: 7,
    updatedAt: "2026-02-05",
    category: "Port operations",
content: [
  { type: "image", src: "/images/ciqp-arrival.jpg", alt: "Vessel approaching Indonesian port" },

  { type: "p", text: "When a vessel approaches port limits in Indonesia, the first few hours rarely feel dramatic. Yet this early window quietly shapes how the entire port call unfolds." },
  { type: "p", text: "Most operational friction during port stays can be traced back to how CIQP clearance begins. Not because procedures are unclear, but because expectations are not always aligned before arrival." },

  { type: "h2", text: "How CIQP Clearance Actually Begins" },
  { type: "p", text: "CIQP clearance does not start when inspectors step onboard. It begins earlier, when documentation is reviewed and local port practices are taken into account." },

  { type: "h2", text: "Why Small Gaps Create Real Delays" },
  { type: "p", text: "Most delays are caused by timing mismatches rather than missing documents. Because inspections move as a sequence, one unresolved point often pauses everything that follows." },

  { type: "quote", text: "A calm clearance is rarely about speed. It is usually about sequence and confirmation." },

  { type: "h3", text: "What usually helps before arrival" },
  { type: "ul", items: [
      "One source of truth for updates and confirmations",
      "Document review aligned with the local port routine",
      "Clear ownership for each clearance step",
      "Realistic time expectations for inspections"
    ]
  },

  { type: "image", src: "/images/ciqp-documents.jpg", alt: "Port clearance documentation preparation" },

  { type: "h2", text: "A Calm Start Sets the Tone" },
  { type: "p", text: "When CIQP clearance begins with clarity and realistic expectations, the rest of the operation often becomes easier to manage." },
],
  },
];




export const featured = articles.slice(0, 4);

export const ports = [
  { name: "Batam", note: "High traffic, multi-terminal coordination." },
  { name: "Surabaya", note: "Documentation discipline matters for schedule." },
  { name: "Cigading", note: "Industrial flow, operational timing is key." },
  { name: "Bahodopi", note: "Project cargo rhythm, local practice heavy." },
  { name: "Weda Bay", note: "Remote coordination, lead time helps." },
  { name: "Tarahan", note: "Operational clarity prevents waiting surprises." },
];

export const courses = [
  {
    title: "Indonesia Port Call Fundamentals",
    note: "Long-form lessons with practical operational context.",
  },
  {
    title: "Risk Points During Arrival and Clearance",
    note: "What usually triggers delays, and what should be confirmed early.",
  },
];
