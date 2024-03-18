let targetTriple = 'darwin-x64'

module.exports.qjsc = require(`./qjsc.${targetTriple}.node`)
module.exports.qjsc3 = require(`./qjsc3.${targetTriple}.node`)
