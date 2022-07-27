import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: routes,
});

export default router;