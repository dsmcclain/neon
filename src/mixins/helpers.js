export default {
  methods: {
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
};
