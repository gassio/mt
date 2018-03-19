import Vue from 'vue';
import secureHTTPService from './SecureHttpService'

class AuthService {
    constructor() {
        // console.log("authService constructor called")
        var localStorageAuthData = JSON.parse(window.localStorage.getItem('authData'))
        if (!!localStorageAuthData) {
            // Initialize authData with data from local storage
            // console.log(window.localStorage.getItem('authData'))
            this.authData = JSON.parse(window.localStorage.getItem('authData'))
            // console.log("Autologin.")
        }
        else {
            // If local storage does not have authData, initialize to null
            this.authData = null
            // console.log("No autologin.")
        }
    }

    login(value, cb) {
        var self = this
        
        return new Promise(function(resolve, reject) {
            secureHTTPService.post("login", value)
            .then((response) => {
                console.log("authService: first time login")
                var serverResponseObject = {
                    'token' : response.data.data.token,
                    'user_id' : response.data.data.id,
                    'role' : response.data.data.role,
                    // TODO this
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "email": "email"
                }
                console.log(response.data)
                // Save userData both in localStorage and in authData so the user is "remembered"
                localStorage.setItem('authData', JSON.stringify(serverResponseObject))
                self.authData = serverResponseObject

                resolve()
            })
            .catch((err) => {
                console.log("authService: login failed")
                reject(err)
            })
        })
    }

    logOff() {
        this.authData = null
        window.localStorage.removeItem('authData')
    }

    isAuthenticated() {
        var self = this
        return new Promise(function (resolve, reject) {
            if (self.authData) {
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