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
                    <td>
                        <button
                            style="background-color: blue"
                            class="btn btn-primary mt-5"
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

    const route = useRoute();
    const store = useProductStore();

    const product = computed(() => store.products.find(obj => obj.slug === route.params.slug));
</script>