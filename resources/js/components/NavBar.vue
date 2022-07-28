<template>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">E-Com</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li> -->
                </ul>
                <router-link to="/cart" class="btn btn-primary">Cart ({{ cartItemCounts }})</router-link>
            </div>
        </div>
        </nav>
</template>

<script setup>
    import { computed } from '@vue/runtime-core';
    import { useCartStore } from '../stores/useCartStore';
    const store = useCartStore();

    const cartItemCounts = computed(() => {
        return store.cart.length;
    });
</script>