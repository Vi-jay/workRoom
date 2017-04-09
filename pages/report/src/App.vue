<template>
        <div id="main">
        <report></report>
        </div>
</template>
<script type="text/ecmascript-6">
    let report = require('./page_frame/report.vue');
    export default {
        props:{
            show:Object
        },
        data() {
            return {}
        },
        created(){
            this.$nextTick(function () {
                document.querySelector('#main').onresize=function () {
                    console.log(123)
                }
            })
        },
        components: {
            report: report
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
        html,body{
                width: 100%;
                height: 100%;
        }
        #main{
                width: inherit;
                height: inherit;
        }
        body{
                background: url("../static/img/bg.jpg");
        }
</style>