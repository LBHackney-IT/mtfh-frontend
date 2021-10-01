#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');

const cliDirectory = path.join(os.homedir(), ".mtfh");
const appJson = path.join(cliDirectory, "app.json");

if (!fs.existsSync(appJson)) {
  fs.mkdirSync(cliDirectory);
}

const app = fs.existsSync(appJson) ? JSON.parse(fs.readFileSync(appJson, "utf8")) : {};

app['<%= projectName %>'] = { path: process.cwd(), required: false };

fs.writeFileSync(appJson, JSON.stringify(app));
