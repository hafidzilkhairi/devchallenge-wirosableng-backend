const Hapi = require('hapi')
const fs = require('fs')
const vision = require('vision')
const handlebars = require('handlebars')

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
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        var data = { name: request.params.name }
        return h.view('project', data)
    }
})

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