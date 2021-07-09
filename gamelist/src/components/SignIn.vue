<template>
  <v-card id="login-card" class="rounded-lg" elevation="12" outlined>
    <v-card-title>
      Welcome!
    </v-card-title>
    <v-card-text>
      <v-text-field label="Nickname or email" outlined></v-text-field>
      <v-text-field label="Password" type="password" outlined></v-text-field>

      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-btn block large color="primary" style="float: right">
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
  methods: {
    setSignIn: function() {
      this.$emit("set-sign-in", false);
    }
  }
}
</script>