<template>
  <div class="cell" :id="`cell_${id}`">
    <img :src="getImg(value)" class="tile-image" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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

  computed: {
    ...mapGetters(["allCells"])
  },

  methods: {
    ...mapActions(["setCell"]),

    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getImg(num) {
      return require("../assets/images/" + num + ".png");
    }
  },

  created() {
    this.value = this.getRandomInt(1, 6);
    this.setCell({ id: this.id, value: this.value });
  }
};
</script>

<style scoped>
.tile-image {
  width: 100%;
}
</style>
