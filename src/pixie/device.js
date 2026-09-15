const DEVICE_ROLES = Object.freeze([
  "primary",
  "companion",
  "accessibility",
  "compute",
  "archive",
  "repurpose"
]);

const DEVICE_CHOICES = Object.freeze([
  "keep-in-service",
  "repair",
  "repurpose",
  "transfer",
  "recycle"
]);

function requiredString(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} must be a non-empty string.`);
  }
  return value.trim();
}

function optionalString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalNumber(value, field) {
  if (value === undefined || value === null) return null;
  if (!Number.isFinite(value)) throw new Error(`${field} must be a finite number.`);
  return value;
}

export function listDeviceRoles() {
  return [...DEVICE_ROLES];
}

export function listDeviceChoices() {
  return [...DEVICE_CHOICES];
}

export function describeDevice(input = {}) {
  const device = {
    id: requiredString(input.id, "device id"),
    kind: requiredString(input.kind, "device kind"),
    ownerRef: optionalString(input.ownerRef),
    ageYears: optionalNumber(input.ageYears, "ageYears"),
    capabilities: Array.isArray(input.capabilities) ? [...new Set(input.capabilities.map(String))] : [],
    accessibility: Array.isArray(input.accessibility) ? [...new Set(input.accessibility.map(String))] : [],
    softwareCompatibility: Array.isArray(input.softwareCompatibility)
      ? [...new Set(input.softwareCompatibility.map(String))]
      : [],
    repairability: optionalString(input.repairability),
    batteryCondition: optionalString(input.batteryCondition),
    localData: input.localData === true,
    role: input.role ?? "companion"
  };

  if (!DEVICE_ROLES.includes(device.role)) {
    throw new Error(`Unknown device role: ${device.role}`);
  }
  if (device.ageYears !== null && device.ageYears < 0) {
    throw new Error("ageYears cannot be negative.");
  }
  return device;
}

export function assessDeviceLife(input = {}) {
  const device = describeDevice(input);
  const reasons = [];
  const options = new Set(["keep-in-service", "repurpose", "transfer", "recycle"]);

  if (device.capabilities.length > 0) {
    reasons.push("The device has declared capabilities that can be evaluated independently of its age.");
  }
  if (device.accessibility.length > 0) {
    reasons.push("Accessibility capabilities are treated as part of the device's useful function.");
  }
  if (device.repairability) {
    options.add("repair");
    reasons.push(`Repairability is recorded as ${device.repairability}; repair can be considered before replacement.`);
  }
  if (device.batteryCondition) {
    reasons.push(`Battery condition is recorded as ${device.batteryCondition}; no health value is inferred.`);
  }
  if (device.localData) {
    reasons.push("Local data is declared; transfer or recycling requires a separate data-handling step.");
  }
  if (device.softwareCompatibility.length > 0) {
    reasons.push("Software compatibility is explicit rather than inferred from device age alone.");
  }

  return {
    device,
    decisionAuthority: "owner",
    options: DEVICE_CHOICES.filter((choice) => options.has(choice)),
    recommendation: null,
    reasons,
    governance: "assessment-only",
    execution: "not-permitted"
  };
}
