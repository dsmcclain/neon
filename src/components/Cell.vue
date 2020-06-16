<template>
  <div class="cell" :id="`cell_${id}`">{{ id }}</div>
</template>

<script>
export default {
  name: "Board",

  props: {
    id: { type: Number, required: true }
  }
};
</script>
