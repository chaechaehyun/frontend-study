<template>
    <div class="goods-item">
        {{ product }}
    </div>
</template>

<script>
export default {
    props:{
        product: Object,
        soldOut: Boolean
    }
}
</script>

<style>

</style>