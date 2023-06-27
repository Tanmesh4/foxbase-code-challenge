import { shallowMount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import RadioInput from "@/components/RadioInput.vue";

describe("RadioInput", () => {
  const input = {
    id: "radioInput",
    requireImage: true,
    type: "radio",
    options: [
      { imageUrl: "image1.jpg", text: "Option 1" },
      { imageUrl: "image2.jpg", text: "Option 2" },
      { imageUrl: "image3.jpg", text: "Option 3" },
    ],
  };

  const formData = {
    radioInput: "Option 2",
  };

  test("renders the ImageComp components with the correct props", () => {
    const wrapper = shallowMount(RadioInput, {
      props: {
        input,
        formData,
      },
    });

    const imageComps = wrapper.findAllComponents({ name: "ImageComp" });
    expect(imageComps).toHaveLength(input.options.length);

    imageComps.forEach((imageComp, index) => {
      expect(imageComp.props()).toEqual({
        imageUrl: input.options[index].imageUrl,
        cardText: input.options[index].text,
        type: input.type,
        isChecked: formData.radioInput === input.options[index].text,
        inputName: input.id,
        requireImage: input.requireImage,
        requireBlock: !input.requireImage,
      });
    });
  });
});
