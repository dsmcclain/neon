<template>
  <div class="instructions-screen">
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
    <button class="neon-button" v-on:click="$emit('hide-instructions')">
      Got it.
    </button>
  </div>
</template>

<script>
export default {
  name: "InstructionsScreen"
};
</script>
