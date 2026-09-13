const kinds = new Set(["daw-session", "stem", "mix", "master", "video", "caption", "transcript", "artwork", "midi", "preset", "sample", "release-manifest"]);
const visibility = new Set(["private", "unlisted", "public"]);

function requiredText(value, label) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} is required.`);
  return value.trim();
}

export function prepareMediaPackage(input) {
  const title = requiredText(input?.title, "title");
  const assetKind = requiredText(input?.assetKind, "assetKind");
  const filename = requiredText(input?.filename, "filename");
  if (!kinds.has(assetKind)) throw new Error("Unsupported creator asset kind.");
  const selectedVisibility = input.visibility ?? "private";
  if (!visibility.has(selectedVisibility)) throw new Error("Visibility must be private, unlisted, or public.");
  const captions = Array.isArray(input.captions) ? input.captions.map(item => ({ src: requiredText(item.src, "caption src"), srclang: item.srclang ?? "en", label: item.label ?? "English", default: Boolean(item.default) })) : [];
  return {
    preview: true,
    uploaded: false,
    originalFilename: filename,
    assetKind,
    title,
    rightsStatus: input.rightsStatus ?? "unknown",
    publication: selectedVisibility,
    sourceProject: input.sourceProject ?? "unknown",
    plyr: {
      compatible: ["mix", "master", "video"].includes(assetKind),
      source: input.mediaUrl ? { src: input.mediaUrl, type: input.mimeType ?? "application/octet-stream" } : null,
      tracks: captions,
      requirement: "Use an HTML5 audio or video element; WebVTT files supply captions."
    },
    audioCom: {
      compatible: ["mix", "master"].includes(assetKind),
      handoff: { title, description: input.description ?? "", tags: input.tags ?? [], license: input.license ?? "unspecified", visibility: selectedVisibility },
      uploadStatus: "manual-or-approved-api-required",
      trackUrl: input.audioComUrl ?? null,
      note: "Do not invent an upload API. Store the returned Audio.com track or embed URL only after creator approval."
    },
    privateFilesExcluded: true
  };
}
