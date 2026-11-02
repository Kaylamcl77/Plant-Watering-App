// ============================================================
// data.js — ALL the fake data for your prototype lives here.
//
// There is no database. Everything below is made up, and that is
// on purpose: never put real people's names, emails, phone numbers
// or addresses in this file.
//
// To change what appears on the Explore page, edit LISTINGS.
// Each item is one card. Keep the same fields (id, name, category,
// description) or ask Copilot to add new ones everywhere they're needed.
// ============================================================

const STARTUP = {
  name: "Rooted",
  tagline: "Water the right plant, right on time.",
  pitch: "A calm plant-care dashboard that puts the thirsty plants first, then connects you with trusted plant sitters when life gets busy."
};

const PLANTS = [
  { id: 1, name: "Calathea", location: "Living room", species: "Prayer plant", nextWatering: "2026-11-02", interval: "Every 5 days", note: "Use filtered water" },
  { id: 2, name: "Meyer lemon", location: "Kitchen window", species: "Citrus", nextWatering: "2026-11-03", interval: "Every 7 days", note: "Check the top inch first" },
  { id: 3, name: "Snake plant", location: "Hallway", species: "Sansevieria", nextWatering: "2026-11-06", interval: "Every 14 days", note: "Let soil dry fully" },
  { id: 4, name: "Monstera", location: "Office", species: "Tropical", nextWatering: "2026-11-08", interval: "Every 10 days", note: "Rotate toward the light" }
];

const SITTERS = [
  { name: "Maya R.", area: "Downtown", rating: "5.0", visits: "38 visits", price: "$18 / visit" },
  { name: "Jordan K.", area: "North End", rating: "4.9", visits: "24 visits", price: "$15 / visit" },
  { name: "Priya S.", area: "Westside", rating: "4.8", visits: "19 visits", price: "$16 / visit" }
];
