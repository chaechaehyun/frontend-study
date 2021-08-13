import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import MainList from "../../src/views/MainList.vue";
import GoodsItem from '../../src/components/GoodsItem.vue'

// const localVue = createLocalVue();
// localVue.component('GoodsItem', GoodsItem);

describe("test MainList view", () => {
    it("그려졌을때 적절한 productSummary값이 들어 오는지", async () => {
        let productSummary = {
            activate: 0,
            inactivate: 0,
            end: 0,
        }
        const wrapper = shallowMount(MainList, {
            productSummary,
        })
        await wrapper.setData({ productSummary });
        expect(wrapper.html('.list-tab li')).toContain(productSummary.activate);
       
    });

    // it("goods item에 props 값이 잘 전달되는가", async () => {

    // });
});