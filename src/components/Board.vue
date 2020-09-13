<template>
  <div class="board-wrapper">
    <div class="board">
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
      procId: null
    };
  },

  computed: {
    ...mapGetters(["openTiles", "allTiles", "lowestOpenTile", "anyLooped"]),

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
        //extra logic to end game
        clearInterval(this.procId);
      }
    }
  },

  methods: {
    ...mapActions(["setStatus", "setTile"]),

    fillEmptyTile: function() {
      if (this.lowestOpenTile === undefined) {
        this.setStatus("stop");
        this.gameOver();
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

    gameOver: function() {
      console.log("game over");
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
