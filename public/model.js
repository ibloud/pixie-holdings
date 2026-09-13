export const initialLedger = Object.freeze({
  cash: 100,
  capacity: 60,
  access: 40,
  rights: 70,
  trust: 50,
  pressure: 25
});

export const holdings = Object.freeze([
  {
    id: "veiled-dominion",
    name: "Veiled Dominion",
    purpose: "Governance through restraint",
    actions: [
      {
        id: "fund-core",
        label: "Fund the original core",
        cost: 24,
        delta: { cash: -24, capacity: -8, access: 8, rights: 9, trust: 8, pressure: -4 },
        summary: "Invest in the original system, accessibility review, and rights clarity before expansion."
      },
      {
        id: "license-fast",
        label: "License a recognizable skin",
        cost: 10,
        delta: { cash: -10, capacity: -5, access: -3, rights: -18, trust: -8, pressure: 17 },
        summary: "Attention arrives quickly, but unresolved permissions and adaptation work create expensive pressure."
      }
    ]
  },
  {
    id: "break-the-grid",
    name: "Break the Grid",
    purpose: "Community investment versus manufactured crisis",
    actions: [
      {
        id: "community-pilot",
        label: "Fund a compensated community pilot",
        cost: 28,
        delta: { cash: -28, capacity: -6, access: 13, rights: 6, trust: 16, pressure: -12 },
        summary: "Pay facilitators and lived-experience contributors before measuring public impact."
      },
      {
        id: "ship-now",
        label: "Ship before facilitation review",
        cost: 8,
        delta: { cash: -8, capacity: -13, access: -12, rights: -4, trust: -15, pressure: 20 },
        summary: "The release is faster, while moderation, interpretation, and access work are transferred to people later."
      }
    ]
  },
  {
    id: "float-works",
    name: "Float Works",
    purpose: "Original suspense mechanics and adaptive narration",
    actions: [
      {
        id: "originalize",
        label: "Fund an original identity",
        cost: 20,
        delta: { cash: -20, capacity: -9, access: 5, rights: 18, trust: 9, pressure: -3 },
        summary: "Retain the tested resource and narration mechanics while replacing permission-dependent character framing."
      },
      {
        id: "viral-reference",
        label: "Market the recognizable reference",
        cost: 6,
        delta: { cash: -6, capacity: -4, access: -4, rights: -24, trust: -11, pressure: 22 },
        summary: "The campaign is legible immediately, but the portfolio cannot responsibly commercialize the borrowed identity."
      }
    ]
  }
]);

export function findAction(holdingId, actionId) {
  const holding = holdings.find((item) => item.id === holdingId);
  if (!holding) throw new Error(`Unknown holding: ${holdingId}`);
  const action = holding.actions.find((item) => item.id === actionId);
  if (!action) throw new Error(`Unknown action for ${holding.name}: ${actionId}`);
  return { holding, action };
}

export function evaluateAllocation(ledger, holdingId, actionId) {
  const { holding, action } = findAction(holdingId, actionId);
  if (ledger.cash < action.cost) throw new Error("This portfolio does not have enough cash for that allocation.");
  const next = {};
  for (const key of Object.keys(initialLedger)) {
    next[key] = Math.max(0, Math.min(100, ledger[key] + (action.delta[key] ?? 0)));
  }
  return { holding: holding.name, action: action.label, summary: action.summary, delta: action.delta, ledger: next };
}

export function outcomeFor(ledger) {
  if (ledger.rights < 35 || ledger.trust < 30 || ledger.access < 25) return "The portfolio grew by transferring unacceptable costs to creators and communities.";
  if (ledger.cash >= 30 && ledger.pressure <= 45 && ledger.capacity >= 30) return "The portfolio remains solvent without abandoning access, rights, or the people doing the work.";
  return "The portfolio survives, but its next quarter must reduce pressure and restore human capacity.";
}
