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
    dada() {},
    created(){
        this.$store.dispatch('FETCH_GOODS_LIST')
        console.log('FETCH_GOODS_LIST');
    }
};
</script>
<style scoped>

</style>