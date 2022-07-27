import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStoreId', {
    state: () => {
        return {
            cart: []
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
        }
    }
})