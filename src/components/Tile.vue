<template>
  <div class="tile" :id="`tile_${id}`">
    <img :src="getImg(value)" class="tile-image" v-on:click="rotate" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import constants from "../mixins/constants.js";
import helpers from "../mixins/helpers.js";

export default {
  name: "Board",
  mixins: [constants, helpers],

  props: {
    id: { type: Number, required: true }
  },

  computed: {
    ...mapGetters(["allTiles"]),

    value: function() {
      return this.$store.state.tiles.filter(tile => tile.id === this.id)[0]
        .value;
    },

    linked: function() {
      if (this.value === 0) {
        return false;
      }
      for (const direction of constants.DOORS[this.value]) {
        let neighbor = constants.NEIGHBORS[this.id][direction];
        let neighborValue = this.allTiles[neighbor - 1].value;
        if (
          !constants.DOORS[neighborValue].includes(
            this.oppositeDirection(direction)
          )
        ) {
          return false;
        }
      }
      return true;
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
