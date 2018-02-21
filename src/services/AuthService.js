import Vue from 'vue';
import axios from 'axios';

let authData = null
let initialized = false

export default {

    autoLogin() {
        
    },

    login(value, cb) {
        return new Promise(function (resolve, reject) {
            axios.post('https://calm-basin-73408.herokuapp.com/api/auth/login', value)
                .then(function (response) {
                    authData = response.data
                    //if rememberMe
                    localStorage.setItem('userToken', response.data.token)
                    localStorage.setItem('userId', response.data.data.user_id)
                    localStorage.setItem('userRole', response.data.data.role_id)
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
        initialized = false
        localStorage.removeItem('userToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
    },

    isAuthenticated() {
        if (initialized === false){
            // Autologin
            authData = {
                status: "success",
                token: window.localStorage.getItem('userToken'),
                data : {
                    user_id : localStorage.getItem('userId'),
                    role_id : localStorage.getItem('userRole')
                }
            }
            initialized = true

            return new Promise(function (resolve, reject) {
                if (authData) {
                    resolve(authData)
                }
                else {
                    reject()
                }
            })
        } else {
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