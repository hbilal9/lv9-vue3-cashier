import { defineStore } from 'pinia';
import { http } from '@/services/http_service';

export const useProductStore = defineStore('productStoreId', {
    state: () => {
        return {
            products: []
        }
    },

    getters: {
        getProducts: state => state.products,
        // getProducts(state){
        //     return state.products;
        // }
    },

    actions: {
        setProducts: async function (){
            if(this.products.length == 0){
                const response = await http().get('products');
                this.products = response.data;
            }else{
                return this.products;
            }
        }
    }
})