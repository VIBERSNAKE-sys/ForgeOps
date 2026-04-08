#!/usr/bin/env node

/**
 * validate-cv.mjs — Mechanical gate enforcement for career-ops CV generation
 *
 * Runs AFTER HTML construction, BEFORE PDF generation.
 * Parses generated HTML, runs checks, blocks PDF if any FAIL.
 *
 * Usage:
 *   node validate-cv.mjs <html-file> --cv-source=cv.md --evidence=article-digest.md
 *
 * Exit codes:
 *   0 = all checks passed
 *   1 = one or more checks failed (do NOT generate PDF)
 *   2 = warnings only (PDF generation allowed, review recommended)
 */

import { readFile } from 'fs/promises';
import { resolve } from 'path';

// ── Parse arguments ──

const args = process.argv.slice(2);
let htmlPath, cvSourcePath = 'cv.md', evidencePath = 'article-digest.md';

for (const arg of args) {
  if (arg.startsWith('--cv-source=')) cvSourcePath = arg.split('=')[1];
  else if (arg.startsWith('--evidence=')) evidencePath = arg.split('=')[1];
  else if (!htmlPath) htmlPath = arg;
}

if (!htmlPath) {
  console.error('Usage: node validate-cv.mjs <html-file> --cv-source=cv.md --evidence=article-digest.md');
  process.exit(1);
}

htmlPath = resolve(htmlPath);
cvSourcePath = resolve(cvSourcePath);
evidencePath = resolve(evidencePath);

// ── HTML Parsing Utilities ──

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractBullets(html) {
  const bullets = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(html)) !== null) {
    bullets.push(stripHtml(match[1]));
  }
  return bullets;
}

function extractSummary(html) {
  const summaryMatch = html.match(/class="summary-text">([\s\S]*?)<\/div>/i);
  return summaryMatch ? stripHtml(summaryMatch[1]) : '';
}

function extractRoles(html) {
  const roles = [];

  // Split on job blocks that have the avoid-break class (actual role entries)
  // Pattern: <div class="job avoid-break"> ... company ... role ... bullets ... </div>
  const jobBlockRegex = /<div class="job avoid-break">([\s\S]*?)(?=<div class="job avoid-break">|<div class="section avoid-break">|<\/div>\s*<\/div>\s*<div class="section)/g;

  // Alternative: find all job-company spans and work from there
  const companyRegex = /<span class="job-company">([\s\S]*?)<\/span>/g;
  const companies = [];
  let m;
  while ((m = companyRegex.exec(html)) !== null) {
    companies.push({ text: stripHtml(m[1]), index: m.index });
  }

  // For each company, find the next set of <li> elements until the next company or section
  for (let i = 0; i < companies.length; i++) {
    const startIdx = companies[i].index;
    const endIdx = i + 1 < companies.length ? companies[i + 1].index : html.length;
    const section = html.substring(startIdx, endIdx);

    const roleMatch = section.match(/class="job-role"[^>]*>([\s\S]*?)(?:<\/div>|<span)/);
    const bulletTexts = [];
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let bm;
    while ((bm = liRegex.exec(section)) !== null) {
      bulletTexts.push(stripHtml(bm[1]));
    }
    roles.push({
      company: companies[i].text,
      role: roleMatch ? stripHtml(roleMatch[1]) : 'Unknown',
      bullets: bulletTexts,
    });
  }
  return roles;
}

function extractAllText(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? stripHtml(bodyMatch[1]) : stripHtml(html);
}

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function extractNumbers(text) {
  const numbers = [];
  // Match percentages, counts with +/-, dollar amounts, fractions
  const patterns = [
    /\d+%/g,                          // percentages
    /\d+\+?\s*(?:countries|nations|projects|programs|milestones|staff|officials|members|teams|analysts|sessions|managers|executives|departments|scenarios|tools|agents|modules|categories|specialists|advisors|assignments|dignitaries|inquiries|comments|words)/gi, // counts with nouns
    /\$[\d,]+[KkMm]?/g,              // dollar amounts
    /\d+\s*(?:to|from)\s*\d+/g,      // ranges
    /\d+(?:\.\d+)?\/\d+/g,           // fractions like 4.1/5
    /\d+-(?:member|person|analyst|day|week|month|year|hour|minute|agent|tool|gate|page)/gi, // compound number-nouns
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      numbers.push(match[0]);
    }
  }
  return [...new Set(numbers)];
}

