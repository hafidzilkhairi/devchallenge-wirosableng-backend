"use strict"
var http = require('request')
var saya
class hafidz{
    constructor(param){
        this.url = param
    }
    projects(callback){
        var options = {
            url: "http://username:password@" + this.url + "/project",
            method: 'GET'
        }
        http(options, function (err, response, body) {
            callback(null, body)
        })
    }
}
async function dia() {
    await apapa()
}

function apapa(){
    var options = {
        url: "http://username:password@" + this.url + "/project",
        method: 'GET'
    }
    http(options, function (err, response, body) {
        saya = body
        callback(null, body)
    })
}

module.exports = hafidz