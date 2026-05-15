#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Check if package.json has uncommitted changes
const dirty = execSync('git status --porcelain package.json', { cwd: path.dirname(pkgPath) })
  .toString()
  .trim();

if (dirty) {
  console.log(`Version unchanged (package.json already modified): ${pkg.version}`);
} else {
  const parts = pkg.version.split('.').map(Number);
  parts[2] += 1;
  pkg.version = parts.join('.');
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Version bumped to ${pkg.version}`);
}
