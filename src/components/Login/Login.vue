<template>

    <div class="login">

        <img class="logo" src="../../assets/logo.png" alt="Logo">
        <form class="register-form" v-if="registered">
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button>create</button>
            <p class="message">Already registered? <a @click="u()">Sign In</a></p>
        </form>

        <form class="login-form" v-else>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button type="button">login</button>
            <p class="message">Not registered? <a @click="r()">Create an account</a></p>
        </form>


    </div>
</template>


<script>

export default {
    data() {
        return {
          registered: false 
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
    methods: {
        r() {
          this.registered = true
        },
        u() {
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
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}



</style>