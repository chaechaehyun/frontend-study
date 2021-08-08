import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Login from "@/components/login.vue";

const localVue = createLocalVue();

import VueRouter from "vue-router";
localVue.use(VueRouter);
import { routes } from "@/router";

describe("test Login view", () => {
  it("Login Button을 click했을때 home으로 이동을 하는가", async () => {
    // act
    const wrapper = mount(Login, {
      router: routes,
      localVue,
    });
    // assert
    const btn = wrapper.get("#loginBtn");
    await btn.trigger("click");
    expect(wrapper.vm.$route.path).toBe("/home");
  });
});
