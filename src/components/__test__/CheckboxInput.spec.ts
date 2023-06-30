import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ImageComp from "../ImageComp.vue";
import CheckboxInput from "../CheckboxInput.vue";

describe("CheckboxInput", () => {
  const input = {
    id: "myInput",
    requireImage: true,
    type: "checkbox",
    options: [
      { text: "Option 1", imageUrl: "image1.jpg" },
      { text: "Option 2", imageUrl: "image2.jpg" },
      { text: "Option 3", imageUrl: "image3.jpg" },
    ],
  };

  const formData = {
    myInput: [],
  };

  it("renders image options when `requireImage` prop is true", () => {
    const wrapper = mount(CheckboxInput, {
      propsData: {
        input: input,
        formData: formData,
      },
    });

    expect(wrapper.find(".image-option").exists()).toBe(false);
    expect(wrapper.find(".checkbox-option").exists()).toBe(false);
    expect(wrapper.findAllComponents(ImageComp)).toHaveLength(
      input.options.length
    );
  });

  it("renders checkbox options when `requireImage` prop is false", () => {
    const inputWithoutImage = { ...input, requireImage: false };
    const wrapper = mount(CheckboxInput, {
      propsData: {
        input: inputWithoutImage,
        formData: formData,
      },
    });

    expect(wrapper.find(".image-option").exists()).toBe(false);
    expect(wrapper.find(".checkbox-option").exists()).toBe(false);
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(
      inputWithoutImage.options.length
    );
  });

  it("marks image options as checked based on `formData`", async () => {
    const formDataWithSelection = {
      myInput: [input.options[0], input.options[2]],
    };

    const wrapper = mount(CheckboxInput, {
      propsData: {
        input: input,
        formData: formDataWithSelection,
      },
    });

    const imageOptions = wrapper.findAllComponents(ImageComp);
    expect(imageOptions[0].props().isChecked).toBe(true);
    expect(imageOptions[1].props().isChecked).toBe(false);
    expect(imageOptions[2].props().isChecked).toBe(true);
  });

  it("marks checkbox options as checked based on `formData`", async () => {
    const inputWithoutImage = { ...input, requireImage: false };
    const formDataWithSelection = {
      myInput: [inputWithoutImage.options[0], inputWithoutImage.options[1]],
    };

    const wrapper = mount(CheckboxInput, {
      propsData: {
        input: inputWithoutImage,
        formData: formDataWithSelection,
      },
    });

    const checkboxOptions = wrapper.findAll('input[type="checkbox"]');
    expect((checkboxOptions[0].element as HTMLInputElement).checked).toBe(true);
    expect((checkboxOptions[1].element as HTMLInputElement).checked).toBe(true);
    expect((checkboxOptions[2].element as HTMLInputElement).checked).toBe(
      false
    );
  });

  it("updates `formData` when an image option is checked/unchecked", async () => {
    const wrapper = mount(CheckboxInput, {
      propsData: {
        input: input,
        formData: formData,
      },
    });

    const imageOptions = wrapper.findAllComponents(ImageComp);
    await imageOptions[0].trigger("change");
    expect(wrapper.vm.formData.myInput).toContain(input.options[0]);

    await imageOptions[2].trigger("change");
    expect(wrapper.vm.formData.myInput).toContain(input.options[2]);

    await imageOptions[0].trigger("change");
    expect(wrapper.vm.formData.myInput).not.toContain(input.options[0]);
  });

  it("updates `formData` when a checkbox option is checked/unchecked", async () => {
    const inputWithoutImage = { ...input, requireImage: false };
    const wrapper = mount(CheckboxInput, {
      propsData: {
        input: inputWithoutImage,
        formData: formData,
      },
    });

    const checkboxOptions = wrapper.findAll('input[type="checkbox"]');
    await checkboxOptions[0].setValue(true);
    expect(wrapper.vm.formData.myInput).toContain(inputWithoutImage.options[0]);

    await checkboxOptions[1].setValue(false);
    expect(wrapper.vm.formData.myInput).not.toContain(
      inputWithoutImage.options[1]
    );

    await checkboxOptions[2].setValue(true);
    expect(wrapper.vm.formData.myInput).toContain(inputWithoutImage.options[2]);
  });
});
