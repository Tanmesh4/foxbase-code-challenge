import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ImageComp from "../ImageComp.vue";

describe("ImageComp", () => {
  it("renders an image if requireImage prop is true", () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        requireImage: true,
        requireBlock: false,
        imageUrl: "https://example.com/image.jpg",
        cardText: "Example Text",
      },
    });

    expect(wrapper.find("img.card-image").exists()).toBe(true);
  });

  it("renders a colored block if requireBlock prop is true", () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        requireImage: false,
        requireBlock: true,
        cardColor: "#FF0000",
        cardText: "Example Text",
      },
    });

    expect(wrapper.find(".card-color").exists()).toBe(true);
  });

  it("emits a change event with the cardText when clicked for radio type", () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        requireImage: true,
        requireBlock: false,
        imageUrl: "https://example.com/image.jpg",
        cardText: "Example Text",
        type: "radio",
      },
    });

    wrapper.trigger("click");
    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")![0][0]).toBe("Example Text");
  });

  it("emits a change event with the opposite of isChecked when clicked for checkbox type", () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        requireImage: true,
        requireBlock: false,
        imageUrl: "https://example.com/image.jpg",
        cardText: "Example Text",
        type: "checkbox",
        isChecked: false,
      },
    });

    wrapper.trigger("click");
    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")![0][0]).toBe(true);
  });
});
