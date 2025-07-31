# GitHub Actions Setup

This repository uses GitHub Actions for continuous integration and deployment to npm.

## Workflows

### CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

This is the main workflow that handles:

- Building and testing on multiple Node.js versions (18.x, 20.x)
- Running linting and tests
- Publishing to npm on push to main branch
- Creating GitHub releases on tag pushes

## Setup Instructions

### 1. NPM Token Setup

To enable automatic publishing to npm, you need to add an NPM token as a GitHub secret:

1. Generate an NPM access token:

   ```bash
   npm login
   npm token create --read-only
   ```

2. Add the token to your GitHub repository:
   - Go to your repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Add a new secret named `NPM_TOKEN` with your npm token value

### 2. Package.json Configuration

Make sure your `package.json` has the correct configuration:

```json
{
  "name": "eslint-plugin-vibecoding",
  "version": "1.0.0",
  "private": false,
  "publishConfig": {
    "access": "public"
  }
}
```

### 3. Publishing

The workflow will automatically publish to npm when:

- Code is pushed to the `main` branch
- A tag starting with `v` is pushed (e.g., `v1.0.0`)

### 4. Version Management

To release a new version:

1. Update the version in `package.json`
2. Commit and push to main
3. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Workflow Triggers

- **Push to main**: Builds, tests, and publishes to npm
- **Push to develop**: Builds and tests only
- **Pull requests**: Builds and tests only
- **Tag push (v\*)**: Builds, tests, publishes to npm, and creates GitHub release

## Artifacts

Build artifacts are uploaded and stored for 7 days, allowing you to download the built package if needed.
