<template>
  <div class="board-wrapper">
    <div v-if="showInstructions" class="instructions-screen">
      <div class="instructions-row top">
        <img src="../assets/images/neon-wave.png" />
      </div>
      <div class="welcome-message">Welcome to Neon!</div>
      <h1>How To Play:</h1>
      <div class="instructions-row middle">
        <div class="instructions-section two-column">
          <img src="../assets/images/neon-unlooped.png" />
          <h1>Glass Tubes will appear on screen</h1>
        </div>
        <div class="instructions-section two-column">
          <div class="instructions-image-group">
            <img src="../assets/images/4.png" />
            <span class="arrow">&#8680;</span>
            <img src="../assets/images/5.png" />
            <span class="arrow">&#8680;</span>
            <img src="../assets/images/6.png" />
          </div>
          <h1>Click on the Tubes to rotate:</h1>
        </div>
      </div>
      <div class="instructions-row bottom">
        <div class="instructions-section">
          <img src="../assets/images/neon-loop.png" />
          <h1>Create a complete loop to fill the tubes with neon light!</h1>
        </div>
      </div>
      <div class="instructions-section bottom">
        <h1>
          Try to complete as many loops as you can before the screen fills up.
        </h1>
      </div>
      <button
        class="neon-button"
        v-on:click="this.hideInstructions"
      >
        Got it.
      </button>
    </div>
    <div v-else>
      <div v-if="gameOver" class="message-screen">
        <h1>GAME OVER!</h1>
        <h1>YOU SCORED</h1>
        <div class="final-score">{{ this.finalScore }}</div>
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
      transactions: 0,
      procId: null,
      gamePaused: false,
      gameOver: false,
      gameRunning: false,
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
    },

    showInstructions: function() {
      return this.status === "instructions";
    },

    speed: function() {
      if (this.transactions < 40) {
        return 1250;
      } else if (this.transactions > 39 && this.transactions < 80) {
        return 1100;
      } else if (this.transactions > 79 && this.transactions < 120) {
        return 1000;
      } else if (this.transactions > 119 && this.transactions < 160) {
        return 900;
      } else if (this.transactions > 159 && this.transactions < 200) {
        return 800;
      } else {
        return 725;
      }
    }
  },

  watch: {
    status: function(newVal) {
      if (newVal === "go") {
        this.gamePaused = false;
        this.gameRunning = true;
        this.gameOver = false;
        this.runGame();
      } else if (newVal === "pause") {
        clearInterval(this.procId);
        this.gamePaused = true;
      } else if (newVal === "instructions") {
        clearInterval(this.procId);
        if (this.gameRunning) {
          this.gamePaused = true;
        }
      } else if (newVal === "wait") {
        clearInterval(this.procId);
      }
    },

    speed: function(newVal) {
      if (newVal && this.status === "go") {
        clearInterval(this.procId);
        this.runGame();
      }
    }
  },

  methods: {
    ...mapActions(["setStatus", "setTile", "resetScore"]),

    hideInstructions: function() {
      this.setStatus("stop");
    },

    fillEmptyTile: function() {
      if (this.lowestOpenTile === undefined) {
        this.setStatus("stop");
        this.endGame();
      } else {
        this.transactions += 1;
        let value;
        const inflection = this.getRandomInt(1, 5);
        if (inflection === 1) {
          value = this.getRandomInt(3, 6);
        } else {
          value = this.getRandomInt(1, 6);
        }
        this.setTile({
          id: this.lowestOpenTile.id,
          value: value,
          looped: false
        });
      }
    },

    runGame: function() {
      this.procId = setInterval(() => this.fillEmptyTile(), this.speed);
    },

    endGame: function() {
      this.transactions = 0;
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
