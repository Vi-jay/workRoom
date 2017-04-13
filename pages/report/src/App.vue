<template>
    <div id="main">
        <accordion_nav  class="accordion_nav"></accordion_nav>
        <router-view class="context"></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    let accordion_nav = require('./compoents/accordion/accordion_nav.vue');
    export default {
        data() {
            return {}
        },
        created(){

        },
        components: {
            accordion_nav: accordion_nav
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    #main {
        width: 1024px;
        height: 662px;
        .accordion_nav{
            position: absolute;
            left: 0;
            width: 19%;
            padding-top:50px;
        }
        .context{
            width: 80%;
            height: 90%;
            position: absolute;
            left: 20%;
            padding-top: 40px;
        }
    }

    body {
        background: url("../static/img/bg.jpg");
    }
</style>