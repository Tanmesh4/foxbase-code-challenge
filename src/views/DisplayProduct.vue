<template>
    <div class="container mx-auto px-4 py-8 mt-12">
        <div v-if="scoringMatrixLoading || latestColorChoiceLoading || recommendedProductLoading">
            <Loading />
        </div>
        <div v-else>
            <DisplayCard :product="product" />
            <div class="mt-4">
                <button @click="redirectToHome" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Go to Home
                </button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import DisplayCard from '../components/DisplayCard.vue';
import { getDataForScoringMatrix, getLatestColorChoice, getProduct } from '../data/queries';
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
        let product = ref({
            productName: 'Vibrant Blue',
            shortDescription: 'A bold and lively blue hue',
            benefits: 'Enhances energy, stimulates creativity, and uplifts mood',
            imageUrl: 'https://www.epodex.com/de/wp-content/uploads/2021/07/Latex-paint-epodex-blau-1.jpg',
            scoringMatrix: [0.8, 0.6, 0.2, 0.3, 0.5, 0.7],
        });

        const recommendedProductId = ref(38);
        const router = useRouter();

        const { result: scoringMatrixData, loading: scoringMatrixLoading, error: scoringMatrixError } = useQuery(getDataForScoringMatrix);
        const { result: latestColorChoice, loading: latestColorChoiceLoading, error: latestColorChoiceError } = useQuery(getLatestColorChoice);
        const { result: recommendedProductData, loading: recommendedProductLoading, error: recommendedProductError } = useQuery(getProduct, { "input": recommendedProductId });

        // Watch for changes in scoringMatrixData and latestColorChoice simultaneously
        watch([scoringMatrixData, latestColorChoice], ([scoringMatrixData, latestColorChoice]) => {
            if (scoringMatrixData && latestColorChoice) {

                //get the scores from all data 
                const scores: number[][] = scoringUtils.getScores(scoringMatrixData);

                //get the weights of user selection. Deliberately done to showcase use of graphql getQuery
                const weights: number[] = scoringUtils.calculateWeights(latestColorChoice.getLatestChoice[0]);

                //use the scoring logic and return the score of recommended product
                const recommendedProduct: number[] = scoringUtils.getRecommendedProduct(scores, weights);

                //from the score get the ID and fetch the data of recommended product. Done to showcase use of graphql
                recommendedProductId.value = scoringUtils.getIdOfRecommendedProduct(recommendedProduct, scoringMatrixData);
            }
        });

        //Watch for getting the data of recommended product
        watch([recommendedProductData, recommendedProductId], ([recommendedProductData, recommendedProductId]) => {
            if (recommendedProductData && recommendedProductId !== 0) {
                const recommended = recommendedProductData.getSpecificProduct[0];
                product.value = recommended;
                console.log("recommended product is: ", recommended);
            }
        });

        const redirectToHome = () => {
            router.replace('/');
        }

        return {
            product,
            scoringMatrixData,
            latestColorChoice,
            redirectToHome,
            scoringMatrixLoading,
            latestColorChoiceLoading,
            recommendedProductLoading
        };
    },
};
</script>
