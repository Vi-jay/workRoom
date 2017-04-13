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
                    <div class="wrapperContainer">
                        <div class="firstWrapper" @click="changeView('firstForm',0)">
                            <div class="form_lable">
                                购买者信息
                            </div>
                            <form_first class="shrinkForm" :firstForm_Data="firstForm_Data">
                                <div :class="{ 'form_cover':cover[0].firstForm }" slot="cover"></div>
                            </form_first>
                        </div>
                        <div class="secondWrapper" @click="changeView('secondForm',1)">
                            <div class="form_lable">
                                商品添加
                            </div>
                            <form_second class="shrinkForm">
                                <div :class="{ 'form_cover':cover[1].secondForm }" slot="cover"></div>
                            </form_second>
                        </div>
                        <div class="footer">
                            <div class="form_lable">
                                结算
                            </div>
                            <div class="footer_content">
                                <div class="step_container">
                                    <el-steps :center=true :active="active" finish-status="success">
                                        <el-step title="购买者信息"></el-step>
                                        <el-step title="填写商品信息"></el-step>
                                        <el-step title="完成"></el-step>
                                    </el-steps>
                                    <div class="seal"></div>
                                </div>
                                <div class="success_btn">
                                    <a @click="submit">
                                        <el-button type="primary" v-bind:disabled="active !== 3" size="large">提交订单</el-button>
                                    </a>
                                    <el-button size="large" @click="callOff">取消订单</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="lazyShow">
            <div v-show="view.firstForm" class="enlargeForm">
                <form_first @back="backView" @complete="nextStep" :firstForm_Data="firstForm_Data"></form_first>
            </div>
        </transition>
        <transition name="lazyShow">
            <div v-show="view.secondForm" class="enlargeForm">
                <form_second @back="backView" @complete="nextStep"></form_second>
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
                },
                firstForm_Data: {
                    customerName: '李四',
                    phone_number: '',
                    address: '',
                },
                cover: [{
                    firstForm: false
                }, {
                    secondForm: true
                }],
                orderNumber: 132165465456654,
                orderDate: new Date().toLocaleString(),
                active: 1,
            }
        },
        methods: {
            changeView: function(someForm, index) {
                if (this.cover[index][someForm]) {
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
            backView: function(someForm) {
                this.view.mainView = true;
                this.view[someForm] = false;
            },
            nextStep: function(someForm,dataName,data) {
                this.backView(someForm);
                var that = this;
                if(dataName in this){
                    this[dataName]=data;
                }
                this.cover.reduce(function(pre, cur, index, arr) {
                    if (pre && (someForm in pre)) {
                        for (let key in cur) {
                            if (cur[key]) {
                                cur[key] = false;
                                that.active++;
                            }
                            return;
                        }
                    } else if (someForm == "secondForm" && that.active < 3) {
                        that.active++;

                    }
                    return cur;
                })
            },
            callOff: function() {
                var flag = confirm("确定取消本次订单？？");
                if (flag) {
                    this.$message("不允许取消~~");
                };
            },

            submit: function() {
                if (this.active !== 3) {
                    this.$notify({
                        title: '错误通知',
                        message: '请填写完整必填信息!!',
                        type: 'error',
                        offset: 200
                    });
                } else {
                    var flag = confirm("提交成功！是否需要打印？");
                    if (flag) {
                        this.$message("打印成功！！(3秒后刷新页面)");
                        setTimeout(function() {
                            location.reload();
                        }, 3000)
                    };
                }
            },


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
        .wrapperContainer {
            height: 503px;
            .firstWrapper {
                height: 38%;
            }
            .secondWrapper {
                height: 40%;
            }
            .footer {
                height: 25%;
            }
            .firstWrapper,
            .secondWrapper,
            .footer {
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
                    bottom: 0;
                    right: 0;
                    background: rgba(190, 190, 190, 0.7);
                    z-index: 300;
                    cursor: not-allowed;
                }
                .shrinkForm {
                    position: relative;
                    border-left: 5px solid #815C5C;
                    flex: 90;
                    height: 100%;
                    margin-left: 14px;
                    padding: 6px 0 0;
                    zoom: 0.7;
                    cursor: pointer;
                }
                .footer_content {
                    border-left: 3.5px solid #815C5C;
                    flex: 90;
                    margin-left: 9.4px;
                    .step_container {
                        position: relative;
                        padding: 16px 60px 3px;
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
                            zoom: 0.55;
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
    }
    .enlargeForm {
        height: 643px;
        border: 5px ridge #cccccc
    }
    .lazyShow-enter-active,
    .lazyShow-leave-active {
        transition: opacity .5s linear, transform .5s ease-in-out;
    }
    .lazyShow-enter {
        opacity: 0.3;
        transform: scale(0);
    }
    .lazyShow-leave-active {
        display: none;
    }
}
</style>
