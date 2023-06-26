<template>
    <footer class="bg-secondary py-2">
        <div class="container mx-auto px-2">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="mb-4">
                    <h3 class="text-xl font-semibold">Contact</h3>
                    <p>Email: info@recommendationspecialists.com</p>
                    <p>Phone: +4915229969288</p>
                </div>
                <div class="mb-4">
                    <h3 class="text-xl font-semibold">Address</h3>
                    <p>123 Main St, Germany</p>
                </div>
                <div class="col-span-2 mb-4">
                    <h3 class="text-xl font-semibold">About Us</h3>
                    <p>
                        Recommendation Specialists is a leading provider of house color recommendations.
                        We offer expert advice and personalized recommendations to help homeowners choose
                        the perfect colors for their homes. With our innovative technology and experienced
                        team of specialists, we make the color selection process easy and enjoyable.
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script setup lang="ts">
</script>
  
<style scoped>
footer {
    background-color: theme('colors.background');
    border-top: 2px solid theme('colors.dark');
    width: 100%;
    bottom: 0;
}
</style>  