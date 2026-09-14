/**
 * PIXIE Holdings Model Engine - model.js
 * 
 * PROVENANCE & DATA INTEGRITY STANDARD:
 * -------------------------------------
 * Inspired by FT Interactive's state-evaluation standards in 'uber-driver-game'.
 * Enforces pure state transformations, immutable ledger evaluation, strict meter
 * boundaries [0-100], and deterministic outcome evaluation.
 */

/**
 * Initial baseline values for portfolio metrics.
 * Range: 0 to 100 for all attributes.
 */
export const initialLedger = Object.freeze({
  cash: 80,
  capacity: 75,
  access: 60,
  rights: 70,
  trust: 65,
  pressure: 25
});

/**
 * Available holdings and their possible steward allocations.
 * Cost values represent synthetic cash requirements.
 */
export const holdings = Object.freeze([
  {
    id: "learning-commons",
    name: "Open Learning Commons",
    purpose: "Provide accessible skill building, gentle reminders, and peer support.",
    actions: [
      {
        id: "expand-accessibility",
        label: "Automate captioning & adaptive paths",
        cost: 20,
        summary: "Boosts accessibility and trust while reducing pressure on human creators.",
        delta: { cash: -20, capacity: +10, access: +20, rights: +5, trust: +15, pressure: -10 }
      },
      {
        id: "scale-workload",
        label: "Push rapid curriculum rollout",
        cost: 15,
        summary: "Increases output quickly but imposes heavy cognitive load on stewards.",
        delta: { cash: -15, capacity: -25, access: +10, rights: 0, trust: -10, pressure: +25 }
      }
    ]
  },
  {
    id: "provenance-vault",
    name: "Narrative Provenance Archive",
    purpose: "Maintain creator-controlled local memory and explicit consent receipts.",
    actions: [
      {
        id: "verify-rights",
        label: "Conduct full provenance audit",
        cost: 25,
        summary: "Clarifies creator ownership and rights while strengthening public trust.",
        delta: { cash: -25, capacity: -5, access: +5, rights: +25, trust: +20, pressure: -5 }
      },
      {
        id: "bypass-audit",
        label: "Streamline raw file imports",
        cost: 10,
        summary: "Saves cash and time short-term, but increases system pressure and risk.",
        delta: { cash: -10, capacity: +5, access: 0, rights: -15, trust: -15, pressure: +20 }
      }
    ]
  },
  {
    id: "health-stewardship",
    name: "Health & Energy Reserve",
    purpose: "Ensure learning schedules preserve human capacity and mitigate burnout.",
    actions: [
      {
        id: "enforce-rest-cadence",
        label: "Implement mandatory health pauses",
        cost: 15,
        summary: "Restores human capacity and reduces burnout, maintaining steady long-term trust.",
        delta: { cash: -15, capacity: +30, access: +5, rights: 0, trust: +10, pressure: -20 }
      },
      {
        id: "overtime-sprint",
        label: "Authorize intensive learning sprint",
        cost: 5,
        summary: "Achieves rapid progress at severe cost to capacity and system pressure.",
        delta: { cash: -5, capacity: -30, access: 0, rights: 0, trust: -15, pressure: +30 }
      }
    ]
  }
]);

/**
 * Ensures ledger metric stays strictly bounded within [0, 100].
 * @param {number} value 
 * @returns {number} Clamped integer value
 */
function clamp(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new TypeError(`Data Integrity Error: Value must be a valid number. Received: ${value}`);
  }
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Pure evaluation function that calculates the proposed state without side effects.
 * 
 * @param {Object} currentLedger - Current ledger state.
 * @param {string} holdingId - Target holding identifier.
 * @param {string} actionId - Target action identifier.
 * @returns {Object} Evaluation preview object containing new ledger state, delta, and summary.
 */
export function evaluateAllocation(currentLedger, holdingId, actionId) {
  if (!currentLedger || typeof currentLedger !== "object") {
    throw new Error("Data Integrity Error: Invalid ledger state provided.");
  }

  const holding = holdings.find(h => h.id === holdingId);
  if (!holding) {
    throw new Error(`Data Integrity Error: Holding '${holdingId}' not found.`);
  }

  const action = holding.actions.find(a => a.id === actionId);
  if (!action) {
    throw new Error(`Data Integrity Error: Action '${actionId}' not found under holding '${holdingId}'.`);
  }

  if (currentLedger.cash < action.cost) {
    throw new Error(`Insufficient synthetic cash reserve (${currentLedger.cash} available, ${action.cost} required).`);
  }

  // Calculate new state with deterministic clamping
  const nextLedger = {};
  for (const key of Object.keys(initialLedger)) {
    const baseValue = currentLedger[key] ?? initialLedger[key];
    const change = action.delta[key] ?? 0;
    nextLedger[key] = clamp(baseValue + change);
  }

  return {
    holdingId: holding.id,
    holding: holding.name,
    actionId: action.id,
    action: action.label,
    summary: action.summary,
    cost: action.cost,
    delta: { ...action.delta },
    ledgerBefore: { ...currentLedger },
    ledger: nextLedger
  };
}

/**
 * Evaluates holistic portfolio stability and human health based on current metrics.
 * 
 * @param {Object} ledger - Bounded ledger object.
 * @returns {string} Narrative outcome interpretation.
 */
export function outcomeFor(ledger) {
  if (!ledger) return "No active portfolio data available.";

  const { capacity, pressure, trust, access, rights } = ledger;

  if (capacity <= 20 || pressure >= 80) {
    return "Critical Strain: Human capacity is severely depleted and system pressure is unsustainable. Growth cannot be sustained without preserving the stewards.";
  }

  if (trust <= 30 || rights <= 30) {
    return "Erosion of Consent: Trust or rights clarity has dropped below safe operational thresholds. The ecosystem risks administrative fragmentation.";
  }

  if (access >= 75 && capacity >= 70 && pressure <= 40) {
    return "Balanced Stewardship: Growth and human capacity are advancing in sync. PIXIE's consent-first pacing is successfully protecting people while learning progresses.";
  }

  return "Stable Progress: The portfolio operates within normal parameters. Continue monitoring human capacity and system pressure across future quarters.";
}
