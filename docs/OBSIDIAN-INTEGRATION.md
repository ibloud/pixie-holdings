# Obsidian integration

## Purpose

Obsidian is the private, creator-controlled memory layer for PIXIE Holdings. The
vault is ordinary folders, Markdown, YAML properties, and unchanged attachments.
The public AT Protocol layer receives only a separately approved receipt preview.

## File-stewardship rule

PIXIE may **observe, propose, preview, apply, and reverse**. It may not silently
rename, relocate, merge, delete, publish, or train on creator files.

Every proposed file action contains:

- original filename and path;
- proposed destination;
- plain-language reason;
- provenance classification;
- collision warning;
- approval state;
- reversible receipt.

## Vault map

| Folder | Function | Publication default |
|---|---|---|
| `00 Inbox` | Unsorted capture; originals enter here | Private |
| `10 Projects` | Canonical project notes and maps | Private |
| `20 Sources` | Source records and claim ledgers | Private |
| `30 Decisions` | Approved actions and rollback receipts | Private |
| `40 Campaigns` | Promotion drafts and evidence register | Private |
| `50 Productions` | DAW sessions, stems, masters, video, captions, and release manifests | Private |
| `90 Attachments` | Original media with filenames intact | Private |
| `99 Templates` | Reusable note contracts | Shareable |

Numbers provide a predictable order across Finder, Files, Obsidian, and exports.
They do not encode importance.

## Provenance classes

Use one of: `verified`, `creator-statement`, `third-party-claim`,
`interpretation`, `inference`, or `unresolved`. A post screenshot verifies that a
post was displayed at capture time; it does not prove endorsement, partnership,
licensing, or every claim in the post.

## Plugin boundary

The existing Narrative Provenance plugin can read and write the templates in this
prototype. The hackathon build does not replace that plugin or require a database.
A later adapter may expose these limited commands:

1. `preview_file_action`
2. `approve_file_action`
3. `reverse_file_action`
4. `prepare_public_receipt`
5. `prepare_media_package`

Only public-receipt and media-handoff commands approach a publication boundary; each remains
a preview until the creator gives a separate publication approval.
