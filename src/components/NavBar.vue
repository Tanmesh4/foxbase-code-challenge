<script setup lang="ts">
</script>

<template>
    <div>
        <nav class="bg-primary py-4">
            <div class="container mx-auto flex items-center justify-between px-4">
                <router-link to="/" class="flex items-center">
                    <img src="../assets//rs-low-resolution-logo-color-on-transparent-background.png" alt="Logo"
                        class="h-8 w-auto mr-2">
                    <h1 class="text-white text-lg font-semibold">{{ navTitle }}</h1>
                </router-link>
                <router-link to="/addProduct" class="text-white text-lg font-semibold ml-4 relative">
                    Add Products
                    <span v-if="$route.path === '/addProduct'"
                        class="underline absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300"></span>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import UIText from "../nls/UItext.json";
export default {
    data() {
        return {
            navTitle: UIText.navBarTitle,
            addProductsTitle: UIText.navAddProduct,
        };
    },
}
</script>

<style scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
}
</style>
