import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum ColorLocation {
    Inside
    Outside
  }

  enum Underground {
    Wood
    Facade
    Wallpaper
    Plaster
  }

  enum Palette {
    Brighter
    Darker
  }

  enum HueColor {
    Red
    Blue
    Green
    Yellow
    White
  }

  input CreateFormData {
    colorLocation: ColorLocation!
    underground: [Underground]!
    opacityKnowledge: Boolean!
    hue: HueColor!
    opacityStrength: String
    palette: Palette
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
    colorLocation: ColorLocation!
    underground: [Underground]!
    opacityKnowledge: Boolean!
    opacityStrength: String
    palette: Palette
    hue: HueColor!
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
    getSpecificProducts(ids: [Int!]!): [DisplayProducts!]!
  }
`;
