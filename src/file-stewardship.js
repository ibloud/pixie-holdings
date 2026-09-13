import { basename, extname, normalize, sep } from "node:path";

const allowedRoots = ["00 Inbox", "10 Projects", "20 Sources", "30 Decisions", "40 Campaigns", "90 Attachments"];

export function previewFileAction({ sourcePath, destinationFolder, reason = "Creator-directed organization" }) {
  if (typeof sourcePath !== "string" || !sourcePath.trim()) throw new Error("A sourcePath is required.");
  if (!allowedRoots.includes(destinationFolder)) throw new Error("The destination must be an approved vault folder.");
  const normalized = normalize(sourcePath.trim());
  if (normalized.startsWith(".." + sep) || normalized === "..") throw new Error("The source path cannot escape the vault.");
  const originalFilename = basename(normalized);
  if (!originalFilename || originalFilename === ".") throw new Error("The source must name a file.");
  const destinationPath = `${destinationFolder}/${originalFilename}`;
  return {
    preview: true, applied: false, action: "move", sourcePath: normalized, destinationPath,
    originalFilename, extension: extname(originalFilename) || "none", reason,
    collisionCheck: "required-at-apply",
    rollbackAction: { action: "move", sourcePath: destinationPath, destinationPath: normalized },
    publication: "private"
  };
}
