<template>
    <NavBar />
    <div class="container mt-5">
        <router-view></router-view>
    </div>
</template>

<script setup>
    import NavBar from './components/NavBar.vue';
</script>