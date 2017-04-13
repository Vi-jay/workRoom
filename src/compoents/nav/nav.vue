<template>
    <div>
        <div class="navHand">
            <div class="menu" @click="Menu=!Menu">
                <nav_icon></nav_icon>
            </div>
        </div>
        <transition name="nav_show">
            <nav id="menu" class="nav" v-show="Menu">
                <ul>
                    <li>
                        <a href="" @click.prevent="showPage('report')">
                            <span class="icon">
                                    <i class="icon-file-text"></i>
                                </span>
                            <span>图表</span>
                        </a>
                    </li>
                    <li>
                        <a href="" @click.prevent="showPage('main')">
                            <span class="icon">
                                    <i class="icon-home"></i>
                                </span>
                            <span>主页</span>
                        </a>
                    </li>
                    <li>
                        <a href="" @click.prevent="showPage('manage')">
                            <span class="icon">
                                    <i class="icon-equalizer"></i>
                                </span>
                            <span>管理</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
let nav_icon = require("./nav-icon.vue")
export default {
    data() {
            return {
                Menu: false
            }
        },
        methods: {
            showPage(mark) {
                this.$emit('showPage', mark);
            }
        },
        components: {
            nav_icon: nav_icon
        }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "nav";
.navHand {
    position: fixed;
    bottom: 20px;
    right: 0;
    padding: 0 1%;
    display: flex;
    justify: center;
    align-items: center;
    z-index: 1000
}

.nav_show-enter-active,
.nav_show-leave-active {
    transition: opacity .5s
}

.nav_show-enter {
    opacity: 0
}

.nav_show-leave-active {
    opacity: 0;
}
</style>
