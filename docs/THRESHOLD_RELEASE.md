# Threshold discovery release — November 10, 2026

Owner authorized release once the reading-circle rollout and handoff were ready.
Training owns the reader and handbook. Holdings supplies discovery without
copying its catalogue, notebook or story authority.

Destinations:

- Holdings → **Discover projects** → **Open The Threshold reading list and story
  plan** → https://loptr-lab.github.io/training/threshold.html
- Holdings → **Open existing desktop demo** → **Project discovery** → **The
  Threshold · read 15 minutes a day** → the same top-level reader.
- Training home → **The Threshold · read 15 minutes a day**.
- Reader → **Facilitator and maintainer handbook** →
  https://github.com/Loptr-Lab/training/blob/main/THRESHOLD_BOOK_CLUB.md
- Reader → optional contribution guidance and existing Made-Sick community
  entrance; no automatic membership, note transfer or meeting booking.

The reader contains library-first acquisition, seven source-backed titles,
fifteen-minute practice, sample comprehension questions, a per-book private
notebook and concrete proposed original story/design tasks. The canonical
handbook provides roles, facilitation, review and maintenance instructions.

Holdings changes only its discovery copy, two links, regression expectations
and documentation. `public/styles.css`, the approved sigil, existing single
persistent guide and PR #60 security protections are preserved. No styles,
dependencies, assistants, identity-bearing URLs or backend routes are added.

Verification: all 56 Holdings tests passed. Local browser integration checked
both actual entry clicks into the reviewed Training reader and the single,
unobscured guide in the embedded demo. Training source/browser evidence lives
in `Loptr-Lab/training/review-packet/THRESHOLD_RELEASE.md` and its adjacent
`threshold-evidence` folder. Physical Safari/iPad/VoiceOver remain unverified.

Release order: Training first, verify stable reader, then Holdings. PR, commit
and production checks are appended after operations. Rollback through reviewed
revert commits; avoid restoring a misleading Mayhem reading fallback.

The separate PIXIE post is an editorial draft in Training's review packet.
This release does not publish a pckt article or announce a scheduled club event.


## Completed release evidence

Training PR #58 merged as `2d26e5942bb314c2dfeb85173e6cde4dfadbe6b4`
on November 10 at 08:23:56 UTC. Pages completed at 08:24:34 UTC. The stable
reader returns HTTP 200; a public-browser check followed Training home into
all seven book cards and started the live timer.

Only after that verification, Holdings PR #63 merged at 08:26:03 UTC as
`d547782e880a7752ad1f5d0ebcae104b79824769`. Production deployment
`dpl_EE3KYQpPEJycZpqR3Q4cRxs18qXs` is READY and reports that exact main SHA.
Protected fetches of `https://pixie-holdings.vercel.app/`, `/radar.html` and
`/pixie-guide.js` returned 200. Both entry pages contain the correct reader URL;
the old Mayhem reading fallback is absent.

Custom-domain verification is limited: this environment blocks direct access
to `holdings.loptrlab.com`, and Vercel's share-resolution lookup returned 404
before an origin fetch. This is not evidence of an origin 404. Domain and DNS
settings were not changed; confirm the custom address in an external browser.
Physical Safari/iPad/VoiceOver remain unverified.

The source handbook and review packet preserve everything needed to operate
and extend the self-paced circle. The PIXIE article, original graph and source
notes are ready for Dominique's editorial review; no pckt article was published.
