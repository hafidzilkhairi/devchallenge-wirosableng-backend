const Hapi = require('hapi')
const fs = require('fs')
const vision = require('vision')
const handlebars = require('handlebars')
const Project = require('./api/project')
const http = require('request')
const fetch = require('node-fetch')
const async = require('async')
var project = new Project("jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest")
var express = require('express')
var expressSession = require('express-session')
expressSession({secret: 'max',saveUninitialized: false, resave: false})
// Config the host and port
const server = new Hapi.Server({
    host: 'localhost',
    port: '3001'
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

// Respone to post

// respone as view
server.route([{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        // var hasil = project.getAllProject()
        // return hasil
        return h.view('login')
    }
}, {
    method: 'GET',
    path: '/projects',
    handler: (request, h) => {
        return project.getAllProject()
    }
}, {
    method: 'GET',
    path: '/project/{name}/member',
    handler: (request, h)=>{
        return project.getMember(request.params.name)
    }
}, {
    method: 'GET',
    path: '/css/{name}',
    handler: (request, h) => {
        //return h.file('asset/css/'+request.params.name,false)
        return h.file('./asset/css/' + request.params.name, false)
    }
}, {
    method: 'GET',
    path: '/img/logo/{name}',
    handler: (request, h) => {
        return h.file('./asset/image/logo/' + request.params.name, false)
    }
}, {
    method: 'GET',
    path: '/coba',
    handler: (request,h)=>{
        var projects = project.getAllProject()
        try{
            console.log(projects)
        }catch(err){
            console.log(err)
        }
        
        return projects
    }
}
])

// call the method start to start the server
liftOff()