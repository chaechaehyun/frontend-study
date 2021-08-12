<template>
    <div class="main">
       
    </div>
</template>

<script>
import { getItems } from '@/api/index'

export default {
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
        this.getItemsAsync()
    },
    methods:{
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

</style> 