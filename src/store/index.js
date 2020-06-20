import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  tiles: []
};

const getters = {
  allTiles: state => state.tiles,
  openTiles: state => state.tiles.filter(tile => tile.value === 0),
  lowestOpenTile: (state, getters) =>
    getters.openTiles.sort((a, b) => a.id - b.id)[0]
};

const actions = {
  setTile({ commit }, tile) {
    commit("setTile", tile);
  }
};

const mutations = {
  setTile(state, data) {
    const tile = state.tiles.find(tile => tile.id === data.id);
    if (tile) {
      const index = state.tiles.indexOf(tile);
      Vue.set(state.tiles, index, data);
    } else {
      state.tiles.push(data);
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
