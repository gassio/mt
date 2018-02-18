import axios from 'axios'

const myLoginRoutine = user => new Promise ((resolve, reject) => {
    axios.post('https://calm-basin-73408.herokuapp.com/api/auth/login', user)
      .then(resp => {
        const token = resp.data.token
        localStorage.setItem('user-token', token) // store the token in localstorage
        console.log('Success POST ', resp.data)      
        resolve(resp)
      })
    .catch(err => {
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      reject(err)
      console.log('Failed POST')      
    })
  })

export default myLoginRoutine