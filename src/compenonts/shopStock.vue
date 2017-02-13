<template>
    <div>
        <div id="shopStock"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            allResource: {
                type: Object,
            }
        },
        data(){
            return {
                shopStockOption: {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: []
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: []
                    },
                    series: []
                },
                allBottleName: {numFor2KG: "2KG型气瓶", numFor5KG: "5KG型气瓶", numFor15KG: "15KG型气瓶", numFor50KG: "50KG型气瓶"},
                itemColor: {
                    "2KG型气瓶": "rgb(244, 91, 91)",
                    "5KG型气瓶": "rgb(128, 133, 233)",
                    "15KG型气瓶": "rgb(141, 70, 84)",
                    "50KG型气瓶": "rgb(124, 181, 236)"
                },
                shopStock: {},
                name:"shopStock"

            }
        },
        methods: {
            setOption(){
                let allData = this.allResource.shopStock;
                let shopStockOption = this.shopStockOption;
                let allShopName = [];
                let bottleName;
                let legendData = [];
                let chartData = {};
                allData.forEach((shop, index) => {
                    allShopName.push(shop['shopName']);
                    for (let key in shop) {
                        if (key != 'shopName') {
                            bottleName = this.allBottleName[key];
                            if (!chartData[bottleName]) {
                                chartData[bottleName] = [];
                            }
                            chartData[bottleName].push(shop[key]);
                            legendData.push(bottleName);
                        }
                    }
                });
                shopStockOption.yAxis.data = allShopName;
                shopStockOption.legend.data = legendData;
                shopStockOption.series.splice(0, shopStockOption.series.length);
                for (let key in chartData) {
                    shopStockOption.series.push({
                        name: key,
                        type: 'bar',
                        data: chartData[key]
                        , itemStyle: {
                            normal: {color: this.itemColor[key]}
                        }
                    })
                }
                this.shopStockOption = shopStockOption;
                this.shopStock.setOption(this.shopStockOption);
            }
        },
        created(){
            this.$nextTick(() => {
                this.shopStock = this.echart.init(document.getElementById('shopStock'));
                if (JSON.stringify(this.allResource.shopStock) != "{}") {
                    this.setOption();
                }
            });
        },
        destroyed(){
            this.shopStock.dispose();
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #shopStock
        width 100%
        height 100%
        transform translate3d(0, 0, 0)

</style>
