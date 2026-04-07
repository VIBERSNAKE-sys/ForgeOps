# Resume Quality Gates — Integrated from ResForge Modules 1-3

<!-- Adapted from the ResForge prompt system.
     This file distills the gate logic for ForgeOps' automated CV pipeline.
     See ATTRIBUTION in README.md for credits. -->

## When This File Applies

Read this file BEFORE generating any CV/PDF for an application. Run all blocking gates
on the drafted content. If any gate fails, fix before generating HTML/PDF.

## JD Requirement Classification (from Module 1)

Before drafting bullets, classify every JD requirement:

| Classification | Criteria | Signals |
|---------------|----------|---------|
| **MUST** | Explicitly required; screened out without | "required," "must have," "essential," "mandatory," listed under "Requirements" header |
| **LIKELY_MUST** | Core job function, not explicitly marked | Describes daily work, listed under "Responsibilities," implied by title |
| **ADVISORY** | Explicitly preferred | "preferred," "nice to have," "plus," "bonus," listed under "Preferred" header |
| **SOFT** | Culture/values only | Work style, no specific skill |

**Section header classification OVERRIDES bullet-level signals.** If a requirement is under "Required Qualifications," it is MUST even if it sounds soft. Respect employer placement.

## Frozen Criticals

Identify the 10-12 highest-priority JD requirements. These drive all optimization decisions.
Critical #1 = highest priority. Bullet ordering in TOP2 roles must follow Critical priority.

## Evidence Ledger Mapping

For each Frozen Critical, map to evidence from `article-digest.md` and `cv.md`:

| Critical | Source | Evidence | Class |
|----------|--------|----------|-------|
| (requirement) | (article-digest/cv) | (specific metric/fact) | E or X |

- **Evidence-class (E):** You personally executed, owned, or measured the outcome
- **Exposure-class (X):** You participated, supported, or observed without ownership

**Rules:**
- Each metric binds to ONE role (Sole-Source). One echo allowed in Summary.
- TOP2 roles (Role 1 + Role 2) must have 4+ Evidence-class bullets combined
- Prime exacts (exact JD phrases in Summary, Role1-B1, Role1-B2, or Skills) must be Evidence-class

## Word Count Enforcement (HARD — NOT ADVISORY)

| Location | Target | Acceptable | Ceiling | Floor |
|----------|--------|------------|---------|-------|
| Summary | — | — | 75 words | — |
| TOP2 bullets (Role 1 & 2) | 22-26 | 18-27 | 27 | 18 |
| Older role bullets (Role 3+) | 14-18 | 12-20 | 25 | 12 |

**Ceiling is emergency maximum, not target.** Bullets at 25-27: check for compressible content.

Compression priority:
1. FIRST remove: process fluff ("partnering with," "in order to," "while also," "by working with")
2. FIRST remove: timeframe without contrast ("over 12 business days" unless vs. baseline)
3. FIRST remove: expected collaboration ("coordinating with stakeholders")
4. FIRST remove: methodology without proof ("using Agile" unless Agile is a JD keyword)
5. NEVER remove: metrics, team sizes, timeframe contrasts, scope markers, success definitions

**Hollow Metric Test:** Success rate metrics (95%, 100%) require success definitions. "95% success rate" alone is hollow — define what "success" means.

**Enforced bands create natural variation.** Advisory bands produce robotic uniformity. This is validated from 50+ iterations.

## Gate 0: Evidence Integrity Pre-Check (RUN FIRST)

**BLOCKING. Run before drafting any bullets.**

For EVERY metric or number that will appear in the CV:
1. Find it in `article-digest.md` or Q&A Archive Part 1
2. Verify it's attributed to the CORRECT role (not misattributed across roles)
3. Check Q&A Archive Part 2 for caveats (e.g., "CANNOT claim: 'Quantified X%'")
4. If a metric is observational/qualitative, do NOT present it as a quantified metric

**Fabrication test:** For each number in a bullet, ask: "If the interviewer says 'tell me about that number,' can the candidate give a specific, defensible answer?"

**Role attribution test:** For each claim, verify the role header matches where the evidence actually occurred. Check `article-digest.md` role headers — respect the role boundary.

**Qualitative metric rule:** If the evidence source says "observed" or "qualitative" or "not formally measured," the number CANNOT appear as a quantified metric in a bullet. Rephrase as qualitative outcome (e.g., "streamlined approvals" not "reduced approval times by ~30%").

**Employment Continuity (MANDATORY):**
ALL roles from the original `cv.md` MUST appear in every tailored CV. Compression to 1 bullet is allowed. Deletion is NEVER allowed. Missing roles create employment gaps that trigger recruiter and background check flags.

## Gate 1: Concrete Verb & Natural Language

**BLOCKING.** CV cannot be finalized if any bullet contains:

**Banned lead verbs:** Ensuring, facilitating, positioning, driving, enabling, leveraging, utilizing, demonstrating, applying (as lead), fostering, championing, spearheading (without concrete action)

