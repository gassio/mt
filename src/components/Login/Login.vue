<template>

    <div class="login">

        <img class="logo" src="../../assets/logo.png" alt="Logo">

        <form class="login-form" v-on:submit.prevent="loginUser()">
          <input class="login-form__username" type="text" placeholder="username" v-model="username">
          <input class="login-form__password" type="password" placeholder="password" v-model="password">
            <span class="login-form__error">We don't recognize these credentials.</span>
          <button type="submit" value="login">LOGIN</button>
          <!-- <span class="login-form__rememberme">
            <input type="checkbox" class="login-form__rememberme-input" v-bind:checked="rememberMe" @click="rememberMeToggle()">
            <p>REMEMBER ME</p>
          </span> -->
        </form>

        <!-- <el-form :model="loginForm" ref="loginForm" label-width="190px" :rules="loginFormRules">
            <el-input v-model="loginForm.username" placeholder="username"></el-input>
            <div style="margin-top:5px;">We didn't recognize this email.</div>
            <el-input v-model="loginForm.password" placeholder="password" type="password"></el-input>
            <el-button type="primary" @click="loginUser()">LOGIN</el-button>
        </el-form> -->

        <!-- <form class="register-form" v-if="registered">
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="username address"/>
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
  import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

export default {
    data() {
        return {
          registered: false,
          username : '',
          password : '',
          loginForm: {
            username : '',
            password : '',  
          },
          loginFormRules: {
              username: [
                  { required: true, message: 'We didn\'t recognize this email.', trigger: 'blur' },
              ],
              password: [
                  { required: true, message: 'Please select class', trigger: 'blur' },
              ],
          },
          rememberMe : true
        }
    },
    methods: {
        loginUser() {
          const myAuth = this.$root.$options.myAuth
          myAuth.login({ username: this.username, password: this.password })
            .then(() => {
              this.$store.commit('AUTHENTICATED', "login")
              this.$store.commit('SET_USER_PROFILE', myAuth.getAuthData())
              this.$router.push('/')
            })
            .catch(() => {
              $('.login-form__error').css('display', 'block')
              this.$router.push('/login')
            })
          // myAuth.login({ residentID: this.username, password: this.password })
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
    }
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

.login-form__username, .login-form__password {
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

.login-form {

}
  .login-form__error {
    display: none;
    color: red;
    font-size: 0.8em;
    text-align: left;
    margin-top: -15px;
    margin-bottom: 10px;
  }

  .login-form__rememberme {
    display: flex;
    justify-content: center;
  }
    .login-form__rememberme-input {
      margin-top: 5px;
    }


</style>