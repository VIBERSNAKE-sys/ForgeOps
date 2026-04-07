# ForgeOps Setup Guide

## Prerequisites

- [Claude Code](https://claude.ai/claude-code) (or any Claude-powered agent)
- Node.js 18+
- Playwright (for PDF generation and portal scanning)

## 1. Clone and Install

```bash
git clone https://github.com/YOUR-USERNAME/ForgeOps.git
cd ForgeOps && npm install
npx playwright install chromium
```

## 2. Create Your Profile

Copy the example config:

```bash
cp config/profile.example.yml config/profile.yml
```

Edit `config/profile.yml` with your details:

- **candidate:** name, email, phone, location, links
- **narrative:** headline, exit story, superpowers with evidence, proof points
- **target_roles:** your archetypes with axes and title keywords
- **title_filter:** positive and negative keywords for the portal scanner
- **compensation:** target range and minimum
- **education and certifications**

## 3. Create Your CV

Create `cv.md` in the project root with your full resume in markdown format.
Use standard sections: Professional Summary, Skills, Professional Experience,
Projects, Education, Certifications.

**Important:** Include ALL roles with dates. ForgeOps enforces employment
continuity and will block PDF generation if roles are missing.

## 4. Build Your Evidence Base

Create `article-digest.md` in the project root. This is the single source of
truth for every metric and fact that can appear in a generated CV.

For each role, document:
- Exact metrics (percentages, counts, timeframes)
- Team sizes and stakeholder counts
- Tools and methods used
- Evidence class: **E** (you owned it) or **X** (you contributed)

**Critical:** Add a "Confirmed Gaps" section listing things you CANNOT claim.
The system checks this to prevent fabrication.

## 5. Set Up Your Profile Overlay

Copy the profile template:

```bash
cp modes/_profile.template.md modes/_profile.md
```

Customize with:
- Your target role archetypes and adaptive framing
- Your exit narrative
- Your framing ladder overrides (for shared-ownership projects)
- Your evidence integrity rules

## 6. Configure Portal Scanner

```bash
cp templates/portals.example.yml portals.yml
```

Edit `portals.yml`:
- Update `title_filter.positive` with your target role keywords
- Add/remove companies in `tracked_companies`
- Adjust `search_queries` for your preferred job boards

## 7. Verify Setup

Start Claude Code in the ForgeOps directory and it will run onboarding checks
automatically. Or manually verify:

```bash
# Check all required files exist
for f in cv.md config/profile.yml modes/_profile.md portals.yml; do
  [ -f "$f" ] && echo "OK: $f" || echo "MISSING: $f"
done
```

## 8. First Evaluation

Paste a job URL or JD text into Claude Code. ForgeOps will:

1. Extract and parse the JD
2. Classify requirements (MUST / LIKELY_MUST / ADVISORY / SOFT)
3. Evaluate fit across 6 blocks (A-F)
4. Score 1-5 with recommendation
5. Generate a tailored CV with quality gates
6. Run `validate-cv.mjs` to verify before PDF generation
7. Generate PDF via Playwright

## How the Gate System Works

When generating a CV, ForgeOps reads three mode files:

1. `modes/resume-gates.md` — Gates 0-7 (evidence integrity, verbs, phrases,
   word count, framing ladder, placement, language quality)
2. `modes/evidence-ledger.md` — Maps JD requirements to your evidence base
3. `modes/cover-letter.md` — Writing rules and structure for cover letters

After drafting, `validate-cv.mjs` runs 5 mechanical checks:

```bash
node validate-cv.mjs output/cv.html --cv-source=cv.md --evidence=article-digest.md
```

If any check fails (exit code 1), PDF generation is blocked until violations
are fixed. Maximum 3 fix-validate cycles before flagging to user.

## Commands

| Command | What it does |
|---------|-------------|
| Paste JD/URL | Full pipeline: evaluate + report + CV + PDF + tracker |
| `/career-ops scan` | Scan portals for new postings |
| `/career-ops` | Show all available commands |

## File Structure

```
ForgeOps/
+-- cv.md                          # Your canonical CV (create this)
+-- article-digest.md              # Your evidence base (create this)
+-- config/profile.yml             # Your profile (create from example)
+-- portals.yml                    # Scanner config (create from example)
+-- modes/
|   +-- _profile.md                # Your customizations (create from template)
|   +-- _shared.md                 # System rules (auto-updatable)
|   +-- resume-gates.md            # Quality gates (ForgeOps addition)
|   +-- evidence-ledger.md         # Evidence protocol (ForgeOps addition)
|   +-- cover-letter.md            # CL rules (ForgeOps addition)
|   +-- oferta.md                  # Evaluation mode
|   +-- pdf.md                     # CV generation mode
|   +-- scan.md                    # Portal scanner mode
|   +-- (other modes...)
+-- templates/
|   +-- cv-template.html           # CV HTML template
|   +-- cover-letter-template.html # Cover letter template (ForgeOps addition)
+-- validate-cv.mjs                # Mechanical gate enforcement (ForgeOps addition)
+-- generate-pdf.mjs               # HTML to PDF via Playwright
+-- data/                          # Tracker, pipeline, scan history (gitignored)
+-- reports/                       # Evaluation reports (gitignored)
+-- output/                        # Generated PDFs (gitignored)
```
