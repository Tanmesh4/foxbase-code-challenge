import { mount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";
import { describe, it, expect, beforeEach } from "vitest";
import router from "@/router";

describe("NavBar", () => {
  let mockRoute: { path: any };

  beforeEach(() => {
    mockRoute = {
      path: "",
    };
  });

  it("renders the correct nav title", () => {
    const wrapper = mount(NavBar, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });
    expect(wrapper.find("h1").text()).toBe("Recommendation Specialists");
  });

  it('displays "Add Products" link with underline when on /addProduct route', async () => {
    mockRoute.path = "/addProduct";

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.find(".underline").exists()).toBe(true);
  });

  it('does not display underline on "Add Products" link when not on /addProduct route', async () => {
    mockRoute.path = "/";

    const wrapper = mount(NavBar, {
      global: {
        mocks: {
          $route: mockRoute,
        },
        stubs: ["router-link"],
      },
    });

    expect(wrapper.find(".underline").exists()).toBe(false);
  });
});
