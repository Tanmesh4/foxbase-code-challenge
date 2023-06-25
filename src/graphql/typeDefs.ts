import { gql } from "graphql-tag";

export const typeDefs = gql`
  input CreateFormData {
    colorLocation: String!
    underground: [String]!
    opacityKnowledge: Boolean!
    hue: String!
    opacityStrength: String
    palette: String
  }

  input CreateDisplayProduct {
    productName: String
    shortDescription: String
    benefits: String
    imageUrl: String
    scoringMatrix: [Float]
  }

  type Mutation {
    createNewColorChoice(input: CreateFormData!): colorChoice
    CreateDisplayProduct(input: CreateDisplayProduct!): DisplayProducts
  }

  type colorChoice {
    id: Int!
    colorLocation: String!
    underground: [String]!
    opacityKnowledge: Boolean!
    opacityStrength: String
    palette: String
    hue: String!
  }

  type DisplayProducts {
    id: Int!
    productName: String
    shortDescription: String
    benefits: String
    imageUrl: String
    scoringMatrix: [Float]
  }

  type Query {
    getColorChoice: [colorChoice!]!
    getLatestChoice: [colorChoice!]!
    getDisplayProduct: [DisplayProducts!]!
    getSpecificProduct(id: Int!): [DisplayProducts!]!
  }
`;
