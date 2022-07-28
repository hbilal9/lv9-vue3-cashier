<template>
    <h3>Cart</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in cartData" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ calculateSubTotal(item) }}</td>
            </tr>
            <tr>
                <td colspan="2" class="text-center"><strong> Total: </strong></td>
                <td><strong> {{ cartTotal }} </strong></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    import { computed } from '@vue/runtime-core';
    import { useCartStore } from '../stores/useCartStore';
    const store = useCartStore();

    const cartData = computed(() => {
        return store.cart;
    });

    const cartTotal = computed( () => {
        return store.cart.reduce((acc, item) => acc + (item.price * item.quantity),0)
    });

    const calculateSubTotal  = (item) => item.quantity * item.price;
</script>