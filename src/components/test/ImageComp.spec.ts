import { mount } from "@vue/test-utils";
import { describe, test, expect } from "@jest/globals";
import ImageCompVue from "../ImageComp.vue";

describe("ImageCompVue", () => {
  test('emits "change" event with cardText when type is "radio"', async () => {
    const cardText = "Example Card Text";
    const wrapper = mount(ImageCompVue, {
      props: {
        imageUrl: "example.jpg",
        cardText,
        type: "radio",
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")?.[0]?.[0]).toBe(cardText);
  });

  test('emits "change" event with inverted isChecked value when type is "checkbox"', async () => {
    const wrapper = mount(ImageCompVue, {
      props: {
        imageUrl: "example.jpg",
        cardText: "Example Card Text",
        type: "checkbox",
        isChecked: false,
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")?.[0]?.[0]).toBe(true);
  });
});
