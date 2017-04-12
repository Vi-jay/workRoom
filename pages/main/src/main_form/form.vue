<template>
    <div id="form">
        <transition name="lazyShow">
            <div v-show="view.mainView">
                <calculator></calculator>
                <div class="content">
                    <div class="serial_number">
                        <div class="right_tag"><span>日期</span>：{{orderDate}}</div>
                        <div class="right_tag"><span>订单编号</span>：{{orderNumber}}</div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="formWrapper" v-show="active === 1" @click="changeView('firstForm')">
                        <div class="form_lable">
                            购买者信息
                        </div>
                        <form_first class="shrinkForm">
                            <div :class="{ 'form_cover':cover.firstForm }" slot="cover"></div>
                        </form_first>
                    </div>
                    <div class="formWrapper" v-show="active === 1" @click="changeView('secondForm')">
                        <div class="form_lable">
                            商品添加
                        </div>
                        <form_second class="shrinkForm">
                            <div :class="{ 'form_cover':cover.secondForm }" slot="cover"></div>
                        </form_second>
                    </div>
                    <div class="formWrapper" v-show="active === 1" @click="changeView('thirdForm')">
                        <div class="form_lable">
                            销售者信息
                        </div>
                        <form_third class="shrinkForm">
                            <div :class="{ 'form_cover':cover.thirdForm }" slot="cover"></div>
                        </form_third>
                    </div>
                    <div class="footer" v-show="active === 1">
                        <div class="form_lable">
                            结算
                        </div>
                        <div class="footer_content">
                            <div class="step_container">
                                <el-steps :center=true :active="active" finish-status="success">
                                    <el-step title="购买者信息"></el-step>
                                    <el-step title="填写商品信息"></el-step>
                                    <el-step title="销售者信息"></el-step>
                                    <el-step title="完成"></el-step>
                                </el-steps>
                                <div class="seal"></div>
                            </div>
                            <div class="success_btn">
                                <el-button type="primary" @click="submit" size="large">提交订单</el-button>
                                <el-button size="large">取消订单</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="lazyShow">
            <div v-show="view.firstForm" class="enlargeForm">
                <form_first></form_first>
            </div>
        </transition>
        <transition name="lazyShow">
            <div v-show="view.secondForm" class="enlargeForm">
                <form_second></form_second>
            </div>
        </transition>
        <transition name="lazyShow">
            <div v-show="view.thirdForm" class="enlargeForm">
                <form_third></form_third>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
let calculator = require('../compoents/calculator/calculator.vue'),
    form_first = require('./form_first.vue'),
    form_second = require('./form_second.vue'),
    form_third = require('./form_third.vue');
export default {
    data() {
            return {
                view: {
                    mainView: true,
                    firstForm: false,
                    secondForm: false,
                    thirdForm: false
                },
                cover: {
                    firstForm: false,
                    secondForm: true,
                    thirdForm: true
                },
                orderNumber: 132165465456654,
                orderDate: new Date().toLocaleString(),
                active: 1,
            }
        },
        methods: {
            changeView: function(someForm) {
                if (this.cover[someForm]) {
                    this.$notify({
                        title: '警告通知',
                        message: '请先填写完整未被锁定区域内容!!!',
                        type: 'warning',
                        offset: 200
                    });
                    return;
                }
                this.view.mainView = false;
                this.view[someForm] = true;
            },
            submit: function() {
                this.$notify({
                    title: '错误通知',
                    message: '请填写完整必填信息!!',
                    type: 'error'
                });
            }

        }, components: {
            calculator: calculator,
            form_first: form_first,
            form_second: form_second,
            form_third: form_third,
        },
};
</script>
<style lang="less" rel="stylesheet/less">
#form {
    .content {
        padding: 0 1%;
        .serial_number {
            margin: 90px 0 0 0;
            border-bottom: 3px dashed #6A2727;
            .right_tag {
                font-size: 20px;
                background-color: #8391a5;
                padding: 0 5px;
                height: 35px;
                line-height: 32px;
                color: #fff;
                border-radius: 4px;
                box-sizing: border-box;
                border: 1px solid transparent;
                white-space: nowrap;
                display: inline-block;
                -webkit-user-select: none;
                -moz-user-select: none;
                cursor: default;
                margin: 0 20px 8px 0;
                float: right;
                & span {
                    color: darken(#f20d59, 10%);
                }
            }
            .clear {
                clear: right;
            }
        }
        .formWrapper,
        .footer {
            height: 129.5px;
            display: flex;
            overflow: hidden;
            &:nth-child(3n+1) {
                border-bottom: 5px ridge #D4C8CC;
            }
            &:nth-child(3n+2) {
                border-bottom: 5px ridge #D7D5E7;
            }
            &:nth-child(3n+3) {
                border-bottom: 5px ridge #cccccc;
            }
            .form_lable {
                font-size: 20px;
                width: 20px;
                line-height: 24px;
                flex: 1;
                letter-spacing: 2px;
                text-align: center;
                writing-mode: tb-rl;
                user-select: none;
                cursor: default;
            }
            .form_cover {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(255, 255, 255, 0.7);
                z-index: 300;
                cursor: not-allowed;
            }
            .shrinkForm {
                position: relative;
                border-left: 5px solid #815C5C;
                flex: 90;
                margin-left: 14px;
                padding: 6px 40px 0;
                zoom: 0.6;
            }
            .footer_content {
                border-left: 3px solid #815C5C;
                flex: 90;
                margin-left: 8.4px;
                .step_container {
                    position: relative;
                    padding: 10px 60px 3px;
                    .seal {
                        width: 185px;
                        height: 194px;
                        border-radius: 50%;
                        background: url('../../static/img/seal.png') no-repeat;
                        background-size: 500px 500px;
                        background-position: -45px 0;
                        position: absolute;
                        top: 0;
                        right: 300px;
                        zoom: 0.5;
                    }
                }
                .success_btn {
                    padding-left: 50%;
                    margin-left: -100px;
                }
            }
        }
        .footer {
            height: 120px;
            box-sizing: content-box;
        }
    }
    .enlargeForm {
        height: 643px;
        border: 5px ridge #cccccc
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
</style>
