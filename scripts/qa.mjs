import fs from 'node:fs';

const required = [
  'app/layout.js',
  'app/page.js',
  'app/globals.css',
  'components/LandingPage.js',
  'components/ProjectFeed.js',
  'components/EnergyScene.js',
  'lib/api.js',
  '.env.example',
  'README.md'
];

for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`QA FAIL: missing ${file}`);
    process.exit(1);
  }
}

const page = fs.readFileSync('components/LandingPage.js', 'utf8');
const anchors = ['opportunities', 'how', 'trust', 'developers', 'support', 'faq'];
for (const anchor of anchors) {
  if (!page.includes(`id="${anchor}"`)) {
    console.error(`QA FAIL: required section #${anchor} is missing`);
    process.exit(1);
  }
}

const css = fs.readFileSync('app/globals.css', 'utf8');
if (!css.includes('prefers-reduced-motion')) {
  console.error('QA FAIL: reduced-motion handling is missing');
  process.exit(1);
}
if (!css.includes('@media (max-width: 620px)')) {
  console.error('QA FAIL: mobile breakpoint is missing');
  process.exit(1);
}

console.log('Structural QA passed: required sections, responsive rules and accessibility motion fallback found.');
