export default {
  methods: {
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    oppositeDirection: function(direction) {
      const opposites = {
        north: "south",
        east: "west",
        south: "north",
        west: "east"
      };
      return opposites[direction];
    }
  }
};
