<template>
  <div class="board-wrapper">
    <div v-for="num in 81" :class="`tile-wrapper-${num}`" :key="num">
      <Tile :id="num"></Tile>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import helpers from "../mixins/helpers.js";
import Tile from "./Tile.vue";

export default {
  name: "Board",
  mixins: [helpers],
  components: { Tile },

  computed: {
    ...mapGetters(["openTiles", "allTiles", "lowestOpenTile"])
  },

  methods: {
    ...mapActions(["setTile"]),

    fillEmptyTile: function(gameId) {
      if (this.lowestOpenTile === undefined) {
        console.log("game over");
        clearInterval(gameId);
      } else {
        const value = this.getRandomInt(1, 6);
        this.setTile({
          id: this.lowestOpenTile.id,
          value: value,
          looped: false
        });
      }
    },

    runGame: function() {
      const gameId = setInterval(() => this.fillEmptyTile(gameId), 1000);
    },

    createBoard: function() {
      for (let num = 1; num < 82; num++) {
        this.setTile({
          id: num,
          value: 0,
          looped: false
        });
      }
    }
  },

  created() {
    this.createBoard();
  },

  mounted() {
    this.runGame();
  }
};
</script>
