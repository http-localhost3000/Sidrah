const BASE = "/images/products/SIDRAH%20FASHION%20PRODUCTS%20IMAGE/";

export const collectionCovers: Record<string, string> = {
  shirts:        BASE + "WhatsApp%20Image%202026-08-25%20at%204.54.08%20PM.jpeg",
  "t-shirts":    BASE + "WhatsApp%20Image%202026-08-25%20at%205.17.26%20PM.jpeg",
  denims:        BASE + "WhatsApp%20Image%202026-08-30%20at%204.36.18%20PM%20(3).jpeg",
  "track-pants": BASE + "WhatsApp%20Image%202026-08-30%20at%204.33.01%20PM%20(5).jpeg",
  shorts:        BASE + "WhatsApp%20Image%202026-08-25%20at%205.33.56%20PM.jpeg",
  "cord-sets":   BASE + "WhatsApp%20Image%202026-08-25%20at%205.35.47%20PM.jpeg",
  "cargo-pants": BASE + "WhatsApp%20Image%202026-08-30%20at%205.45.53%20PM%20(4).jpeg",
  "linen-pants": BASE + "WhatsApp%20Image%202026-08-30%20at%205.24.51%20PM%20(4).jpeg",
  imported:      BASE + "WhatsApp%20Image%202026-08-25%20at%204.53.23%20PM%20(3).jpeg",
};

// Torso-down garment shots read best anchored to the bottom (full garment and
// shoes visible); everything else anchors to the top so faces are never cut.
export const collectionCoverPositions: Record<string, string> = {
  denims:        "object-bottom",
  "track-pants": "object-bottom",
  "linen-pants": "object-bottom",
};
