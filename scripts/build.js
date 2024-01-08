const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const { parseTriple } = require('../src/utils')

const distPath = path.join(__dirname, '..', 'build/Release')

function copyFile(source, destination) {
  const sourcePath = path.join(distPath, source)
  const destinationPath = path.join(__dirname, '..', destination)
  fs.copyFileSync(sourcePath, destinationPath)
}

const targetTriple = parseTriple()

async function run() {
  // 执行 node-gyp rebuild 脚本
  execSync('node-gyp rebuild', { stdio: 'inherit' })
  copyFile('qjsc.node', `qjsc.${targetTriple}.node`)
}

run()