**Keyword stuffing indicators:**
- "and [JD keyword]" artificially appended
- More than 2 JD keywords in one bullet
- Forced connectors: "while also," "additionally implementing," "and ensuring"

**Robotic language test:** If 2+ of these are present, rewrite:
- 3+ JD keywords in one bullet
- Gerund stacking (3+ gerunds in sequence)
- Passive voice with keyword as subject
- Connector phrases adding no meaning
- Keyword without clear verb relationship

**Gerund stacking fix:** "Translating, facilitating, communicating" -> compress to one owned action + hard nouns.

**Compression technique:** Swap narrative verbs for hard nouns. "Partnering with engineering on implementation" (5 words) -> "with engineering" (2 words). Use recovered words for technical proof points.

## Gate 1.5: Framing Ladder Accuracy

**BLOCKING.** Verify action verbs match YOUR actual contribution:

| Tier | Verbs | Ledger Must Show |
|------|-------|-----------------|
| DELIVER | Built, Created, Developed, Deployed | YOU produced the deliverable |
| COORDINATE | Coordinated, Directed, Managed, Led | Others produced; you enabled |
| CONTRIBUTE | Supported, Assisted, Participated | Team outcome; your partial input |

For each TOP2 bullet, verify: What is the primary deliverable? Who produced it per Evidence Ledger? Does the verb tier match?

**User-specific framing rules:**
See `modes/_profile.md` for your personal framing ladder overrides.
Define these based on your own projects where ownership is shared.

Example:
- Dashboard project: COORDINATE verbs (engineering built it; I defined requirements)
- Training program: DELIVER verbs (I designed and delivered the sessions)
- Open-source tool: DELIVER for system design; COORDINATE if AI wrote the code

## Gate 2: Banned Phrases

**BLOCKING.** Remove if found anywhere:

**In Summary:** "seeking," "passionate," "proven track record," "results-driven," "seasoned professional"

**Anywhere:**
- "positioned [metric]" -> use "achieved" or "delivered"
- "responsible for," "duties included," "helped with"
- "Served as [title]," "Acted as [title]," "Functioned as [title]" -> replace with the action
- "Implemented [vague noun]" without specifying what (e.g., "implemented digital innovation" -> "deployed Teams/SharePoint integration")

**Defensive technical disclaimers (BANNED):**
- "while [team] handled [technical task]"
- "though I didn't [technical skill]"
- "[Team] handled [implementation]"
- Reframe as: "partnered with engineering," "defined requirements for," "guided implementation"

**Tenure restatement (BANNED):** Do not restate role duration in bullets. The header has dates. Exception: duration contrast ("8 weeks to 3 weeks").

**Metadata Leakage (BANNED):**

Evidence Ledger notes about HOW work originated are context for drafting, not content for resume text. Do not include origin metadata.

Banned examples:
- "self-initiated"
- "independently identified"
- "without being asked"
- "through personal initiative"
- "independently built"
- "to prove technical depth"
- "beyond advisory"

Demonstrating initiative through action verbs (Identified, Proposed, Championed) is encouraged — only origin narration is excluded.

TEST: Does this phrase tell the hiring manager what you accomplished, or does it explain why you started? If the latter, remove it.

**Em dash ban:** Em dashes (--), en dashes, and double hyphens as sentence breaks are banned. Replace with commas, colons, or restructure. Hyphens in compound words ("CTO-sponsored") are fine. Em dashes signal AI authorship.

## Gate 3: Word Count (see Enforcement table above)

**BLOCKING.** Count words for every bullet. Print count in draft. Fix before finalizing.

## Gate 4: Evidence Integrity

**BLOCKING.**
- TOP2 window must have 4+ Evidence-class bullets
- Prime exacts cannot be in Exposure-class bullets
- Every metric must trace to Evidence Ledger / article-digest.md

## Gate 5: Skills Concreteness (ADVISORY — not blocking)

Flag if Skills section contains abstract concepts. Run 4-test concreteness check:
1. Tool/Software test (named tool you could download?)
2. Method test (named methodology with defined steps?)
3. Deliverable test (discrete artifact you could hand someone? Countable, transferable, persistent?)
4. Certification test (could be tested/certified?)

Fail all 4 = abstract. Replace with concrete tools/methods/deliverables.

**Activity-noun heuristic:** Skills ending in "-tion," "-ment," "-ing" often describe activities, not artifacts. "Coordination" -> fails all 4 tests -> replace with "Cross-Functional Requirements Sessions."

## Gate 6: MUST-Evidence Placement

**BLOCKING.**
- Every MUST requirement needs an Evidence-class body bullet
- The MUST requirement must be PRIMARY FOCUS of the bullet (not in a trailing clause)
- Natural integration test: remove the keyword — does the sentence still make sense?

## Gate 7: Professional Language (Two-Tier)

### Tier 1: Basic Readability (ALL roles — BLOCKING)

