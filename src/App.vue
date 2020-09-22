<template>
  <div>
    <div class="mobile-screen">
      <img src="./assets/images/neon-wave.png" />
      <h2>Hi! Thank you for checking out Neon!</h2>
      <hr class="separator-line">
      <h3>
        This game is designed for a larger screen. It is not playable on a
        mobile device or tablet.
      </h3>
      <h3>
        Please visit with a larger screen. I would love to show you around!
      </h3>
      <h3 class="signoff-message">
        (In the meantime, you can check out more of my work
        <a class="blog-link" href="https://dsmcclain.github.io">here</a>)
      </h3>
    </div>
    <div class="container">
      <Console></Console>
      <Board></Board>
    </div>
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
