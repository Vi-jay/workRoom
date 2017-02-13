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
                this.$http.get('./JSON/data.json').then((res) => {
                    this.allResource.monthBuyType = res.body.monthBuyType;
                });
                this.$http.get('./JSON/data.json').then((res) => {
                    this.allResource.todayBuyType = res.body.todayBuyType;
                });
                this.$http.get('./JSON/data.json').then((res) => {
                    this.allResource.monthOrderData = res.body.monthOrderData;
                });
                setInterval(()=>{
                    this.$http.get('./JSON/data.json').then((res) => {
                        let resData= res.body.todayOrderData;
                        console.log(JSON.stringify(resData));
                        if(JSON.stringify(this.allResource.todayOrderData)!=JSON.stringify(resData)){
                            this.allResource.todayOrderData=resData;
                            if(this.$refs.compoents.name === "bottleTrack"){
                                this.$refs.compoents.setOption();
                                console.log(this.$refs.compoents.name);
                            }
                        }
                    });},1000);
                this.$http.get('./JSON/data.json').then((res) => {
                    this.allResource.shopCallBack = res.body.shopCallBack;

                });
                this.$http.get('./JSON/data.json').then((res) => {
                    this.allResource.shopStock = res.body.shopStock;
                    if (this.$refs.compoents.name === "shopStock") {
                        this.$refs.compoents.setOption();
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
            height 800px
</style>
