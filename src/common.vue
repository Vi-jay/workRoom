<template>

</template>
<script type="text/ecmascript-6">
    import  Vue from 'vue';
    let echart = require('echarts');
    let wj_component = new Vue();

    wj_component.install = function (Vue, options) {
        Vue.mixin({   //在这里定义的东西都会被vue使用时继承过去  可以在这定义全局组件 将会被使用者继承
            methods: {
                getPreDay(date, day) {
                    let timestamp = Date.parse(date);
                    timestamp = timestamp - day * 24 * 60 * 60 * 1000;
                    let newDate = new Date();
                    newDate.setTime(timestamp);
                    return this.getYYYYMMDDStr(newDate);
                },
                NowDateTime() {
                    let curr_time = new Date();
                    return this.getYYYYMMDDStr(curr_time);
                },
                getYYYYMMDDStr(curr_time) {
                    let year = curr_time.getFullYear();
                    let M = curr_time.getMonth() + 1;
                    let MM = (M < 10) ? "0" + M : M;
                    let D = curr_time.getDate();
                    let DD = (D < 10) ? "0" + D : D;
                    return year + "-" + MM + "-" + DD;
                },
                getDate(datestr) {
                    let temp = datestr.split("-");
                    let date = new Date(temp[0], temp[1] - 1, temp[2]);
                    return date;
                }
            },
            components: {},
            data(){
                return{
                    echart:echart
                }
            }
        });
    };
    export default {wj_component};
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
