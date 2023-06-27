<template>
    <footer class="bg-secondary py-2">
        <div class="container mx-auto px-2">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="mb-4">
                    <h3 class="text-xl font-semibold">{{ footerText.ContactTitle }}</h3>
                    <p>{{ footerText.Email }}</p>
                    <p>{{ footerText.Contact }}</p>
                </div>
                <div class="mb-4">
                    <h3 class="text-xl font-semibold">{{ footerText.AdressTitle }}</h3>
                    <p>{{ footerText.Adress }}</p>
                </div>
                <div class="col-span-2 mb-4">
                    <h3 class="text-xl font-semibold">{{ footerText.AboutusTitle }}</h3>
                    <p>{{ footerText.AboutUs }}</p>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script lang="ts">
import footerText from "../nls/footerText.json";

export default {
    data() {
        return {
            footerText: footerText,
        };
    },
}
</script>
  
<style scoped>
footer {
    background-color: theme('colors.background');
    border-top: 2px solid theme('colors.dark');
    width: 100%;
    bottom: 0;
}
</style>  