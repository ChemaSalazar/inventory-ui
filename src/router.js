import { createRouter, createWebHistory } from 'vue-router';
import InventoryList from './components/InventoryList.vue';
import AddItem from './components/AddItem.vue';

const routes = [
    { path: '/', name: 'InventoryList', component: InventoryList },
    { path: '/add', name: 'AddItem', component: AddItem },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
