<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      id="app-bar"
      v-if="renderHeader"
    >
      <v-container id="header-container">
        <v-row align="center" no-gutters style="height: 50px" class="flex-nowrap">
          <v-col cols="auto">
            <v-icon v-if="renderLogo" class="mr-2">mdi-gamepad-round-up</v-icon>
            <span v-if="renderLogoText" id="site-name" class="font-weight-bold mr-3">MyGameList</span>

            <v-btn to="/" :rounded="fabButtons" :small="fabButtons" class="header-button font-weight-light" text>
              <v-icon>mdi-controller-classic-outline</v-icon>
              <span v-if="renderButtonText" style="margin-left: .5em">ALL GAMES</span>
            </v-btn>
            <v-btn to="/my" :rounded="fabButtons" :small="fabButtons" class="header-button font-weight-light" text>
              <v-icon>mdi-format-list-bulleted</v-icon>
              <span v-if="renderButtonText" style="margin-left: .5em">MY LIST</span>
            </v-btn>
          </v-col>

          <v-col>
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              filled
              hide-details
              hide-no-data
              :label="searchLabel"
              append-icon="mdi-magnify"
            ></v-autocomplete>
          </v-col>

          <v-col v-if="renderSpacer" lg="2">
            <v-spacer></v-spacer>
          </v-col>

          <v-col cols="auto">
            <v-btn
              to="/about"
              text small fab
              style="margin-right: 0.3em; margin-left: 0.3em"
            >
              <v-icon>mdi-help-circle-outline</v-icon>
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
import { mapState } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    isLoading: false,
    searchValue: "",
    model: null,
    search: null,
    searchTimeout: null,
    windowWidth: window.innerWidth,
  }),
  computed: {
    ...mapState([
      'searchEntries'
    ]),
    renderHeader() {
      return this.$route.name != "Login"
    },
    items() {
      return this.searchEntries.map(entry => entry.name)
    },
    renderSpacer() {
      return this.windowWidth > 1260
    },
    renderButtonText() {
      return this.windowWidth > 820
    },
    fabButtons() {
      return this.windowWidth <= 420
    },
    renderLogoText() {
      return this.windowWidth > 620
    },
    renderLogo() {
      return this.windowWidth > 480
    },
    searchLabel() {
      return this.windowWidth < 325 ? "" : "SEARCH"
    }
  },
  methods: {
    signOut: function() {
      this.$store.dispatch('auth/signOut').then(ok => {
        if (ok) {
          location.reload();
        }
      })
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  watch: {
    search(name) {
      if (name.length == 0) return

      clearTimeout(this.searchTimeout);
      this.isLoading = true;
      this.searchTimeout = setTimeout(() => {
        this.$store.dispatch('searchGames', name)
          .finally(() => this.isLoading = false)
      }, 500);
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  }
};
</script>

<style>
.space {
  height: 15vh
}
.header-button {
  margin-right: 1em;
}
@media screen and (max-width: 420px) {
  .header-button {
    padding-left: 0 !important;
    padding-right: 0 !important;
    min-width: 48px !important;
    margin-right: 0.3em;
  }
  #header-container {
    padding: 0 !important
  }
  .v-toolbar__content {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
}
</style>
