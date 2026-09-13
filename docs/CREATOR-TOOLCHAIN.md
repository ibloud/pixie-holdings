# Creator production toolchain

## Source status

- **Creator statement:** Loptr Lab has already built a DAW component.
- **Unresolved:** its repository, project-file format, and export API were not found
  in the GitHub repositories currently visible to this build.
- **Third-party claim:** the supplied Aether OS post describes a basic DAW, video
  editor, chiptune tracker, and AT Protocol-native storage. That screenshot does not
  establish an integration, security properties, licensing, or endorsement.

The adapter contract therefore names `loptr-daw` as the preferred source while
keeping its exact file types configurable. It does not substitute Aether's DAW.

## Production map

| Creator tool | Preserved output | PIXIE responsibility | Public handoff |
|---|---|---|---|
| Loptr Lab DAW | Session file, stems, MIDI, presets, samples | Keep original files together; build export manifest | Approved mix/master only |
| Video editor | Project file, source footage, proxy, master | Link captions and transcript; never publish source footage by default | Plyr-ready video + VTT |
| Image/design tool | Editable source, export, alt text | Preserve source/export relationship | Approved artwork |
| Writing/Obsidian | Notes, scripts, sources, rights ledger | Maintain provenance and canonical links | Approved description/transcript |
| Task/production assistant | Cue sheet, shot list, status, parking lot | Ask before changing priority or schedule | No automatic publication |
| Plyr | HTML5 playback and WebVTT captions | Prepare standards-based manifest; native fallback | Website player |
| Audio.com | Audio track, collection, embed, RSS, optional spoken-word transcript | Prepare metadata and record returned URL | Manual/authorized upload |
| AT Protocol | Minimal approved receipt | Keep private production files out of record | Separate publish approval |

## Portable production bundle

```text
50 Productions/<project>/
├── 01 Session/       # DAW/editor project files
├── 02 Sources/       # original recordings and footage
├── 03 Stems/         # lossless audio exports
├── 04 Mixes/         # review mixes
├── 05 Masters/       # approved delivery files
├── 06 Captions/      # WebVTT and transcript files
├── 07 Artwork/       # editable source, exports, alt text
├── 08 Rights/        # credits, licenses, permissions
└── 09 Release/       # Plyr and Audio.com handoff manifests
```

## Current platform boundary

Plyr documents support for HTML5 audio/video and WebVTT captions. Audio.com
documents browser upload, Public/Unlisted visibility, official embeds, collections,
RSS, and spoken-word transcription for eligible paid accounts. No documented public
upload API was located during this build, so the handoff remains manual or dependent
on later platform approval.

Sources:

- https://github.com/sampotts/plyr
- https://help.audio.com/en/articles/11492545-how-to-upload-audio-to-audio-com
- https://help.audio.com/en/articles/11585586-how-do-i-embed-an-audio-com-player-on-my-website-or-blog
- https://help.audio.com/en/articles/11585569-how-do-i-make-a-transcription-for-my-audio
