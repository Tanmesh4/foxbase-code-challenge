import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import DisplayCard from "@/components/DisplayCard.vue";

describe("DisplayCard", () => {
  test("renders the component", () => {
    // Mock product data
    const product = {
      productName: "Example Product",
      imageUrl: "example.jpg",
      shortDescription: "This is an example product",
      benefits: "Benefit 1, Benefit 2, Benefit 3",
    };

    // Mount the component with the product prop
    const wrapper = mount(DisplayCard, {
      props: {
        product: product,
      },
    });

    // Assert that the component is rendered without errors
    expect(wrapper.exists()).toBe(true);
  });
});
