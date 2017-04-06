<template>
    <div id="app">
        <transition name="lazyShow">
        <router-view ref="compoents" style="width: 100%;height: 100%"></router-view><!--在此显示路由后显示的内容-->
        </transition>
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
    html{
        width: 100%;
        height:100%;
    }
    body{
        height: 100%;
        padding:20px 30px 90px 0;
        background-image: url("../static/img/bg.jpg");
        background-attachment: fixed;
    #app {
        height: inherit;
        .container {
            width: 100%;
            position: fixed;
            bottom: 0;
            z-index: 100;
        }

        .lazyShow-enter-active, .lazyShow-leave-active {
            transition: opacity .5s
        }
        .lazyShow-enter {
            opacity: 0
        }
        .lazyShow-leave-active {
            display: none;
        }
    }}
</style>