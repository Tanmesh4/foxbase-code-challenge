import { shallowMount } from "@vue/test-utils";
import FooterBar from "@/components/FooterBar.vue";
import { describe, test, expect } from "vitest";
import footerText from "../../nls/footerText.json";

describe("FooterBar", () => {
  test("renders the component without errors", () => {
    const wrapper = shallowMount(FooterBar);
    expect(wrapper.exists()).toBe(true);
  });

  test("displays the correct address information", () => {
    const wrapper = shallowMount(FooterBar);
    const address = wrapper.find("div:nth-child(2) p");

    expect(address.text()).toBe(footerText.Adress);
  });

  test('displays the correct "About Us" information', () => {
    const wrapper = shallowMount(FooterBar);
    const aboutUs = wrapper.find("div:nth-child(3) p");
    expect(aboutUs.text()).toBe(footerText.AboutUs);
  });

  test("applies the correct styling", () => {
    const wrapper = shallowMount(FooterBar);
    const footer = wrapper.find("footer");
    expect(footer.classes()).toContain("bg-secondary");
  });
});
