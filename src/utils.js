const { readFileSync } = require('fs')
const { execSync } = require('child_process')

const { platform, arch } = process

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = execSync('which ldd').toString().trim()
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

function parseTriple() {
  let targetTriple = ''
  switch (platform) {
    case 'android':
      switch (arch) {
        case 'arm64':
          targetTriple = 'android-arm64'
          break
        case 'arm':
          targetTriple = 'android-arm-eabi'
          break
        default:
          throw new Error(`Unsupported architecture on Android ${arch}`)
      }
      break
    case 'win32':
      switch (arch) {
        case 'x64':
          targetTriple = 'win32-x64-msvc'
          break
        case 'ia32':
          targetTriple = 'win32-ia32-msvc'
          break
        case 'arm64':
          targetTriple = 'win32-arm64-msvc'
          break
        default:
          throw new Error(`Unsupported architecture on Windows: ${arch}`)
      }
      break
    case 'darwin':
      targetTriple = 'darwin-universal'
      switch (arch) {
        case 'x64':
          targetTriple = 'darwin-x64'
          break
        case 'arm64':
          targetTriple = 'darwin-arm64'
          break
        default:
          throw new Error(`Unsupported architecture on macOS: ${arch}`)
      }
      break
    case 'freebsd':
      if (arch !== 'x64') {
        throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
      }
      targetTriple = 'freebsd-x64'
      break
    case 'linux':
      switch (arch) {
        case 'x64':
          if (isMusl()) {
            targetTriple = 'linux-x64-musl'
          } else {
            targetTriple = 'linux-x64-gnu'
          }
          break
        case 'arm64':
          if (isMusl()) {
            targetTriple = 'linux-arm64-musl'
          } else {
            targetTriple = 'linux-arm64-gnu'
          }
          break
        case 'arm':
          targetTriple = 'linux-arm-gnueabihf'
          break
        case 'riscv64':
          if (isMusl()) {
            targetTriple = 'linux-riscv64-musl'
          } else {
            targetTriple = 'linux-riscv64-gnu'
          }
          break
        default:
          throw new Error(`Unsupported architecture on Linux: ${arch}`)
      }
      break
    default:
      throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
  }
  return targetTriple
}

module.exports.parseTriple = parseTriple
