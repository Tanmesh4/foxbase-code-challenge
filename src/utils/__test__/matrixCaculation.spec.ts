import matrixCalculation from "../matrixCalculation";
import { ColorLocation, Underground, Palette, HueColor } from "@prisma/client";
import { describe, it, expect } from "vitest";

describe("matrixCalculation", () => {
  it("calculates weights correctly for an array value", () => {
    const lastchoice = {
      colorLocation: ColorLocation.Inside,
      underground: [Underground.Wood, Underground.Wallpaper],
      opacityKnowledge: true,
      opacityStrength: "92",
      palette: null,
      hue: HueColor.Red,
    };
    const expectedWeights = [0.2, 0.8999999999999999, 0.7, 0, 0.2];
    const calculatedWeights = matrixCalculation.calculateWeights(lastchoice);
    expect(calculatedWeights).toEqual(expectedWeights);
  });

  it("gets scores correctly from scoringMatrixData", () => {
    const scoringMatrixData = {
      getDisplayProduct: [
        { __typename: "DisplayProducts", id: 17, scoringMatrix: [1, 2, 3] },
        { __typename: "DisplayProducts", id: 18, scoringMatrix: [4, 5, 6] },
      ],
    };
    const expectedScores = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const calculatedScores = matrixCalculation.getScores(scoringMatrixData);
    expect(calculatedScores).toEqual(expectedScores);
  });

  it("gets recommended product correctly based on scores and weights", () => {
    const scores = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const weights = [0.5, 0.8, 0.3];
    const expectedRecommendedProducts = [
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3],
    ];
    const calculatedRecommendedProducts =
      matrixCalculation.getRecommendedProduct(scores, weights);
    expect(calculatedRecommendedProducts).toEqual(expectedRecommendedProducts);
  });

  it("gets ID of recommended product correctly based on recommended product and data", () => {
    const recommendedProduct = [4, 5, 6];
    const data = {
      getDisplayProduct: [
        { __typename: "DisplayProducts", id: 1, scoringMatrix: [1, 2, 3] },
        { __typename: "DisplayProducts", id: 2, scoringMatrix: [4, 5, 6] },
        { __typename: "DisplayProducts", id: 3, scoringMatrix: [7, 8, 9] },
      ],
    };
    const expectedRecommendedProductId = 2;
    const calculatedRecommendedProductId =
      matrixCalculation.getIdOfRecommendedProduct(recommendedProduct, data);
    expect(calculatedRecommendedProductId).toEqual(
      expectedRecommendedProductId
    );
  });

  // Add more test cases for getIdOfRecommendedProduct() function
});
