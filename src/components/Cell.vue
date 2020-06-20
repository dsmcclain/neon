<template>
  <div class="cell" :id="`cell_${id}`">
    <img :src="getImg(value)" class="tile-image" v-on:click="rotate" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import constants from "../mixins/constants.js";
;
export default {
  name: "Board",
  mixins: [constants],

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
    ...mapActions(["setCell"]),

    getImg: function(num) {
      return num ? require("../assets/images/" + num + ".png") : null;
    },

    rotate: function() {
      const newVal = constants.ROTATIONS[this.value];
      this.setCell({
        id: this.id,
        value: newVal
      });
    }
  }
};
</script>

<style scoped>
.tile-image {
  width: 100%;
}
</style>
