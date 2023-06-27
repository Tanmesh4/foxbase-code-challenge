import { shallowMount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";
import { describe, test, expect } from "vitest";

describe("NavBar", () => {
  test("renders the component with a logo and title", () => {
    // Mount the component
    const wrapper = shallowMount(NavBar);

    // Assert that the component is rendered without errors
    expect(wrapper.exists()).toBe(true);

    // Assert the presence of the logo
    const logo = wrapper.find("img");
    expect(logo.exists()).toBe(true);
    expect(logo.attributes("src")).toBe("https://picsum.photos/50");
    expect(logo.attributes("alt")).toBe("Logo");

    // Assert the presence of the title
    const title = wrapper.find("h1");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Recommendation Specialists");
    expect(title.classes()).toContain("text-white");
    expect(title.classes()).toContain("text-lg");
    expect(title.classes()).toContain("font-semibold");
  });

  test("renders the component with a fixed navigation bar", () => {
    // Mount the component
    const wrapper = shallowMount(NavBar);

    // Assert that the component is rendered without errors
    expect(wrapper.exists()).toBe(true);

    // Assert the presence of the navigation bar
    const nav = wrapper.find("nav");
    expect(nav.exists()).toBe(true);
    expect(nav.classes()).toContain("bg-primary");
    expect(nav.classes()).toContain("py-4");
  });
});
