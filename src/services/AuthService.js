import Vue from 'vue';
import axios from 'axios';

let authData = null
let initialized = false

export default {

    autoLogin() {
        return new Promise(function (resolve, reject) {
            if (authData) {
                // Set an authData object with user info from localStorage
                authData = JSON.parse(window.localStorage.getItem('authData'))
                initialized = true
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
                    // if rememberMe
                    var localStorageObject = {
                        'token' : authData.token,
                        'user_id' : authData.data.user_id,
                        'role_id' : authData.data.role_id
                    }
                    localStorage.setItem('authData', JSON.stringify(localStorageObject))
                    // end if rememberMe
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                })
        });
    },

    logOff() {
        authData = null
        window.localStorage.removeItem('authData')
    },

    isAuthenticated() {
        if (initialized === false) {
            return this.autoLogin()
        } 
        else {
            return new Promise(function (resolve, reject) {
                if (authData) {
                    authData = JSON.parse(window.localStorage.getItem('authData'))
                    resolve(authData)
                }
                else {
                    reject()
                }
            })
        }
    },

    getAuthData() {
        return authData
    },

    getInitialized() {
        return initialized
    }
}