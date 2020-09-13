<template>
  <div class="board-wrapper">
    <div v-if="gameOver" class="game-over-screen">
      <h1>GAME OVER!</h1>
      <h1>YOU SCORED</h1>
      <div class="final-score">{{ this.getScore }}</div>
      <h2>WELL DONE! MAYBE!</h2>
    </div>
    <div v-else class="board">
      <div v-for="num in 81" :class="`tile-wrapper-${num}`" :key="num">
        <Tile :id="num"></Tile>
      </div>
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

  data() {
    return {
      procId: null,
      gameOver: false
    };
  },

  computed: {
    ...mapGetters(["openTiles",
      "allTiles",
      "lowestOpenTile",
      "anyLooped",
      "getScore"]),

    status: function() {
      return this.$store.state.status;
    }
  },

  watch: {
    status: function(newVal) {
      if (newVal === "go") {
        this.runGame();
      } else if (newVal === "pause" || newVal === "wait") {
        clearInterval(this.procId);
      } else if (newVal === "stop") {
        this.endGame()
      }
    }
  },

  methods: {
    ...mapActions(["setStatus", "setTile"]),

    fillEmptyTile: function() {
      if (this.lowestOpenTile === undefined) {
        this.setStatus("stop");
        this.endGame();
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
      this.procId = setInterval(() => this.fillEmptyTile(), 1000);
    },

    endGame: function() {
      this.gameOver = true;
      clearInterval(this.procId);
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
  }
};
</script>
