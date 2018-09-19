var http = require('request')
const fetch = require('node-fetch')
class project{
    constructor(param){
        this.url = param
    }
    async getAllProject(){
        var response
        var data
        try{
            response = await fetch("http://devchallenge:dev12345@jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest/project")
            data = await response.json()
        }catch (err){
            console.log(err)
        }
        return data
    }
}

module.exports = project