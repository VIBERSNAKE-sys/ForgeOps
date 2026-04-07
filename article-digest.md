# Article Digest -- Connor Kinsella

Compact proof points and evidence for evaluation scoring and CV generation.
Source of truth: Q&A Archive Parts 1-3 (maintained separately).

---

## DOJ (Amentum) | 07/2024--07/2025

### Automation Dashboard
- 40% reduction in manual workflows (30 hrs/week to 18 hrs/week) per Regional Advisor
- 12 RAs tested over 12 business days (alpha)
- Real-time updates every 5 minutes
- Co-led 6-member automation squad (all non-technical domain experts; IT built dashboard separately)
- Connor's role: AI/emerging tech SME, requirements definition (data sources, access roles, update cadence), alpha test facilitation, feedback collection
- Scrum: 1-week sprints, ~16 sprints over 4 months, standups + sprint reviews
- IT used custom Python scripts; dashboard ran on local server during alpha
- Senior supervisor "immensely impressed" with alpha results
- Metrics tracked: error reduction, user satisfaction, adoption rate, task completion time, self-reported time saved

### AI Governance Framework
- 33 specialists, personally invited by CTO
- 53,000-person organization (Amentum total headcount)
- NIST AI RMF + ISO/IEC 42001
- 5 risk categories: data integrity, bias, access control, explainability, model drift
- 5 historical risks + 8 hypothetical risks identified
- Connor's specific ownership: security and compliance sections, vendor/third-party risk subsection
- Human-in-the-loop review gates included as framework component
- ~30 pages at near-final state when laid off
- Origin: casual AI mention on team call -> 4-hour session with boss's boss -> CTO invitation ~3 weeks later
- Connor was first to identify the 5 unaddressed risk categories

### Program Delivery
- 95% success rate across 32 milestones in 12 programs across 13 countries
- Success = on-time, on-budget, customer satisfaction (maintained existing rate, not improved from lower baseline)
- ~3 officials per country across 15+ partner nations (45+ external stakeholders)
- Named POC for specific country programs: updates, issue escalation, relationship continuity
- Budget tracking: tracked actuals against issued budgets (NO forecasting, NO profitability management, NO dollar figures known)
- Weekly status reports to shared RA supervisor
- ~40 emails daily in external communication
- Developed RFPs for blockchain security company + other procurement documents

---

## IMF Lead Division Coordinator | 04/2022--07/2024

