<template>
        <div id="main">
        <mian></mian>
        </div>
</template>
<script type="text/ecmascript-6">
    let mian = require('./page_frame/main.vue');
    import BScroll from 'better-scroll';
    export default {
        data() {
            return {}
        },
        created(){
            this.$nextTick(function () {
                let scroll = new BScroll(document.getElementById('main'), {
                    momentum: true,
                    scrollY: true,
                    HWCompositing: true,
                    probeType: 2,
                    click:true
                })
            })
        },
        components: {
            mian: mian
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
    overflow: hidden;
}
        body{
        background: url("../static/img/bg.jpg");
}
</style>