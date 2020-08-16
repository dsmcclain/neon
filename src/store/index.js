import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  tiles: [],
  score: 0,
  status: "stop"
};

const getters = {
  getScore: state => state.score,
  getStatus: state => state.status,
  allTiles: state => state.tiles,
  openTiles: state => state.tiles.filter(tile => tile.value === 0),
  lowestOpenTile: (state, getters) =>
    getters.openTiles.sort((a, b) => a.id - b.id)[0],
  anyLooped: state => state.tiles.some(tile => tile.value === 7)
};

const actions = {
  incrementScore({ commit }, int) {
    commit("incrementScore", int);
  },

  setStatus({ commit }, status) {
    commit("setStatus", status);
  },

  setTile({ commit }, tile) {
    commit("setTile", tile);
  },

  setValue({ commit }, tile) {
    commit("setValue", tile);
  },

  setLooped({ commit }, tile) {
    commit("setLooped", tile);
  }
};

const mutations = {
  incrementScore(state, data) {
    state.score += data;
  },

  setStatus(state, data) {
    state.status = data;
  },

  setTile(state, data) {
    const tile = state.tiles.find(tile => tile.id === data.id);
    if (tile) {
      const index = state.tiles.indexOf(tile);
      Vue.set(state.tiles, index, data);
    } else {
      state.tiles.push(data);
    }
  },

  setValue(state, data) {
    const tile = state.tiles.find(tile => tile.id === data.id);
    const index = state.tiles.indexOf(tile);
    tile.value = data.value;
    Vue.set(state.tiles, index, data);
  },

  setLooped(state, data) {
    const tile = state.tiles.find(tile => tile.id === data.id);
    const index = state.tiles.indexOf(tile);
    tile.looped = data.looped;
    Vue.set(state.tiles, index, data);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
