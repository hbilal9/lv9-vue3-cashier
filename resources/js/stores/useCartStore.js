import { defineStore } from 'pinia';
import { http } from '../services/http_service'

export const useCartStore = defineStore('cartStoreId', {
    state: () => {
        return {
            cart: [],
            orderDetails: {}
        }
    },

    getters: {
        getCarts: state => state.cart,
        // getCart(state){
        //     return state.Cart;
        // }
    },

    actions: {
        addToCart: async function (product){
            const productInCartIndex = this.cart.findIndex(obj => obj.id === product.value.id);
            if(productInCartIndex !== -1){
                this.cart[productInCartIndex].quantity ++;
                return;
            }
            product.value.quantity = 1;
            this.cart.push(product.value);
        },

        processPayment: async function (data){
            const response = await http().post('/purchase', data);
            this.orderDetails = response.data;
        },

        clearCart: function() {
            this.cart = [];
        }
    }
})