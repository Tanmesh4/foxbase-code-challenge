<script setup lang="ts">
</script>

<template>
    <div>
        <nav class="bg-primary py-4">
            <div class="container mx-auto flex items-center justify-between px-4">
                <div class="flex items-center">
                    <img src="https://picsum.photos/50" alt="Logo" class="h-8 w-auto mr-2">
                    <h1 class="text-white text-lg font-semibold">{{ navTitle }}</h1>
                </div>
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
