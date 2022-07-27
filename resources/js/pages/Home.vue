<template>
    <div class="row">
        <div v-if="store.products.length == 0">Loading</div>
        <div
            class="col-4 mb-5"
            v-else
            v-for="product in products"
            :key="product.id"
        >
            <Product :product="product"/>
        </div>
    </div>
</template>

<script setup>
    import Product from '../components/products/Product.vue';
    import { useProductStore } from '../stores/useProductStore';
    import { onMounted, computed } from 'vue';

    const store = useProductStore();

    onMounted( async function () {
        store.setProducts();
    });
    const products = computed( () => store.getProducts );


</script>