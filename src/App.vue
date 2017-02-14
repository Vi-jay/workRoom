<template>
    <div id="app">
        <div class="tab_wrapper">
            <div class="tab_item" v-for="(value,key,index) in routers">
                <router-link :to="value">{{key}}</router-link>
            </div>
        </div>
        <div class="Icons" @click="changeIcon">
            <i class="myIcon" :class="icon_class"></i>
            <i class="myIcon" :class="icon_class"></i>
            <i class="myIcon" :class="icon_class"></i>
        </div>
        <router-view :allResource="allResource" ref="compoents" class="viewItem"></router-view><!--在此显示路由后显示的内容-->
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                allResource: {
                    'monthBuyType': {},
                    'todayBuyType': {},
                    'monthOrderData': {},
                    'todayOrderData': {},
                    'shopCallBack': {},
                    'shopStock': {}
                },
                routers: {
                    '首页': 'index',
                    '月销量图表': "monthChart",
                    '日销量图表': "todayChart",
                    '分站库存': "shopStock",
                    '分站回瓶率': "shopCallBack",
                    '气瓶轨迹图': "bottleTrack",
                    '统计总览': "home",
                },
                icon_class: 'icon-arrow_lift',
                flag: true
            }
        },
        methods: {
            changeIcon(){
                let eles = document.getElementsByClassName('myIcon');
                let tab_item = document.getElementsByClassName('tab_wrapper')[0];
                if (this.flag) {
                    for (let i = 0; i < eles.length; i++) {
                        eles[i].style.transform = 'translate3d(0,0,0) rotate(180deg)';
                    }
                    tab_item.style.opacity = 0;
                    tab_item.style.marginLeft = '-900px';

                    this.flag = false;
                } else {
                    for (let i = 0; i < eles.length; i++) {
                        eles[i].style.transform = 'translate3d(0,0,0) rotate(720deg)';
                    }
                    tab_item.style.opacity = 1;
                    tab_item.style.marginLeft = 0;
                    this.flag = true;
                }
            }
        },
        created(){
            setTimeout(() => {
                this.$http.get('/JSON/monthBuyType').then((res) => {
                    let resData = res.body.data;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.monthBuyType)) {
                        this.allResource.monthBuyType = resData;
                        if (this.$refs.compoents.name === "monthBuy") {
                            this.$refs.compoents.setMonthMapOption();
                        }
                    }
                });
                this.$http.get('/JSON/todayBuyType').then((res) => {
                    let resData = res.body.data;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.todayBuyType)) {
                        this.allResource.todayBuyType = resData;
                        if (this.$refs.compoents.name === "todayBuy") {
                            this.$refs.compoents.setTodayMapOption();
                        }
                    }
                });
                this.$http.get('/JSON/monthOrderData').then((res) => {
                    let resData = res.body.data;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.monthOrderData)) {
                        this.allResource.monthOrderData = resData;
                        if (this.$refs.compoents.name === "monthBuy") {
                            this.$refs.compoents.setMonthLineOption();
                        }
                    }
                });
                this.$http.get('/JSON/todayOrderData').then((res) => {
                    let resData = res.body.data;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.todayOrderData)) {
                        this.allResource.todayOrderData = resData;
                        if (this.$refs.compoents.name === "bottleTrack") {
                            this.$refs.compoents.setOption();
                        }
                        if (this.$refs.compoents.name === "todayBuy") {
                            this.$refs.compoents.setTodayLineOption();
                        }
                    }
                });

                this.$http.get('/JSON/shopCallBack').then((res) => {
                    let resData = res.body.data;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.shopCallBack)) {
                        this.allResource.shopCallBack = resData;
                        if (this.$refs.compoents.name === "shopCallBack") {
                            this.$refs.compoents.setOption();
                        }
                    }
                });
                this.$http.get('/JSON/shopStock').then((res) => {
                    let resData = res.body.data;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.shopStock)) {
                        this.allResource.shopStock = resData;
                        if (this.$refs.compoents.name === "shopStock") {
                            this.$refs.compoents.setOption();
                        }
                    }
                });
            });
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    body
        background url("./img/login_bgx.gif")
        .tab_wrapper
            display inline-block
            width 900px
            transition: all .5s
        .tab_item
            display inline-block
            padding 25px 15px
            color black
            text-align center
            transition all 0.2s
            a
                color black
                font-weight 700
                font-size 22px
                transition all 0.5s
            &:hover
                transform scale(1.2) translate3d(0, 0, 0)
        .Icons
            display inline-block
            cursor pointer
            .myIcon
                display inline-block
                padding 15px 5px
                font-weight 700
                font-size 22px
                color #11b95c
                transition all 0.5s
        .viewItem
            display block
            width 100%
            height 550px
</style>