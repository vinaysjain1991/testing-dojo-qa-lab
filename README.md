# Testing Dojo

Interactive manual and automation testing trainer for software testing engineers
with 2-3 years of experience.

## What It Includes

- Manual testing learning track with risk analysis, test design and bug reports.
- Automation track with UI and API testing examples.
- Interactive scenario lab for test-case coverage decisions.
- Quick quiz with answer feedback.
- GitHub Pages workflow for static hosting.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build And Test

```bash
npm test
```

The static GitHub Pages output is generated in `out/`.

## Deploy To GitHub Pages

1. Push this repository to GitHub on the `main` branch.
2. In GitHub, open repository `Settings` -> `Pages`.
3. Set `Build and deployment` source to `GitHub Actions`.
4. Push again or run the `Deploy GitHub Pages` workflow manually.

For a project page such as `https://username.github.io/repository-name/`, set
the repository variable `NEXT_PUBLIC_BASE_PATH` to `/repository-name` before the
workflow build. For a user page such as `https://username.github.io/`, leave it
empty.
