/**
 * Enhance a standards-based audio or video element with Plyr when the host has
 * already loaded Plyr. Native playback remains the accessible fallback.
 */
export function attachPlyr(element, manifest) {
  if (!(element instanceof HTMLMediaElement)) throw new TypeError("A media element is required.");
  if (manifest?.plyr?.source) {
    element.src = manifest.plyr.source.src;
    if (manifest.plyr.source.type) element.type = manifest.plyr.source.type;
  }
  for (const track of manifest?.plyr?.tracks ?? []) {
    const node = document.createElement("track");
    node.kind = "captions";
    node.src = track.src;
    node.srclang = track.srclang;
    node.label = track.label;
    node.default = track.default;
    element.append(node);
  }
  return typeof globalThis.Plyr === "function"
    ? new globalThis.Plyr(element, { captions: { active: true, update: true } })
    : element;
}
