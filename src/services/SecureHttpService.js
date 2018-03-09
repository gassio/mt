import Vue from 'vue';
import axios from 'axios';
// import Config
import authService from './AuthService'

var apiURL = "http://localhost:3000"

export default {
    getHeaders() {
        return {token: authService.token} 
    },
    get(uri, qs, params) {
        return this.request("get", uri, qs, params)
    },
    put(uri, qs, params) {
        return this.request("put", uri, qs, params)
    },
    post(uri, qs, params) {
        return this.request("post", uri, qs, params)
    },
    delete(uri, qs, params) {
        return this.request("delete", uri, qs, params)
    },
    request(method, uri, qs, params) {
        var that = this
        return new Promise(function (resolve, reject) {
            axios[method](apiURL + "/" + uri, qs, params, that.getHeaders())
                .then(function (response) {
                    // See https://en.wikipedia.org/wiki/List_of_HTTP_status_codes for more status codes
                    // if (response.status == "401") {
                    //     console.log("secureHttpService: response status 401")
                    //     router.go(login)
                    //     reject()
                    // }
                    // else if (response.status == "404") {
                    //     console.log("secureHttpService: response status 404")
                    //     router.go(login)
                    //     reject()
                    // }
                    // else {
                    //     resolve(response)
                    // }
                    resolve(response)
                })
                .catch(function (err) {
                    reject(err)
                })
        });
    }
}