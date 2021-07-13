<template>
  <v-card id="login-card" class="rounded-lg" elevation="12" outlined>
    <v-card-title>
      Sign Up
    </v-card-title>
    <v-card-text>
      <v-text-field label="Nickname*"
        outlined counter="20"
        v-model="creds.nickname"
        :rules="[rules.required, rules.nicknameLength]"
        @keyup.enter="signUp"
        ></v-text-field>
      <v-text-field label="Email*" outlined
        v-model="creds.email"
        :rules="[rules.email]"
        @keyup.enter="signUp"
      ></v-text-field>
      <v-text-field label="Password*"
        type="password" outlined
        v-model="creds.password"
        :rules="[rules.required, rules.passwordLength]"
        @keyup.enter="signUp"
        ></v-text-field>
      <v-text-field label="Description"
        outlined counter="120"
        v-model="creds.description"
        :rules="[rules.decriptionLength]"
        @keyup.enter="signUp"
        ></v-text-field>

      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-btn block large color="primary"
              style="float: right" :disabled="invalid"
              @click="signUp">
              Sign Up
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn text @click="setSignIn">
              Sign in
            </v-btn>
          </v-col>
          <v-col cols="1.5">
            <v-spacer></v-spacer>
          </v-col>
          <v-col cols="7.5">
            <v-btn text>
              Forgot password?
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { stringIsEmail } from '../misc/helpers.js'

export default {
  name: "SignUp",
  data: () => ({
    buttonDisabled: true,
    creds: {
      nickname: "",
      email: "",
      description: "",
      password: ""
    },
    rules: {
      required: value => !!value || "This field is required",
      email: value => stringIsEmail(value) || "Email is invalid",
      nicknameLength: value => (value.length > 1 && value.length <= 20) || "Min 2 and max 20 characters",
      decriptionLength: value => value.length <= 120 || "Max 120 characters",
      passwordLength: value => value.length > 5 || "Min 6 characters"
    }
  }),
  methods: {
    setSignIn: function() {
      this.$emit("set-sign-in", true);
    },
    signUp: function() {
      if (!this.invalid) {
        this.$store.dispatch("auth/signUp", this.creds).then(ok => {
          if (ok) {
            this.$router.push("/")
          }
        })
      }
    }
  },
  computed: {
    invalid: function() {
      return !(this.creds.nickname.length > 1 &&
        this.creds.nickname.length <= 20 &&
        this.creds.password.length > 5 &&
        stringIsEmail(this.creds.email) &&
        this.creds.description.length <= 120)
    }
  }
}
</script>