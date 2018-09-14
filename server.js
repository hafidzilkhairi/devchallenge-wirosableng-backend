const Hapi = require('hapi')
const fs = require('fs')
const vision = require('vision')
const handlebars = require('handlebars')
const hafidz = require('./api/hafidz')
const http = require('request')
var Hafidz = new hafidz("jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest")
// Config the host and port
const server = new Hapi.Server({
    host: 'localhost',
    port: '3000'
})

async function liftOff() {
    await server.register([{
        // plugin untuk mengakses file
        plugin: require('inert')
    }, {
        // plugin untuk memberikan akses view
        plugin: require('vision')
    }
    ])

    // views
    server.views({
        engines: {
            html: handlebars
        },
        path: __dirname + '/views'  
    })
    server.start()
    console.log('Server running at ' + server.info.uri)
}   
// respone as view
let varluar
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        // var data = { name: request.params.name }
        // return h.view('project', data)
        //var kembalian = Hafidz.projects()
        //console.log(kembalian)
        Hafidz.projects(function(err,body){
            apapa(body)
        })
        console.log(varluar)
        return varluar+"saya"
    }
})
function apapa(par) {
    varluar = par
}
async function sayasaya(){
    var options = {
        url: "http://username:password@jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest/project",
        method: 'GET'
    }
    http(options, function (err, response, body) {
        varluar = body
        apalagiini(body)
    })
}
function apalagiini(url){
    varluar = url
}

// respone as css
server.route({
    method: 'GET',
    path: '/css/{name}',
    handler:(request,h) =>{
        //return h.file('asset/css/'+request.params.name,false)
        return h.file('./asset/css/'+request.params.name,false)
    }
})

// respone as logo
server.route({
    method: 'GET',
    path: '/img/logo/{name}',
    handler: (request,h) =>{
        return h.file('./asset/image/logo/'+request.params.name,false)
    }
})

// call the method start to start the server
liftOff()