const JSSoup = require('jssoup').default
const fs = require('fs')

module.exports = {
    parse: function(data) {
        var soup = new JSSoup(data)
        var services = soup.findAll('div','service-wrapper')
        return services.map(function(service) {
            var name = service.find("h3","service-name").contents + ""
            if (name.indexOf("Batteries") > -1) {
                return null // doesn't have a next-service due to COVID
            }
            var next = service.find("td","next-service").contents + ""
            var nextDate = next.split("\n")[1].replace(/\t/g,"")
            return {"name": name.replace(/\t/g,""), "next": nextDate}
        }).filter(function(i) { return i != null })
    }
}
