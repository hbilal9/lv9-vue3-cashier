<template>
    <div class="row">
        <div class="col-8">
            <img src="http://dummyimage.com/600x600" alt="">
        </div>
        <div class="col-4">
            <table class="table">
                <tr>
                    <td> <h1> {{ product.name }}</h1></td>
                </tr>
                <tr>
                    <td> {{ product.description }}</td>
                </tr>
                <tr>
                    <td> ${{ product.price }}</td>
                </tr>
                <tr>
                    <td>
                        <router-link
                            style="background-color: blue; margin-right: 15px"
                            class="btn btn-primary mt-5 mr-4"
                            to="/"
                        >
                            Back
                        </router-link>
                        <button
                            style="background-color: blue"
                            class="btn btn-primary mt-5 ml-4"
                            @click="addToCart"
                        >
                            Add To Cart
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useProductStore } from '../stores/useProductStore';
    import { useCartStore } from '../stores/useCartStore';

    const route = useRoute();
    const store = useProductStore();
    const cartStore = useCartStore();

    const product = computed(() => store.products.find(obj => obj.slug === route.params.slug));
    const addToCart = () => {
        cartStore.addToCart(product);
    }
</script>