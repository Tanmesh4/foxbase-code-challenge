import { pages } from "@/data/questions";
import { type ICreateFormData } from "../interface/dataTypings";

export default {
  // Function to submit form data using GraphQL mutation
  submitFormData: async (
    input: ICreateFormData,
    addFormData: any
  ): Promise<boolean> => {
    try {
      await addFormData.mutate({
        input: {
          colorLocation: input.colorLocation,
          underground: input.underground,
          opacityKnowledge: input.opacityKnowledge,
          hue: input.hue,
          opacityStrength: input.opacityStrength,
          palette: input.palette,
        },
      });
      console.log("Data added successfully");
      return true;
    } catch (error) {
      console.error("Error submitting data:", error);
      return false;
    }
  },

  // Function to handle data transformations
  handleData: (data: ICreateFormData): ICreateFormData => {
    if (data.opacityStrength) {
      const value = parseInt(data.opacityStrength);
      const opacityMap: { [key: number]: string } = {
        0: "<95",
        1: "95",
        2: "98",
        3: ">99.8",
      };

      if (opacityMap.hasOwnProperty(value)) {
        data.opacityStrength = opacityMap[value];
      }
    }
    if (data.underground.length > 0) {
      data.underground = data.underground.map((item: any) => item.text);
    }
    if (data.opacityKnowledge) {
      data.opacityKnowledge = data.opacityKnowledge === "Yes";
    }
    return data;
  },

  // Function to compute the next page ID
  // Function to compute the next page ID
  getNextPageId: (currentPage: any, formData: ICreateFormData) => {
    const nextPageId = currentPage.nextPage;
    if (nextPageId && currentPage.conditionalNextPages) {
      const conditionalNextPages = currentPage.conditionalNextPages;
      const inputId = currentPage.inputs[0].id;
      const selectedOption = formData[inputId];
      if (
        conditionalNextPages.hasOwnProperty(inputId) &&
        conditionalNextPages[inputId].hasOwnProperty(selectedOption)
      ) {
        return conditionalNextPages[inputId][selectedOption];
      }
    }
    return nextPageId;
  },

  // Function to get the page index based on the page ID
  getPageIndex: (pageId: string) => {
    return pages.findIndex((page) => page.id === pageId);
  },

  goBackInForm: (currentPageIndex: { value: number }) => {
    if (currentPageIndex.value > 0) {
      const currentPage = pages[currentPageIndex.value];
      const previousPageIndex = currentPageIndex.value - 1;
      if (currentPage.id.toString().includes("-")) {
        const [mainPageId] = currentPage.id.toString().split("-");
        currentPageIndex.value = parseInt(mainPageId) - 2;
      } else {
        currentPageIndex.value = previousPageIndex;
      }
    }
  },
};
