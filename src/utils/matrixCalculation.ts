import { pages } from "../data/questions";

export default {
  calculateWeights: (lastchoice: {
    [x: string]: any;
    hasOwnProperty: (arg0: string) => any;
  }): number[] => {
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

  getScores: (scoringMatrixData: { getDisplayProduct: any[] }): number[][] => {
    return scoringMatrixData.getDisplayProduct.map(
      (item: { scoringMatrix: any }) => item.scoringMatrix
    );
  },

  getRecommendedProduct: (scores: number[][], weights: number[]) => {
    // Calculate overall scores for each product
    const overallScores: number[] = scores.map((productScores) =>
      productScores.reduce(
        (sum: number, score: number, index: number) =>
          sum + score * weights[index],
        0
      )
    );

    // Sort the products based on their overall scores in descending order
    const sortedIndices: number[] = overallScores
      .map((_, index) => index)
      .sort((a, b) => overallScores[b] - overallScores[a]);

    // Display the recommended products to the user
    const recommendedProduct = scores[sortedIndices[0]];
    return recommendedProduct;
  },

  getIdOfRecommendedProduct: (
    recommendedProduct: { [x: string]: any },
    data: { getDisplayProduct: any[] }
  ) => {
    let recommendedProductId: number = 0;
    data.getDisplayProduct.forEach((product) => {
      if (
        product.scoringMatrix.every(
          (score: any, index: string | number) =>
            score === recommendedProduct[index]
        )
      ) {
        recommendedProductId = product.id;
      }
    });
    return recommendedProductId;
  },
};
