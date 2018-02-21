import Vue from 'vue';
import axios from 'axios';

let authData = null
let initialized = false

export default {

    autoLogin() {
        return new Promise(function (resolve, reject) {
            authData.token = window.localStorage.getItem('userToken')
            initialized = true
            if (authData) {
                resolve(authData)
            }
            else {
                reject()
            }
        })
    },

    login(value, cb) {
        return new Promise(function (resolve, reject) {
            axios.post('https://calm-basin-73408.herokuapp.com/api/auth/login', value)
                .then(function (response) {
                    authData = response.data
                    localStorage.setItem('userToken', response.data.token)
                    localStorage.setItem('userId', response.data.data.user_id)
                    localStorage.setItem('userRole', response.data.data.role_id)
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                })
        });
    },

    logOff() {
        authData = null
        localStorage.removeItem('userToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
    },

    isAuthenticated() {
        if (initialized === false)
            return this.autoLogin()
        else 
            return new Promise(function (resolve, reject) {
                if (authData) {
                    resolve(authData)
                }
                else {
                    reject()
                }
            })
    },

    getAuthData() {
        return authData
    }
}