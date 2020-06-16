<template>
<div class="board-wrapper">
  <div v-for="num in 81" :class="`cell-wrapper-${num}`" :key="num">
    {{ num }}
  </div>
</div>
</template>

<script>
export default {
  name: "Board"
};
</script>
