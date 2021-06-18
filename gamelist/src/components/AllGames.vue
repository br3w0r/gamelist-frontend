<template>
  <div class="all-games">
    <span class="text-h5" style="margin-left: 30px">
      All Games
    </span>
    <v-container align="center" style="text-align: center">
      <GameCard
      v-for="index in items"
      :key="index"
      ></GameCard>
    </v-container>
  </div>
</template>

<script>
import GameCard from "./GameCard.vue"

export default {
  name: 'AllGames',

  components: {
    GameCard
  },

  data: () => ({
    items: ["Super Mario Galaxy", "Doom", "Age of Empires II", "Grand Theft Auto V", "Minecraft"],
    searchValue: ""
  }),
};
</script>

<style scoped>
.all-games {
  max-width: 1024px;
  margin: auto;
  margin-top: 100px;
}
</style>
