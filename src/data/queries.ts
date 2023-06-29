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

export const getProducts = gql`
  query getSpecificProducts($input: [Int!]!) {
    getSpecificProducts(ids: $input) {
      id
      productName
      shortDescription
      benefits
      imageUrl
      scoringMatrix
    }
  }
`;

export const addNewProduct = gql`
  mutation CreateDisplayProduct($input: CreateDisplayProduct!) {
    CreateDisplayProduct(input: $input) {
      productName
      shortDescription
      benefits
      imageUrl
      scoringMatrix
    }
  }
`;
