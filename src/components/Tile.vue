<template>
  <div class="tile" :id="`tile_${id}`">
    <p>{{ id }}</p>
    <!-- <img :src="getImg(value)" class="tile-image" v-on:click="rotate" /> -->
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
    ...mapGetters(["allTiles"]),

    value: function() {
      return this.$store.state.tiles.filter(tile => tile.id === this.id)[0]
        .value;
    }
  },

  methods: {
    ...mapActions(["setTile"]),

    getImg: function(num) {
      return num ? require("../assets/images/" + num + ".png") : null;
    },

    rotate: function() {
      const newVal = constants.ROTATIONS[this.value];
      this.setTile({
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
