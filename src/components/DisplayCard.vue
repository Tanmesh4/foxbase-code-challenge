<template>
    <div class="overflow-hidden mb-4">
        <h1 class="text-2xl font-bold px-4 pt-4 m-4">{{ product.productName }}</h1>
        <img :src="product.imageUrl" :alt="product.productName" class="image-card" />
        <div class="p-4">
            <p class="text-gray-600">{{ product.shortDescription }}</p>
            <div class="mt-4 mb-4">
                <h3 class="text-lg font-semibold">Benefits:</h3>
                <ul class="list-disc pl-6 mt-2 text-gray-700">
                    <li v-for="benefit in product?.benefits?.split(',') || []" :key="benefit" class="mb-1">{{
                        benefit?.trim() }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
    
<script lang="ts">
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped>
.image-card {
    display: flex;
    align-items: center;
    border-radius: 1.25rem;
    box-shadow: 0 2px 4px theme('colors.dark');
    transition: all 0.3s ease;
    flex-direction: column;
    padding: 1.5rem;
    width: 25rem;
    height: 20rem;
}
</style>  