import { pages } from "../data/questions";
import {
  type ICreateFormData,
  type IReqDisplayProduct,
} from "../interface/dataTypings";

export default {
  calculateWeights: (lastchoice: ICreateFormData): number[] => {
    const weights: number[] = [];
    for (const page of pages) {
      for (const input of page.inputs) {
        const id = input.id;
        if (lastchoice.hasOwnProperty(id)) {
          const value = lastchoice[id];
          if (Array.isArray(value)) {
            const selectedOptions = input.options.filter((option) =>
              value.includes(option.text)
            );
            const cumulativeWeight = selectedOptions.reduce(
              (sum, option) => sum + option.weight,
              0
            );
            weights.push(cumulativeWeight);
          } else {
            let normalizedValue =
              input.type === "radio" && typeof value === "boolean"
                ? value
                  ? "Yes"
                  : "No"
                : value;
            if (normalizedValue === null) {
              weights.push(0);
            } else {
              const selectedOption = input.options.find(
                (option) => option.text === normalizedValue
              );
              if (selectedOption) {
                weights.push(selectedOption.weight);
              }
            }
          }
        }
      }
    }
    return weights;
  },

  getScores: (scoringMatrixData: {
    getDisplayProduct: IReqDisplayProduct[];
  }): number[][] => {
    return scoringMatrixData.getDisplayProduct.map(
      (item: { scoringMatrix: Array<number> }) => item.scoringMatrix
    );
  },

  getRecommendedProduct: (
    scores: number[][],
    weights: number[]
  ): number[][] => {
    // Calculate overall scores for each product
    const overallScores: number[] = scores.map((productScores) =>
      productScores.reduce(
        (sum: number, score: number, index: number) =>
          sum + score * weights[index],
        0
      )
    );
    // Sort the products based on their overall scores in descending order
    const productIndices: number[] = overallScores
      .map((_, index) => index)
      .sort((a, b) => overallScores[b] - overallScores[a]);
    const recommendedProducts: number[][] = productIndices.map(
      (index) => scores[index]
    );
    return recommendedProducts;
  },

  getIdOfRecommendedProduct: (
    recommendedProduct: number[],
    data: { getDisplayProduct: IReqDisplayProduct[] }
  ): number => {
    let recommendedProductId: number = 0;
    data.getDisplayProduct.forEach((product) => {
      if (
        product.scoringMatrix.every(
          (score: number, index: number) => score === recommendedProduct[index]
        )
      ) {
        recommendedProductId = product.id;
      }
    });
    return recommendedProductId;
  },
};
