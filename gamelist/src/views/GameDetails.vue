<template>
  <v-card class="game-details-card">
    <v-container>
      <v-row align="center">
        <v-col cols="3">
          <v-img
            :src="details.game['image_url']"
          ></v-img>
        </v-col>
        <v-col cols="9">
          <span class="text-h6">{{ details.game.name }}</span>
          <br />
          <span>Platforms:</span>
          <br />
          <v-chip
            v-for="(platform, i) in details.platforms"
            :key="i"
            outlined
            class="game-details-chip"
          >{{ platform.name }}</v-chip>
          <br />
          <span>Genres:</span>
          <br />
          <v-chip
            v-for="(genre, i) in details.genres"
            :key="i"
            outlined
            class="game-details-chip"
          >{{ genre.name }}</v-chip>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined fab small
                class="game-details-button"
                v-bind="attrs" v-on="on"
              >
                <v-icon>
                  {{ listTypeToIcon[details.game['user_list']]   }}
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in listTypes"
                :key="i"
                link @click="listGame(item.id)"
              >
                <v-list-item-title>
                  <v-icon>{{listTypeToIcon[item.id]}}</v-icon> <span style="margin-left: 1em">{{item.name}}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    details: state => state.gamedetails,
    listTypes: 'listTypes',
    listTypeToIcon: 'listTypeToIcon'
  }),
  methods: {
    listGame(listType) {
      this.$store.dispatch("listGame", {
        game: this.details.game,
        "list_type": listType
      }).then(ok => {
        if (ok) {
          this.details.game['user_list'] = listType
        }
      })
    },
    getGameDetails() {
      this.$store.dispatch('gamedetails/getGameDetails', parseInt(this.$route.params.id))
        .then(ok => {
          if (!ok) {
            this.$router.push('/login')
          }
        })
    }
  },
  watch: {
    $route() {
      this.getGameDetails();
    }
  },
  mounted() {
    this.getGameDetails();
  }
}
</script>

<style scoped>
.game-details-card {
  max-width: 800px;
  margin: auto;
}
.game-details-chip {
  margin-left: 0.3em;
  margin-bottom: 0.3em;
}
.game-details-button {
  float: right;
  margin-left: 1em;
  margin-top: 1em;
}
</style>