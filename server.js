console.log(process.env.NODE_ENV);

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

console.log(process.env.NODE_ENV);

console.log("Args",process.argv)

const parserArgs = require('minimist')