import Vue from 'vue';
import axios from 'axios';

// Vue.mixin( {
//     beforeCreate() {
//       const options = this.$options;
//       if ( options.myAuth )
//         this.$myAuth = options.myAuth;
//       else if ( options.parent && options.parent.$myAuth )
//         this.$myAuth = options.parent.$myAuth;
//     }
// })

let authData = null
let initialized = false

export default {

    test: 'asd',

    // constructor() {
    //     this.authData = null
    //     this.initialized = false
    // }
    
    printAuthData() {
        console.log("print authData: ", authData)
    },

    autoLogin() {
        // if (localStorage)
            // authData ~= localStorage
        return new Promise(function (resolve, reject) {
            authData = window.localStorage.getItem('userAuthData') // Set authData == token
            initialized = true
            if (authData)
                resolve(authData)
            else 
                reject()
        })
    },

    login(value, cb) {
        return new Promise(function (resolve, reject) {
            axios.post('https://calm-basin-73408.herokuapp.com/api/auth/login', value)
                .then(function (response) {
                    console.log(response)
                    // this.authData = response.data.data
                    localStorage.setItem('userAuthData', response.data.token)
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                })
        });
    },

    logOff() {
        localStorage.removeItem('userAuthData')
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