import { basename, extname, normalize, sep } from "node:path";

export const FILE_ROOTS = Object.freeze({
  "00 Inbox": "items not yet processed",
  "10 Projects": "active work",
  "20 Sources": "reference material",
  "30 Decisions": "decisions and rationale",
  "40 Campaigns": "active communications and organizing",
  "90 Attachments": "supporting material that belongs with something else"
});

const allowedRoots = Object.freeze(Object.keys(FILE_ROOTS));

export function listFileRoots() {
  return allowedRoots.map(id => ({ id, meaning: FILE_ROOTS[id] }));
}

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
