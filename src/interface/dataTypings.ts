import { ColorLocation, Underground, Palette, HueColor } from "@prisma/client";

export interface IInputData {
  id: string;
  requireImage: boolean;
  type: string;
  options: {
    text: string;
    imageUrl?: string;
  }[];
}

export interface ICreateFormData {
  colorLocation: ColorLocation;
  underground: Underground[];
  opacityKnowledge: boolean | string;
  hue: HueColor;
  opacityStrength: string | null;
  palette: Palette | null;
  [key: string]: any;
}

export interface IReqDisplayProduct {
  __typename: string;
  id: number;
  scoringMatrix: Array<number>;
}

export interface IDisplayProduct {
  __typename: string;
  id: number;
  scoringMatrix: Array<number>;
  imageUrl: string;
  productName: string;
  shortDescription: string;
  benefits: string;
}

export interface ICreateDisplayProduct {
  productName: string;
  shortDescription: string;
  benefits: string;
  imageUrl: string;
  scoringMatrix: number[];
}
