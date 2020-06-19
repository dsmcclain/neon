<template>
  <div class="cell" :id="`cell_${id}`">
    <img :src="getImg(value)" class="tile-image" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Board",

  props: {
    id: { type: Number, required: true }
  },

  computed: {
    ...mapGetters(["allCells"]),

    value: function() {
      return this.$store.state.cells.filter(cell => cell.id === this.id)[0]
        .value;
    }
  },

  methods: {
    getImg(num) {
      return num ? require("../assets/images/" + num + ".png") : null;
    }
  }
};
</script>

<style scoped>
.tile-image {
  width: 100%;
}
</style>
