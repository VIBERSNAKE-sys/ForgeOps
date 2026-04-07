# ForgeOps

[English](README.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [한국어](README.ko-KR.md) | [日本語](README.ja.md) | [Русский](README.ru.md) | [繁體中文](README.zh-TW.md)

<p align="center">
  <a href="https://x.com/santifer"><img src="docs/hero-banner.jpg" alt="Career-Ops — Multi-Agent Job Search System" width="800"></a>
</p>

<p align="center">
  <em>I spent months applying to jobs the hard way. So I engineered the system I wish I had.</em><br>
  Companies use AI to filter candidates. <strong>I gave candidates AI to <em>choose</em> companies.</strong><br>
  <em>Now it's open source.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-000?style=flat&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/OpenCode-111827?style=flat&logo=terminal&logoColor=white" alt="OpenCode">
  <img src="https://img.shields.io/badge/Codex_(soon)-6B7280?style=flat&logo=openai&logoColor=white" alt="Codex">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white" alt="Go">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT">
  <a href="https://discord.gg/8pRpHETxa4"><img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white" alt="Discord"></a>
  <br>
  <img src="https://img.shields.io/badge/EN-blue?style=flat" alt="EN">
  <img src="https://img.shields.io/badge/ES-red?style=flat" alt="ES">
  <img src="https://img.shields.io/badge/DE-grey?style=flat" alt="DE">
  <img src="https://img.shields.io/badge/FR-blue?style=flat" alt="FR">
  <img src="https://img.shields.io/badge/PT--BR-green?style=flat" alt="PT-BR">
  <img src="https://img.shields.io/badge/KO-white?style=flat" alt="KO">
  <img src="https://img.shields.io/badge/JA-red?style=flat" alt="JA">
  <img src="https://img.shields.io/badge/ZH--TW-blue?style=flat" alt="ZH-TW">
</p>

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

<p align="center"><strong>740+ job listings evaluated · 100+ personalized CVs · 1 dream role landed</strong></p>

<p align="center"><a href="https://discord.gg/8pRpHETxa4"><img src="https://img.shields.io/badge/Join_the_community-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a></p>

**Volume (cold applications):** ForgeOps end-to-end. Gates produce 7-7.5 quality output fast.

**Priority (warm intros, high-fit roles):** ForgeOps for analysis (evaluation, JD parsing, STAR stories), then a dedicated prompt system for the CV. Produces 9+ quality output slowly.

## What Is This

Career-Ops turns any AI coding CLI into a full job search command center. Instead of manually tracking applications in a spreadsheet, you get an AI-powered pipeline that:

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

Career-ops is a single slash command with multiple modes:

```
/career-ops                → Show all available commands
/career-ops {paste a JD}   → Full auto-pipeline (evaluate + PDF + tracker)
/career-ops scan           → Scan portals for new offers
/career-ops pdf            → Generate ATS-optimized CV
/career-ops batch          → Batch evaluate multiple offers
/career-ops tracker        → View application status
/career-ops apply          → Fill application forms with AI
/career-ops pipeline       → Process pending URLs
/career-ops contacto       → LinkedIn outreach message
/career-ops deep           → Deep company research
/career-ops training       → Evaluate a course/cert
/career-ops project        → Evaluate a portfolio project
```

Or just paste a job URL or description directly -- career-ops auto-detects it and runs the full pipeline.

## How It Works

```
You paste a job URL or description
        │
        ▼
┌──────────────────┐
│  Archetype       │  Classifies: LLMOps / Agentic / PM / SA / FDE / Transformation
│  Detection       │
└────────┬─────────┘
         │
┌────────▼─────────┐
│  A-F Evaluation  │  Match, gaps, comp research, STAR stories
│  (reads cv.md)   │
└────────┬─────────┘
         │
    ┌────┼────┐
    ▼    ▼    ▼
 Report  PDF  Tracker
  .md   .pdf   .tsv
```

## Pre-configured Portals

The scanner comes with **45+ companies** ready to scan and **19 search queries** across major job boards. Copy `templates/portals.example.yml` to `portals.yml` and add your own:

**AI Labs:** Anthropic, OpenAI, Mistral, Cohere, LangChain, Pinecone
**Voice AI:** ElevenLabs, PolyAI, Parloa, Hume AI, Deepgram, Vapi, Bland AI
**AI Platforms:** Retool, Airtable, Vercel, Temporal, Glean, Arize AI
**Contact Center:** Ada, LivePerson, Sierra, Decagon, Talkdesk, Genesys
**Enterprise:** Salesforce, Twilio, Gong, Dialpad
**LLMOps:** Langfuse, Weights & Biases, Lindy, Cognigy, Speechmatics
**Automation:** n8n, Zapier, Make.com
**European:** Factorial, Attio, Tinybird, Clarity AI, Travelperk

**Job boards searched:** Ashby, Greenhouse, Lever, Wellfound, Workable, RemoteFront

## Dashboard TUI

The built-in terminal dashboard lets you browse your pipeline visually:

```bash
cd dashboard
go build -o career-dashboard .
./career-dashboard --path ..
```

Features: 6 filter tabs, 4 sort modes, grouped/flat view, lazy-loaded previews, inline status changes.

## Project Structure

```
career-ops/
├── CLAUDE.md                    # Agent instructions
├── cv.md                        # Your CV (create this)
├── article-digest.md            # Your proof points (optional)
├── config/
│   └── profile.example.yml      # Template for your profile
├── modes/                       # 14 skill modes
│   ├── _shared.md               # Shared context (customize this)
│   ├── oferta.md                # Single evaluation
│   ├── pdf.md                   # PDF generation
│   ├── scan.md                  # Portal scanner
│   ├── batch.md                 # Batch processing
│   └── ...
├── templates/
│   ├── cv-template.html         # ATS-optimized CV template
│   ├── portals.example.yml      # Scanner config template
│   └── states.yml               # Canonical statuses
├── batch/
│   ├── batch-prompt.md          # Self-contained worker prompt
│   └── batch-runner.sh          # Orchestrator script
├── dashboard/                   # Go TUI pipeline viewer
├── data/                        # Your tracking data (gitignored)
├── reports/                     # Evaluation reports (gitignored)
├── output/                      # Generated PDFs (gitignored)
├── fonts/                       # Space Grotesk + DM Sans
├── docs/                        # Setup, customization, architecture
└── examples/                    # Sample CV, report, proof points
```

## Tech Stack

![Claude Code](https://img.shields.io/badge/Claude_Code-000?style=flat&logo=anthropic&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![Bubble Tea](https://img.shields.io/badge/Bubble_Tea-FF75B5?style=flat&logo=go&logoColor=white)

- **Agent**: Claude Code with custom skills and modes
- **PDF**: Playwright/Puppeteer + HTML template
- **Scanner**: Playwright + Greenhouse API + WebSearch
- **Dashboard**: Go + Bubble Tea + Lipgloss (Catppuccin Mocha theme)
- **Data**: Markdown tables + YAML config + TSV batch files

## Also Open Source

- **[cv-santiago](https://github.com/santifer/cv-santiago)** -- The portfolio website (santifer.io) with AI chatbot, LLMOps dashboard, and case studies. If you need a portfolio to showcase alongside your job search, fork it and make it yours.

## About the Author

I'm Santiago -- Head of Applied AI, former founder (built and sold a business that still runs with my name on it). I built career-ops to manage my own job search. It worked: I used it to land my current role.

My portfolio and other open source projects → [santifer.io](https://santifer.io)

☕ [Buy me a coffee](https://buymeacoffee.com/santifer) if career-ops helped your job search.

## Star History

<a href="https://www.star-history.com/?repos=santifer%2Fcareer-ops&type=timeline&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=santifer/career-ops&type=timeline&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=santifer/career-ops&type=timeline&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=santifer/career-ops&type=timeline&legend=top-left" />
 </picture>
</a>

## Disclaimer

**career-ops is a local, open-source tool — NOT a hosted service.** By using this software, you acknowledge:

1. **You control your data.** Your CV, contact info, and personal data stay on your machine and are sent directly to the AI provider you choose (Anthropic, OpenAI, etc.). We do not collect, store, or have access to any of your data.
2. **You control the AI.** The default prompts instruct the AI not to auto-submit applications, but AI models can behave unpredictably. If you modify the prompts or use different models, you do so at your own risk. **Always review AI-generated content for accuracy before submitting.**
3. **You comply with third-party ToS.** You must use this tool in accordance with the Terms of Service of the career portals you interact with (Greenhouse, Lever, Workday, LinkedIn, etc.). Do not use this tool to spam employers or overwhelm ATS systems.
4. **No guarantees.** Evaluations are recommendations, not truth. AI models may hallucinate skills or experience. The authors are not liable for employment outcomes, rejected applications, account restrictions, or any other consequences.

See [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) for full details. This software is provided under the [MIT License](LICENSE) "as is", without warranty of any kind.

## Attribution

- **[career-ops](https://github.com/santifer/career-ops)** by Santiago ([@santifer](https://santifer.io)) -- scanning, evaluation, PDF pipeline, tracker, portal architecture
- **ResForge** -- gate system, evidence ledger protocol, quality enforcement architecture, writing rules
- **validate-cv.mjs** -- original to ForgeOps, the mechanical enforcement layer bridging both systems
- **ForgeOps integration** built with [Claude Code](https://claude.ai/claude-code)

## Contributors

<a href="https://github.com/santifer/career-ops/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=santifer/career-ops" />
</a>

Got hired using career-ops? [Share your story!](https://github.com/santifer/career-ops/issues/new?template=i-got-hired.yml)

## License

MIT — Same as career-ops. See [LICENSE](LICENSE).

## Let's Connect

[![Website](https://img.shields.io/badge/santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/santifer)
[![X](https://img.shields.io/badge/X-000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/santifer)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/8pRpHETxa4)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hi@santifer.io)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/santifer)
