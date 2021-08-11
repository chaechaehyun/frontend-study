<template>
    <div class="main">
        <button
            type="text"
            @click="$router.push('/login')"
        >
            로그인
        </button>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    dada() {
        return {
            searchWord: "", 
            loadPage: 1,
            productStatus: '',
            list: [],
        }
    },
    created(){
        this.getItemList()
        // this.$store.dispatch('FETCH_GOODS_LIST', {
        //     s: this.searchWord.toString(),
        //     status: this.productStatus === 0 ? '' : this.productStatus,
        //     page: this.loadPage
        // })
        //     .then(() => {
        //         let results = response.data.data.results;
        //         results.forEach( item => {
        //             item.selected = false;
        //             this.list.push(item);
        //             console.log(this.list);
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
                
        //}, 
       

    },
    methods:{
        getItemList(){
            // return this.$axios.get('/shop/items/',{
            //     params: { 
            //         s: this.searchWord.toString(),
            //         status: this.productStatus === 0 ? '' : this.productStatus,
            //         page: this.loadPage
            //     }
            // })
            //     .then( response => {
                    
            //         let results = response.data.data.results;										

            //         results.forEach( item => {
            //             item.selected = false;
            //             this.list.push(item);
            //         })

            //         // this.productList = list;															
            
            //         return response;
            //     })
            //     .catch( err => {					
                    
            //         console.error('getItemList error : ',err)
            //         return;
            //     })  
        }
    }
};
</script>
<style scoped>

</style> 