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
                name:"todayBuy",
                todaySetTime:{},
                openMonthChangeFlag:true
            }
        },
        methods: {
            setTodayLineOption(){
                console.log("i also am run")
                let pageNum = 5;
                let todayLineYData = [];
                let allShopName = [];
                let changeName;
                let todayLineXData = {"numFor2KG": [], "numFor5KG": [], "numFor15KG": [], "numFor50KG": []};
                let _this = this;
                let todayData = this.allResource.todayOrderData;
                todayData.forEach(function (shop, i) {
                    let cnt = parseInt(i / pageNum);
                    let changeTime = _this.openMonthChangeFlag ? 500 : (cnt + 1) * 5000;
                    _this.todaySetTime= setTimeout(() => {
                        if(!_this.todayChart.isDisposed()){
                            if (i % pageNum == 0) {
                                todayLineYData = [];
                                allShopName = [];
                                todayLineXData = {"numFor2KG": [], "numFor5KG": [], "numFor15KG": [], "numFor50KG": []};
                            }
                            todayLineYData.push(shop['shopName']);
                            for (let key in todayLineXData) {
                                todayLineXData[key].push(shop[key]);
                            }
                            if ((i + 1) % pageNum == 0 || (i + 1) == todayData.length) {
                                _this.openMonthChangeFlag = false;
                                _this.todayLineOption.yAxis.data = todayLineYData;
                                _this.todayLineOption.series.splice(0, _this.todayLineOption.series.length);
                                for (let key in todayLineXData) {
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
                                        data: todayLineXData[key]
                                    });
                                }
                                _this.todayChart.setOption(_this.todayLineOption);
                                if ((i + 1) == todayData.length) {

                                    _this.setTodayLineOption();
                                }
                                return "";
                            }}
                    }, changeTime);
                })
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
