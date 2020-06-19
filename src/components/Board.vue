<template>
  <div class="board-wrapper">
    <div v-for="num in 81" :class="`cell-wrapper-${num}`" :key="num">
      <Cell :id="num"></Cell>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Cell from "./Cell.vue";

export default {
  name: "Board",
  components: { Cell },

  computed: {
    ...mapGetters(["openCells", "allCells", "lowestOpenCell"])
  },

  methods: {
    ...mapActions(["setCell"]),

    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    fillEmptyCell: function(gameId) {
      if (this.lowestOpenCell === undefined) {
        console.log("game over");
        clearInterval(gameId);
      } else {
        const value = this.getRandomInt(1, 6);
        this.setCell({
          id: this.lowestOpenCell.id,
          value: value
        });
      }
    },

    runGame: function() {
      const gameId = setInterval(() => this.fillEmptyCell(gameId), 1000);
    },

    createBoard: function() {
      this.setCell({ id: 1, value: 5 });
      for (let num = 2; num < 82; num++) {
        this.setCell({
          id: num,
          value: 0
        });
      }
    }
  },

  created() {
    this.createBoard();
  },

  mounted() {
    this.runGame();
  }
};
</script>
