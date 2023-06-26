export interface IInputData {
  id: string;
  requireImage: boolean;
  type: string;
  options:
    | {
        text: string;
        imageUrl?: string;
      }[]
    | {
        text: string;
        imageUrl: string;
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

export interface IQuestionsData {
  id: string;
  title: string;
  inputs: {
    id: string;
    requireImage: boolean;
    type: string;
    options: {
      text: string;
      imageUrl?: string;
    }[];
  }[];
  conditionalNextPages?: string;
  nextPage: string;
}

export interface IReqDisplayProduct {
  __typename: string;
  id: number;
  scoringMatrix: Array<any>;
}
