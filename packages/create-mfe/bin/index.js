#!/usr/bin/env node

const yeoman = require("yeoman-environment");
const argv = require("yargs").argv;

const env = yeoman.createEnv();
env.registerStub(require("@hackney/generator-mfe"), "main");
env.run("main " + argv._.join(" "), argv);