// ── Checks ──

function checkWordCounts(roles, summary) {
  const results = [];
  let failures = 0;

  // Summary
  const summaryWc = countWords(summary);
  const summaryPass = summaryWc <= 75;
  if (!summaryPass) failures++;
  results.push(`  Summary: ${summaryWc} words ${summaryPass ? 'PASS' : 'FAIL (max 75)'}`);

  // TOP2 = first two roles
  roles.forEach((role, roleIdx) => {
    const isTop2 = roleIdx < 2;
    const ceiling = isTop2 ? 27 : 25;
    const floor = isTop2 ? 18 : 12;
    const label = isTop2 ? 'TOP2' : 'Older';

    role.bullets.forEach((bullet, bIdx) => {
      const wc = countWords(bullet);
      const pass = wc >= floor && wc <= ceiling;
      if (!pass) failures++;
      const status = wc > ceiling ? `FAIL (>${ceiling})` : wc < floor ? `FAIL (<${floor})` : 'PASS';
      results.push(`  ${role.company} B${bIdx + 1} [${label}]: ${wc} words ${status}`);
    });
  });

  return { name: 'CHECK 1: Word Count Enforcement', results, failures };
}

function checkBannedPhrases(allText, summary, html) {
  const results = [];
  let failures = 0;

  const bannedAnywhere = [
    // Lead verbs (as word boundaries)
    { pattern: /\b(?:ensuring|facilitating|positioning|driving|enabling|leveraging|utilizing|demonstrating|fostering|championing|spearheading)\b/gi, category: 'Banned lead verb' },
    // Phrases
    { pattern: /responsible for/gi, category: 'Banned phrase' },
    { pattern: /duties included/gi, category: 'Banned phrase' },
    { pattern: /helped with/gi, category: 'Banned phrase' },
    { pattern: /served as\s+(?:the\s+)?(?:a\s+)?(?:an\s+)?[A-Z]/g, category: 'Banned "Served as [title]"' },
    { pattern: /acted as/gi, category: 'Banned phrase' },
    { pattern: /functioned as/gi, category: 'Banned phrase' },
    // Metadata leakage
    { pattern: /self-initiated/gi, category: 'Metadata leakage' },
    { pattern: /independently identified/gi, category: 'Metadata leakage' },
    { pattern: /without being asked/gi, category: 'Metadata leakage' },
    { pattern: /through personal initiative/gi, category: 'Metadata leakage' },
    { pattern: /independently built/gi, category: 'Metadata leakage' },
    { pattern: /to prove\b/gi, category: 'Metadata leakage' },
    // Defensive framing
    { pattern: /prove technical depth/gi, category: 'Defensive framing' },
    { pattern: /beyond advisory/gi, category: 'Defensive framing' },
    { pattern: /although my background/gi, category: 'Defensive framing' },
    { pattern: /transitioning from/gi, category: 'Defensive framing' },
    // Em dashes as sentence breaks
    // Checked only in bullet + summary text, not in allText (dates/edu/certs use -- legitimately)
    { pattern: /\s[—–]\s/g, category: 'Em dash as sentence break', bulletOnly: true },
    { pattern: /\s--\s/g, category: 'Double hyphen as sentence break', bulletOnly: true },
  ];

  const bannedSummaryOnly = [
    { pattern: /\bseeking\b/gi, category: 'Summary banned word' },
    { pattern: /\bpassionate\b/gi, category: 'Summary banned word' },
    { pattern: /proven track record/gi, category: 'Summary banned phrase' },
    { pattern: /results-driven/gi, category: 'Summary banned phrase' },
    { pattern: /seasoned professional/gi, category: 'Summary banned phrase' },
    { pattern: /\bself-starter\b/gi, category: 'Summary banned word' },
    { pattern: /\bdynamic\b/gi, category: 'Summary banned word' },
  ];

  // Build bullet-only text for em dash checking
  // Extract only summary + li bullet text, excluding dates/edu/certs/headers
  const bulletLiTexts = [];
  const liScan = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let liMatch;
  while ((liMatch = liScan.exec(html)) !== null) {
    bulletLiTexts.push(stripHtml(liMatch[1]));
  }
  const bulletOnlyText = summary + ' ' + bulletLiTexts.join(' ');

  for (const { pattern, category, bulletOnly } of bannedAnywhere) {
    const textToCheck = bulletOnly ? bulletOnlyText : allText;
    const matches = textToCheck.match(pattern);
    if (matches) {
      failures += matches.length;
      for (const m of matches) {
        results.push(`  FAIL: "${m}" — ${category}`);
      }
    }
  }

  for (const { pattern, category } of bannedSummaryOnly) {
    const matches = summary.match(pattern);
    if (matches) {
      failures += matches.length;
      for (const m of matches) {
        results.push(`  FAIL (summary): "${m}" — ${category}`);
      }
    }
  }

  if (failures === 0) results.push('  All clear — no banned phrases found.');

  return { name: 'CHECK 2: Banned Phrase Scan', results, failures };
}

