<template>

    <div class="login">

        <img class="logo" src="../../assets/logo.png" alt="Logo">

        <form class="login-form" v-show="formLoginIsShown" v-on:submit.prevent="loginUser()">
          <input class="login-form__username" type="text" placeholder="email" v-model="username">
          <input class="login-form__password" type="password" placeholder="password" v-model="password">
          <span class="login-form__error">We don't recognize these credentials.</span>
          <button type="submit">LOGIN</button>
          <p class="login-form__switchform">Not registered? <a class="login-form__switchform-link" @click="showRegisterForm">Create an account</a></p>
        </form>

        <form class="register-form login-form" v-show="formRegisterIsShown" v-on:submit.prevent="registerUser()">
          <input class="login-form__username" type="text" placeholder="First and last name"/>
          <input class="login-form__password" type="password" placeholder="Password"/>
          <input class="login-form__username" type="text" placeholder="E-mail address"/>
          <button type="submit">CREATE ACCOUNT</button>
          <p class="login-form__switchform">Already registered? <a class="login-form__switchform-link" @click="showLoginForm()">Sign In</a></p>
        </form>

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import bgImage from "../../assets/login-bg.png"

export default {
    data() {
        return {
          username: '',
          password: '',
          rememberMe: true,
          formLoginIsShown: true,
          formRegisterIsShown: false,
          authService : this.$root.$options.authService
        }
    },
    methods: {
        loginUser() {
          this.authService.login({ username: this.username, password: this.password })
            .then(() => {
              // this.$store.commit('AUTHENTICATED', "login")
              // this.$store.commit('SET_USER_PROFILE', this.authService.getAuthData())
              this.$router.push('/')
            })
            .catch(() => {
              $('.login-form__error').css('display', 'block')
              this.$router.push('/login')
            })
          // authService.login({ residentID: this.username, password: this.password })
        },
        registerUser() {
          // TODO
        },
        showRegisterForm() {
          this.formRegisterIsShown = true
          this.formLoginIsShown = false
        },
        showLoginForm() {
          this.formLoginIsShown = true
          this.formRegisterIsShown = false
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
        document.body.style.backgroundImage = "url("+ bgImage + ")"
        document.body.style.backgroundSize = "100%" 
    }
}
</script>

<style>

/* ==============================================
                #LOGIN
	================================================= */

.login {
  position: relative;
  top: 25%;
  z-index: 100000;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
  padding: 45px;
  text-align: center;
  background: #FFF;
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

  .login-form__switchform {
    font-size: 0.7em;
  }

    .login-form__switchform-link {
      color: #363636;
    }
    .login-form__switchform-link:hover {
      text-decoration: underline;
    }

  .login-form__rememberme {
    display: flex;
    justify-content: center;
  }
    .login-form__rememberme-input {
      margin-top: 5px;
    }

</style>