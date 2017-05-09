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
        html, body {
                width: 100%;
                height:100%;
                overflow: hidden;
        }
        #main {
                width: inherit;
                height: inherit;
                .accordion_nav{
                        position: absolute;
                        left: 0;
                        width: 19%;
                        top:80px;
                        padding-top:50px;
                }
                .context{
                        width: 80%;
                        height: 90%;
                        top:70px;
                        position: absolute;
                        left: 25%;
                        padding-top: 25px;
                }
        }

        body {
                background: url("./asset/img/bg.jpg");
        }
</style>