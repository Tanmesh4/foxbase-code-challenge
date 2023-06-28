import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Loading from "@/components/Loading.vue";
import ModalMessage from "../ModalMessage.vue";

describe("ModalMessage", () => {
  it("renders the title correctly", () => {
    const title = "Test Title";
    const wrapper = mount(ModalMessage, {
      propsData: {
        title: title,
        message: "",
        isSuccess: true,
      },
    });

    expect(wrapper.find("h2").text()).toBe(title);
  });

  it("renders the success icon when `isSuccess` prop is true", () => {
    const wrapper = mount(ModalMessage, {
      propsData: {
        title: "",
        message: "",
        isSuccess: true,
      },
    });

    expect(wrapper.find(".success-icon").exists()).toBe(true);
    expect(wrapper.find(".warning-icon").exists()).toBe(false);
  });

  it("renders the warning icon when `isSuccess` prop is false", () => {
    const wrapper = mount(ModalMessage, {
      propsData: {
        title: "",
        message: "",
        isSuccess: false,
      },
    });

    expect(wrapper.find(".success-icon").exists()).toBe(false);
    expect(wrapper.find(".warning-icon").exists()).toBe(true);
  });

  it("renders the message correctly", () => {
    const message = "Test Message";
    const wrapper = mount(ModalMessage, {
      propsData: {
        title: "",
        message: message,
        isSuccess: true,
      },
    });

    expect(wrapper.find(".modal-footer p").text()).toBe(message);
  });

  it("renders the Loading component", () => {
    const wrapper = mount(ModalMessage, {
      propsData: {
        title: "",
        message: "",
        isSuccess: true,
      },
    });

    expect(wrapper.findComponent(Loading).exists()).toBe(true);
  });
});
