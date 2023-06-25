import { gql } from "graphql-tag";

// GraphQL mutation code
export const addFormData = gql`
  mutation AddFormData($input: CreateFormData!) {
    createNewColorChoice(input: $input) {
      colorLocation
      underground
      opacityKnowledge
      hue
      opacityStrength
      palette
    }
  }
`;

export const getDataForScoringMatrix = gql`
  query getDisplayProduct {
    getDisplayProduct {
      id
      scoringMatrix
    }
  }
`;

export const getLatestColorChoice = gql`
  query getLatestChoice {
    getLatestChoice {
      id
      colorLocation
      underground
      opacityKnowledge
      hue
      opacityStrength
      palette
    }
  }
`;

export const getProduct = gql`
  query getSpecificProduct($input: Int!) {
    getSpecificProduct(id: $input) {
      id
      productName
      shortDescription
      benefits
      imageUrl
      scoringMatrix
    }
  }
`;
