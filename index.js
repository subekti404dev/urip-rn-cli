#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const Services = require('./services');


if (argv.name && argv.bundle) {
   const name = argv.name;
   const bundle = argv.bundle;
   Services.createProject(name, bundle);
} else {
   Services.getCreateInputByProject();
}

