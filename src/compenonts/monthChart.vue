<template>
    <div>
        <div id="monthChart"></div>
        <div id="monthMap"></div>
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
                monthLineOption: {
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
                name:"monthBuy",
                monthChart: {}
                ,
                monthMap: {}
                ,
                allBottleName: {numFor2KG: "2KG", numFor5KG: "5KG", numFor15KG: "15KG", numFor50KG: "50KG"}
                ,
                monthMapOption: {
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
                }
            }
        },
        methods: {
            setMonthLineOption(){
                let monthLineYData = [];
                let allShopName = [];
                let changeName;
                let monthLineXData = {"numFor2KG": [], "numFor5KG": [], "numFor15KG": [], "numFor50KG": []};
                let _this = this;
                this.allResource.monthOrderData.forEach(function (shop, i) {
                    monthLineYData.push(shop['shopName']);
                    for (let key in monthLineXData) {
                        monthLineXData[key].push(shop[key]);
                    }
                    allShopName.push(shop['shopName']);
                    _this.monthLineOption.yAxis.data = monthLineYData;
                    _this.monthLineOption.series.splice(0, _this.monthLineOption.series.length);
                    for (let key in monthLineXData) {
                        changeName = _this.allBottleName[key];
                        _this.monthLineOption.series.push({
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
                            data: monthLineXData[key]
                        });
                    }
                })
                this.monthChart.setOption(this.monthLineOption);
            },
            setMonthMapOption(){
                let cakeData = [];
                let cakeName = [];
                let monthBuyTypeData = this.allResource.monthBuyType;
                let map = monthBuyTypeData[0];
                for (let key in map) {
                    if (key != "shopName") {
                        cakeData.push({value: monthBuyTypeData[0][key], name: key});
                        cakeName.push(key);
                    }
                }
                this.monthMapOption.series[0].data = cakeData;
                this.monthMapOption.legend.data = cakeName;
                this.monthMap.setOption(this.monthMapOption);
            },
            setOption(){
                this.setMonthMapOption();
                this.setMonthLineOption();
            }
        },
        created(){
            this.$nextTick(() => {
                this.monthChart = this.echart.init(document.getElementById('monthChart'));
                this.monthMap = this.echart.init(document.getElementById('monthMap'));
                this.setOption();
            })
        }
        ,
        destroyed(){
            this.monthChart.dispose();
            this.monthMap.dispose();
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
        #monthChart
            display inline-block
            width 65%
            height 100%
            transform translate3d(0,0,0)
        #monthMap
            display inline-block
            width 30%
            height 100%
            transform translate3d(0,0,0)
</style>
