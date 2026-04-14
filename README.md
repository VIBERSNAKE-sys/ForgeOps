<div align="center">

# ForgeOps

**career-ops + ResForge quality gates = mechanically enforced CV generation**

Speed from [career-ops](https://github.com/santifer/career-ops) &bull; Rigor from [ResForge](https://github.com/VIBERSNAKE-sys/ResForge) &bull; Mechanical enforcement from `validate-cv.mjs`

[![License](https://img.shields.io/badge/License-Same%20as%20career--ops-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-Required-brightgreen)](#quick-start)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-blueviolet)](https://claude.ai/claude-code)

---

[What's Different](#whats-different-from-career-ops) &bull; [Two-Track Strategy](#the-two-track-strategy) &bull; [Validation Script](#how-validate-cvmjs-works) &bull; [New Files](#new-files-not-in-career-ops) &bull; [Quick Start](#quick-start) &bull; [Attribution](#attribution)

</div>

## What Is ForgeOps?

ForgeOps is a fork of [career-ops](https://github.com/santifer/career-ops) that adds resume quality gates, evidence integrity enforcement, and a mechanical validation script. Career-ops gives you speed. ResForge gives you rigor. **ForgeOps gives you both.**

```
                    ┌──────────────┐
                    │  career-ops  │  Scanning, evaluation, PDF pipeline,
                    │   (speed)    │  tracker, portal architecture
                    └──────┬───────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────┐
  │                  ForgeOps                    │
  │                                             │
  │   validate-cv.mjs  ◄── mechanical checks    │
  │   resume-gates.md  ◄── 8 quality gates      │
  │   evidence-ledger  ◄── fabrication guard     │
  │   cover-letter.md  ◄── CL-Gate 0 + rules    │
  │                                             │
  └─────────────────────────────────────────────┘
                           │
                    ┌──────┴───────┐
                    │   ResForge   │  Gate system, evidence ledger,
                    │   (rigor)    │  quality enforcement, writing rules
                    └──────────────┘
```

---

## What's Different from career-ops

| Feature | career-ops | ForgeOps |
|---------|-----------|----------|
| **CV quality control** | LLM judgment only | `validate-cv.mjs` blocks PDF on failures + 8 gates in `resume-gates.md` |
| **Evidence integrity** | No verification | Evidence Ledger protocol, fabrication test, role attribution check |
| **Framing accuracy** | No verb checking | 3-tier framing ladder (DELIVER / COORDINATE / CONTRIBUTE) |
| **Word count** | Not enforced | Hard ceilings: TOP2 18&ndash;27, older 12&ndash;25, summary 75 (script-enforced) |
| **Banned phrases** | Not checked | 30+ patterns: metadata leakage, defensive framing, em dashes, conceptual verbs |
| **Employment continuity** | Roles could be deleted | Script blocks PDF if role count doesn&rsquo;t match `cv.md` |
| **Cover letter** | 1-line spec, no template | Template with placeholders, match table format, CL-Gate 0 |
| **Metric fabrication** | Not checked | Script cross-references every number against `article-digest.md` |

---

## The Two-Track Strategy

ForgeOps supports two quality tiers depending on the application:

| Track | Use Case | Quality | How |
|-------|----------|---------|-----|
| **Volume** | Cold applications | 7&ndash;7.5 rating | ForgeOps end-to-end. Gates produce solid output fast. |
| **Priority** | Warm intros, high-fit roles | 9+ rating | ForgeOps for analysis (evaluation, JD parsing, STAR stories), then a dedicated prompt system for the CV. |

> The gate integration means the volume strategy is viable without risking interview embarrassment from fabricated metrics or missing roles.

---

## How validate-cv.mjs Works

After generating CV HTML and before converting to PDF:

```bash
node validate-cv.mjs output/cv.html --cv-source=cv.md --evidence=article-digest.md
```

### 5 Mechanical Checks

| # | Check | What It Does |
|---|-------|-------------|
| 1 | **Word Count Enforcement** | Every bullet counted, TOP2 vs older role ceilings enforced |
| 2 | **Banned Phrase Scan** | 30+ patterns including metadata leakage, defensive framing, em dashes |
| 3 | **Employment Continuity** | Role count in output must match `cv.md` |
| 4 | **Opening Verb Frequency** | Flags repeated verbs, escalates if 3+ verbs are duplicated |
| 5 | **Metric Fabrication Guard** | Cross-references every number against `article-digest.md` |

### Exit Codes

| Code | Meaning | Action |
|------|---------|--------|
| `0` | All pass | Proceed to PDF |
| `1` | Failures | **Block PDF** &mdash; fix and re-validate |
| `2` | Warnings only | Proceed with review |

Maximum 3 fix-validate cycles before flagging to user.

---

## New Files (not in career-ops)

```
ForgeOps/
  |-- validate-cv.mjs              # Mechanical gate enforcement script
  |-- SETUP.md                     # ForgeOps-specific setup guide
  |-- CAREER-OPS-README.md         # Original career-ops documentation
  |
  |-- modes/
  |     |-- resume-gates.md        # Gates 0-7: evidence integrity, concrete verbs,
  |     |                          # framing ladder, banned phrases, word count,
  |     |                          # evidence placement, professional language,
  |     |                          # summary quality, verb scan, metric inversion,
  |     |                          # deduplication
  |     |-- evidence-ledger.md     # JD-to-evidence mapping protocol + two-track rule
  |     |-- cover-letter.md        # CL-Gate 0 (voice/conviction), writing rules,
  |     |                          # match table format, STAR+R structure
  |     +-- resforge-tier2-backlog.md  # Future improvements not yet ported
  |
  +-- templates/
        +-- cover-letter-template.html  # Cover letter HTML with placeholders
```

---

## Quick Start

```bash
git clone https://github.com/VIBERSNAKE-sys/ForgeOps.git
cd ForgeOps && npm install
npx playwright install chromium
```

Then follow [`SETUP.md`](SETUP.md) to configure your profile, CV, and evidence base.

For the original career-ops documentation, see [`CAREER-OPS-README.md`](CAREER-OPS-README.md).

---

## Attribution

- **[career-ops](https://github.com/santifer/career-ops)** by Santiago ([@santifer](https://santifer.io)) &mdash; scanning, evaluation, PDF pipeline, tracker, portal architecture
- **[ResForge](https://github.com/VIBERSNAKE-sys/ResForge)** &mdash; gate system, evidence ledger protocol, quality enforcement architecture, writing rules
- **validate-cv.mjs** &mdash; original to ForgeOps, the mechanical enforcement layer bridging both systems
- **ForgeOps integration** built with [Claude Code](https://claude.ai/claude-code)

---

## License

Same as career-ops. See [LICENSE](LICENSE).
