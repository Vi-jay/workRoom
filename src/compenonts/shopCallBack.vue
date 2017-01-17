<template>
    <div>
        <div id="shopCallBack"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'shuaige',
        props: {
            allResource: {
                type: Object
            }
        },
        data(){
            return {
                name:"shopCallBack",
                shopCallBackOption: {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            magicType: {show: true, type: ['line', 'bar']},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: []
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '气站回瓶百分比',
                            min: 0,
                            max: 100,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'line',
                            data: []
                        }
                        ,
                        {
                            name: '',
                            type: 'line',
                            data: []
                        }
                    ]
                },
                shopCallBack: {}
            }
        },
        methods: {
            setOption(){
                let shop = {"shopName": [], "data": []};
                let xAxis = [];
                let dateTime = this.getDate(this.lastMonthDay).getTime();
                for (let i = 0; i < 30; i++) {
                    dateTime += 86400000;
                    let d = new Date(dateTime);
                    let M = d.getMonth() + 1;
                    let MM = (M < 10) ? "0" + M : M;
                    let D = d.getDate();
                    let DD = (D < 10) ? "0" + D : D;
                    xAxis.push(MM + "-" + DD);
                }
                this.allResource.shopCallBack.forEach(function (item, i) {
                    let thisShopData = [];
                    let day = item["data"][0];
                    let daylength = item["data"][0].length;
                    let data = item["data"][1];
                    let flag = false;
                    shop["shopName"].push(item["shopName"]);
                    xAxis.forEach(function (xAxisItem, i) {
                        for (let i = 0; i < daylength; i++) {
                            if (day[i] == xAxisItem) {
                                thisShopData.push(data[i]);
                                flag = true;
                                break;
                            }
                        }
                        if (!flag) {
                            thisShopData.push(0);
                            flag = false;
                        }
                    });
                    shop["data"].push(thisShopData);
                });
                this.shopCallBackOption.legend.data = shop["shopName"];
                this.shopCallBackOption.xAxis[0].data = xAxis;
                let mySeries = [];
                shop["data"].forEach(function (item, i) {
                    mySeries.push({
                        name: shop["shopName"][i],
                        type: 'line',
                        data: item
                    })
                });
                this.shopCallBackOption.series = mySeries;
                this.shopCallBack.setOption(this.shopCallBackOption);
            }
        },
        created(){
            this.$nextTick(() => {
                this.shopCallBack = this.echart.init(document.getElementById('shopCallBack'));
                this.setOption();
            })
        },
        computed: {
            lastMonthDay(){
                return this.getPreDay(this.NowDateTime(), 30);
            },
            lastTwoMonthDay(){
                return this.getPreDay(this.NowDateTime(), 60);
            }
        },
        destroyed(){
            this.shopCallBack.dispose();
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #shopCallBack
        width 100%
        height 100%
        transform translate3d(0, 0, 0)
</style>
