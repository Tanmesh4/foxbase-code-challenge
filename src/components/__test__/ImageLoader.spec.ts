import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ImageLoader from "@/components/ImageLoader.vue";
import Loading from "@/components/Loading.vue";

describe("ImageLoader", () => {
  it("renders the Loading component when isLoading prop is true", () => {
    const wrapper = shallowMount(ImageLoader, {
      propsData: {
        imageUrl: "https://example.com/image.jpg",
        altText: "Sample Image",
      },
    });

    expect(wrapper.findComponent(Loading).exists()).toBe(true);
  });

  it("renders the image when isLoading prop is false", () => {
    const wrapper = shallowMount(ImageLoader, {
      propsData: {
        imageUrl: "https://example.com/image.jpg",
        altText: "Sample Image",
      },
    });

    wrapper.setData({ isLoading: false });

    expect(wrapper.find("img").exists()).toBe(true);
    expect(wrapper.find("img").attributes("src")).toBe(
      "https://example.com/image.jpg"
    );
    expect(wrapper.find(".image-card").classes()).not.toContain(
      "question-card"
    );
  });

  it('applies the "question-card" class when handleStyle prop is true', () => {
    const wrapper = shallowMount(ImageLoader, {
      propsData: {
        imageUrl: "https://example.com/image.jpg",
        altText: "Sample Image",
        handleStyle: true,
      },
    });

    wrapper.setData({ isLoading: false });

    expect(wrapper.find(".image-card").classes()).toContain("question-card");
  });
});
