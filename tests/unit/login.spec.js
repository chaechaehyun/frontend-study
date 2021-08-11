import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Login from "../../src/views/Login.vue";

// const localVue = createLocalVue();

// import VueRouter from "vue-router";
// import { routes } from "@/router";
// localVue.use(VueRouter);

describe("test Login view", () => {

    it("Login form이 잘그려지는지", async () => {
        // act
        let form = {
            userId: "아이디",
            userPassword: "비밀번호",
        }
        const wrapper = shallowMount(Login, {
            form,
        });
        await wrapper.setData({ form });
        // assert
       expect(wrapper.get('.login-form').exists()).toBeTruthy();
    });

    // it("Login Button을 click했을때 id or pw가 빈값일때 경고 메세지를 출력 하는가", async () => {
    //     // act
    //     let form = {
    //         userId: '',
    //         userPassword: '',
    //         userPassword: '',
    //     }
    //     // let userPassword = '아이디 또는 비밀번호 값을 입력해주세요.';
    //     const wrapper = shallowMount(Login, {

    //     });
    //     await wrapper.setData({ form });
    //     const btn = wrapper.get("#loginBtn");
    //     await btn.trigger("click");
    //     // assert
    //      expect(wrapper.html('.warnin-msg')).toContain(form.userPassword);
    // });


//   it("Login Button을 click했을때 home으로 이동을 하는가", async () => {
//     // act
//     const wrapper = mount(Login, {
//       router: routes,
//       localVue,
//     });
//     // assert
//     const btn = wrapper.get("#loginBtn");
//     await btn.trigger("click");
//     expect(wrapper.vm.$route.path).toBe("/home");
//   });
});
