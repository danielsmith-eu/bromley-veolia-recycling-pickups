const JSSoup = require('jssoup').default
const fs = require('fs')

var srcFile = process.argv.slice(2)[0]

fs.readFile(srcFile, 'utf8', function(err, data) {
    if (err) throw err
    var soup = new JSSoup(data)
    var services = soup.findAll('div','service-wrapper')
    console.log(services.map(function(service) {
        var name = service.find("h3","service-name").contents + ""
        var next = service.find("td","next-service").contents + ""
        var nextDate = next.split("\n")[1].replace(/\t/g,"")
        return {"name": name.replace(/\t/g,""), "next": nextDate}
    }))
});



