<template>
  <div class="all-games">
    <span class="text-h5" style="margin-left: 30px">
      All Games
    </span>
    <v-container align="center" style="text-align: center">
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

  computed: {
    games() {
      return this.$store.state.allgames.games
    }
  },

  mounted: function() {
    this.$store.dispatch('allgames/getAllGames');
  }
};
</script>

<style scoped>
.all-games {
  max-width: 1024px;
  margin: auto;
}
</style>
