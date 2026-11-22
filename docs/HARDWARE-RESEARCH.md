# Hardware research and reverse-engineering protocol

**Breadcrumb:** [PIXIE Holdings](../README.md) → [Public sitemap](../public/sitemap.html) → [Hardware research map](../public/hardware-research.html) → Hardware validation.

## Purpose

Use public legacy-platform source code and documentation as a comparative engineering map for discovering device capabilities, understanding build and interface boundaries, and developing reproducible PIXIE adapters. This is a research protocol—not a claim that PIXIE currently has privileged access, hardware support, or a working device integration.

## Reference corpora

- **Android / CyanogenMod:** archived device trees, manifests, framework, kernel and recovery code. Start with the organization and identify a specific device tree before drawing device-level conclusions.
- **LineageOS:** community successor; useful for current maintenance patterns and device support documentation. A device being supported by LineageOS does not imply PIXIE compatibility.
- **iOS jailbreak history:** The Apple Wiki's open-source tool index and historical project repositories document independent research, alternate software environments and security-boundary investigations. Use them for architectural history and research context; this page does not provide exploit instructions.
- **Official platform and hardware documentation:** prioritize specifications, developer interfaces, vendor documentation, and source code for the exact model and version.
- **Repair and safety documentation:** use qualified repair guidance to identify safety limits. Never infer safe handling from a device being unplugged.

## Research sequence

1. **Identify** exact model, revision, chipset, OS/firmware version, ownership and intended test scope.
2. **Gather** public specifications, official documentation, source repositories, device trees, kernel configuration, build manifests and release history.
3. **Map** boot, OS, firmware, drivers, user-space APIs, physical interfaces and toolchain. Mark undocumented details as hypotheses.
4. **Establish access** from least privilege: public/read-only information → normal user diagnostics → authorized developer tools → privileged analysis only where necessary and lawful.
5. **Build reproducibly** in an isolated environment, recording versions, manifests, commands, hashes and outputs. Avoid untrusted binaries and secrets.
6. **Validate** with safe, reversible, read-only tests first. Use an emulator or spare device when appropriate; preserve a recovery route before firmware changes.
7. **Document evidence**: what was observed, method, permissions, device/version, test result, limitations, source, timestamp and confidence.
8. **Promote** a capability only after evidence supports it; publish adapter boundaries and failure/recovery states.

## PIXIE evidence states

- **Discovered** — a source or device suggests the capability.
- **Evaluated** — requirements, permissions and risks reviewed.
- **Verified** — reproducible test on named hardware/software, evidence linked.
- **Adapter available** — PIXIE implementation exists and passes its adapter tests.
- **User connected** — the user explicitly connected the target through the supported flow.

Do not collapse states. A source listing, jailbreak, root method, specification, emulator or mock does not itself prove PIXIE capability.

## Access and safety boundaries

- Test only devices owned by the researcher or for which explicit authorization exists.
- No bypassing third-party access controls, extracting another person's data, or undisclosed testing.
- Do not request root, bootloader unlock, firmware flashing, or invasive access by default.
- Treat firmware, binaries, scripts, and downloaded artifacts as untrusted; inspect and isolate them.
- Firmware and bootloader modifications can brick hardware, erase data, or void support. Require backups, model-specific recovery documentation, a spare/test device, and explicit user approval.
- Mains-powered electronics, CRTs, batteries, and stored-energy components require qualified safety procedures and supervision.
- Keep credentials, serial numbers, private dumps, and personal data out of public evidence.

## First proof of concept

The first slice should be a **read-only device profile**: exact model/version, available standard interfaces, permissions, detected capabilities, source links, and test evidence. No flashing, writes, privileged actions, or private data collection. Only after this is verified should we implement one narrow adapter in Holdings/Creator OS.

## Bibliography and source provenance

See the public [Hardware Research Bibliography](../public/hardware-research.html). References are starting points, not endorsements. Repository availability, branches, support status, and platform compatibility can change; verify the exact source and revision before using it. Research citations should record the date checked and the specific file or documentation section used.
