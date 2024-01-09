const { fileExists, readFileAsync } = require('./artifacts')
const { merge, omit } = require('lodash-es')
const { parseTriple } = require('../src/utils')

const DEFAULT_TARGETS = [
  'x86_64-apple-darwin',
  'aarch64-apple-darwin',
  'x86_64-pc-windows-msvc',
  'x86_64-unknown-linux-gnu',
]

const UniArchsByPlatform = {
  darwin: ['x64', 'arm64'],
}

async function readNapiConfig(path, configPath) {
  if (configPath && !(await fileExists(configPath))) {
    throw new Error(`NAPI-RS config not found at ${configPath}`)
  }
  if (!(await fileExists(path))) {
    throw new Error(`package.json not found at ${path}`)
  }
  // May support multiple config sources later on.
  const content = await readFileAsync(path, 'utf8')
  let pkgJson
  try {
    pkgJson = JSON.parse(content)
  } catch (e) {
    throw new Error(`Failed to parse package.json at ${path}`)
  }

  let separatedConfig
  if (configPath) {
    const configContent = await readFileAsync(configPath, 'utf8')
    try {
      separatedConfig = JSON.parse(configContent)
    } catch (e) {
      throw new Error(`Failed to parse NAPI-RS config at ${configPath}`)
    }
  }

  const userNapiConfig = pkgJson.napi ?? {}
  if (pkgJson.napi && separatedConfig) {
    const pkgJsonPath = path
    const configPathUnderline = configPath
    console.warn(
      `Both napi field in ${pkgJsonPath} and [NAPI-RS config](${configPathUnderline}) file are found, the NAPI-RS config file will be used.`
    )
    Object.assign(userNapiConfig, separatedConfig)
  }
  const napiConfig = merge(
    {
      binaryName: 'index',
      packageName: pkgJson.name,
      targets: [],
      packageJson: pkgJson,
      npmClient: 'npm',
    },
    omit(userNapiConfig, 'targets')
  )

  let targets = userNapiConfig.targets ?? []

  // compatible with old config
  if (userNapiConfig?.name) {
    console.warn('[DEPRECATED] napi.name is deprecated, use napi.binaryName instead.')
    napiConfig.binaryName = userNapiConfig.name
  }

  if (!targets.length) {
    let deprecatedWarned = false
    const warning = '[DEPRECATED] napi.triples is deprecated, use napi.targets instead.'
    if (userNapiConfig.triples?.defaults) {
      deprecatedWarned = true
      console.warn(warning)
      targets = targets.concat(DEFAULT_TARGETS)
    }

    if (userNapiConfig.triples?.additional?.length) {
      targets = targets.concat(userNapiConfig.triples.additional)
      if (!deprecatedWarned) {
        console.warn(warning)
      }
    }
  }

  napiConfig.targets = targets.map(parseTriple)

  return napiConfig
}

module.exports = {
  DEFAULT_TARGETS,
  UniArchsByPlatform,
  readNapiConfig,
}
