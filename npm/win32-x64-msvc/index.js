let targetTriple = 'win32-x64-msvc'

module.exports.qjsc = require(`./qjsc.${targetTriple}.node`)
module.exports.qjsc3 = require(`./qjsc3.${targetTriple}.node`)
