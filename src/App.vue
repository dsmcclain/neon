<template>
  <div class="container">
    <h3 class="title">NEON</h3>
    <Board></Board>
    <div class="footer-section">
      <p>Buttons Go Here</p>
    </div>
  </div>
</template>

<script>
import Board from "./components/Board.vue";

export default {
  name: "App",
  components: {
    Board
  }
};
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
