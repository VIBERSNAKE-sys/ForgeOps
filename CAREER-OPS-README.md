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
<<<<<<< HEAD
# 1. Clone and install
git clone https://github.com/santifer/career-ops.git
cd career-ops && npm install
npx playwright install chromium   # Required for PDF generation

# 2. Check setup
npm run doctor                     # Validates all prerequisites

# 3. Configure
cp config/profile.example.yml config/profile.yml  # Edit with your details
cp templates/portals.example.yml portals.yml       # Customize companies

# 4. Add your CV
# Create cv.md in the project root with your CV in markdown

# 5. Personalize with Claude
claude   # Open Claude Code in this directory

# Then ask Claude to adapt the system to you:
# "Change the archetypes to backend engineering roles"
# "Translate the modes to English"
# "Add these 5 companies to portals.yml"
# "Update my profile with this CV I'm pasting"

# 6. Start using
# Paste a job URL or run /career-ops
=======
node validate-cv.mjs output/cv.html --cv-source=cv.md --evidence=article-digest.md
>>>>>>> f17f320 (Make ForgeOps the repo identity)
```

5 mechanical checks run:

1. **Word Count Enforcement** — every bullet counted, TOP2 vs older role ceilings enforced
2. **Banned Phrase Scan** — 30+ patterns including metadata leakage, defensive framing, em dashes
3. **Employment Continuity** — role count in output must match cv.md
4. **Opening Verb Frequency** — flags repeated verbs, escalates if 3+ verbs are duplicated
5. **Metric Fabrication Guard** — cross-references every number against article-digest.md

Exit codes: 0 = all pass, 1 = failures (block PDF), 2 = warnings only (proceed with review).

Maximum 3 fix-validate cycles before flagging to user.

## New Files (not in career-ops)

| File | Purpose |
|------|---------|
| `validate-cv.mjs` | Mechanical gate enforcement script |
| `modes/resume-gates.md` | Gates 0-7: evidence integrity, verbs, phrases, word count, framing, placement, language |
| `modes/evidence-ledger.md` | Evidence Ledger construction protocol |
| `modes/cover-letter.md` | CL-Gate 0 (voice check), writing rules, match table format, STAR+R structure |
| `modes/resforge-tier2-backlog.md` | Future improvements not yet ported |
| `templates/cover-letter-template.html` | Cover letter HTML template with placeholders |

## Setup

See [SETUP.md](SETUP.md) for full configuration guide. Quick start:

```bash
git clone https://github.com/VIBERSNAKE-sys/ForgeOps.git
cd ForgeOps && npm install
npx playwright install chromium
```

Then follow the onboarding in SETUP.md to configure your profile, CV, and evidence base.

## Attribution

- **[career-ops](https://github.com/santifer/career-ops)** by Santiago ([@santifer](https://santifer.io)) — scanning, evaluation, PDF pipeline, tracker, portal architecture
- **ResForge** — gate system, evidence ledger protocol, quality enforcement architecture, writing rules
- **validate-cv.mjs** — original to ForgeOps, the mechanical enforcement layer bridging both systems
- **ForgeOps integration** built with [Claude Code](https://claude.ai/claude-code)

## Disclaimer

**career-ops is a local, open-source tool — NOT a hosted service.** By using this software, you acknowledge:

1. **You control your data.** Your CV, contact info, and personal data stay on your machine and are sent directly to the AI provider you choose (Anthropic, OpenAI, etc.). We do not collect, store, or have access to any of your data.
2. **You control the AI.** The default prompts instruct the AI not to auto-submit applications, but AI models can behave unpredictably. If you modify the prompts or use different models, you do so at your own risk. **Always review AI-generated content for accuracy before submitting.**
3. **You comply with third-party ToS.** You must use this tool in accordance with the Terms of Service of the career portals you interact with (Greenhouse, Lever, Workday, LinkedIn, etc.). Do not use this tool to spam employers or overwhelm ATS systems.
4. **No guarantees.** Evaluations are recommendations, not truth. AI models may hallucinate skills or experience. The authors are not liable for employment outcomes, rejected applications, account restrictions, or any other consequences.

See [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) for full details. This software is provided under the [MIT License](LICENSE) "as is", without warranty of any kind.

## License

<<<<<<< HEAD
MIT

---

# :es: Version en Español

## Que es esto

Career-Ops convierte Claude Code en un centro de mando de busqueda de empleo. En vez de trackear aplicaciones en un spreadsheet, tienes un pipeline AI que:

- **Evalua ofertas** con scoring estructurado A-F (10 dimensiones ponderadas)
- **Genera PDFs personalizados** -- CVs ATS-optimizados por oferta
- **Escanea portales** automaticamente (Greenhouse, Ashby, Lever, webs de empresas)
- **Procesa en batch** -- evalua 10+ ofertas en paralelo con sub-agentes
- **Trackea todo** en una fuente de verdad unica con checks de integridad

> **Importante: Esto NO es para spamear empresas.** Career-ops es un filtro -- te ayuda a encontrar las pocas ofertas que merecen tu tiempo entre cientos. El sistema recomienda encarecidamente no aplicar a nada por debajo de 4.0/5. Tu tiempo es valioso, y el del recruiter tambien. Siempre revisa antes de enviar.

> **Aviso: las primeras evaluaciones no seran buenas.** El sistema no te conoce todavia. Dale contexto -- tu CV, tu historia profesional, tus proof points, tus preferencias, en que eres bueno, que quieres evitar. Cuanto mas lo nutras, mejor filtra. Piensa en ello como hacer onboarding a un recruiter nuevo: la primera semana necesita conocerte, luego se vuelve invaluable.

Construido por alguien que lo uso para evaluar 740+ ofertas, generar 100+ CVs personalizados, y conseguir un rol de Head of Applied AI. [Lee el case study completo](https://santifer.io/career-ops).

## Inicio rapido

```bash
# 1. Clonar
git clone https://github.com/santifer/career-ops.git
cd career-ops && npm install

