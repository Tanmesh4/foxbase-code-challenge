import { shallowMount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import RangeInput from "@/components/RangeInput.vue";

describe("RangeInput", () => {
  const input = {
    min: 0,
    max: 10,
    step: 1,
    id: "rangeInput",
    options: [
      { text: "Option 1", value: "option1" },
      { text: "Option 2", value: "option2" },
      { text: "Option 3", value: "option3" },
    ],
  };

  const formData = {
    rangeInput: 5,
  };

  test("renders the range input with correct attributes", () => {
    const wrapper = shallowMount(RangeInput, {
      props: {
        input,
        formData,
      },
    });

    const rangeInput = wrapper.find('input[type="range"]');
    expect(rangeInput.exists()).toBe(true);
    expect(rangeInput.attributes("min")).toBe("0");
    expect(rangeInput.attributes("max")).toBe("10");
    expect(rangeInput.attributes("step")).toBe("1");
  });

  test("renders the range labels with correct options", () => {
    const wrapper = shallowMount(RangeInput, {
      props: {
        input,
        formData,
      },
    });

    const rangeLabels = wrapper.findAll(".range-label");
    expect(rangeLabels.length).toBe(3);

    rangeLabels.forEach((label, index) => {
      const option = input.options[index];
      expect(label.text()).toBe(option.text);
    });
  });

  test("applies the correct styles to the range input and labels", () => {
    const wrapper = shallowMount(RangeInput, {
      props: {
        input,
        formData,
      },
    });

    const rangeInput = wrapper.find('input[type="range"]');
    expect(rangeInput.classes()).toContain("range-input");

    const rangeLabels = wrapper.findAll(".range-label");
    rangeLabels.forEach((label) => {
      expect(label.classes()).toContain("range-label");
      expect(label.classes()).toContain("bg-secondary");
      expect(label.classes()).toContain("text-dark");
      expect(label.classes()).toContain("py-1");
      expect(label.classes()).toContain("px-2");
      expect(label.classes()).toContain("rounded-lg");
    });
  });
});