function checkEmploymentContinuity(generatedRoles, cvSource) {
  const results = [];
  let failures = 0;

  // Count distinct employer+role entries in cv.md
  // cv.md uses ### headings for employer blocks and **bold** for role titles
  // Each role title line with a date range = one role entry
  const headings = cvSource.match(/^### .+/gm) || [];
  let cvCount = headings.length;

  // If no ### headers, count bold role lines with date patterns
  if (cvCount === 0) {
    const boldRoles = cvSource.match(/^\*\*.+?\*\*/gm) || [];
    cvCount = boldRoles.length;
  }

  // Fallback: unique date ranges, but deduplicate employer blocks
  // that list multiple titles (e.g., DOES has 2 titles under 1 block)
  if (cvCount === 0) {
    const dateRanges = cvSource.match(/\d{2}\/\d{4}\s*--\s*\d{2}\/\d{4}/g) || [];
    cvCount = dateRanges.length;
  }

  const genCount = generatedRoles.length;

  // List roles found in output for visibility
  results.push('  Generated roles:');
  for (const role of generatedRoles) {
    results.push(`    - ${role.company}: ${role.role} (${role.bullets.length} bullets)`);
  }

  if (genCount < cvCount) {
    failures++;
    results.push(`  FAIL: Roles in cv.md: ${cvCount} | Roles in output: ${genCount} | MISSING ${cvCount - genCount} ROLE(S)`);
  } else {
    results.push(`  Roles in cv.md: ${cvCount} | Roles in output: ${genCount} | PASS`);
  }

  return { name: 'CHECK 3: Employment Continuity', results, failures };
}

function checkVerbFrequency(roles) {
  const results = [];
  let failures = 0;
  let warnings = 0;

  const verbCounts = {};

  for (const role of roles) {
    for (const bullet of role.bullets) {
      const firstWord = bullet.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (firstWord) {
        verbCounts[firstWord] = (verbCounts[firstWord] || 0) + 1;
      }
    }
  }

  // Sort by frequency
  const sorted = Object.entries(verbCounts).sort((a, b) => b[1] - a[1]);

  results.push('  Verb frequency:');
  for (const [verb, count] of sorted) {
    let status = '';
    if (count >= 3) {
      status = ' ← FAIL (3+ uses)';
      failures++;
    } else if (count === 2) {
      status = ' ← WARN (2 uses)';
      warnings++;
    }
    results.push(`    ${verb}: ${count}${status}`);
  }

  // Collective advisory escalation: if 3+ verbs have 2 occurrences, escalate all to mandatory
  const advisoryVerbs = sorted.filter(([_, c]) => c === 2);
  if (advisoryVerbs.length >= 3) {
    failures += advisoryVerbs.length;
    results.push(`  ESCALATION: ${advisoryVerbs.length} verbs at 2 occurrences — collective advisory escalated to mandatory`);
    for (const [verb] of advisoryVerbs) {
      results.push(`    → ${verb}: MANDATORY replacement (escalated)`);
    }
  }

  return { name: 'CHECK 4: Opening Verb Frequency', results, failures, warnings };
}

function checkMetricFabrication(allText, evidenceSource) {
  const results = [];
  let warnings = 0;

  const cvNumbers = extractNumbers(allText);
  const evidenceText = evidenceSource.toLowerCase();

  results.push(`  Metrics found in CV: ${cvNumbers.length}`);

  for (const num of cvNumbers) {
    const numClean = num.replace(/[,+]/g, '').toLowerCase();
    // Check if this number appears in evidence source
    if (evidenceText.includes(numClean) || evidenceText.includes(num.toLowerCase())) {
      results.push(`    "${num}" — found in evidence ✓`);
    } else {
      warnings++;
      results.push(`    "${num}" — NOT FOUND in evidence ⚠ (verify manually)`);
    }
  }

  return { name: 'CHECK 5: Metric Fabrication Guard', results, failures: 0, warnings };
}

function checkFillerBullets(roles) {
  const results = [];
  let warnings = 0;

  // Past-tense verb pattern: word ending in -ed, -led, -ted, plus common irregulars
  const pastTenseVerbs = /\b(achieved|built|co-led|co-developed|coordinated|compressed|conducted|created|delivered|deployed|designed|developed|directed|drove|established|executed|facilitated|identified|implemented|launched|led|maintained|managed|orchestrated|owned|produced|proposed|redesigned|reduced|selected|streamlined|supported)\b/gi;

  // Check TOP2 roles only (first two)
  const top2 = roles.slice(0, 2);

  for (let rIdx = 0; rIdx < top2.length; rIdx++) {
    const role = top2[rIdx];
    for (let bIdx = 0; bIdx < role.bullets.length; bIdx++) {
      const bullet = role.bullets[bIdx];

      // Dual-verb check: two past-tense verbs separated by "and"
      const andParts = bullet.split(/\band\b/i);
      if (andParts.length >= 2) {
        let verbCount = 0;
        for (const part of andParts) {
          const verbs = part.match(pastTenseVerbs);
          if (verbs && verbs.length > 0) verbCount++;
        }
        if (verbCount >= 2) {
          warnings++;
          results.push(`  WARN: ${role.company} B${bIdx + 1} — dual-verb detected (two actions joined by "and"). Consider splitting.`);
        }
      }
    }
  }

  if (warnings === 0) results.push('  No filler indicators detected in TOP2 bullets.');

  return { name: 'CHECK 6: Filler Bullet Detection (Dual-Verb)', results, failures: 0, warnings };
}

// ── Main ──

async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   validate-cv.mjs — Gate Enforcement     ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log();

  const html = await readFile(htmlPath, 'utf-8');
  const cvSource = await readFile(cvSourcePath, 'utf-8').catch(() => {
    console.error(`⚠ Could not read cv source: ${cvSourcePath}`);
    return '';
  });
  const evidenceSource = await readFile(evidencePath, 'utf-8').catch(() => {
    console.error(`⚠ Could not read evidence source: ${evidencePath}`);
    return '';
  });

  const summary = extractSummary(html);
  const roles = extractRoles(html);
  const allText = extractAllText(html);

  console.log(`📄 File: ${htmlPath}`);
  console.log(`📊 Roles found: ${roles.length}`);
  console.log(`📝 Summary: ${countWords(summary)} words`);
  console.log(`📋 Total bullets: ${roles.reduce((sum, r) => sum + r.bullets.length, 0)}`);
  console.log();

  // Run all checks
  const checks = [
    checkWordCounts(roles, summary),
    checkBannedPhrases(allText, summary, html),
    checkEmploymentContinuity(roles, cvSource),
    checkVerbFrequency(roles),
    checkMetricFabrication(allText, evidenceSource),
    checkFillerBullets(roles),
  ];

  let totalFailures = 0;
  let totalWarnings = 0;

  for (const check of checks) {
    const status = check.failures > 0 ? '❌ FAIL' : (check.warnings > 0 ? '⚠ WARN' : '✅ PASS');
    console.log(`${status} ${check.name}`);
    for (const line of check.results) {
      console.log(line);
    }
    console.log();
    totalFailures += check.failures;
    totalWarnings += (check.warnings || 0);
  }

  // Summary
  console.log('════════════════════════════════════════════');
  if (totalFailures > 0) {
    console.log(`❌ BLOCKED: ${totalFailures} failure(s), ${totalWarnings} warning(s)`);
    console.log('   Fix violations before generating PDF.');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log(`⚠ PASSED WITH WARNINGS: ${totalWarnings} warning(s)`);
    console.log('   PDF generation allowed. Review warnings.');
    process.exit(2);
  } else {
    console.log('✅ ALL CHECKS PASSED');
    console.log('   PDF generation authorized.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('❌ Validation failed:', err.message);
  process.exit(1);
});
