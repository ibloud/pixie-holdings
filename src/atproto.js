export const RECEIPT_TYPE = "xyz.ibloud.pixie.holdingDecision";

export function buildReceipt({ holding, action, summary, sourceUrl, supersedes, createdAt }) {
  if (!holding || !action || !summary) throw new Error("holding, action, and summary are required");
  const record = {
    $type: RECEIPT_TYPE,
    holding: String(holding).slice(0, 80),
    action: String(action).slice(0, 80),
    summary: String(summary).slice(0, 500),
    scenario: "synthetic",
    createdAt: createdAt ?? new Date().toISOString()
  };
  if (sourceUrl) record.sourceUrl = sourceUrl;
  if (supersedes) record.supersedes = supersedes;
  return record;
}
