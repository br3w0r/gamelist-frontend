<template>
  <div data-app class="game-card">
    <v-menu absolute>
      <template v-slot:activator="{ on, attrs }">
        <v-card v-bind="attrs" v-on="on">
          <v-img
            height="200"
            :src="game['image_url']"
          ></v-img>
          <v-card-title>{{ game['name'] }}</v-card-title>
          <v-card-subtitle>
            {{ game['platforms'][0].name }}
            <br />
            {{ game['year_released'] }}
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

  props: [
    'game'
  ],
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
  width: 15em;
  display: inline-block;
  margin: .8em;
  text-align: start;
}
</style>