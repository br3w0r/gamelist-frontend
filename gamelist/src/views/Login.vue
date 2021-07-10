<template>
  <div id="login-wrapper">
    <div id="logo">
      <v-icon color="primary">mdi-gamepad-round-up</v-icon>
      <span id="site-name" class="font-weight-bold ml-2">MyGameList</span>
    </div>
    <v-container id="login" fill-height>
      <v-scroll-x-transition>
        <sign-in v-if="signin" @set-sign-in="setSignIn" />
        <sign-up v-else @set-sign-in="setSignIn" />
      </v-scroll-x-transition>
    </v-container>
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"

export default {
  name: "Login",
  components: {
    SignIn,
    SignUp
  },
  data: () => ({
    signin: true
  }),
  methods: {
    setSignIn: function(val) {
      this.signin = val
    }
  }
}
</script>

<style>
  html {
    overflow-y: auto;
  }
  #logo {
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: 1.25em;
    font-size: 1.15em;
  }
  #login {
    margin: auto;
    width: 490px;
    margin-top: 2em;
  }
  #login-wrapper {
    height: 90%
  }
  #login-card {
    min-width: 400px;
    position: absolute !important;
  }
  #space {
    height: 3em
  }
</style>