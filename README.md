# ForgeOps

**career-ops + ResForge quality gates = mechanically enforced CV generation**

ForgeOps is a fork of [career-ops](https://github.com/santifer/career-ops) that adds resume quality gates, evidence integrity enforcement, and a mechanical validation script. Career-ops gives you speed. ResForge gives you rigor. ForgeOps gives you both.

## What's Different from career-ops

| Feature | career-ops | ForgeOps |
|---------|-----------|----------|
| CV quality control | LLM judgment only | `validate-cv.mjs` blocks PDF on failures + 8 gates in `resume-gates.md` |
| Evidence integrity | No verification | Evidence Ledger protocol, fabrication test, role attribution check |
| Framing accuracy | No verb checking | 3-tier framing ladder (DELIVER / COORDINATE / CONTRIBUTE) |
| Word count | Not enforced | Hard ceilings: TOP2 18-27, older 12-25, summary 75 (script-enforced) |
| Banned phrases | Not checked | 30+ patterns: metadata leakage, defensive framing, em dashes, conceptual verbs |
| Employment continuity | Roles could be deleted | Script blocks PDF if role count doesn't match cv.md |
| Cover letter | 1-line spec, no template | Template with placeholders, match table format, CL-Gate 0 |
| Metric fabrication | Not checked | Script cross-references every number against article-digest.md |

## The Two-Track Strategy

**Volume (cold applications):** ForgeOps end-to-end. Gates produce 7-7.5 quality output fast.

**Priority (warm intros, high-fit roles):** ForgeOps for analysis (evaluation, JD parsing, STAR stories), then a dedicated prompt system for the CV. Produces 9+ quality output slowly.

The gate integration means the volume strategy is viable without risking interview embarrassment from fabricated metrics or missing roles.

## How validate-cv.mjs Works

After generating CV HTML and before converting to PDF, run:

```bash
node validate-cv.mjs output/cv.html --cv-source=cv.md --evidence=article-digest.md
```

5 mechanical checks run:

1. **Word Count Enforcement** -- every bullet counted, TOP2 vs older role ceilings enforced
2. **Banned Phrase Scan** -- 30+ patterns including metadata leakage, defensive framing, em dashes
3. **Employment Continuity** -- role count in output must match cv.md
4. **Opening Verb Frequency** -- flags repeated verbs, escalates if 3+ verbs are duplicated
5. **Metric Fabrication Guard** -- cross-references every number against article-digest.md

Exit codes: 0 = all pass, 1 = failures (block PDF), 2 = warnings only (proceed with review).

Maximum 3 fix-validate cycles before flagging to user.

## New Files (not in career-ops)

| File | Purpose |
|------|---------|
| `validate-cv.mjs` | Mechanical gate enforcement script |
| `modes/resume-gates.md` | Gates 0-7: evidence integrity, concrete verbs, framing ladder, banned phrases, word count, evidence placement, professional language, summary quality, verb scan, metric inversion, deduplication |
| `modes/evidence-ledger.md` | JD-to-evidence mapping protocol with two-track workflow rule |
| `modes/cover-letter.md` | CL-Gate 0 (voice/conviction check), writing rules, match table format, STAR+R structure |
| `modes/resforge-tier2-backlog.md` | Future improvements not yet ported |
| `templates/cover-letter-template.html` | Cover letter HTML template with placeholders |
| `SETUP.md` | ForgeOps-specific setup guide |
| `CAREER-OPS-README.md` | Original career-ops documentation |

## Quick Start

```bash
git clone https://github.com/VIBERSNAKE-sys/ForgeOps.git
cd ForgeOps && npm install
npx playwright install chromium
```

Then follow [SETUP.md](SETUP.md) to configure your profile, CV, and evidence base.

For the original career-ops documentation, see [CAREER-OPS-README.md](CAREER-OPS-README.md).

## Attribution

- **[career-ops](https://github.com/santifer/career-ops)** by Santiago ([@santifer](https://santifer.io)) -- scanning, evaluation, PDF pipeline, tracker, portal architecture
- **ResForge** -- gate system, evidence ledger protocol, quality enforcement architecture, writing rules
- **validate-cv.mjs** -- original to ForgeOps, the mechanical enforcement layer bridging both systems
- **ForgeOps integration** built with [Claude Code](https://claude.ai/claude-code)

## License

Same as career-ops. See [LICENSE](LICENSE).
