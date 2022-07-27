import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue'
const routes = [
    {
        path: '/',
        redirect: '/products'
    },
    {
        path: '/products',
        name: 'home',
        component: Home
    },
    {
        path: '/products/:slug/details',
        name: 'productDetails',
        component: () => import('./pages/ProductDetails.vue')
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: routes,
});

export default router;