### Teams/SharePoint Integration
- 100% adoption rate across 6 senior managers
- 6 training sessions (1 large presentation + 5 personalized one-on-ones)
- ~24 projects affected across Pacific Islands Division
- ~30% faster approvals observed (qualitative, not formally measured)
- Scope received from above (not Connor's proposal); Connor owned training design, pre-built Teams channels, rollout execution
- New tool adoption, NOT migration from existing system

### Country Programs
- 12 annual programs, 32 milestones tracked per year, 100% on-time completion
- Supported three 8-10 person teams of economists/researchers
- Trackers, schedules, approvals for Managing Director, Department Head, Division Head

### Pacific Islands Conference
- ~50 total attendees including 30 dignitaries and heads of state
- Artifacts: agenda, briefing memo, talking points, seating plan, slide deck
- Department Head and Division Head acknowledged Connor as instrumental
- Coordinated across multiple departments and regional office in Fiji

### Briefing Materials
- 50+ briefing materials (40% authored from scratch, 60% edited/reviewed)
- ~2 hours turnaround for high-priority materials
- Most common format: memos

---

## IMF Staff Coordinator | 03/2020--04/2022

### Board Registration Matrix
- 400% increase: 2/week to 8/week (immediate, within first week)
- Removed Department from Board censure for poor attendance
- Self-initiated from personal frustration (not assigned)
- Adopted by other IMF Departments organically

### Onboarding SOPs
- 60% reduction: ~8 weeks to ~3 weeks for 4 junior staff
- Self-initiated, built without seeking permission
- HR head (Asia & Pacific Division) personally praised quality and initiative
- No resistance from staff

### Executive Support
- 25 concurrent assignments for 4 senior executive managers
- Scheduling, travel planning, IT assistance, expense reports
- Tools: Action Item master log (Word) + Excel for project tracking
- ~6 meetings/week per executive, 2 multi-country travel arrangements/month

---

## IMF Special Office | 03/2019--03/2020

- Selected from pool of 30 SOS staff for MD briefing book (told came "highly recommended")
- Invited back to cover same employee's vacation (repeat selection validates quality)
- 34 deliverables, 5 workshops coordinated across 8 Departments

---

## DC DOES | 12/2015--12/2018

### 600-Inquiry Legislative Sprint
- 600 inquiries in 3 weeks vs. prior baseline of ~200 in 3 months
- Team of 4 analysts, $0 budget (Smartsheet trial tier)
- Routine annual assignment (not crisis); Connor selected by Director's personal fiat
- Smartsheet: built project structure from scratch, tracked assignments/status/deadlines/workloads
- Internal tool only (no leadership-facing outputs from tracker)

### UI Form Redesign
- Unemployment insurance form redevelopment
- Consulted frequently with Division of Unemployment Insurance leader
- Stakeholder workshop for senior executive management; changes adopted wholesale

---

## Independent Projects

### DocForge (02/2026)
- 10-agent pipeline on Claude Code Agent SDK (claude-sonnet-4.6)
- 6 standalone Python tools (word counting, formatting detection, banned phrase scanning, vocabulary dedup, sentence flow, .docx generation)
- 8-gate quality control: word count enforcement, evidence integrity, professional language, keyword placement
- Verification Agent firewalled from Evidence Agent (structural separation of concerns)
- HIGH confidence on first validation attempt (5/5 runs), 100% critical requirement coverage
- Architecture: isolation by design, state via files not conversation, guardrails as structural impossibility
- Connor designed system and specified requirements; Claude Code implemented in ~30 minutes due to exhaustively precise prompt engineering
- Trade-off insight: monolithic prompt outperforms agents for tightly coupled rule systems, but DocForge proves multi-agent architecture capability

### MetricsFlow (01/2026--03/2026)
- n8n AI Agent node with 6-tool orchestration
- Persistent state management via n8n Data Stores
- PII detection/redaction + audit trail (Connor's design choices, not platform defaults)
- 92% pass rate across 25 structured test scenarios (single batch run)
- 5 evaluation dimensions: Schema Validity, Hallucination Detection, Risk Consistency, Evidence Discipline, Executive Usefulness
- Weakest: Risk Consistency; Strongest: Evidence Discipline
- 2 outright failures (8%): minimal input edge cases
- LLM-as-judge is non-deterministic (92% could vary 88-92% on re-run)
- Rubric dimensions created independently based on system failure modes (not adapted from published framework)
- Motivation: certifications felt insufficient; built to prove hands-on capability

### ResForge (10/2024--03/2026)
- 28,000-word modular prompt system (4 core modules, 10 supporting documents)
- ~32,500-word knowledge database architecture
- 50+ prompt iterations across ChatGPT, Claude, Gemini, DeepSeek
- 80% workflow efficiency improvement with factual accuracy maintained
- Open-sourced March 2026 with 9-criterion self-audit contribution protocol
- Methodology directly informed DocForge's multi-agent architecture

---

## AI Safety Research Interest

- Primary interest: specification gaming / reward hacking
- Research question: conditions under which AI systems pursue proxy goals rather than stated human objectives
- Human-in-the-loop oversight framed as accountability requirement (IBM principle), not just error-catching
- Georgetown planted research orientation; DOJ governance was stepping stone toward empirical investigation
- MetricsFlow as adjacent evidence: LLM-as-judge and human judgment have complementary blind spots

---

## Key Gaps (Internal Reference Only -- NEVER for external materials)

- No professional AI tool deployment (laid off before deployment)
- No adoption playbook creation
- No formal stakeholder mapping artifacts
- No budget ownership (tracking only at DOJ, none at IMF)
- No Python coding ability (designs systems, AI runs code)
- No professional product manager title
- No formal success metrics frameworks (HEART, OKRs, etc.)
- No cloud platform professional experience (AWS, Azure, GCP)
- No SQL, TypeScript, frontend development experience
- No formal risk register or issues log usage
- No Jira, ADO, Confluence experience
- No CRM/ATS experience
- No vendor relationship management beyond RFP/risk assessment
- No B2B/commercial stakeholder experience
- No financial services industry experience
