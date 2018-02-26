import Vue from 'vue';
import axios from 'axios';

class AuthService {
    constructor() {
        // console.log("authService constructor called")
        var localStorageAuthData = JSON.parse(window.localStorage.getItem('authData'))
        if (!!localStorageAuthData) {
            // Initialize authData with data from local storage
            // console.log(window.localStorage.getItem('authData'))
            this.authData = JSON.parse(window.localStorage.getItem('authData'))
            console.log("Autologin.")
        }
        else {
            // If local storage does not have authData, initialize to null
            this.authData = null
            console.log("No autologin.")
        }
    }

    login(value, cb) {
        var that = this
        return new Promise(function (resolve, reject) {
            // axios.post('https://calm-basin-73408.herokuapp.com/api/auth/login', value)
            axios.post('http://97227cb6.ngrok.io/auth', value)
                .then(function (response) {

                    console.log("authService: first time login")

                    var serverResponseObject = {
                        'token' : response.data.token,
                        'user_id' : response.data.data.user_id,
                        'role_id' : response.data.data.role_id
                    }

                    // Save userData both in localStorage and in authData so the user is "remembered"
                    localStorage.setItem('authData', JSON.stringify(serverResponseObject))
                    that.authData = serverResponseObject
                    
                    resolve();
                })
                .catch(function (err) {
                    reject(err)
                })
        });
    }

    logOff() {
        this.authData = null
        window.localStorage.removeItem('authData')
    }

    isAuthenticated() {
        var that = this
        return new Promise(function (resolve, reject) {
            if (that.authData) {
                resolve()
            }
            else {
                reject()
            }
        })
    }

    getAuthData() {
        return this.authData
    }

    setAuthData(value) {
        this.authData = value
    }
}

var authService = new AuthService()
export default authService