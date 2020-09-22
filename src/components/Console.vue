<template>
  <div v-if="!showInstructions" class="console">
    <h3 class="title name">NEON</h3>
    <h4 class="by-line">the game</h4>
    <div class="display-score">
      <div class="score">{{ this.getScore }}</div>
    </div>
    <h1 class="title score-label">SCORE</h1>
    <div class="controls">
      <button class="neon-button main" v-on:click="this.buttonAction">
        {{ this.buttonText }}
      </button>
      <button class="neon-button main" v-on:click="this.toggleInstructions">
        HOW?
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Console",

  computed: {
    ...mapGetters(["getScore", "getStatus"]),

    showInstructions: function() {
      return this.getStatus === "instructions";
    },

    buttonAction: function() {
      return this.getStatus === "go" ? this.pauseGame : this.startGame;
    },

    buttonText: function() {
      let text = "";
      switch (this.getStatus) {
        case "stop":
          text = "START";
          break;
        case "go":
        case "wait":
          text = "PAUSE";
          break;
        case "pause":
          text = "RESUME";
          break;
      }
      return text;
    }
  },

  methods: {
    ...mapActions(["setStatus"]),

    startGame: function() {
      this.setStatus("go");
    },

    pauseGame: function() {
      this.setStatus("pause");
    },

    toggleInstructions: function() {
      this.setStatus("instructions");
    }
  }
};
</script>
