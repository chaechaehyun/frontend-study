import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vue from 'vue'
import MainList from "../../src/views/MainList.vue";
import store from "@/store";
import GoodsItem from "../../src/components/GoodsItem.vue";


// import GoodsItem from '../../src/components/GoodsItem.vue'

// const localVue = createLocalVue();
// localVue.component('GoodsItem', GoodsItem);

describe("test MainList view", () => {
    it("그려졌을때 goods-item component가 잘그려지는지", async () => {
        
        const wrapper = shallowMount(MainList, {
            GoodsItem,
            store
        })
        expect(wrapper.vm.GoodsItem).toBe(true);

        // expect(wrapper.html('.list-tab')).toContain(productSummary.activate);
       
    });

    // it("goods item에 props 값이 잘 전달되는가", async () => {

    // });
});