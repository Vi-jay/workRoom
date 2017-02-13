<template>
    <div>
        <div id="bottleTrack"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    require('../js/bmap');
    export default {
        props: {
            allResource: {
                type: Object
            }
        },
        data(){
            return {
                name:"bottleTrack",
                iconPath: 'image://../img/M@TA@Z_LH2NU]O_CS$1973U.png',
                coordinateWarehouse: {
                    "虎门能源大厦": [
                        113.688928,
                        22.828019
                    ],
                    "博美站": [
                        113.697827,
                        22.830519
                    ],
                    "中心站": [
                        113.682103,
                        22.824481
                    ],
                    "树田站": [
                        113.761973,
                        22.824781
                    ],
                    "上庙站": [
                        113.763962,
                        22.835113
                    ],
                    "矮岗站": [
                        113.750075,
                        22.848477
                    ],
                    "新丰站": [
                        113.739096,
                        22.847114
                    ],
                    "居岐站": [
                        113.747865,
                        22.831144
                    ],
                    "陈村站": [
                        113.731201,
                        22.862101
                    ],
                    "大宁站": [
                        113.720708,
                        22.82639
                    ],
                    "大板地站": [
                        113.731945,
                        22.81528
                    ],
                    "北栅站": [
                        113.726977,
                        22.841284
                    ],
                    "龙眼站": [
                        113.710054,
                        22.846737
                    ],
                    "赤岗站": [
                        113.718321,
                        22.85594
                    ],
                    "社岗站": [
                        113.701448,
                        22.837408
                    ],
                    "白沙站": [
                        113.675312,
                        22.856849
                    ],
                    "镇口站": [
                        113.664051,
                        22.840026
                    ],
                    "解放站": [
                        113.665911,
                        22.827771
                    ],
                    "金洲站": [
                        113.699231,
                        22.810751
                    ],
                    "郭武站": [
                        113.704163,
                        22.824416
                    ],
                    "小捷滘站": [
                        113.70411,
                        22.807393
                    ],
                    "南栅站": [
                        113.696301,
                        22.783833
                    ],
                    "平岗站": [
                        113.712892,
                        22.790896
                    ],
                    "东风站": [
                        113.684972,
                        22.79881
                    ],
                    "路东站": [
                        113.724473,
                        22.770515
                    ],
                    "沙角站": [
                        113.689415,
                        22.770571
                    ],
                    "凤凰山站": [
                        113.707353,
                        22.762476
                    ],
                    "渔港站": [
                        113.682116,
                        22.788814
                    ],
                    "海岛站": [
                        113.649961,
                        22.822829
                    ],
                    "九门寨站": [
                        113.672871,
                        22.809495
                    ],
                    "南面站": [
                        113.655873,
                        22.810177
                    ],
                    "稔洲站": [
                        113.640373,
                        22.85695
                    ]
                },
                color: ['#364F6B', '#3FC1C9', "A7B99E", "A7B99E"],
                series: [
                    {
                        name: "公司到门店",
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0.7,
                            color: '#cccccc',
                            symbolSize: 10
                        },
                        lineStyle: {
                            normal: {
                                color: '#cccccc',
                                width: 0,
                                curveness: 0.5
                            }
                        },
                        data: this.changeData
                    },
                    {
                        name: "公司到门店",
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        zlevel: 2,
                        effect: {
                            show: true,
                            scaleSize: 2,
                            period: 6,
                            color: '#cccccc',
                            shadowBlur: 10,
                            trailLength: 0,
                            symbol: 'image://../img/M@TA@Z_LH2NU]O_CS$1973U.png',
                            symbolSize: 20
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                lineStyle: {
                                    type: 'solid',
                                    shadowBlur: 10
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#A64942',//线的颜色
                                width: 2,
                                opacity: 0.4,
                                curveness: 0.5
                            }
                        },
                        markPoint: {
                            effect: {
                                show: true,
                                shadowBlur: 0
                            },
                            itemStyle: {
                                normal: {
                                    label: {show: false}
                                },
                                emphasis: {
                                    label: {position: 'top'}
                                }
                            }
                        },
                        data: this.changeData
                    },
                    {
                        name: "公司到门店",
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        zlevel: 3,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}',
                                textStyle: {
                                    color: "#A64942",
                                    fontSize: 13,
                                    fontWeight: "bolder"
                                }
                            }
                        },
                        symbol: 'image://../img/acd.png',
                        symbolSize: function (val) {
                            return val[2] / 4;    //每个对象的value值除以2 越大的门店图标越大
                        },
                        itemStyle: {
                            normal: {
                                color: '#a64942'
                            }
                        },
                        data: this.trackData
                    }],
                option: {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        textStyle: {
                            color: '#2C3E50'
                        },
                        selectedMode: 'single'
                    },
                    dataRange: {
                        min: 0,
                        max: 100,
                        x: 'right',
                        calculable: true,           //设置门店颜色
                        color: ['#2F1B41', '#4F6332', '#8561b0', '#8561b0', 'aqua'],
                        textStyle: {                            //客户颜色
                            color: '#fff'
                        }
                    },
                    bmap: {
                        center: [113.689167, 22.827634],
                        zoom: 14,
                        roam: false
                    },
                    series: this.series
                },
                companyToShopData: [],
                TrackChart: {},
                oldCount: 0

            }
        },
        methods: {
            convertData(data){
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let dataItem = data[i];
                    let fromCoord = this.coordinateWarehouse[dataItem[0].name];
                    let toCoord = this.coordinateWarehouse[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            },
            refreshTrack() {
                this.series[0].data = this.convertData(this.companyToShopData);
                this.series[1].data = this.convertData(this.companyToShopData);
                let _this = this;
                this.series[2].data = this.companyToShopData.map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: _this.coordinateWarehouse[dataItem[1].name].concat([dataItem[1].value])
                    };
                });
                this.option.series = this.series;
                this.TrackChart.setOption(this.option);
            },
            setOption(){
                let goToMap = [];
                let todayOrderData = this.allResource.todayOrderData;
                let _this = this;
                todayOrderData.forEach(function (item, i) {
                    let difference = todayOrderData[i]['CountTotal'] - _this.oldCount;
                    _this.oldCount = todayOrderData[i]['CountTotal'];
                    if (difference > 0) {
                        if (difference > 1 && difference < 3) {
                            goToMap.push([{name: "虎门能源大厦"}, {name: item['shopName'], value: 40}]);
                        }
                        else if (difference > 3 && difference < 5) {
                            goToMap.push([{name: "虎门能源大厦"}, {name: item['shopName'], value: 70}]);
                        }
                        else {
                            goToMap.push([{name: "虎门能源大厦"}, {name: item['shopName'], value: 100}]);
                        }
                    }
                });
                if (goToMap.length > 0) {
                    this.companyToShopData = goToMap;
                    this.refreshTrack();
                }

            }
        },
        created(){
            this.$nextTick(() => {
                this.TrackChart = this.echart.init(document.getElementById('bottleTrack'));
                this.setOption();
            })
        },destroyed(){
            this.TrackChart.dispose();
        },
        computed: {
            changeData(){
                return this.convertData(this.companyToShopData)
            },
            trackData(){
                return this.companyToShopData.map((dataItem) => {
                    return {
                        name: dataItem[1].name,
                        value: this.coordinateWarehouse[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            },
            symbolPath(){
                return 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891';
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    #bottleTrack
        width 100%
        height 100%
        transform translate3d(0, 0, 0)
</style>
