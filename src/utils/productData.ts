import { useQuery } from "@vue/apollo-composable";
import {
  getDataForScoringMatrix,
  getLatestColorChoice,
  getProducts,
} from "../data/queries";
import { ref, watch } from "vue";
import scoringUtils from "../utils/matrixCalculation";
import type { IDisplayProduct } from "@/interface/dataTypings";
import { openModal, closeModal } from "../utils/modalutils";
import modalMessageText from "../nls/modalMessageText.json";
import { useRouter } from "vue-router";

export const useProductData = () => {
  const router = useRouter();
  const product = ref<IDisplayProduct[]>([
    {
      id: 0,
      __typename: "Dislpayproducts",
      productName: "Vibrant Blue",
      shortDescription: "A bold and lively blue hue",
      benefits: "Enhances energy, stimulates creativity, and uplifts mood",
      imageUrl:
        "https://www.epodex.com/de/wp-content/uploads/2021/07/Latex-paint-epodex-blau-1.jpg",
      scoringMatrix: [0.8, 0.6, 0.2, 0.3, 0.5, 0.7],
    },
  ]);

  const recommendedProductId = ref<number[]>([19]);
  const PRODUCTS_TO_SHOW: number = 3;

  const {
    result: scoringMatrixData,
    loading: scoringMatrixLoading,
    error: scoringMatrixError,
  } = useQuery(getDataForScoringMatrix);
  const {
    result: latestColorChoice,
    loading: latestColorChoiceLoading,
    error: latestColorChoiceError,
  } = useQuery(getLatestColorChoice);
  const {
    result: recommendedProductData,
    loading: recommendedProductLoading,
    error: recommendedProductError,
  } = useQuery(getProducts, { input: recommendedProductId });

  // Watch for changes in scoringMatrixData and latestColorChoice simultaneously
  watch(
    [scoringMatrixData, latestColorChoice],
    ([scoringMatrixData, latestColorChoice]) => {
      if (scoringMatrixData && latestColorChoice) {
        //get the scores from all data
        const scores: number[][] = scoringUtils.getScores(scoringMatrixData);

        //get the weights of user selection. Deliberately done to showcase use of graphql getQuery
        const weights: number[] = scoringUtils.calculateWeights(
          latestColorChoice.getLatestChoice[0]
        );

        //use the scoring logic and return the score of recommended product
        const recommendedProduct: number[][] =
          scoringUtils.getRecommendedProduct(scores, weights);

        //from the score get the ID and fetch the data of recommended product. Done to showcase use of graphql
        const productIds = recommendedProduct
          .slice(0, PRODUCTS_TO_SHOW)
          .map((product) =>
            scoringUtils.getIdOfRecommendedProduct(product, scoringMatrixData)
          );
        recommendedProductId.value = productIds;
      }
    }
  );

  //Watch for getting the data of recommended product
  watch(
    [recommendedProductData, recommendedProductId],
    ([recommendedProductData, recommendedProductId]) => {
      if (recommendedProductData && recommendedProductId.length > 0) {
        const recommended = recommendedProductData.getSpecificProducts.slice(
          0,
          PRODUCTS_TO_SHOW
        );
        product.value = recommended;
      }
    }
  );

  watch(
    [scoringMatrixError, latestColorChoiceError, recommendedProductError],
    ([smError, lccError, rpError]) => {
      if (
        rpError?.name === "ApolloError" &&
        rpError?.graphQLErrors?.[0]?.path?.[0] === "getSpecificProducts"
      ) {
        router.go(0);
      }
      if (smError || lccError) {
        openModal(
          modalMessageText.connectToTheDatabase,
          modalMessageText.somethingWentWrongMessage,
          false
        );
        setTimeout(() => {
          closeModal();
          router.replace("/");
        }, 2000);
      }
    }
  );

  return {
    product,
    scoringMatrixLoading,
    latestColorChoiceLoading,
    recommendedProductLoading,
  };
};
