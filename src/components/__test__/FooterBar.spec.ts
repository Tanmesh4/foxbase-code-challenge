import { shallowMount } from "@vue/test-utils";
import FooterBar from "@/components/FooterBar.vue";
import { describe, test, expect } from "vitest";

describe("FooterBar", () => {
  test("renders the component without errors", () => {
    const wrapper = shallowMount(FooterBar);
    expect(wrapper.exists()).toBe(true);
  });

  test("displays the correct address information", () => {
    const wrapper = shallowMount(FooterBar);
    const address = wrapper.find("div:nth-child(2) p");

    expect(address.text()).toBe("123 Main St, Germany");
  });

  test('displays the correct "About Us" information', () => {
    const wrapper = shallowMount(FooterBar);
    const aboutUs = wrapper.find("div:nth-child(3) p");

    const expectedText =
      "Recommendation Specialists is a leading provider of house color recommendations." +
      " We offer expert advice and personalized recommendations to help homeowners choose" +
      " the perfect colors for their homes. With our innovative technology and experienced" +
      " team of specialists, we make the color selection process easy and enjoyable.";

    expect(aboutUs.text()).toBe(expectedText);
  });

  test("applies the correct styling", () => {
    const wrapper = shallowMount(FooterBar);
    const footer = wrapper.find("footer");
    expect(footer.classes()).toContain("bg-secondary");
  });
});
