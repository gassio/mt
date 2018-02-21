<template>

    <div class="login">

        <img class="logo" src="../../assets/logo.png" alt="Logo">

        <form class="login-form" v-on:submit.prevent="loginUser()">
          <input type="text" placeholder="username" v-model="username">
          <input type="password" placeholder="password" v-model="password">
          <button type="submit" value="login">LOGIN</button>
        </form>

        <!-- <form class="register-form" v-if="registered">
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button>create</button>
            <p class="message">Already registered? <a>Sign In</a></p>
        </form> -->

        <!-- <form class="login-form" v-else>
            <input type="text" placeholder="username" v-model="username"/>
            <input type="password" placeholder="password" v-model="password"/>
            <button type="button" @click="l()">login</button>
            <p class="message">Not registered? <a style="text-decoration:none" @click="c()">Create an account</a></p>
        </form> -->

    </div>
</template>


<script>

export default {
    data() {
        return {
          registered: false,
          username : '',
          password : ''
        }
    },
    methods: {
        loginUser() {
          const myAuth = this.$root.$options.myAuth

          myAuth.login({ residentID: this.username, password: this.password })
            .then(() => {
              var role = myAuth.getAuthData().role_id
              // this.$router.push('/' + role) // See decide home for this functionality
              // this.$router.push('/professor')
              this.$store.commit('AUTHENTICATED', "login")
              this.$store.commit('SET_USER_PROFILE', myAuth.getAuthData())
              this.$router.push('/DecideHome')
              // console.log('after login test: ', myAuth.getAuthData())
            })
            .catch(() => {
              this.$router.push('/login')
            })
        },
        login() {
          this.$store.dispatch('authRequest', { residentID: this.username, password: this.password }).then(() => {
            this.$router.push('/')
          })
        },   
        l() {
          var that = this
          if (this.username === 'karatsolis' && this.password === "1234") {
            setTimeout(function() {
              that.$store.commit('AUTHENTICATED')
              that.$router.push({ path: '/professor'})
            }, 600)
          }
          else {
            alert('Please enter the correct username and password.')
          }
        },
        r() {
          this.registered = true
        },
        c() {
          this.registered = false
        },
        openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
    },
    created() {
      this.$store.dispatch('getAllVideos')
    },
    mounted() {
        $('.message a').click(function(){
            $('login').animate({height: "toggle", opacity: "toggle"}, "slow");
        });
    },
}
</script>

<style>

/* ==============================================
                #LOGIN
	================================================= */

.login {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.logo{
	max-width:150px;
	margin: 20px;
}

.login input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.login button {
  text-transform: uppercase;
  outline: 0;
  background: #A90931;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.login button:hover,.login button:active,.login button:focus {
  background: #8F082A;
}
.login .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.login .message a {
  color: #A90931;
  text-decoration: none;
}
.login .register-form {
}


</style>