<template>
<div>
    <div class="homeWrapper">
        <div class="inside insideCenterBorder">
            <div class="title"><strong>本日销售报表:</strong></div>
            <todayChart :allResource="allResource" class="item itemBorder"></todayChart>
            <div class="title"><strong>气瓶配送实时轨迹图:</strong></div>
            <bottleTrack :allResource="allResource" class="item"></bottleTrack>
        </div>
        <div class="inside">
            <div class="title"><strong>本月销售报表:</strong></div>
            <monthChart :allResource="allResource" class="item itemBorder"></monthChart>
            <div class="title"><strong>分站库存报表:</strong></div>
            <shopStock :allResource="allResource" class="item"></shopStock>
        </div>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
    let monthChart=require('./monthChart.vue');
    let todayChart=require('./todayChart.vue');
    let bottleTrack=require('./bottleTrack.vue');
    let shopStock=require('./shopStock.vue');
    export default {
        props:{
            allResource: {
                type: Object,
            }
        },
        components:{
            monthChart,
            todayChart,
            bottleTrack,
            shopStock,
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.homeWrapper
    display flex
    justify-content center
    .inside
        width 50%
        display flex
        flex-wrap wrap
        height 50%
        .item
            display block
            width 100%
            height 410px
        .itemBorder
            border-bottom  ridge 3px #cccccc
        .title
            text-align: left;
            padding: 10px;
            margin: 0;
            color:#415F9D;
    .insideCenterBorder
        border-right ridge 3px #cccccc

</style>
