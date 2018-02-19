import Vue from 'vue';
import axios from 'axios';

let authData = null
let initialized = false

export default {

    autoLogin() {
        // if (localStorage)
        // authData ~= localStorage
        return new Promise(function (resolve, reject) {
            authData = window.localStorage.getItem('userAuthData')
            initialized = true
            if (authData)
                resolve(authData)
            else 
                reject()
        })
    },

    login(value, cb) {
        return new Promise(function (resolve, reject) {
            axios.post('http://agtheodorides.dyndns.org:8089/rest/login', value)
                .then(function (res) {
                    console.log('POST pass', res.data)
                    // Saves the authData
                    // Saves to localStorage
                    resolve(res.data);
                })
                .catch(function (err) {
                    console.log('POST error', err.response)
                    reject(err.response.data)
                })
        });
    },

    logOff() {
        // Delete localStorage 
    },

    isAuthenticated() {
        if (initialized === false)
            return this.autoLogin()
        else 
            return new Promise(function (resolve, reject) {
                if (authData)
                    resolve(authData)
                else 
                    reject()
            })
    }
}