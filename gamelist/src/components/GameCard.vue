<template>
  <div data-app class="game-card">
    <v-menu absolute>
      <template v-slot:activator="{ on, attrs }">
        <v-card class="game-card" v-bind="attrs" v-on="on">
          <v-img
            height="200"
            :src="game['image_url']"
          ></v-img>
          <div class="list-icon-wrapper rounded">
            <v-icon color="white">{{ listTypeToIcon[game['user_list']] }}</v-icon>
          </div>
          <v-card-title class="game-card-title">{{ game['name'] }}</v-card-title>
        </v-card>
      </template>
      <v-list flat>
        <v-list-item link @click="openDetails(game.id)">
          <v-list-item-title>
            <v-icon>mdi-information-outline</v-icon>
            <span style="margin-left: 1em">Details</span>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, index) in listTypes"
          :key="index"
          link @click="listGame(item.id)"
        >
          <v-list-item-title>
            <v-icon>{{listTypeToIcon[item.id]}}</v-icon>
            <span style="margin-left: 1em">{{item.name}}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "GameCard",

  props: [
    'game'
  ],
  data: () => ({
    currentType: "mdi-star-outline"
  }),
  computed: mapState([
    'listTypes',
    'listTypeToIcon'
  ]),

  methods: {
    listGame(listType) {
      this.$store.dispatch("listGame", {
        game: this.game,
        "list_type": listType
      }).then(ok => {
        if (ok) {
          this.game['user_list'] = listType
        }
      })
    },
    openDetails(gameId) {
      this.$router.push({name: 'GameDetails', params: {id: gameId}})
    }
  }
}
</script>

<style>
.game-card {
  width: 17em;
  height: 21em;
  display: inline-block;
  margin-right: .8em;
  margin-bottom: .8em;
  text-align: start;
}
.game-card-title {
  overflow: hidden;
  overflow-wrap: normal !important;
}
.list-icon-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.15em;
}
</style>