import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  cells: []
};

const getters = {
  allCells: state => state.cells
};

const actions = {
  setCell({ commit }, cell) {
    commit("setCell", cell);
  }
};

const mutations = {
  setCell: (state, cell) => state.cells.push(cell)
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
