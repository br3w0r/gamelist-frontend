<template>
  <div class="all-games">
    <span class="text-h5" style="margin-left: 30px">
      {{ myGames ? "My Games" : "All Games" }}
    </span>
    <v-container class="all-games-wrapper" align="center">
      <GameCard
      v-for="game in games"
      :key="game.id"
      :game="game"
      ></GameCard>
    </v-container>
  </div>
</template>

<script>
import GameCard from "../components/GameCard.vue"

export default {
  name: 'AllGames',

  components: {
    GameCard
  },

  props: [
    'myGames'
  ],

  computed: {
    games() {
      return this.myGames ?
        this.$store.state.gamelist.myGames.games
        : this.$store.state.gamelist.allGames.games
    }
  },

  methods: {
    loadGames: function() {
      this.$store.dispatch('gamelist/getAllGames', this.myGames)
        .then(result => {
          if (!result) {
            this.$router.push("/login")
          }
        });
    }
  },

  watch:{
   $route() {
      this.loadGames()
    }
  },

  mounted: function() {
    this.loadGames()
  }
};
</script>

<style scoped>
.all-games {
  width: 100%;
  max-width: 1024px;
  margin: auto;
}
.all-games-wrapper {
  text-align: center;
  padding: 0 !important;
  padding-left: 6px !important;
}
</style>
