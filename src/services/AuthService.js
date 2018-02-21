import Vue from 'vue';
import axios from 'axios';

let authData = null
let initialized = false

export default {

    autoLogin() {
        return new Promise(function (resolve, reject) {
            if (authData) {
                // Set an authData object with user info from localStorage
                authData = {
                    status: "success",
                    token: window.localStorage.getItem('userToken'),
                    data : {
                        user_id : window.localStorage.getItem('userId'),
                        role_id : window.localStorage.getItem('userRole')
                    }
                }
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
                        'userToken' : authData.token,
                        'userId' : authData.data.user_id,
                        'userRole' : authData.data.role_id
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
        localStorage.removeItem('userToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
    },

    isAuthenticated() {
        if (initialized === false) {
            return this.autoLogin()
        } 
        else {
            return new Promise(function (resolve, reject) {
                if (authData) {
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