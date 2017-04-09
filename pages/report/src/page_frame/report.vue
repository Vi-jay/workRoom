<template>
    <div id="report">
        <div ref="main" class="report"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    // 引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/title');


    export default {
        components: {}, created(){
            this.$nextTick(function () {
                var myChart = echarts.init(this.$refs.main);
                myChart.setOption(this.getDomeOption());
            });
        },
        methods: {
            getDomeOption(){
              return   {
                    title: {
                       text: '本月销量及增长率'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    grid: {
                        containLabel: true
                    },
                    legend: {
                        data: ['增长率','销量']
                    },
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: ['4/1','4/2','4/3','4/4','4/5','4/6','4/7','4/8','4/9','4/10','4/11','4/12','4/13','4/14','4/15','4/16','4/17']
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '增长率',
                        min: 0,
                        max: 50,
                        position: 'right',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }, {
                        type: 'value',
                        name: '销量',
                        min: 0,
                        max: 3000,
                        position: 'left'
                    }],
                    series: [{
                        name: '增长率',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                        data: [1,13,37,35,15,13,25,21,6,45,32,2,4,13,6,4,11]
                    }, {
                        name: '销量',
                        type: 'bar',
                        yAxisIndex: 1,
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: [209,236,325,439,507,576,722,879,938,1364,1806,1851,1931,2198,2349,2460,2735]
                    }]
                };
            }
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    html,body{
        width: 100%;
        height: 100%;
    }
    #report {
        width: inherit;
        height: inherit;
    }

    .report {
        width: 100%;
        height: 90%;
    }
</style>
