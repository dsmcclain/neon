import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  cells: []
};

const getters = {
  allCells: state => state.cells,
  openCells: state => state.cells.filter(cell => cell.value === 0),
  lowestOpenCell: (state, getters) =>
    getters.openCells.sort((a, b) => a.id - b.id)[0]
};

const actions = {
  setCell({ commit }, cell) {
    commit("setCell", cell);
  }
};

const mutations = {
  setCell(state, data) {
    const cell = state.cells.find(cell => cell.id === data.id);
    if (cell) {
      const index = state.cells.indexOf(cell);
      Vue.set(state.cells, index, data);
    } else {
      state.cells.push(data);
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
