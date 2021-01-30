/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      birthdate: '',
      companyName: '',
      typePerson: '',
      genre: '',
      phoneFixed: '',
      phoneMobile: '',
      photo: '',
      email: '',
      name: '',
      cpfCnpj: '',
      fullAddress: [
        {
          cep: '',
          city: '',
          complement: '',
          number: '',
          neighborhood: '',
          address: '',
          state: '',
        },
      ],
    },
    users: [],
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async getUsers({ commit }) {
      const response = await Axios.get('https://jsonbox.io/box_6fb739a95b26f569cee2');

      commit('setUsers', response.data);
    },
    async getUser({ commit }, id) {
      const response = await Axios.get(`https://jsonbox.io/box_6fb739a95b26f569cee2/${id}`);

      commit('setUser', response.data);
    },
    updateUser({ commit }, user) {
      commit('');
      return Axios.put(`https://jsonbox.io/box_6fb739a95b26f569cee2/${user._id}`, user);
    },
  },
  getters: {

  },
  modules: {
  },
});
