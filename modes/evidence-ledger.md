# Evidence Ledger Protocol — Integrated from ResForge Module 1

<!-- Maps JD requirements to verified evidence from article-digest.md.
     Run this mapping BEFORE drafting any CV bullets. -->

## When This File Applies

Before generating a tailored CV, build an Evidence Ledger that maps each JD requirement
to specific, verified evidence. This prevents overclaiming and ensures every bullet
traces to a real accomplishment.

## CRITICAL: Two-Track Workflow Rule

If you use a separate high-quality prompt system (like ResForge) for priority targets,
do NOT use ForgeOps's Evidence Ledger as a shortcut. The priority system must build
its own Ledger from your evidence base with full provenance (citation, role-boundary
enforcement, exposure-to-evidence promotion lock). The provenance chain is what prevents
metric fabrication and role misattribution.

**What ForgeOps CAN hand off:**
- JD parsing (MUST/LIKELY_MUST/ADVISORY classification)
- Evaluation score and Go/No-Go verdict
- STAR stories

**What ForgeOps CANNOT shortcut:**
- Evidence Ledger construction — must be built from article-digest.md directly
- Provenance verification — every metric needs a citable source with role boundary
- Exposure-to-Evidence promotion decisions

## Evidence Ledger Structure

For each JD requirement (classified as MUST, LIKELY_MUST, ADVISORY, or SOFT):

```
| # | Requirement | Classification | Evidence Source | Evidence | Class | Gap? |
|---|-------------|---------------|----------------|----------|-------|------|
| 1 | (JD text) | MUST | article-digest.md: [Role] [Project] | [metric] | E | No |
| 2 | (JD text) | MUST | (none found) | — | — | YES |
```

## Locked Metrics Table (MANDATORY)

After building the Evidence Ledger, every metric that will appear on the resume
must be locked in this table with its exact permitted phrasing. During CV generation,
every number in every bullet must match a row in this table. Any number not in the
table is a fabrication.

```
| # | Metric | Source (article-digest.md line) | Role | Locked Phrasing | Restriction |
|---|--------|--------------------------------|------|-----------------|-------------|
| 1 | 40% | DOJ Dashboard section | DOJ | "reducing manual workflows by 40%" | None |
| 2 | ~30% approvals | IMF Teams/SharePoint section | IMF Lead | QUALITATIVE ONLY — do not quantify | Observed, not measured |
| 3 | 95% | DOJ Program Delivery section | DOJ | "95% on-time/on-budget success rate" | Must include success definition |
```

**Restriction rules:**
- If the evidence source describes an outcome as "observed," "estimated,"
  "approximately," "informally measured," or "qualitative," mark the Locked
  Phrasing as `QUALITATIVE ONLY — do not quantify`
- If a metric has a success definition requirement (hollow metric test),
  note it in the Restriction column
- The Locked Phrasing column is the ONLY permitted way this number can
  appear in a bullet. Paraphrasing that changes the meaning is not allowed.

## Evidence Classification Rules

**Evidence-class (E):** You personally executed, owned, or directly measured the outcome.

**Exposure-class (X):** You participated, supported, or observed without sole ownership.

Define your Evidence vs. Exposure classifications in `article-digest.md` for each
accomplishment. This determines which verb tier (DELIVER vs. COORDINATE) is appropriate.

## Sole-Source Rule

Each metric binds to ONE role. One echo allowed in Summary. Do not claim the same metric
from two different roles.

## Reframing Decisions

When JD language doesn't match your exact experience, decide:

| JD Phrase | Proposed Variant | Honest? | Decision |
|-----------|-----------------|---------|----------|
| (example) | (your equivalent) | Defensible in interview? | APPROVED / FLAG / REJECTED |

**Honesty test:** "Could I defend this connection in an interview without BS?"

## Gap Handling

When a MUST requirement has no evidence:

1. **Hard blocker?** Would the employer screen out without this?
2. **Adjacent experience?** Can you demonstrate a related capability?
3. **Portfolio project?** Does an independent project cover this gap?
4. **Mitigation plan:** Specific phrase for cover letter, or note gap in evaluation scoring.

## User-Specific Evidence Boundaries

Define your honest limitations in `article-digest.md` under "Confirmed Gaps."
The system reads these before drafting to prevent false claims.

Your gaps list should include:
- Skills you do NOT have professionally
- Tools you have NOT used in production
- Experience types you CANNOT honestly claim
- Metrics that are observational, not formally measured (note the caveat)

**NEVER present qualitative observations as quantified metrics.**
If your evidence says "observed" or "not formally measured," do NOT put it as
a number in a bullet. Rephrase as qualitative outcome.

**NEVER misattribute evidence across roles.**
Check which role each metric belongs to. Respect role boundaries.

**NEVER delete roles to save space.**
ALL roles from cv.md must appear. Compress to 1 bullet minimum. Deletion creates employment gaps.

## Go/No-Go Decision

After building the Evidence Ledger:

| Verdict | Criteria |
|---------|----------|
| **GO** | Evidence exists for 70%+ of MUST requirements with 3+ Evidence-class matches |
| **CONDITIONAL** | Evidence for 50-69% of MUSTs; gaps are mitigatable or ADVISORY |
| **NO-GO** | Evidence for <50% of MUSTs; multiple hard blockers with no mitigation |

If NO-GO, recommend against applying (per ForgeOps ethical use guidelines).
