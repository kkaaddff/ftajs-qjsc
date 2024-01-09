const supportedVersions = ['20210327']

class Qjsc {
  constructor(options = {}) {
    let version = options.version || '20210327'
    if (supportedVersions.indexOf(version) === -1) {
      throw new Error('Unsupported QuickJS version: ' + version)
    }
    console.log(' version = ' + version)
    this._bindings = options.bindings
  }
  help() {
    console.log('Supported QuckJS versions: ' + supportedVersions.join(', '))
  }

  getSupportedVersions() {
    return supportedVersions
  }

  compile(code, options = {}) {
    let sourceURL = options.sourceURL || ''
    return this._bindings.dumpByteCode(code, sourceURL)
  }

  get version() {
    return this._bindings.version
  }

  _evalByteCode(buffer) {
    return this._bindings.evalByteCode(buffer)
  }
}

nativeBinding = require('./qjsc.node')

const qjsc = new Qjsc({ bindings: nativeBinding })

console.log(qjsc.version)
