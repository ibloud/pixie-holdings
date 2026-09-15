import { buildReceipt } from "../atproto.js";
import { previewFileAction } from "../file-stewardship.js";
import { prepareMediaPackage } from "../media.js";
import { evaluateAllocation, findAction, holdings, initialLedger, outcomeFor } from "../model.js";

export function listHoldings() {
  return { holdings };
}

export function previewAllocation({ ledger = initialLedger, holdingId, actionId }) {
  const evaluation = evaluateAllocation(ledger, holdingId, actionId);
  return {
    type: "allocation",
    allowed: true,
    requiresConfirmation: true,
    consequence: evaluation,
    rollbackAvailable: false,
    governance: "preview-only"
  };
}

export function previewFile({ sourcePath, destinationFolder, reason }) {
  return {
    type: "file",
    allowed: true,
    requiresConfirmation: true,
    consequence: previewFileAction({ sourcePath, destinationFolder, reason }),
    rollbackAvailable: true,
    governance: "preview-only"
  };
}

export function prepareMedia(input) {
  return {
    type: "media",
    allowed: true,
    requiresConfirmation: true,
    consequence: prepareMediaPackage(input),
    rollbackAvailable: false,
    governance: "handoff-only"
  };
}

export function prepareReceipt(input) {
  return {
    type: "receipt",
    allowed: true,
    requiresConfirmation: true,
    consequence: { preview: true, published: false, record: buildReceipt(input) },
    rollbackAvailable: false,
    governance: "publication-disabled"
  };
}

export function describeAction(holdingId, actionId) {
  return findAction(holdingId, actionId);
}

export function summarizeLedger(ledger = initialLedger) {
  return { ledger, outcome: outcomeFor(ledger) };
}
