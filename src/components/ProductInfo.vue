<template>
    <div class="p-4">
        <p class="text-gray-600">{{ product.shortDescription }}</p>
        <div class="mt-4 mb-4">
            <h3 class="text-lg font-semibold">Benefits:</h3>
            <ul class="list-disc pl-6 mt-2 text-gray-700">
                <li v-for="benefit in product?.benefits?.split(',') || []" :key="benefit" class="mb-1">{{ benefit?.trim() }}
                </li>
            </ul>
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
  