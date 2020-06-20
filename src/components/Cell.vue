<template>
  <div class="cell" :id="`cell_${id}`">
    <img :src="getImg(value)" class="tile-image" v-on:click="rotate" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    ...mapActions(["setCell"]),

    getImg: function(num) {
      return num ? require("../assets/images/" + num + ".png") : null;
    },

    rotate: function() {
      let num = 0;
      switch (this.value) {
        case 1:
          num = 2;
          break;
        case 2:
          num = 1;
          break;
        case 3:
        case 4:
        case 5:
          num = this.value + 1;
          break;
        case 6:
          num = 3;
          break;
      }
      this.setCell({
        id: this.id,
        value: num
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
