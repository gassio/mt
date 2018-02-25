import Vue from 'vue';
import axios from 'axios';

let authData = null
let authDataInitialized = false // If true, it means we have authData in localStorage

export default {

    autoLogin() {
        return new Promise(function (resolve, reject) {
            // Set local authData object with user info from localStorage
            authData = JSON.parse(window.localStorage.getItem('authData'))
            authDataInitialized = true
            console.log("authService, autoLogin")
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
            axios.post('http://c5568c90.ngrok.io/auth', value)
                .then(function (response) {

                    console.log("authService, first time login")

                    var serverResponseObject = {
                        'token' : response.data.token,
                        'user_id' : response.data.data.user_id,
                        'role_id' : response.data.data.role_id
                    }

                    // Save userData both in localStorage and in authData so the user is "remembered"
                    localStorage.setItem('authData', JSON.stringify(serverResponseObject))
                    authData = serverResponseObject
                    authDataInitialized = true // Local variable authData is initialized with serverResponseObject

                    resolve();
                })
                .catch(function (err) {
                    reject(err)
                })
        });
    },

    logOff() {
        authData = null
        authDataInitialized = false
        window.localStorage.removeItem('authData')
    },

    isAuthenticated() {
        if (!authDataInitialized) { 
            // Autologin runs when local authData variable is not initialized with authData
            // from local storage
            return this.autoLogin()
        } 
        else {
            // Local authData object is initialized so resolve
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