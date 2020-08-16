<template>
  <div class="container">
    <Console></Console>
    <Board></Board>
  </div>
</template>

<script>
import Board from "./components/Board.vue";
import Console from "./components/Console.vue";

export default {
  name: "App",
  components: {
    Board,
    Console
  }
};
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
