#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const { program } = require('commander')
const packageConfig = require('../package.json')
const { qjsc } = require('../index')

program
  .version(packageConfig.version)
  .description('QuickJS Compiler')
  .requiredOption('-s, --source <source>', 'the Javascript source file path')
  .requiredOption('-d, --dist <dist>', 'the generated bytecode file path')
  .parse(process.argv)

let options = program.opts()
let source = options.source
let dist = options.dist

if (!path.isAbsolute(source)) {
  source = path.join(process.cwd(), source)
}
if (!path.isAbsolute(dist)) {
  dist = path.join(process.cwd(), dist)
}

const sourceFileName = source.split('/').slice(-1)[0].split('.')[0]
const sourceCode = fs.readFileSync(source, { encoding: 'utf-8' })

let buffer = qjsc.compile(sourceCode)
let distPath = path.join(dist, sourceFileName + '.tbc')
fs.writeFileSync(distPath, buffer)
console.log('Quickjs bytecode generated at: \n' + distPath)
