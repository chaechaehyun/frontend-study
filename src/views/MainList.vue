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
        <div 
            v-if="productStatus == 'S' || productStatus == 'W'" 
            class="filter-area" 
        >
            <input 
                id="totalCheck" 
                type="checkbox"
                @click="totalCheck"
            >
            <label for="totalCheck">
                전체선택
            </label>
            <button @click="changeProductStatus">
                {{ productStatus == 'S' ? '중지' : '시작' }}
            </button>
        </div>
        <div class="list-area">
            <goods-item
                v-for="(productItem, productIndex) in productList"
                :key="productIndex"
                :sold-out="productStatus == 'E'"
                :product="productItem"
                @quantity-up="quantityChanged(productIndex, 1)"
                @quantity-down="quantityChanged(productIndex, -1)"
                @save-quantity="saveQuantity(productIndex)"
                @one-product-select="oneProductSelect(productIndex)"
            />
        </div>
    </div>
</template>

<script>
// import { computed } from '@vue/runtime-core'

import { mapGetters } from 'vuex'
import { getItems, activateItems, inactivateItems, updateItem } from '@/api/index'
import GoodsItem from '../components/GoodsItem.vue'

export default {
    components:{
        GoodsItem,
    },
    // setup () {
    //     
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
        // this.getItemSummary()
        this.getItemsAsync();

    },
    methods:{
        // tab btn
        changedStatus(status){
            this.searchWord = '';
            this.productStatus = status;
            this.productList = [];
            // console.log('tab');
            this.sort = this.productStatus == 'E' ? 1 : 0;
            this.getItemsAsync();
            // console.log(this.productList);
        }, 
        // get Summary (tab)
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
        // get list
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
                        console.log(this.productList);
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
        totalCheck(){
            this.isAllSelected = !this.isAllSelected;
            this.productList.forEach((item)=>{
                item.selected = this.isAllSelected;
            });
        }, 
        oneProductSelect(index){
            console.log('oneProductSelect', this.productList[index], this.productList[index].selected)
            // this.product.selected = !this.product.selected;
            this.productList[index].selected = !this.productList[index].selected;

        },
        // 상품판매상태 변경 API(판매시작, 중지)
        async toggleActivateItems(checkedItems) {
            let shopId = this.$store.state.user.member.shop_id;
            try {
                let params = {
                    bulk_update_id_list : checkedItems
                }

                let result = this.productStatus == 'S' ? await inactivateItems(shopId, params) : await activateItems(shopId, params);
                if(result.status == 200 && result.data.code == 'S0000'){
                    let itemIndex = 0;
                    this.productList.slice(0).forEach( (item, index) =>{
                        checkedItems.forEach((obj) => {
                            if(item.id == obj) {
                                item.item_status = this.productStatus == 'S' ? 'W' : 'S';
                                item.selected = false;
                            }
                        })
                    });

                    // 상태 변경된 목록 제거
                    checkedItems.forEach( item => {
                        itemIndex = this.productList.findIndex( product => {
                            return product.id == item;
                        })
                        this.productList.splice(itemIndex, 1)
                    });
                    this.getItemSummary();
                    // this.showFeedback(`판매를 ${this.productStatus == 'S' ? '중지' : '시작'}하였습니다.`, false);
                    this.isAllSelected = false;
                } else {
                    console.error('activate error', result)
                    // this.showFeedback("판매상태 변경을 실패하였습니다.", false);
                }
            }
            catch (err) {
                console.error('toggleActivateItems error', err);
                // this.showFeedback("판매상태 변경을 실패하였습니다.", false);
            }
        },
        async changeProductStatus() {
            let checkedItems = [];
            this.productList.forEach((item) => {
                if( item.selected ) {
                    checkedItems.push(item.id);
                }
                console.log(checkedItems);
            });

            if(checkedItems.length < 1) {
                alert('상품을 선택해주세요.');
            }
            else {
                const res = await confirm(this.productStatus == 'S' ? "선택된 상품을 판매중지하시겠습니까?" : "선택된 상품을 판매개시하시겠습니까?", {
                    title: this.productStatus == 'S' ? '판매중지' : '판매개시',
                    okButtonText: '확인',
                    cancelButtonText: '취소'
                });
                if(res)
                    this.toggleActivateItems(checkedItems);
            }
        },
        // item count changing btn
        quantityChanged(index, value) {
            if(typeof this.productList[index].qty != 'number')
                return;
            this.productList[index].qty = this.productList[index].qty + value;
        },
        // item count changeed save btn
        async saveQuantity(index) {
            // console.log('saveQuantity');
            if(typeof this.productList[index].qty != 'number')
                return;

            try {
                let result = await updateItem(this.productList[index].id, this.$store.state.user.member.shop_id, { qty: this.productList[index].qty });
                if(result.status == 200 && result.data.code == 'S0000') {
                    Object.assign(this.productList[index], result.data.data);
                    alert('상품수량이 수정되었습니다.')
                }
            }
            catch (error) {
                alert('상품수량 수정이 실패하였습니다.')
                // 실패시 값 되돌리기
                this.productList[index].qty = this.productList[index].total_qty;
                console.error('updateItemAsync error', error);
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