/**
 * Test Suite: model.test.js
 * Run using Node.js built-in test runner:
 * node --test model.test.js
 */

import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { evaluateAllocation, holdings, initialLedger, outcomeFor } from "./model.js";

describe("PIXIE Holdings Model Engine Data Integrity Tests", () => {

  describe("Initial Ledger Invariants", () => {
    test("initialLedger contains all expected metrics bounded between 0 and 100", () => {
      const keys = ["cash", "capacity", "access", "rights", "trust", "pressure"];
      
      for (const key of keys) {
        assert.ok(key in initialLedger, `Missing metric key: ${key}`);
        assert.ok(initialLedger[key] >= 0 && initialLedger[key] <= 100, `Key ${key} out of bounds`);
      }
    });

    test("initialLedger is frozen and immutable", () => {
      assert.throws(() => {
        initialLedger.cash = 999;
      }, TypeError);
    });
  });

  describe("evaluateAllocation Boundary & Calculation Rules", () => {
    test("calculates deterministic next state for valid action", () => {
      const result = evaluateAllocation(
        initialLedger,
        "learning-commons",
        "expand-accessibility"
      );

      assert.equal(result.holdingId, "learning-commons");
      assert.equal(result.actionId, "expand-accessibility");
      assert.equal(result.ledger.cash, 60);       // 80 - 20
      assert.equal(result.ledger.capacity, 85);   // 75 + 10
      assert.equal(result.ledger.access, 80);     // 60 + 20
      assert.equal(result.ledger.rights, 75);     // 70 + 5
      assert.equal(result.ledger.trust, 80);      // 65 + 15
      assert.equal(result.ledger.pressure, 15);   // 25 - 10
    });

    test("clamps metric values at upper bound (100)", () => {
      const highCapacityLedger = { ...initialLedger, capacity: 95 };
      const result = evaluateAllocation(
        highCapacityLedger,
        "health-stewardship",
        "enforce-rest-cadence" // delta.capacity is +30
      );

      assert.equal(result.ledger.capacity, 100, "Capacity must be clamped at 100");
    });

    test("clamps metric values at lower bound (0)", () => {
      const lowCashLedger = { ...initialLedger, cash: 20 };
      const result = evaluateAllocation(
        lowCashLedger,
        "learning-commons",
        "expand-accessibility" // delta.cash is -20
      );

      assert.equal(result.ledger.cash, 0, "Cash must be clamped at 0");
    });

    test("enforces state immutability on source ledger during evaluation", () => {
      const snapshotBefore = JSON.stringify(initialLedger);
      evaluateAllocation(initialLedger, "learning-commons", "expand-accessibility");
      const snapshotAfter = JSON.stringify(initialLedger);

      assert.equal(snapshotBefore, snapshotAfter, "Input ledger must not be mutated");
    });
  });

  describe("Error Boundaries & Guard Clauses", () => {
    test("throws descriptive error on insufficient synthetic cash", () => {
      const brokeLedger = { ...initialLedger, cash: 5 };

      assert.throws(
        () => evaluateAllocation(brokeLedger, "learning-commons", "expand-accessibility"),
        {
          name: "Error",
          message: /Insufficient synthetic cash reserve/
        }
      );
    });

    test("throws Data Integrity Error for invalid holdingId", () => {
      assert.throws(
        () => evaluateAllocation(initialLedger, "non-existent-holding", "expand-accessibility"),
        {
          name: "Error",
          message: /Data Integrity Error: Holding 'non-existent-holding' not found\./
        }
      );
    });

    test("throws Data Integrity Error for invalid actionId", () => {
      assert.throws(
        () => evaluateAllocation(initialLedger, "learning-commons", "non-existent-action"),
        {
          name: "Error",
          message: /Data Integrity Error: Action 'non-existent-action' not found under holding 'learning-commons'\./
        }
      );
    });

    test("throws Data Integrity Error when invalid ledger is supplied", () => {
      assert.throws(
        () => evaluateAllocation(null, "learning-commons", "expand-accessibility"),
        {
          name: "Error",
          message: /Data Integrity Error: Invalid ledger state provided\./
        }
      );
    });
  });

  describe("outcomeFor Interpretation Logic", () => {
    test("detects Critical Strain when capacity is depleted (<= 20)", () => {
      const strainedLedger = { ...initialLedger, capacity: 15 };
      const result = outcomeFor(strainedLedger);

      assert.match(result, /^Critical Strain/);
    });

    test("detects Critical Strain when pressure is excessive (>= 80)", () => {
      const highPressureLedger = { ...initialLedger, pressure: 85 };
      const result = outcomeFor(highPressureLedger);

      assert.match(result, /^Critical Strain/);
    });

    test("detects Erosion of Consent when trust drops (<= 30)", () => {
      const lowTrustLedger = { ...initialLedger, trust: 25 };
      const result = outcomeFor(lowTrustLedger);

      assert.match(result, /^Erosion of Consent/);
    });

    test("detects Balanced Stewardship when all key conditions are met", () => {
      const balancedLedger = {
        cash: 50,
        capacity: 80,
        access: 80,
        rights: 70,
        trust: 70,
        pressure: 30
      };
      const result = outcomeFor(balancedLedger);

      assert.match(result, /^Balanced Stewardship/);
    });
  });
});
