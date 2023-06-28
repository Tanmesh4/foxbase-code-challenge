import formUtils from "../formutils";
import { describe, it, expect } from "vitest";
import { ColorLocation, Underground, Palette, HueColor } from "@prisma/client";

describe("formUtils", () => {
  describe("submitFormData", () => {
    it("should call addFormData.mutate with the correct input and return true", async () => {
      const input = {
        colorLocation: ColorLocation.Inside,
        underground: [Underground.Wood],
        opacityKnowledge: true,
        hue: HueColor.Red,
        opacityStrength: "98",
        palette: Palette.Brighter,
      };

      const addFormData = {
        mutate: () => Promise.resolve(true),
      };

      const result = await formUtils.submitFormData(input, addFormData);
      expect(result).toBe(true);
    });

    it("should log an error and return false when addFormData.mutate throws an error", async () => {
      const input = {
        colorLocation: ColorLocation.Inside,
        underground: [Underground.Wood],
        opacityKnowledge: true,
        hue: HueColor.Red,
        opacityStrength: "98",
        palette: Palette.Brighter,
      };

      const addFormData = {
        mutate: () => Promise.reject(new Error("Mock error")),
      };

      const consoleErrorMock = () => {};
      const originalConsoleError = console.error;
      console.error = consoleErrorMock;

      const result = await formUtils.submitFormData(input, addFormData);

      expect(result).toBe(false);

      console.error = originalConsoleError;
    });
  });

  describe("handleData", () => {
    it("should transform the data correctly", () => {
      const data = {
        colorLocation: ColorLocation.Inside,
        underground: [Underground.Wood, Underground.Facade],
        opacityKnowledge: "No",
        hue: HueColor.Red,
        opacityStrength: "1",
        palette: Palette.Brighter,
      };

      const transformedData = formUtils.handleData(data);

      expect(transformedData.opacityStrength).toBe("95");
      expect(transformedData.opacityKnowledge).toBe(false);
    });
  });

  describe("getNextPageId", () => {
    it("should return the next page ID when there are no conditional next pages", () => {
      const currentPage = {
        nextPage: "4",
        conditionalNextPages: null,
      };

      const formData = {
        colorLocation: ColorLocation.Inside,
        underground: [Underground.Wood],
        opacityKnowledge: true,
        hue: HueColor.Red,
        opacityStrength: "98",
        palette: Palette.Brighter,
      };

      const nextPageId = formUtils.getNextPageId(currentPage, formData);

      expect(nextPageId).toBe("4");
    });

    it("should return the conditional next page ID based on the selected option", () => {
      const currentPage = {
        nextPage: "5",
        conditionalNextPages: {
          input1: {
            option1: "5-1",
            option2: "5-2",
          },
        },
        inputs: [{ id: "input1" }],
      };

      const formData = {
        colorLocation: ColorLocation.Inside,
        underground: [Underground.Wood],
        opacityKnowledge: true,
        hue: HueColor.Red,
        opacityStrength: "98",
        palette: Palette.Brighter,
      };

      const nextPageId = formUtils.getNextPageId(currentPage, formData);

      expect(nextPageId).toBe("5");
    });
  });

  describe("getPageIndex", () => {
    it("should return the index of the page based on the page ID", () => {
      const pageId = "2";
      const pageIndex = formUtils.getPageIndex(pageId);
      expect(pageIndex).toBe(1);
    });
  });

  describe("goBackInForm", () => {
    it("should decrement the currentPageIndex.value if it is greater than 0", () => {
      const currentPageIndex = { value: 2 };

      formUtils.goBackInForm(currentPageIndex);

      expect(currentPageIndex.value).toBe(1);
    });

    it("should decrement the currentPageIndex.value to the previous main page index when the current page ID contains a hyphen", () => {
      const currentPageIndex = { value: 4 };
      formUtils.goBackInForm(currentPageIndex);
      expect(currentPageIndex.value).toBe(2);
    });
  });
});
