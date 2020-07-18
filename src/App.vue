<template>
  <div class="container">
    <div class="console">
      <h3 class="title name">NEON</h3>
      <div class="display-score">
        <div class="score">{{ this.getScore }}</div>
      </div>
      <h1 class="title score-label">SCORE</h1>
      <div class="controls">
        <button class="start" v-on:click="startGame()">START</button>
        <button class="pause">PAUSE</button>
      </div>
    </div>
    <div class="board-wrapper">
      <Board></Board>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Board from "./components/Board.vue";

export default {
  name: "App",
  components: {
    Board
  },

  computed: {
    ...mapGetters(["getScore"])
  },

  methods: {
    ...mapActions(["setStatus"]),

    startGame: function() {
      console.log('starting');
      this.setStatus(1);
    }
  }
};
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
