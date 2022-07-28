<template>
    <h3>Thanks for purchasing...</h3>
    <table class="table">
        <thead class="table-dark">
            <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{product.pivot.quantity}}</td>
                <td>${{ calculateSubTotal(product) }}</td>
            </tr>
            <tr>
                <th colspan="2" class="text-center">Total</th>
                <th>${{store.orderDetails.total}}</th>
            </tr>
        </tbody>
    </table>
</template>
    
<script  setup>
    import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useCartStore } from '../stores/useCartStore';

    const store = useCartStore();
    const products = ref([]);
    onMounted(() =>{
        products.value = store.orderDetails.products
    });

    const calculateSubTotal  = (item) => item.pivot.quantity * item.price;
</script>