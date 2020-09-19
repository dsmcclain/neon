<template>
  <div class="tile" :id="`tile_${id}`">
    <img :src="getImg(value)" class="tile-image" v-on:click="rotateAndCheck" />
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

  data() {
    return {
      path: []
    };
  },

  computed: {
    ...mapGetters(["allTiles"]),

    value: function() {
      return this.$store.state.tiles.filter(tile => tile.id === this.id)[0]
        .value;
    },

    looped: function() {
      return this.$store.state.tiles.filter(tile => tile.id === this.id)[0]
        .looped;
    },

    neighbors: function() {
      return constants.NEIGHBORS[this.id];
    },

    doors: function() {
      return constants.DOORS[this.value];
    },

    linked: function() {
      if (this.value === 0 || this.doors === undefined) {
        return false;
      }
      for (const direction of this.doors) {
        let neighbor = this.neighbors[direction];
        if (!neighbor) {
          return false;
        }
        let neighborValue = this.allTiles[neighbor - 1].value;
        if (!constants.KEYS[direction].includes(neighborValue)) {
          return false;
        }
      }
      return true;
    }
  },

  watch: {
    value: function(newVal, oldVal) {
      if (newVal !== undefined && oldVal !== undefined) {
        if (this.linked && oldVal === 0) {
          this.checkLoop();
        }
      }
    },

    looped: function() {
      if (this.looped === true) {
        this.disableTiles();
        setTimeout(() => this.disappearLoop(this.path), 1000);
      }
    }
  },

  methods: {
    ...mapActions(["incrementScore",
      "setTile",
      "setValue",
      "setLooped",
      "setStatus"]),

    getImg: function(num) {
      return num ? require("../assets/images/" + num + ".png") : null;
    },

    checkLoop: function() {
      if (!this.linked) {
        return false;
      } else {
        this.path = [this.id];
        let direction = this.doors[0];
        let index = this.neighbors[direction] - 1;
        let nextTile = this.allTiles[index];
        if (!nextTile) {
          return false;
        }
        this.chartPath(nextTile, index, direction);
      }
    },

    chartPath: function(tile, index, direction) {
      if (tile.id === this.path[0]) {
        const finalTile = this.allTiles[this.path[0] - 1].value;
        if (
          constants.DOORS[finalTile].includes(this.oppositeDirection(direction))
        ) {
          this.setLooped({
            id: this.id,
            value: this.value,
            looped: true
          });
          return true;
        } else {
          return false;
        }
      } else if (
        this.allTiles[index].linked ||
        this.allTiles[index].value === 0
      ) {
        return false;
      } else {
        this.path.push(tile.id);
        const alreadyChecked = this.oppositeDirection(direction);
        direction = constants.DOORS[tile.value].filter(
          door => !door.includes(alreadyChecked)
        );
        index = constants.NEIGHBORS[tile.id][direction] - 1;
        tile = this.allTiles[index];
        if (!tile) {
          return false;
        }
        this.chartPath(tile, index, direction);
      }
    },

    rotateAndCheck: function() {
      const newVal = constants.ROTATIONS[this.value];
      this.setValue({
        id: this.id,
        value: newVal,
        looped: this.looped
      });
      this.checkLoop();
    },

    disableTiles: function() {
      this.waitGame();
      for (let id of this.path) {
        const newVal =
          this.$store.state.tiles.filter(tile => tile.id === id)[0].value + 6;
        this.setTile({
          id: id,
          value: newVal,
          looped: false
          //TODO: set new clickable attribute to false
        });
      }
    },

    disappearLoop: function(path) {
      this.incrementScore(path.length);
      for (let i = 0; i < path.length; i++) {
        this.setValue({
          id: path[i],
          value: 0,
          looped: false
        });
      }
      this.setStatus("go");
    },

    waitGame: function() {
      this.setStatus("wait");
    }
  }
};
</script>

<style scoped>
.tile-image {
  width: 100%;
}
</style>
