import fs from 'node:fs';
import path from 'node:path';

const roots = ['app', 'components'];
const extensions = new Set(['.js', '.jsx', '.css']);
const banned = [
  { pattern: /guaranteed\s+returns?/gi, reason: 'Do not imply guaranteed returns.' },
  { pattern: /\b18\s*[-–]\s*28%/g, reason: 'Old public yield claim is not part of the current PRD.' },
  { pattern: /\bmock(?:ed)?\s+(?:yield|return|payout|balance|project)/gi, reason: 'Investor-facing mock financial data is prohibited.' }
];

function filesIn(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesIn(full) : [full];
  });
}

let failed = false;
for (const root of roots) {
  for (const file of filesIn(root)) {
    if (!extensions.has(path.extname(file))) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const rule of banned) {
      rule.pattern.lastIndex = 0;
      if (rule.pattern.test(text)) {
        console.error(`CONTENT AUDIT FAIL: ${file}: ${rule.reason}`);
        failed = true;
      }
    }
  }
}

if (failed) process.exit(1);
console.log('Content audit passed: no prohibited financial-marketing patterns found.');
