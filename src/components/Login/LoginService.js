import Vue from 'vue';
import axios from 'axios';


export default {

    login(value, cb) {
        return new Promise(function (resolve, reject) {
            axios.post('http://agtheodorides.dyndns.org:8089/rest/login', value)
                .then(function (res) {
                    console.log('POST pass', res.data)
                    resolve(res.data);
                })
                .catch(function (err) {
                    console.log('POST error', err.response)
                    reject(err.response.data)
                })
        });
      

    }
}