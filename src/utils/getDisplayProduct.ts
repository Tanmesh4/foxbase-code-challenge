import { type ICreateDisplayProduct } from "../interface/dataTypings";

export default {
  // Function to createProduct using GraphQL mutation
  createProduct: async (
    input: ICreateDisplayProduct,
    addNewProduct: any
  ): Promise<boolean> => {
    try {
      await addNewProduct.mutate({
        input: {
          productName: input.productName,
          shortDescription: input.shortDescription,
          benefits: input.benefits,
          imageUrl: input.imageUrl,
          scoringMatrix: input.scoringMatrix,
        },
      });
      console.log("Data added successfully");
      return true;
    } catch (error) {
      console.error("Error submitting data:", error);
      return false;
    }
  },
};
