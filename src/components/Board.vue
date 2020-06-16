<template>
  <div class="board-wrapper">
    <div v-for="num in 81" :class="`cell-wrapper-${num}`" :key="num">
      <Cell :id="num"></Cell>
    </div>
  </div>
</template>

<script>
import Cell from "./Cell.vue";

export default {
  name: "Board",
  components: { Cell }
};
</script>
