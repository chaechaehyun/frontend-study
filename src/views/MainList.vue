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
// import { getItemSummary } from '@/api/index'
import GoodsItem from '../components/GoodsItem.vue'

export default {
    components:{
        GoodsItem,
    },
    dada() {
        return {
            searchWord: "",
            isAllSelected: false,
            productStatus: 'S',
            pagination: {
                page: 1,
                has_next: false,
            },
            productList: [],
            productSummary: {
                activate: 0,
                inactivate: 0,
                end: 0,
            },
        }
    },
    created(){
        
    },
    mounted() {
        this.getItemSummary()
    },
    methods:{
        changedStatus(status){
            console.log('tab');
            this.productStatus = status; 
            // this.productList = [];
            // this.getItemsAsync();
        }, 
        getItemSummary() {
            // console.log(this.$store.state.user.member.shop_id)
            this.$store.dispatch('FETCH_ITEM_SUMMARY', this.$store.state.user.member.shop_id)
                .then(() => {   
                    if(result.status == 200 && result.data.data != undefined) {
                        this.productSummary = result.data.data;
                        console.log(result.data.data);
                    } 
                }).
                catch((error) => {
                    console.error('getItemSummary response error', error)
                })
               
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
            //     let result = await getItems(this.$store.state.loginInfo.shop_id, {
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

        }
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