<template>
  <div class="board">
    <div v-for="num in 81" :class="`tile-wrapper-${num}`" :key="num">
      <Tile :id="num"></Tile>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import helpers from "../mixins/helpers.js";
import Tile from "./Tile.vue";

export default {
  name: "Board",
  mixins: [helpers],
  components: { Tile },

  data() {
    return {
      procId: null
    };
  },

  computed: {
    ...mapGetters(["openTiles", "allTiles", "lowestOpenTile"]),

    status: function() {
      return this.$store.state.status;
    }
  },

  watch: {
    status: function(newVal) {
      console.log(newVal)
      if (newVal === 1) {
        this.runGame();
      } else if (newVal === 0) {
        clearInterval(this.procId);
      }
    }
  },

  methods: {
    ...mapActions(["setStatus", "setTile"]),

    fillEmptyTile: function() {
      if (this.lowestOpenTile === undefined) {
        this.setStatus(0);
      } else {
        const value = this.getRandomInt(1, 6);
        this.setTile({
          id: this.lowestOpenTile.id,
          value: value,
          looped: false
        });
      }
    },

    runGame: function() {
      this.procId = setInterval(() => this.fillEmptyTile(), 1000);
    },

    createBoard: function() {
      for (let num = 1; num < 82; num++) {
        this.setTile({
          id: num,
          value: 0,
          looped: false
        });
      }
    }
  },

  created() {
    this.createBoard();
  }
};
</script>
