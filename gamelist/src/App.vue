<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      id="app-bar"
      v-if="renderHeader"
    >
      <v-container>
        <v-row align="center" no-gutters style="height: 50px" class="flex-nowrap">
          <v-col cols="auto">
            <v-icon>mdi-gamepad-round-up</v-icon>
            <span id="site-name" class="font-weight-bold ml-2 mr-3">MyGameList</span>

            <v-btn to="/" class="font-weight-light" text>
              <v-icon>mdi-controller-classic-outline</v-icon>
              <span style="margin-left: .5em">ALL GAMES</span>
            </v-btn>
            <v-btn to="/my" class="font-weight-light" style="margin-right: 1em" text>
              <v-icon>mdi-format-list-bulleted</v-icon>
              <span style="margin-left: .5em">MY LIST</span>
            </v-btn>
          </v-col>

          <v-col>
            <v-autocomplete
              v-model="searchValue"
              :items="items"
              filled
              hide-details
              label="SEARCH"
              id="search-bar"
              class="search-bar"
              append-icon="mdi-magnify"
            ></v-autocomplete>
          </v-col>

          <v-col sm="1" md="1" lg="2">
            <v-spacer></v-spacer>
          </v-col>

          <v-col cols="auto">
            <v-btn
              to="/about"
              text
              style="margin-right: 1em"
            >
              <span>About</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text fab small
                  v-bind="attrs" v-on="on"
                >
                  <v-icon>mdi-account-circle-outline</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="signOut">
                  <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div class="space" v-if="renderHeader"></div>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    items: ["Super Mario Galaxy", "Doom", "Age of Empires II", "Grand Theft Auto V", "Minecraft"],
    searchValue: "",
  }),
  computed: {
    renderHeader() {
      return this.$route.name != "Login"
    }
  },
  methods: {
    signOut: function() {
      this.$store.dispatch('auth/signOut').then(ok => {
        if (ok) {
          location.reload();
        }
      })
    }
  }
};
</script>

<style>
.space {
  height: 10em
}
</style>
