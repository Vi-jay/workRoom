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
                flag: true,
                today:this.thisDay
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
            },
            initOrderData(data) {
                let orderDatas = new Array();
                for ( let i = 0; i < data.length; i++) {
                    let orderData = {};
                    orderData.shopName = data[i].second_category_name;
                    orderData.numFor5KG = data[i].num_for_5KG;
                    orderData.numFor15KG = data[i].num_for_15KG;
                    orderData.numFor50KG = data[i].num_for_50KG;
                    orderData.numFor2KG = data[i].num_for_2KG;
                    orderData.CountTotal = orderData.numFor5KG + orderData.numFor15KG
                        + orderData.numFor50KG + orderData.numFor2KG;
                    orderDatas.push(orderData);
                }
                return orderDatas;
        },
            initOrderTypeData(data) {

                let orderTypeDatas = new Array();

                let orderTypeDataMap = {};

                for ( let i = 0; i < data.length; i++) {

                    let orderTypeData = {};

                    if (orderTypeDataMap[data[i].second_category_name] != null) {
                        orderTypeData = orderTypeDataMap[data[i].second_category_name];
                    }
                    switch (data[i].mode_name) {
                        case '门店自提':
                            orderTypeData['pickUpInSotre'] = data[i].orderNumber;
                            break;
                        case '电话订气':
                            orderTypeData['telephoneOrder'] = data[i].orderNumber;
                            break;
                        case '微信订气':
                            orderTypeData['weiXinOrder'] = data[i].orderNumber;
                            break;
                        default:
                    }
                    orderTypeDataMap[data[i].second_category_name] = orderTypeData;
                }

                let  tmpData = {};
                for ( let key in orderTypeDataMap) {
                    tmpData.shopName = '总计';
                    tmpData['门店自提'] = orderTypeDataMap[key].pickUpInSotre == null ? 0
                        : orderTypeDataMap[key].pickUpInSotre;
                    tmpData['电话订气'] = orderTypeDataMap[key].telephoneOrder == null ? 0
                        : orderTypeDataMap[key].telephoneOrder;
                    tmpData['微信订气'] = orderTypeDataMap[key].weiXinOrder == null ? 0
                        : orderTypeDataMap[key].weiXinOrder;
                    orderTypeDatas.push(tmpData);
                }
                return orderTypeDatas;
            },

        },
        created(){
            setTimeout(() => {
                this.$http.get('./JSON/data.json').then((res) => {
                    let resData = res.body.monthBuyType;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.monthBuyType)) {
                        this.allResource.monthBuyType = resData;
                        if (this.$refs.compoents.name === "monthBuy") {
                            this.$refs.compoents.setMonthMapOption();
                        }
                    }
                });
                this.$http.get('./JSON/data.json').then((res) => {
                    let resData = res.body.todayBuyType;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.todayBuyType)) {
                        this.allResource.todayBuyType = resData;
                        if (this.$refs.compoents.name === "todayBuy") {
                            this.$refs.compoents.setTodayMapOption();
                        }
                    }
                });
                this.$http.get('./JSON/data.json').then((res) => {
                    let resData = res.body.todayOrderData;
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
                this.$http.get('./JSON/data.json').then((res) => {
                    let resData = res.body.monthOrderData;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.monthOrderData)) {
                        this.allResource.monthOrderData = resData;
                        if (this.$refs.compoents.name === "monthBuy") {
                            this.$refs.compoents.setMonthLineOption();
                        }
                    }
                });
                this.$http.get('./JSON/data.json').then((res) => {
                    let resData = res.body.shopCallBack;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.shopCallBack)) {
                        this.allResource.shopCallBack = resData;
                        if (this.$refs.compoents.name === "shopCallBack") {
                            this.$refs.compoents.setOption();
                        }
                    }
                });
                this.$http.get('./JSON/data.json').then((res) => {
                    let resData = res.body.shopStock;
                    if (JSON.stringify(resData) != JSON.stringify(this.allResource.shopStock)) {
                        this.allResource.shopStock = resData;
                        if (this.$refs.compoents.name === "shopStock") {
                            this.$refs.compoents.setOption();
                        }
                    }
                });
            });
        },
        computed:{
            thisDay(){
                return this.NowDateTime();
            }
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