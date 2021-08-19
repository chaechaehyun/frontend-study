<template>
    <div class="main-list">
        <div class="title">
            상품관리
        </div>
        <div class="list-tab">
            <button 
                :class="{'active' : productStatus == 'S'}" 
                @click="changedStatus('S')"
            >
                판매중 
                {{ productSummary.activate }}
            </button>
            <button 
                :class="{'active' : productStatus == 'W'}" 
                @click="changedStatus('W')"
            >
                판매중지 
                {{ productSummary.inactivate }}
            </button>
            <button 
                :class="{'active' : productStatus == 'E'}" 
                @click="changedStatus('E')"
            >
                판매종료 
                {{ productSummary.end }}
            </button>
        </div>
        <div class="filter-area">
            <input id="totalCheck" type="checkbox">
            <label for="totalCheck">전체선택</label>
            <button>중지</button>
        </div>
        <div class="list-area">
            <goods-item
                v-for="(productItem, productIndex) in productList"
                :key="productIndex"
                :sold-out="productStatus == 'E'"
                :product="productItem"
            />
        </div>
    </div>
</template>

<script>
// import { computed } from '@vue/runtime-core'
// import { reactive, computed } from 'vue'
// import { useStore } from 'vuex'
import { mapGetters } from 'vuex'
import { getItems } from '@/api/index'
import GoodsItem from '../components/GoodsItem.vue'

export default {
    components:{
        GoodsItem,
    },
    // setup () {
    //     const state = reactive({
    //         productSummary: computed(() => state.itemSummary()),
    //         userInfo:computed(() => state.user.member())
    //     });
    //     return { 
    //         state 
    //     }
    // },
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
        })
    },
    created(){
    },
    mounted() {
        this.getItemSummary()
        this.getItemsAsync();

    },
    methods:{
        changedStatus(status){
            this.searchWord = '';
            this.productStatus = status;
            this.productList = [];
            // console.log('tab');
            this.sort = this.productStatus == 'E' ? 1 : 0;
            this.getItemsAsync();
            // console.log(this.productList);
        }, 
        getItemSummary() {
            let shopId = this.$store.state.user.member.shop_id;
            this.$store.dispatch('FETCH_ITEM_SUMMARY', shopId)
                .then((response) => {   
                    console.log(response.data.data);
                }).
                catch((error) => {
                    console.error('getItemSummary response error', error)
                });
        },

        async getItemsAsync(){
            
            this.isAllSelected = false;
            let shopId = this.$store.state.user.member.shop_id;

            try {
                let result = await getItems(shopId, {
                    item_status: this.productStatus,
                    search: this.searchWord,
                    page: this.pagination.page,
                    ordering: this.productStatus == 'E' ? '-deleted_at' : this.sortCalculator(),
                    deleted_at_after: this.productStatus == 'E' ? this.periodSortCalculator() : undefined,
                });
                console.log('getItemsAsync response result', result);

                if(result.status == 200 && result.data.data != undefined) {
                    if(this.pagination.page == 1){

                    }

                    result.data.data.forEach(item => {
                        item.selected = false;
                        this.productList.push(item);
                        // console.log(this.productList);
                    })

                    Object.assign(this.pagination, {
                        page : result.data.page,
                        has_next : result.data.has_next,
                    })
                    this.getItemSummary();
                }
                else if(result.status == 200 && result.data.data == undefined) {
                    this.productList = [];
                    this.getItemSummary();
                }
            }
            catch (error) {
                console.error('getItemsAsync response error', error);
            }
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
<style lang="scss" scoped>
.title{
    text-align: center;
    padding: 12px 20px;
    background: #efefef;
}
.list-tab{
    display: flex;
    justify-content: space-around;
    align-items: center;
    button{
        width: 33.33%;
        text-align: center;
        padding: 12px;
        border: 2px solid #fff;
        background: #929292;
        color: #fff;
        &.active{
            background: #ff4040;
        }
    }
}
.filter-area{
    padding: 10px 20px;
    input[type="checkbox"]{
        width: 20px;
        height: 20px;
        vertical-align: sub;
    }
    label{
        margin: 0 8px;
    }
    button{
        padding: 2px 6px 1px;
    }
}
</style> 