import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { evaluateAllocation, holdings, initialLedger, outcomeFor } from "../src/model.js";

describe("PIXIE Holdings Model Engine", () => {
  test("initial ledger contains bounded metrics", () => {
    for (const key of ["cash", "capacity", "access", "rights", "trust", "pressure"]) {
      assert.ok(key in initialLedger);
      assert.ok(initialLedger[key] >= 0 && initialLedger[key] <= 100);
    }
  });

  test("initial ledger is frozen", () => {
    assert.throws(() => { initialLedger.cash = 999; }, TypeError);
  });

  test("current holdings expose stable identifiers and actions", () => {
    assert.deepEqual(holdings.map(h => h.id), ["veiled-dominion", "break-the-grid", "float-works"]);
    assert.deepEqual(holdings.map(h => h.actions.map(a => a.id)), [
      ["fund-core", "license-fast"],
      ["community-pilot", "ship-now"],
      ["originalize", "viral-reference"]
    ]);
  });

  test("calculates deterministic next state for a valid current action", () => {
    const result = evaluateAllocation(initialLedger, "float-works", "originalize");
    assert.equal(result.holding, "Float Works");
    assert.equal(result.action, "Fund an original identity");
    assert.deepEqual(result.delta, { cash: -20, capacity: -9, access: 5, rights: 18, trust: 9, pressure: -3 });
    assert.deepEqual(result.ledger, { cash: 80, capacity: 51, access: 45, rights: 88, trust: 59, pressure: 22 });
  });

  test("clamps metric values at upper bound", () => {
    const ledger = { ...initialLedger, rights: 95 };
    const result = evaluateAllocation(ledger, "float-works", "originalize");
    assert.equal(result.ledger.rights, 100);
  });

  test("clamps metric values at lower bound", () => {
    const ledger = { ...initialLedger, access: 2 };
    const result = evaluateAllocation(ledger, "veiled-dominion", "license-fast");
    assert.equal(result.ledger.access, 0);
  });

  test("does not mutate source ledger during evaluation", () => {
    const before = JSON.stringify(initialLedger);
    evaluateAllocation(initialLedger, "float-works", "originalize");
    assert.equal(JSON.stringify(initialLedger), before);
  });

  test("rejects insufficient synthetic cash", () => {
    assert.throws(() => evaluateAllocation({ ...initialLedger, cash: 5 }, "float-works", "originalize"), /does not have enough cash/);
  });

  test("rejects invalid holding and action identifiers", () => {
    assert.throws(() => evaluateAllocation(initialLedger, "non-existent-holding", "originalize"), /Unknown holding/);
    assert.throws(() => evaluateAllocation(initialLedger, "float-works", "non-existent-action"), /Unknown action for Float Works/);
  });

  test("outcomeFor detects rights/trust/access erosion", () => {
    assert.match(outcomeFor({ ...initialLedger, rights: 34 }), /unacceptable costs/);
    assert.match(outcomeFor({ ...initialLedger, trust: 29 }), /unacceptable costs/);
    assert.match(outcomeFor({ ...initialLedger, access: 24 }), /unacceptable costs/);
  });

  test("outcomeFor detects a solvent balanced state", () => {
    assert.match(outcomeFor({ cash: 50, capacity: 80, access: 80, rights: 70, trust: 70, pressure: 30 }), /remains solvent/);
  });

  test("outcomeFor reports pressure/capacity recovery state otherwise", () => {
    assert.match(outcomeFor(initialLedger), /next quarter must reduce pressure/);
  });
});