**Sentence flow:**
| Wrong Pattern | Example | Fix |
|--------------|---------|-----|
| "Led [noun] [gerund]" | "Led team completing project" | "Led team to complete project" |
| "Achieved [gerund]" | "Achieved reducing costs" | "Reduced costs by X%" |
| Verb + noun + gerund | "Built dashboard reducing time" | "Built dashboard that reduced time" |

**Metric clarity:** No same-achievement-two-ways, awkward time expressions, or percentages without context.

**Noun clarity:** No ambiguous or repeated nouns within same bullet.

### Tier 2: Elevated Polish (SENIOR/EXECUTIVE only)

- Article precision: "Built framework" -> "Built a framework"
- Formal prepositions: "using" -> "through" or "via" where appropriate
- Verb elevation: "Managed" -> "Orchestrated"; "Helped" -> "Partnered with"; "Did" -> "Architected"
- Executive briefing test: Would a CEO read this in a board deck?

## Additional Rules

### Bullet Ordering by Critical Priority
Within TOP2 roles, bullets ordered by Frozen Critical priority. B1/B2 address highest-priority Criticals. If two bullets address same Critical, Evidence-class with metric wins.

### One Exact JD Phrase Per Bullet
Default: one exact phrase per bullet. Skills may repeat. Variants elsewhere.
Keyword must be the NATURAL OBJECT of the verb, not an add-on.
Banned: "tools and [keyword]," "activities including [keyword]," "while ensuring [keyword]"

### Variant Honesty Standard
- HONEST: clear conceptual overlap, defensible in interview -> ALLOWED
- WEAK: tangential, requires explanation -> ALLOWED with flag
- DISHONEST: no real connection, would require BS -> BLOCKED

### Government-to-Private Sector Terminology (CAREER_CHANGE)
| Government | Private Sector |
|-----------|---------------|
| Mission | Project / Initiative |
| Interagency | Cross-functional |
| Stakeholder engagement | Client management / Partner coordination |
| Acquisition | Procurement / Vendor management |
| Briefing | Executive presentation |
| Compliance (federal) | Regulatory compliance |

### Employment Continuity
ALL roles from original resume must appear. Compression allowed (1 bullet minimum). Deletion forbidden. Pre-2015 roles may collapse under "Additional Experience."

### Monotony Guards
- If 4+ consecutive bullets are within +/-1 word of each other -> vary sentence structure
- No lead verb root can appear 3x in any 5-bullet window

## Summary Quality Check (MANDATORY — run on Professional Summary)

**CHECK A (Banned Phrases):** Run Gate 2 banned phrase list against the full summary text. Include conceptual verb gerunds (driving, enabling, ensuring, facilitating, leveraging, utilizing, demonstrating, applying, fostering, championing, spearheading) and banned descriptors (seasoned, experienced, proven track record, results-driven, passionate, seeking).

**CHECK B (Redundancy):** Compare each sentence in the summary to every other sentence. If two sentences make the same claim at different specificity levels, merge into one with higher specificity.

**CHECK C (Opening Variation):** The summary opening must match the JD lead signal, not default to an identity label. Test: What does the JD lead with? Does the summary lead with the same signal? Identity labels ("Program manager," "AI practitioner," "AI deployment leader") are template openings. Rewrite to lead with delivery proof or scope the JD prioritizes.

**CHECK D (Positioning Statement):** If the summary ends with a "Combines X with Y" or "Brings X to Y" statement, apply removal test: replace it with nothing. Does the summary lose specific information? If no, the statement is filler — cut it.

## Cross-Resume Opening Verb Scan

After drafting all bullets, list the opening verb of every bullet.

- Same verb 3+ times: MANDATORY replacement
- Same verb 2 times: ADVISORY (replace if a more precise verb exists; keep if both uses are accurate and bullets are in distant roles)
- When resolving duplicates, prefer changing older-role bullets over TOP2 bullets

**Collective Advisory Escalation:** If 3+ distinct verbs are flagged as advisory (2 occurrences each), escalate the entire set to mandatory.

## Metric-Context Inversion Check

For each metric in a bullet, verify the phrasing preserves what went up versus what went down. "40% reduction in processing time" is NOT "40% reduction in automation." If the sentence could be read as the opposite of the evidence, revise.

## Metric Composition Guardrail

Add to Gate 4 (Evidence Integrity):

Do NOT aggregate, sum, average, or combine two or more numeric facts into a single new metric. Do NOT convert category counts into composite totals. Do NOT imply shared denominators unless the user explicitly asserts that binding. Each metric from article-digest.md must remain atomic unless the user explicitly approves combination.

## Within-Role Deduplication

After drafting all bullets for each role, check for:
- Repeated metrics: same number in 2+ bullets within same role
- Repeated topics: same project/initiative in 2+ bullets within same role
If found, CONSOLIDATE (merge strongest elements) or SUBSTITUTE (change repeated reference to descriptive text).
