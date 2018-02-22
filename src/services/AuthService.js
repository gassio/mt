import Vue from 'vue';
import axios from 'axios';
import { store } from '../store/store'

let authData = null
let initialized = false
let rememberMe = false

export default {

    autoLogin() {
        return new Promise(function (resolve, reject) {
            // Set an authData object with user info from localStorage
            authData = JSON.parse(window.localStorage.getItem('authData'))
            if (authData) {
                resolve()
            }
            else {
                reject()
            }
        })
    },

    login(value, cb) {
        return new Promise(function (resolve, reject) {
            // axios.post('https://calm-basin-73408.herokuapp.com/api/auth/login', value)
            axios.post('http://360adc64.ngrok.io/auth', value)
                .then(function (response) {

                    console.log("authService, rememberMe: ", store.state.rememberMe)

                    var serverResponseObject = {
                        'token' : response.data.token,
                        'user_id' : response.data.data.user_id,
                        'role_id' : response.data.data.role_id
                    }

                    rememberMe = store.state.rememberMe
                    if (rememberMe){
                        localStorage.setItem('authData', JSON.stringify(serverResponseObject))
                        authData = serverResponseObject
                    }
                    else {
                        authData = serverResponseObject
                    }
                    resolve();
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
        // This getItem returns a string (does not use JSON.parse)
        if (!!window.localStorage.getItem('authData')) {
            return this.autoLogin()
        } 
        else {
            return new Promise(function (resolve, reject) {
                if (authData) {
                    resolve()
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