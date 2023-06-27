<template>
    <div class="container mx-auto px-4 py-8 mt-12">
        <div v-if="scoringMatrixLoading || latestColorChoiceLoading || recommendedProductLoading">
            <Loading />
        </div>
        <div v-else>
            <h1 class="text-3xl font-bold px-4 pt-4 mb-4">Recommended Product</h1>
            <template v-if="product && product.length > 0">
                <div class="flex flex-wrap">
                    <DisplayCard v-for="(item, index) in product" :key="item.id" :product="item"
                        :is-first-product="index === 0"
                        :class="[index === 0 ? 'mr-20 border-2 border-hover rounded p-4' : 'mr-20']" />
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
import { useQuery } from '@vue/apollo-composable';
import DisplayCard from '../components/DisplayCard.vue';
import { getDataForScoringMatrix, getLatestColorChoice, getProducts } from '../data/queries';
import { ref, watch } from 'vue';
import scoringUtils from '../utils/matrixCalculation';
import { useRouter } from 'vue-router';
import Loading from '../components/Loading.vue';

export default {
    components: {
        DisplayCard,
        Loading
    },

    setup() {
        let product = ref([{
            id: 0,
            productName: 'Vibrant Blue',
            shortDescription: 'A bold and lively blue hue',
            benefits: 'Enhances energy, stimulates creativity, and uplifts mood',
            imageUrl: 'https://www.epodex.com/de/wp-content/uploads/2021/07/Latex-paint-epodex-blau-1.jpg',
            scoringMatrix: [0.8, 0.6, 0.2, 0.3, 0.5, 0.7],
        }]);

        const recommendedProductId = ref<number[]>([19]);
        const PRODUCTS_TO_SHOW: number = 3;
        const router = useRouter();

        const { result: scoringMatrixData, loading: scoringMatrixLoading, error: scoringMatrixError } = useQuery(getDataForScoringMatrix);
        const { result: latestColorChoice, loading: latestColorChoiceLoading, error: latestColorChoiceError } = useQuery(getLatestColorChoice);
        const { result: recommendedProductData, loading: recommendedProductLoading, error: recommendedProductError } = useQuery(getProducts, { "input": recommendedProductId });

        // Watch for changes in scoringMatrixData and latestColorChoice simultaneously
        watch([scoringMatrixData, latestColorChoice], ([scoringMatrixData, latestColorChoice]) => {
            if (scoringMatrixData && latestColorChoice) {

                //get the scores from all data 
                const scores: number[][] = scoringUtils.getScores(scoringMatrixData);

                //get the weights of user selection. Deliberately done to showcase use of graphql getQuery
                const weights: number[] = scoringUtils.calculateWeights(latestColorChoice.getLatestChoice[0]);

                //use the scoring logic and return the score of recommended product
                const recommendedProduct: number[][] = scoringUtils.getRecommendedProduct(scores, weights);

                //from the score get the ID and fetch the data of recommended product. Done to showcase use of graphql
                const productIds = recommendedProduct
                    .slice(0, PRODUCTS_TO_SHOW)
                    .map((product) => scoringUtils.getIdOfRecommendedProduct(product, scoringMatrixData));

                console.log("the array was: ", recommendedProductId.value);
                recommendedProductId.value = productIds;
                console.log("the array is: ", recommendedProductId.value);


            }
        });

        //Watch for getting the data of recommended product
        watch([recommendedProductData, recommendedProductId], ([recommendedProductData, recommendedProductId]) => {
            console.log("recommendedProductData:", recommendedProductData);
            console.log("recommendedProductId:", recommendedProductId);

            if (recommendedProductData && recommendedProductId.length > 0) {
                console.log("watching recommended product inside if: ", recommendedProductData, recommendedProductId);
                const recommended = recommendedProductData.getSpecificProducts.slice(0, PRODUCTS_TO_SHOW);
                product.value = recommended;
                console.log("recommended products is: ", recommended);
            }
        });

        const redirectToHome = () => {
            router.replace('/');
        }

        return {
            product,
            scoringMatrixLoading,
            latestColorChoiceLoading,
            recommendedProductLoading,

            redirectToHome,
        };
    },
};
</script>
