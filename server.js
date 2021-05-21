const http = require("http")
const rp = require('request-promise');
const JSSoup = require('jssoup').default
const config = require('./config.json')
const parse = require('./parse')

const url = "https://recyclingservices.bromley.gov.uk/property/" + config.propertyid

const updateIntervalHours = 24
const updateIntervalms = updateIntervalHours * 60 * 60 * 1000


function Info() {

    var theInfo = {"status": "not run yet"}

    var doUpdate = function() {
        console.log("Running update")
        rp(url)
          .then(function(html){
            //success!
            console.log("success: " + html)
            theInfo = parse.parse(html)
          })
          .catch(function(err){
            //handle error
            console.log("error retrieving document: " + err)
            theInfo = {"status": "error"}
          });

    }

    var runUpdate = function() {
        setTimeout(function() {
            doUpdate() // update the data from source site
            runUpdate() // set another timeout
        }, updateIntervalms)
    }

    runUpdate() // set up timeout
    doUpdate() // run initial update from source

    return {
        get: function() {
            return JSON.stringify(theInfo)
        }
    }
}

var dataInfo = new Info()

http.createServer(function(req, res) {
    res.write(dataInfo.get())
    res.end()
}).listen(8080)