# 2. Verificar setup
npm run doctor                     # Valida todos los prerequisitos

# 3. Configurar
cp config/profile.example.yml config/profile.yml  # Editar con tus datos
cp templates/portals.example.yml portals.yml       # Personalizar empresas

# 4. Añadir tu CV
# Crear cv.md en la raiz del proyecto con tu CV en markdown

# 5. Personalizar con Claude
claude   # Abrir Claude Code en este directorio

# Pidele a Claude que adapte el sistema a ti:
# "Cambia los arquetipos a roles de backend"
# "Traduce los modes a ingles"
# "Añade estas empresas a portals.yml"
# "Actualiza mi perfil con este CV que te pego"

# 6. Usar
# Pega una URL de oferta o ejecuta /career-ops
```

> **El sistema esta diseñado para que Claude lo personalice.** Modes, arquetipos, scoring, scripts de negociacion -- solo pidelo. Claude lee los mismos archivos que usa, asi que sabe exactamente que editar.

Guia completa en [docs/SETUP.md](docs/SETUP.md).

## Portales incluidos

El scanner viene con **45+ empresas** pre-configuradas y **19 queries** en los principales portales de empleo. Copia `templates/portals.example.yml` a `portals.yml` y añade las tuyas:

**AI Labs:** Anthropic, OpenAI, Mistral, Cohere, LangChain, Pinecone
**Voice AI:** ElevenLabs, PolyAI, Parloa, Hume AI, Deepgram, Vapi, Bland AI
**Plataformas AI:** Retool, Airtable, Vercel, Temporal, Glean, Arize AI
**Contact Center:** Ada, LivePerson, Sierra, Decagon, Talkdesk, Genesys
**Enterprise:** Salesforce, Twilio, Gong, Dialpad
**LLMOps:** Langfuse, Weights & Biases, Lindy, Cognigy, Speechmatics
**Automatizacion:** n8n, Zapier, Make.com
**Europa:** Factorial, Attio, Tinybird, Clarity AI, Travelperk

**Portales de empleo:** Ashby, Greenhouse, Lever, Wellfound, Workable, RemoteFront

## Uso

Career-ops es un unico slash command con multiples modos:

```
/career-ops                → Mostrar todos los comandos
/career-ops {pega un JD}   → Pipeline completo (evaluar + PDF + tracker)
/career-ops scan           → Escanear portales
/career-ops pdf            → Generar CV ATS-optimizado
/career-ops batch          → Evaluar ofertas en batch
/career-ops tracker        → Ver estado de aplicaciones
/career-ops apply          → Rellenar formularios con IA
/career-ops pipeline       → Procesar URLs pendientes
/career-ops contacto       → Mensaje LinkedIn outreach
/career-ops deep           → Research profundo de empresa
```

O simplemente pega una URL o descripcion de oferta -- career-ops la detecta y ejecuta el pipeline completo.

## Tambien Open Source

- **[cv-santiago](https://github.com/santifer/cv-santiago)** -- El portfolio (santifer.io) con chatbot IA, dashboard LLMOps y case studies. Si necesitas un portfolio para acompañar tu busqueda de empleo, echale un vistazo.

## Documentacion

- [SETUP.md](docs/SETUP.md) -- Guia de instalacion
- [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) -- Como personalizar
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) -- Como funciona el sistema

☕ [Invitame a un cafe](https://buymeacoffee.com/santifer) si career-ops te ayudo en tu busqueda.

## Aviso legal

**career-ops es una herramienta local y open source — NO un servicio alojado.** Al usar este software, aceptas que:

1. **Tu controlas tus datos.** Tu CV, datos de contacto e informacion personal se quedan en tu maquina y se envian directamente al proveedor de IA que elijas (Anthropic, OpenAI, etc.). No recopilamos, almacenamos ni tenemos acceso a tus datos.
2. **Tu controlas la IA.** Los prompts por defecto instruyen a la IA a no enviar aplicaciones automaticamente, pero los modelos pueden comportarse de forma impredecible. Si modificas los prompts o usas otros modelos, lo haces bajo tu responsabilidad. **Revisa siempre el contenido generado antes de enviarlo.**
3. **Tu cumples con los terminos de terceros.** Debes usar esta herramienta de acuerdo con los Terminos de Servicio de los portales de empleo (Greenhouse, Lever, Workday, LinkedIn, etc.). No uses esta herramienta para spamear empresas.
4. **Sin garantias.** Las evaluaciones son recomendaciones, no verdad absoluta. Los modelos pueden inventar habilidades o experiencia. Los autores no son responsables de resultados laborales, candidaturas rechazadas, restricciones de cuenta ni ninguna otra consecuencia.

Ver [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) para mas detalles. Este software se proporciona bajo la [Licencia MIT](LICENSE) "tal cual", sin garantia de ningun tipo.

## Let's Connect

[![Website](https://img.shields.io/badge/santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/santifer)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hola@santifer.io)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/santifer)
=======
Same as career-ops. See [LICENSE](LICENSE).
>>>>>>> f17f320 (Make ForgeOps the repo identity)
