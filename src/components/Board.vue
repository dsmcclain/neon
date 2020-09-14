<template>
  <div class="board-wrapper">
    <div v-if="gameOver" class="message-screen">
      <h1>GAME OVER!</h1>
      <h1>YOU SCORED</h1>
      <div class="final-score">{{ this.finalScore }}</div>
      <h2>WELL DONE! MAYBE!</h2>
    </div>
    <div v-if="gamePaused" class="message-screen">
      <h1>GAME PAUSED</h1>
    </div>
    <div v-if="!gamePaused && !gameOver" class="board">
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
      gamePaused: false,
      gameOver: false,
      finalScore: 0
    };
  },

  computed: {
    ...mapGetters([
      "openTiles",
      "allTiles",
      "lowestOpenTile",
      "anyLooped",
      "getScore"
    ]),

    status: function() {
      return this.$store.state.status;
    }
  },

  watch: {
    status: function(newVal) {
      if (newVal === "go") {
        this.gamePaused = false;
        this.gameOver = false;
        this.runGame();
      } else if (newVal === "pause") {
        clearInterval(this.procId);
        this.gamePaused = true;
      } else if (newVal === "wait") {
        clearInterval(this.procId);
      }
    }
  },

  methods: {
    ...mapActions(["setStatus", "setTile", "resetScore"]),

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
      this.finalScore = this.getScore;
      this.gameOver = true;
      clearInterval(this.procId);
      this.resetScore();
      this.createBoard();
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
