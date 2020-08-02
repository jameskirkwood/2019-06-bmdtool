#!/usr/bin/env node
'use strict';

const cli = require('commander');
const fs = require('fs');
const util = require('util');
 
cli.version('0.1.0')
  .description('Compile and extract Nintendo BMD/BDL assets')
  .arguments('<resource>')
  .option('-o, --out <file>', 'File to write')
  .parse(process.argv);

if (!process.argv.slice(2).length) cli.help();

const JStudioModel = require('./lib/jstudiomodel');
const TSCNPrinter = require('./lib/tscnprinter');

if (cli.out) {
  new TSCNPrinter(console.log).J3D(new JStudioModel(data));
}
else {
  fs.readFile(cli.args[0], (err, data) => {
    if (err) console.log(err);
    else console.log(util.inspect(new JStudioModel(data).unpack(), {
      showHidden: false, depth: null, colors: true
    }));
  });
}
