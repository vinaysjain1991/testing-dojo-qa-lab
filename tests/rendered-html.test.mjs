import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("exports the testing trainer as static HTML", async () => {
  const html = await readFile(
    new URL("../out/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Testing Dojo<\/title>/i);
  assert.match(html, /Testing Dojo for 2-3 Year Software Testing Engineers/);
  assert.match(html, /Manual Testing/);
  assert.match(html, /Automation kata/);
  assert.match(html, /Test Case Lab/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("keeps starter preview code out of the finished app", async () => {
  const [page, layout, packageJson, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
  ]);

  assert.match(page, /useState/);
  assert.match(page, /quiz/);
  assert.match(page, /kataSnippets/);
  assert.match(layout, /title:\s*"Testing Dojo"/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
