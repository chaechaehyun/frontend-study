<template>
    <div class="main-list">
        <div class="title">
            상품관리
        </div>
        <ui class="list-tab">
            <li 
                :class="{'active' : productStatus == 'S'}" 
                @click="changedStatus('S')"
            >
                판매중 
                {{ productSummary.activate }}
            </li>
            <li 
                :class="{'active' : productStatus == 'W'}" 
                @click="changedStatus('W')"
            >
                판매중지 
                {{ productSummary.inactivate }}
            </li>
            <li 
                :class="{'active' : productStatus == 'E'}" 
                @click="changedStatus('E')"
            >
                판매종료 
                {{ productSummary.end }}
            </li>
        </ui>
        <div class="list-area">
            <!-- <goods-item
                v-for="(productItem, productIndex) in productList"
                :key="productIndex"
                :sold-out="productStatus == 'E'"
                :product="productItem"
            /> -->
            <goods-item></goods-item>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { getItems } from '@/api/index'

import { mapGetters } from 'vuex'
import GoodsItem from '../components/GoodsItem.vue'

export default {
    components:{
        GoodsItem,
    },
    data() {
        return {
            searchWord: "",
            isAllSelected: false,
            productStatus: 'S',
            pagination: {
                page: 1,
                has_next: false,
            },
            productList: [],
            // productSummary: {
            //     activate: 0,
            //     inactivate: 0,
            //     end: 0,
            // },
            // userInfo: {},
            sort: 0,
            sorts : [
                '종료임박순',
                '종료늦은순',
                '재고많은순',
                '재고적은순',
                '가나다순',
            ],

            periodSort: 0,
            periodSorts: [
                '7일',
                '1개월',
                '3개월'
            ],
        }
    },
    computed:{
        ...mapGetters({
            productSummary: 'getproductSummary',
            userInfo: 'getUserInfo'
        })
    },
    created(){
        this.getItemSummary()
    },
    mounted() {
    },
    methods:{
        changedStatus(status){
            // console.log('tab');
            this.productStatus = status; 
            // this.productList = [];
            // this.getItemsAsync();
        }, 
        getItemSummary() {
            // console.log(typeof(this.userInfo.shop_id), this.userInfo.shop_id)
            this.$store.dispatch('FETCH_ITEM_SUMMARY', this.userInfo.shop_id)
                .then(() => {   
                    console.log(response.data.data);
                   
                }).
                catch((error) => {
                    console.error('getItemSummary response error', error)
                });
               
        },
        // async getItemSummaryAsync() {
        //     console.log(this.$store.state.user.member.shop_id);
        //     try {
        //         let result = await getItemSummary(this.$store.state.user.member.shop_id);
        //         console.log('getItemSummary response result', result);

        //         if(result.status == 200 && result.data.data != undefined) {
        //             this.productSummary = result.data.data;
        //             console.log(result.data.data);
        //         }
        //     }
        //     catch (error) {
        //         console.error('getItemSummary response error', error)
        //     }
        // },

        async getItemsAsync(){
            
            // this.isAllSelected = false;

            // try {
            //     let result = await getItems(this.userInfo.shop_id, {
            //         item_status: this.productStatus,
            //         search: this.searchWord,
            //         page: this.pagination.page,
            //         ordering: this.productStatus == 'E' ? '-deleted_at' : this.sortCalculator(),
            //         deleted_at_after: this.productStatus == 'E' ? this.periodSortCalculator() : undefined,
            //     });
            //     console.log('getItemsAsync response result', result);

            //     if(result.status == 200 && result.data.data != undefined) {
            //         if(this.pagination.page == 1){

            //         }

            //         result.data.data.forEach(item => {
            //             item.selected = false;
            //             this.productList.push(item);
            //         })

            //         Object.assign(this.pagination, {
            //             page : result.data.page,
            //             has_next : result.data.has_next,
            //         })
            //         // this.getItemSummaryAsync();
            //     }
            //     else if(result.status == 200 && result.data.data == undefined) {
            //         this.productList = [];
            //         // this.getItemSummaryAsync();
            //     }
            // }
            // catch (error) {
            //     console.error('getItemsAsync response error', error);
            // }
        },
        sortCalculator() {
            if(this.sort == 0) {        // 종료임박순
                return 'sell_end_at'
            }
            else if(this.sort == 1) {   // 종료늦은순
                return '-sell_end_at'
            }
            else if(this.sort == 2) {   // 재고많은순
                return '-qty'
            }
            else if(this.sort == 3) {   // 재고적은순
                return 'qty'
            }
            else if(this.sort == 4) {   // 가나다순
                return 'name'
            }
            else {
                return undefined
            }
        },
        periodSortCalculator() {
            const nowDate = new Date();
            if(this.periodSort == 0) {        // 1주일
                nowDate.setDate(nowDate.getDate() - 7);
                // return nowDate.toISOString().substring(0,10);
                return new Date(nowDate.getTime() + (9 * 60 * 60 * 1000)).toISOString().substring(0, 10);
            }
            else if(this.periodSort == 1) {   // 1달
                nowDate.setDate(nowDate.getDate() - 30);
                // return nowDate.toISOString().substring(0,10);
                return new Date(nowDate.getTime() + (9 * 60 * 60 * 1000)).toISOString().substring(0, 10);
            }
            else if(this.periodSort == 2) {   // 3달
                nowDate.setDate(nowDate.getDate() - 90);
                // return nowDate.toISOString().substring(0,10);
                return new Date(nowDate.getTime() + (9 * 60 * 60 * 1000)).toISOString().substring(0, 10);
            }
            else {
                return undefined
            }
        },
    }
};
</script>
<style scoped>
.title{
    text-align: center;
    padding: 12px 20px;
    background: #efefef;
}
.list-tab{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.list-tab li{
    width: 33.33%;
    text-align: center;
    padding: 12px;
}
.list-tab li.active{
    color: #ff4040;
}
</style> 