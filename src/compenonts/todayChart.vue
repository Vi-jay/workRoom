<template>
    <div>
        <div id="todayChart" ></div>
        <div id="todayMap" ></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            allResource: {
                type: Object
            }
        },
        data(){
            return {
                todayLineOption: {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['2KG', '5KG', '15KG', '50KG']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: []/* Y轴 */
                    },
                    series: []
                }
                ,
                allBottleName: {numFor2KG: "2KG", numFor5KG: "5KG", numFor15KG: "15KG", numFor50KG: "50KG"}
                ,
                todayMapOption: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: []
                    },
                    series: [
                        {
                            name: '购买来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    smooth: true,
                                    length: 5,
                                    length2: 6,
                                }
                            },
                        }
                    ]
                }
                ,
                color: {
                    "numFor2KG": "rgb(144, 237, 125)",
                    "numFor5KG": "rgb(67, 67, 72)",
                    "numFor15KG": "rgb(124, 181, 236)",
                    "numFor50KG": "rgb(247, 163, 92)"
                },
                todayMap:{},
                todayChart:{},
                name:"todayBuy"
            }
        },
        methods: {
            setTodayLineOption(){
                let dayLineYData = [];
                let allShopName = [];
                let changeName;
                let dayLineXData = {"numFor2KG": [], "numFor5KG": [], "numFor15KG": [], "numFor50KG": []};
                let _this = this;
                this.allResource.todayOrderData.forEach(function (shop, i) {
                    dayLineYData.push(shop['shopName']);
                    for (let key in dayLineXData) {
                        dayLineXData[key].push(shop[key]);
                    }
                    allShopName.push(shop['shopName']);
                    _this.todayLineOption.yAxis.data = dayLineYData;
                    _this.todayLineOption.series.splice(0, _this.todayLineOption.series.length);
                    for (let key in dayLineXData) {
                        changeName = _this.allBottleName[key];
                        _this.todayLineOption.series.push({
                            name: changeName,
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {
                                normal: {color: _this.color[key]}
                            },
                            data: dayLineXData[key]
                        });
                    }
                })
                this.todayChart.setOption(this.todayLineOption);
            },
            setTodayMapOption(){
                let cakeData = [];
                let cakeName = [];
                let todayBuyTypeData=this.allResource.todayBuyType;
                let map = todayBuyTypeData[0];
                for (let key in map) {
                    if(key !="shopName"){
                        cakeData.push({value: todayBuyTypeData[0][key], name: key});
                        cakeName.push(key);}
                }
                this.todayMapOption.series[0].data = cakeData;
                this.todayMapOption.legend.data = cakeName;
                this.todayMap.setOption(this.todayMapOption);
            },
            setOption(){
                this.setTodayMapOption();
                this.setTodayLineOption();
            }
        },
        created(){
            this.$nextTick(()=>{
                this.todayChart=this.echart.init(document.getElementById('todayChart'));
                this.todayMap=this.echart.init(document.getElementById('todayMap'));
                this.setOption();
            })
        },
        computed: {}
        ,
        destroyed(){
            this.todayChart.dispose();
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #todayChart
        display inline-block
        width 65%
        height 100%
        transform translate3d(0,0,0)
    #todayMap
        display inline-block
        width 30%
        height 100%
        transform translate3d(0,0,0)
</style>
