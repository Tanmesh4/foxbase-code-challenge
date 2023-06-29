<template>
    <div class="overflow-hidden mb-4">
        <h1 class="text-2xl font-bold px-4 pt-4 m-4">{{ product.productName }}</h1>
        <div>
            <ImageLoader :imageUrl="product.imageUrl" :altText="product.productName" />
        </div>
        <ProductInfo :product="product" />
    </div>
</template>
    
<script lang="ts">
import ImageLoader from './ImageLoader.vue';
import ProductInfo from './ProductInfo.vue';

export default {
    components: {
        ImageLoader,
        ProductInfo
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped></style>  