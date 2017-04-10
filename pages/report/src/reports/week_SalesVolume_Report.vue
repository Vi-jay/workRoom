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
        created(){
            this.$nextTick(function () {
                var myChart = echarts.init(this.$refs.main);
                myChart.setOption(this.getDomeOption());
            });
        },
        methods: {
            getDomeOption(){
                return {
                    title: {
                        text: '本周商品销售量'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['西瓜', '苹果', '香蕉', '榴莲', '核桃']
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
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    series: [{
                        name: '西瓜',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    }, {
                        name: '苹果',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }, {
                        name: '香蕉',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }, {
                        name: '榴莲',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    }, {
                        name: '核桃',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }]
                };
        }
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    #report {
        width: 100%;
        height: 100%;
    }

    .report {
        width: 100%;
        height: 90%;
    }
</style>
