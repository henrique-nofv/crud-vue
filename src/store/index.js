/* eslint-disable */ 
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const jsonBox = 'https://jsonbox.io/';
const hashBox = 'box_6fb739a95b26f569cee2';

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
    resetUserState(state) {
      state.user = {
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
      };
    },
  },
  actions: {
    async getUsers({ commit }, params) {
      const response = await Axios.get(`${jsonBox}${hashBox}`, { params: params });

      commit('setUsers', response.data);
    },
    async getUser({ commit }, id) {
      const response = await Axios.get(`${jsonBox}${hashBox}/${id}`);

      commit('setUser', response.data);
    },
    createUser({ }, user) {
      return Axios.post(`${jsonBox}${hashBox}`, user);
    },
    deleteUser({ }, { _id }) {
      return Axios.delete(`${jsonBox}${hashBox}/${_id}`);
    },
    updateUser({ }, user) {
      return Axios.put(`${jsonBox}${hashBox}/${user._id}`, user);
    },
    getPageInfo({ }){
      return Axios.get(`${jsonBox}_meta/${hashBox}`);
    },
    getAddressByCep({ }, cep) {
      return Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    },
  },
  modules: {
  },
});
