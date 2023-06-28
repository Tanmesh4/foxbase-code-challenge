<template>
    <div class="container mx-auto px-4 py-8 mt-12">
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else>
            <h1 class="text-3xl font-bold px-4 pt-4 mb-4">Recommended Product</h1>
            <template v-if="product && product.length > 0">
                <div class="flex flex-wrap">
                    <DisplayCard v-for="(item, index) in product" :key="item.id" :product="item"
                        :is-first-product="index === 0"
                        :class="[index === 0 ? 'mr-10 border-2 border-hover rounded p-4' : 'mr-10 p-4']" />
                </div>
            </template>
            <div class="mt-4">
                <button @click="redirectToHome" class="bg-primary text-white py-2 px-4 rounded hover:bg-hover">
                    Go to Home
                </button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import Loading from '../components/Loading.vue';
import DisplayCard from '../components/DisplayCard.vue';
import { useProductData } from '../utils/productData';
import { useRouter } from "vue-router";
import { ref, watch } from 'vue';

export default {
    components: {
        DisplayCard,
        Loading
    },

    setup() {
        const productData = useProductData();
        const loading = ref(productData.recommendedProductLoading.value || productData.latestColorChoiceLoading.value || productData.recommendedProductLoading.value);
        const product = ref(productData.product.value);
        const router = useRouter();

        const redirectToHome = () => {
            router.replace('/');
        }

        watch(
            () => [
                productData.recommendedProductLoading.value,
                productData.latestColorChoiceLoading.value,
                productData.recommendedProductLoading.value
            ],
            () => {
                loading.value = productData.recommendedProductLoading.value || productData.latestColorChoiceLoading.value || productData.recommendedProductLoading.value;
            }
        );

        watch(productData.product, (newValue) => {
            product.value = newValue;
        });

        return {
            product,
            loading,

            redirectToHome,
        };
    },
};
</script>
