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

// Respone to post

// respone as view
server.route([{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        var hasil = project.getAllProject()
        return hasil
    }
},{
    method: 'POST',
    path: '/login',
    handler:(request,h)=>{
        try{
            let uname = request.payload.username
            let pass = request.payload.password

            return h.view('index',{uname,pass})
        }catch(err){
            console.log(err)
            return ""
        }
    }   
},{
    method: 'GET',
    path: '/login',
    handler: (request, h)=>{
        return h.view('login.html')
    }
}
])
async function getAllProject(){
    const response = await fetch("http://username:password@jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest/project")
    const data = await response.json()
    return data
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
server.route({
    method: 'POST',
    path: '/',
    handler:(request,h)=>{
        return request.p
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