<template>
    <div id="app" >
        <transition name="lazyShow">
            <iframe src="http://localhost:7007" width="100%" height="100%" frameborder="0" v-if="main" id="main"></iframe>
        </transition>
        <transition name="lazyShow">
            <iframe src="http://localhost:7008" width="100%" height="100%" frameborder="0" v-if="manage"></iframe>
        </transition>
        <transition name="lazyShow">
            <iframe src="http://localhost:7009" width="100%" height="100%" frameborder="0" v-if="report" id="report"></iframe>
        </transition>
        <div class="navHand">
        </div>
        <v_nav class="container" v-on:showPage="changePage" ></v_nav>
    </div>
</template>
<script type="text/ecmascript-6">
let nav = require('./compoents/nav/nav.vue');
export default {
    data() {
            return {
                main: true,
                manage: false,
                report: false,
            }
        },
        created() {
            

        },
        components: {
            v_nav: nav
        },
        methods: {
            changePage(mark) {
                if (mark) {
                    this[mark] = true;
                    for (let key in this.$data) {
                        if (key !== mark) {
                            this[key] = false;
                        }
                    }
                }
            }
        }
}
</script>
<style lang="less" rel="stylesheet/less">
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

body {
    background-image: url("../static/img/bg.jpg");
    background-attachment: fixed;
    #app {
        width: inherit;
        height: inherit;
        .container {
            width: 100%;
            position: fixed;
            bottom: 0;
            z-index: 20;
        }
        .lazyShow-enter-active,
        .lazyShow-leave-active {
            transition: opacity .5s
        }
        .lazyShow-enter {
            opacity: 0
        }
        .lazyShow-leave-active {
            display: none;
        }
        
    }
      .el-loading-spinner .el-loading-text {
            font-size: 33px;
        }
}
</style>
