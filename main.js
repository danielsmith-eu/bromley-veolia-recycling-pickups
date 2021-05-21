const JSSoup = require('jssoup').default
const fs = require('fs')
const parse = require('./parse')

var srcFile = process.argv.slice(2)[0]

fs.readFile(srcFile, 'utf8', function(err, data) {
    if (err) throw err
    console.log(parse.parse(data))
});



