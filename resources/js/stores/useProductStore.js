import { defineStore } from 'pinia';
import { http } from '@/services/http_service';

export const useProductStore = defineStore('productStore', {
    state: () => {
        products: []
    },

    getters: {
        getProducts: state => state.products,
    },

    actions: {
        setProducts: async function (){
            const response = await http().get('products');
            this.products = response.data;
        }
    }
})