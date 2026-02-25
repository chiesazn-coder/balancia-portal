export type Port = {
  slug: string;
  name: string;
  region: string;

  overview: string;
  operationalNote: string;

  workingHours: string;
  vesselTypes: string[];
  tags: string[];

  restrictions: string[];      // NEW
  seasonalNotes: string[];     // NEW
  updatedAt: string;
};


export const ports: Port[] = [
  {
    slug: "batam",
    name: "Batam",
    region: "Riau Islands",
    overview:
      "Batam often serves as a coordination-heavy port cluster with multiple terminals and frequent vessel movements. Execution tends to depend on terminal choice, anchorage management, and timing alignment across parties.",
    operationalNote:
      "Traffic density and multi-point coordination tend to shape arrival sequencing. A single source of truth for updates is usually helpful when conditions shift.",
    workingHours: "Varies by terminal and operation type",
    vesselTypes: ["Tanker", "Bulk", "Container", "Offshore"],
    tags: ["High traffic", "Multi-terminal", "Anchorage activity"],
    restrictions: [
      "Operational sequence may be influenced by anchorage traffic and pilotage availability.",
      "Terminal-specific practices can differ even within the same port cluster.",
      "Documentation timing can shape inspection flow and berth readiness.",
    ],
    seasonalNotes: [
      "Seasonal wind and visibility shifts can influence pilot boarding and small craft movements.",
      "Traffic peaks may cause schedule variability during certain trading cycles.",
    ],
    updatedAt: "2026-02-05",
  },
  {
    slug: "surabaya",
    name: "Surabaya",
    region: "East Java",
    overview:
      "Surabaya is a major commercial port where documentation discipline and terminal rhythm often matter for schedule stability. Predictability is usually gained through early confirmation loops.",
    operationalNote:
      "Clear confirmation loops reduce last-minute friction during arrival and cargo sequencing. Terminal working patterns should be understood early to avoid assumptions.",
    workingHours: "Typically continuous operations by terminal policy",
    vesselTypes: ["Bulk", "Container", "General cargo"],
    tags: ["Commercial hub", "Terminal rhythm", "Document discipline"],
    restrictions: [
      "Terminal procedures may vary depending on berth allocation and cargo type.",
      "Peak port activity can influence berthing sequence and service timing.",
      "Cargo readiness and shore-side coordination often shape overall stay duration.",
    ],
    seasonalNotes: [
      "Rain periods may affect visibility and operational tempo at certain times.",
      "Local traffic conditions may influence tug and pilot scheduling.",
    ],
    updatedAt: "2026-02-03",
  },
  // ... lanjutkan port lainnya dengan field restrictions + seasonalNotes
];

