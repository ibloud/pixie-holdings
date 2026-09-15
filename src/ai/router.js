import { listHoldings, previewAllocation } from "../pixie/core.js";

const PREVIEW_COMMANDS = new Set(["evaluate_allocation"]);

export function buildAgentCatalog() {
  return listHoldings().holdings.map(({ id, name, purpose, actions }) => ({
    id,
    name,
    purpose,
    actions: actions.map(({ id: actionId, label, summary }) => ({ id: actionId, label, summary }))
  }));
}

export function buildAgentContext() {
  return JSON.stringify({
    rule: "Choose only identifiers present in this catalog. Do not invent identifiers or consequences.",
    holdings: buildAgentCatalog()
  });
}

export function routeAgentResult(result, { ledger } = {}) {
  const command = result?.command;
  if (!command || !PREVIEW_COMMANDS.has(command.name)) return { ...result, routed: false };

  const args = command.arguments ?? {};
  if (command.name === "evaluate_allocation") {
    const preview = previewAllocation({ ledger, holdingId: args.holdingId, actionId: args.actionId });
    return {
      ...result,
      routed: true,
      requiresConfirmation: preview.requiresConfirmation,
      preview
    };
  }

  return { ...result, routed: false };
}
