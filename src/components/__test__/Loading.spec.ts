import { shallowMount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import LoadingSpinner from "@/components/Loading.vue";

describe("LoadingSpinner", () => {
  test("displays the loading spinner and text", () => {
    const wrapper = shallowMount(LoadingSpinner);

    const spinner = wrapper.find("span.animate-spin");
    expect(spinner.exists()).toBe(true);
    expect(spinner.classes()).toContain("rounded-full");
    expect(spinner.classes()).toContain("h-16");
    expect(spinner.classes()).toContain("w-16");
    expect(spinner.classes()).toContain("border-t-2");
    expect(spinner.classes()).toContain("border-b-2");
    expect(spinner.classes()).toContain("border-blue-500");

    const text = wrapper.find("h2");
    expect(text.exists()).toBe(true);
    expect(text.text()).toBe("Hold on a sec!");
  });

  test("renders the correct height and margin-top", () => {
    const wrapper = shallowMount(LoadingSpinner);

    const container = wrapper.find(
      "div.flex.flex-col.items-center.justify-center.h-32"
    );
    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain("mt-20");
  });
});
