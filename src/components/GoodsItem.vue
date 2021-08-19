<template>
    <div class="goods-item">
        <!-- {{ product }} -->
        <div class="img-area">
            <input 
                id="itemCheck" 
                type="checkbox" 
                :checked="product.selected === true"
            >
            <img
                :src="product.thumbnail"
                alt="goods-img"
            >
        </div>
        <div class="info-area">
            <p class="item-title">
                {{ product.name }}
            </p>
            <div class="goods-info">
                <span 
                    class="item-badge"
                    :class="product.item_status == 'E' ? 'red' : 'blue'"
                >
                    자동
                </span>
                <span>{{ product.total_qty }}</span>
                <span>{{ $utils.threeComma(product.price) }}원</span>
                <span>{{ `(${product.discount_rate}%)` }}</span>
            </div>
            <div class="time-info">
                <span>{{ $utils.hhmmFormatter(product.buy_start_at) }}</span>
                <span> ~ {{ $utils.hhmmFormatter(product.buy_end_at) }}</span>
            </div>
            <div class="quantity-info">
                <button class="count-button">
                    -
                </button>
                <input
                    type="text"
                    :value="product.qty"
                >
                <button class="count-button">
                    +
                </button>
                <button>저장</button>
            </div>
        </div>
    </div>
</template>

<script>
// import { inject } from 'vue'
export default {
    props:{
        product: Object,
        soldOut: Boolean
    },
    setup() {
        // const $utils = inject('$utils');
    }
}
</script>

<style lang="scss" scoped>
.goods-item{
    padding: 10px 20px;
    display: flex;
    justify-content: flex-start;
}
.img-area{
    width: 96px;
    height: 96px;
    margin-right: 10px;
    position: relative;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    input[type="checkbox"]{
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
    }
}
.info-area{
    .item-title{
        font-weight: bold;
    }
    .goods-info{
        .item-badge{
            color: #fff;
            font-weight: bold;
            font-size: 12px;
            padding: 3px 6px;
            display: inline-block;
            &.blue{
                background: #0ea8f4;
            }
            &.red{
                background: #ff7fab;
            }
        }
    } 
    .time-info{
        color: #999;
        font-size: 14px ;
    }
    .quantity-info{
        input{
            width: 40px;
            text-align: center;
        }
        .count-button{
            width: 30px;
        }
    }
}
</style>