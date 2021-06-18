<template>
  <div data-app class="game-card">
    <v-menu absolute>
      <template v-slot:activator="{ on, attrs }">
        <v-card v-bind="attrs" v-on="on" width="14em">
          <v-img
            height="200"
            src="https://static.metacritic.com/images/products/games/9/2fe120b980872297a7a17ab582f6af7d-98.jpg"
          ></v-img>
          <v-card-title>Super Mario Galaxy</v-card-title>
          <v-card-subtitle>
            Wii
            <v-icon style="float: right">{{ currentType }}</v-icon>
          </v-card-subtitle>
        </v-card>
      </template>
      <v-list flat>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in gameActionList"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title @click="gameAdded(item[1])">
                <v-icon>{{item[1]}}</v-icon> <span style="margin-left: 1em">{{item[0]}}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "GameCard",

  data: () => ({
    currentType: "mdi-star-outline",
    gameActionList: [
      ["Played", "mdi-check"],
      ["Playing", "mdi-reload"],
      ["Want to play", "mdi-star"],
      ["Unlist", "mdi-star-outline"]
    ]
  }),

  methods: {
    gameAdded(type) {
      this.currentType = type
    }
  }
}
</script>

<style>
.game-card {
  width: 14em;
  display: inline-block;
  margin: .8em;
  text-align: start;
}
</style>