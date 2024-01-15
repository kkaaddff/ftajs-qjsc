const { existsSync } = require('fs')
const { join } = require('path')
const { parseTriple } = require('./src/utils')
const { Qjsc } = require('./src/qjsc')

let qjscBinding = null
let qjsc3Binding = null
let localFileExisted = false
let loadError = null

const targetTriple = parseTriple()

localFileExisted = existsSync(join(__dirname, `qjsc.${targetTriple}.node`))

try {
  if (localFileExisted) {
    qjscBinding = require(`./qjsc.${targetTriple}.node`)
  } else {
    qjscBinding = require(`@ftajs/qjsc-${targetTriple}`).qjsc
  }
} catch (e) {
  loadError = e
}

localFileExisted = false
localFileExisted = existsSync(join(__dirname, `qjsc3.${targetTriple}.node`))
try {
  if (localFileExisted) {
    qjscBinding = require(`./qjsc3.${targetTriple}.node`)
  } else {
    qjscBinding = require(`@ftajs/qjsc-${targetTriple}`).qjsc3
  }
} catch (e) {
  loadError = e
}

if (!qjscBinding || !qjsc3Binding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

module.exports.qjsc = new Qjsc({ bindings: qjscBinding })
module.exports.qjsc3 = new Qjsc({ bindings: qjsc3Binding })
