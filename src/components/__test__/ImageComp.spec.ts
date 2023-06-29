import { shallowMount } from "@vue/test-utils";
import ImageComp from "@/components/ImageComp.vue";
import { describe, it, expect } from "vitest";

describe("ImageComp", () => {
  it("renders an image when requireImage prop is true", () => {
    const wrapper = shallowMount(ImageComp, {
      propsData: {
        requireBlock: true,
        requireImage: true,
        imageUrl: "https://example.com/image.jpg",
        cardText: "Sample Image",
      },
    });
    expect(wrapper.find(".card-text").text()).toBe("Sample Image");
  });

  it("renders a block with cardColor when requireBlock prop is true", () => {
    const wrapper = shallowMount(ImageComp, {
      propsData: {
        requireImage: false,
        requireBlock: true,
        cardColor: "red",
        cardText: "Sample Block",
      },
    });

    expect(wrapper.find(".card-color").exists()).toBe(true);
    expect(wrapper.find(".card-text").text()).toBe("Sample Block");
  });

  it('emits "change" event with cardText when handleCardClick is called for type="radio"', () => {
    const wrapper = shallowMount(ImageComp, {
      propsData: {
        requireImage: false,
        requireBlock: true,
        type: "radio",
        cardText: "Option 1",
      },
    });

    wrapper.vm.handleCardClick();

    expect(wrapper.emitted("change")).toHaveLength(1);
    expect(wrapper.emitted("change")![0]).toEqual(["Option 1"]);
  });

  it('emits "change" event with inverted isChecked value when handleCardClick is called for type="checkbox"', () => {
    const wrapper = shallowMount(ImageComp, {
      propsData: {
        requireImage: false,
        requireBlock: true,
        type: "checkbox",
        isChecked: true,
        cardText: "Option 2",
      },
    });

    wrapper.vm.handleCardClick();

    expect(wrapper.emitted("change")).toHaveLength(1);
    expect(wrapper.emitted("change")![0]).toEqual([false]);
  });

  it('applies "selected" class when isChecked prop is true', () => {
    const wrapper = shallowMount(ImageComp, {
      propsData: {
        requireImage: false,
        requireBlock: true,
        isChecked: true,
        cardText: "Sample Image",
      },
    });

    expect(wrapper.classes()).toContain("selected");
  });
});
