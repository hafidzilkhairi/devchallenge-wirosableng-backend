var http = require('request')
const fetch = require('node-fetch')
class project{
    constructor(param){
        this.url = param
    }
    async getAllProject(){
        var response
        var data
        const hasil = []
        try{
            response = await fetch("http://devchallenge:dev12345@jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest/project")
            data = await response.json()
            for(const hasilnya of data){
                response = await fetch("http://devchallenge:dev12345@jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest/project/"+hasilnya['id'])
                var description = await response.json()
                var members = []
                for(const kerjaan of ['UX','Mobile Frontend','SA','QA','Backend','DevOps','UI','SH','Web Frontend','Administrators','Doc','SM','PO']){
                    var setering = description['roles'][kerjaan]
                    setering = setering.replace('http://', '')
                    response = await fetch("http://devchallenge:dev12345@" + setering)
                    var member = await response.json()
                    members.push({
                        kerjaan: member['actors']
                    })
                }
                // var member = []
                // for(const singleMember of members['actors']){
                //     member.push(singleMember)
                // }
                //console.log("hasilnya : ",members)
                var singleData = {
                    "nameProject": hasilnya['name'],
                    "deskripsi": description['description'],
                    "member": members
                }
                hasil.push(singleData)
            }
        }catch (err){
            console.log(err)
        }
        return hasil
    }
    async getAllMember(name){
        var response
        var data
        try {
            response = await fetch("http://devchallenge:dev12345@jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/latest/project/"+name+"/role")
            data = await response.json()
        } catch (err) {
            console.log(err)
        }
        return data
    }
    async getMember(url){
        var response
        var data
        try {
            response = await fetch(url)
            data = await response.json()
        } catch (err) {
            console.log(err)
        }
        return data
    }
}

module.exports = project