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
  colorLocation: string;
  underground: string[];
  opacityKnowledge: boolean | string;
  hue: string;
  opacityStrength: string | null;
  palette: string | null;
  [key: string]: any;
}

export interface IReqDisplayProduct {
  __typename: string;
  id: number;
  scoringMatrix: Array<any>;
}
