import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        inventory: [],
    },
    mutations: {
        setInventory(state, items) {
            state.inventory = items;
        },
        addItem(state, item) {
            state.inventory.push(item);
        },
    },
    actions: {
        async fetchInventory({ commit }) {
            const { data } = await axios.get('http://localhost:3000/api/inventory');
            commit('setInventory', data);
        },
        async addItem({ commit }, item) {
            const { data } = await axios.post('http://localhost:3000/api/inventory', item);
            commit('addItem', data);
        },
    },
});

export default store;
