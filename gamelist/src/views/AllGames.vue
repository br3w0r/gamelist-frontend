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
      ref="card"
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

  data() { 
    return {
      observer: new IntersectionObserver(this.handleIntersect, {
        root: null,
        threshold: 0.0
      })
    }
  },

  props: [
    'myGames'
  ],

  computed: {
    allGamesFirst() {
      return this.$store.state.gamelist.allGames.first
    },
    games() {
      return this.myGames ?
        this.$store.state.gamelist.myGames.games
        : this.$store.state.gamelist.allGames.games
    }
  },

  methods: {
    loadGames: function(observer, force) {
      if (force || this.myGames || this.allGamesFirst) {
        this.$store.dispatch('gamelist/getAllGames', this.myGames)
          .then(result => {
            if (!result) {
              this.$router.push("/login")
            }
          })
          .finally(() => {
            if (!this.myGames) {
              this.$nextTick(() => {
                observer.observe(this.$refs.card[this.$refs.card.length-1].$el);
              })
            }
          });
      } else if (!this.myGames) {
        this.$nextTick(() => 
          observer.observe(this.$refs.card[this.$refs.card.length-1].$el)
        );
      }
    },
    
    handleIntersect: function(entries, observer) {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        this.loadGames(observer, true);
      }
    }
  },

  watch:{
    $route() {
      this.loadGames(this.observer);
      if (this.myGames) {
        this.observer.disconnect();
      }
    }
  },

  mounted: function() {
    this.loadGames(this.observer);
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
