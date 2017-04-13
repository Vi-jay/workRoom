<template>
    <div id="main">
        <transition name="lazyShow">
        <mian v-show="openOrder"></mian>
        </transition>
        <div class="messageContainer">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../static/img/yibiaocheng.jpg" class="image">
                <div style="padding: 14px;">
                    <el-alert
                            title="新的订单"
                            type="success"
                            description="开启一张新的订单!!!"
                            :closable="false"
                            show-icon>
                    </el-alert>
                    <div class="button">
                        <el-tooltip  content="开启一张新的订单!!!" placement="bottom-start">
                        <el-button type="text" size="large"  @click="openOrder=!openOrder">Open!</el-button>
                        </el-tooltip>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    let mian = require('./main_form/form.vue');
    export default {
        data() {
            return {
                openOrder: false
            }
        },
        created() {
        },
        components: {
            mian: mian
        },
    }
</script>
<style lang="less" rel="stylesheet/less">
    html,
    body {
        width: 100%;
        height: 100%;
        background: url("../static/img/bg.jpg");
        .el-message .el-message__group p {
            font-size: 22px;
        }
        #main {
            width: inherit;
            height: inherit;
            overflow: hidden;
            .messageContainer {
                display: flex;
                width: inherit;
                height: inherit;
                align-items: center;
                justify-content: center;
                .button{
                    text-align: center;
                    margin: 0 auto;
                    font-size: 25px;

                }
                .el-button--large{
                    font-size: 50px;
                }
                .el-alert .el-alert__description{
                    font-size: 25px;
                }
            }

        }
        .lazyShow-enter-active,
        .lazyShow-leave-active {
            transition: opacity .5s linear, transform .5s ease-in-out;
        }
        .lazyShow-enter {
            opacity: 0.3;
            transform: translate(-100%,0);
        }
        .lazyShow-leave-active {
            display: none;
        }
    }

</style>
