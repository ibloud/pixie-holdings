import { listDeviceCapabilities, listFileCapabilities, listHoldings, previewAllocation, previewDevice } from "../pixie/core.js";

const PREVIEW_COMMANDS = new Set(["evaluate_allocation", "preview_device", "preview_file"]);

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
    holdings: buildAgentCatalog(),
    deviceCapabilities: listDeviceCapabilities(),
    fileCapabilities: listFileCapabilities()
  });
}

export function routeAgentResult(result, { ledger } = {}) {
  const command = result?.command;
  if (!command || !PREVIEW_COMMANDS.has(command.name)) return { ...result, routed: false };

  const args = command.arguments ?? {};
  if (command.name === "evaluate_allocation") {
    try {
      const preview = previewAllocation({ ledger, holdingId: args.holdingId, actionId: args.actionId });
      return { ...result, routed: true, requiresConfirmation: preview.requiresConfirmation, preview };
    } catch (error) {
      return { ...result, routed: false, routeError: { code: "INVALID_COMMAND_ARGUMENTS", message: error.message } };
    }
  }

  if (command.name === "preview_device") {
    try {
      const preview = previewDevice(args);
      return { ...result, routed: true, requiresConfirmation: false, preview };
    } catch (error) {
      return { ...result, routed: false, routeError: { code: "INVALID_COMMAND_ARGUMENTS", message: error.message } };
    }
  }

  return { ...result, routed: false };
}
