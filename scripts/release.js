#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

const releaseType = process.argv[2];

if (!releaseType || !['major', 'minor', 'patch'].includes(releaseType)) {
  console.error('Usage: node scripts/release.js <major|minor|patch>');
  process.exit(1);
}

let newVersion;
switch (releaseType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

console.log(`Updating version from ${currentVersion} to ${newVersion}`);

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Build the project
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Run tests
console.log('Running tests...');
execSync('npm test', { stdio: 'inherit' });

// Commit changes
console.log('Committing changes...');
execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });

// Create and push tag
console.log('Creating and pushing tag...');
execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
execSync('git push origin main', { stdio: 'inherit' });
execSync(`git push origin v${newVersion}`, { stdio: 'inherit' });

console.log(`\n🎉 Successfully released v${newVersion}!`);
console.log('The GitHub Actions workflow will automatically publish to npm.');
