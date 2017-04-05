<template>
    <div id="app">
        <router-view ref="compoents"></router-view><!--在此显示路由后显示的内容-->
        <v_nav class="container"></v_nav>
    </div>
</template>
<script type="text/ecmascript-6">
    let nav = require('./compoents/nav/nav.vue');
    export default {
        data() {
            return {}
        },
        created(){

        },
        components: {
            v_nav: nav
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    body{
        padding:20px 30px 90px 0;
        background-image: url("../static/img/bg.jpg");

    #app {
        .container {
            width: 100%;
            position: fixed;
            bottom: 0;
            z-index: 100;
        }
    }}
</style>