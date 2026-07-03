#!/usr/bin/env node
/**
 * npm workspaces hoist govuk-frontend and lbh-frontend to the repo root.
 * Symlink them into packages/react/node_modules so lbh SCSS can resolve
 * `govuk-frontend/...` imports from the react package root.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const reactModules = path.join(root, "packages/react/node_modules");
const rootModules = path.join(root, "node_modules");
const packages = ["govuk-frontend", "lbh-frontend"];

if (!fs.existsSync(reactModules)) {
  fs.mkdirSync(reactModules, { recursive: true });
}

for (const name of packages) {
  const target = path.join(rootModules, name);
  const link = path.join(reactModules, name);

  if (!fs.existsSync(target)) {
    continue;
  }

  if (fs.existsSync(link)) {
    continue;
  }

  const relativeTarget = path.relative(path.dirname(link), target);
  fs.symlinkSync(relativeTarget, link, "junction");
}
