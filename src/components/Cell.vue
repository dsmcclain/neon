<template>
  <div class="cell" :id="`cell_${id}`">
    <img :src="getImg(value)" class="tile-image" />
  </div>
</template>

<script>
export default {
  name: "Board",

  props: {
    id: { type: Number, required: true }
  },

  data: function() {
    return {
      value: 0
    };
  },

  methods: {
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getImg(num) {
      return require("../assets/images/" + num + ".png")
    }
  },

  created() {
    this.value = this.getRandomInt(1, 6);
  }
};
</script>

<style scoped>
.tile-image {
  width: 100%;
}
</style>
