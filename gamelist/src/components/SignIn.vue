<template>
  <v-card id="login-card" class="rounded-lg" elevation="12" outlined>
    <v-card-title>
      Welcome!
    </v-card-title>
    <v-card-text>
      <v-text-field label="Nickname or email" outlined
        v-model="creds.user"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field label="Password"
        type="password" outlined
        v-model="creds.password"
        :rules="[rules.passwordLength]"
        ></v-text-field>

      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-btn block large color="primary"
              style="float: right" :disabled="invalid"
              @click="signIn">
              Sign in
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn text @click="setSignIn">
              Sign up
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-spacer></v-spacer>
          </v-col>
          <v-col cols="6">
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
export default {
  name: "SignIn",
  data: () => ({
    creds: {
      user: "",
      password: ""
    },
    rules: {
      required: value => !!value || "This field is required",
      passwordLength: value => value.length > 5 || "Min 6 characters"
    }
  }),
  methods: {
    setSignIn: function() {
      this.$emit("set-sign-in", false);
    },
    signIn: function() {
      this.$store.dispatch("auth/getTokens", this.creds).then(ok => {
        if (ok) {
          this.$router.push("/")
        }
      })
    }
  },
  computed: {
    invalid: function() {
      return (!this.creds.user ||
        this.creds.password.length < 6)
    }
  },
}
</script>