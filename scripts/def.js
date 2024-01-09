module.exports = function applyDefaultArtifactsOptions(options) {
  return {
    cwd: process.cwd(),
    packageJsonPath: 'package.json',
    outputDir: './artifacts',
    npmDir: 'npm',
    ...options,
  }
}
