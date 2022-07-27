<template>
    <div class="card" style="width: 18rem;">
        <router-link :to="`/products/${product.slug}/details`">
            <img src="http://dummyimage.com/220x220" class="card-img-top" alt="img">
        </router-link>
        <div class="card-body">
            <div class="inline-block" v-for="cat in product.categories" :key="cat.id">
                <span class="text-muted">{{cat.name}}</span>
            </div>
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text" v-text="formatCurrency(product.price)"></p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    });

    const formatCurrency = price => {
        return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
</script>