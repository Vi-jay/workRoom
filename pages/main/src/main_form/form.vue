<template>
    <div>
        <div id="form" v-show="!showPrint">
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
                            <div class="firstWrapper" @click.capture="changeView($event,'firstForm',0)">
                                <div class="form_lable">
                                    购买者信息
                                </div>
                                <form_first class="shrinkForm hideTool" :firstForm_Data="firstForm_Data" :class="{ shrinkForm_blur: cover[0].firstForm }">
                                    <div :class="{ 'form_cover':cover[0].firstForm }" slot="cover"></div>
                                </form_first>
                            </div>
                            <div class="secondWrapper" @click.capture="changeView($event,'secondForm',1)">
                                <div class="form_lable">
                                    商品添加
                                </div>
                                <form_second class="shrinkForm " :commodityData="commodityData" :class="{ shrinkForm_blur: cover[1].secondForm }">
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
                                            <el-button type="primary" v-bind:disabled="active !== 3" size="large">提交订单
                                            </el-button>
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
                    <form_second @back="backView" @complete="nextStep" :commodityData="commodityData"></form_second>
                </div>
            </transition>
        </div>
        <!-- 打印机表格 -->
        <div v-if="showPrint" id="printTable" style="text-align:center;width: 100%;height: 100%">
            <span>广东省食用农产品批发市场</span>
            <div>
                <span>(厚街农批市场)</span>
            </div>
            <span style="float: right;text-decoration-line:underline; ">编号:{{orderNumber}}</span>
            <div style="clear: both;height:2%"></div>
            <div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">买家名称:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">买家地址:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{firstForm_Data.customerName}}</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{firstForm_Data.address}}</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">买家电话:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">购买日期:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{firstForm_Data.phone_number}}</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{today}}</div>
            </div>
            <table class="table">
                <tr>
                    <th>品种</th>
                    <th>产地</th>
                    <th>重量</th>
                    <th>单价</th>
                    <th>金额</th>
                </tr>
                <tr v-for="item in commodityData">
                    <td>{{item.variety}}</td>
                    <td>{{item.origin}}</td>
                    <td>{{item.weight}}斤</td>
                    <td>{{item.unitPrice}}斤/元</td>
                    <td>{{item.sumMoney}}元</td>
                </tr>
            </table>
            <div style="clear: both;height:2%"></div>
            <div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">卖家名称:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">盖章:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{sellerForm.sellerName}}</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">假装有章</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">地址:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">联系电话:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{sellerForm.sellerArea}}</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{sellerForm.sellerPhone}}</div>
            </div>
            <span style="font-size: 12px;float: left;margin:3% 5% ">本销售凭证是假的本销售凭证是假的本销售凭证是假的本销售凭证是假的~</span>
        </div>
        <!-- 打印机表格 -->
    </div>
</template>
<script type="text/ecmascript-6">
let calculator = require('../compoents/calculator/calculator.vue'),
    form_first = require('./form_first.vue'),
    form_second = require('./form_second.vue');
export default {
    props: {
        sellerForm: Object
    },
    data() {
        return {
            showPrint: false,
            view: {
                mainView: true,
                firstForm: false,
                secondForm: false,
            },
            firstForm_Data: {
                customerName: '',
                phone_number: null,
                address: '',
            },
            commodityData: [{
                variety: '手枪',
                origin: '公安局',
                unitPrice: 5,
                weight: 12,
                sumMoney: 60,
                serialNumber: 200334
            }, {
                variety: '机关枪',
                origin: '中央兵库',
                unitPrice: 5,
                weight: 13,
                sumMoney: 65,
                serialNumber: 200335
            }, {
                variety: '手榴弹',
                origin: '中央兵库',
                unitPrice: 5,
                weight: 16,
                sumMoney: 80,
                serialNumber: 200336
            }, {
                variety: '火炮',
                origin: '中央兵库',
                unitPrice: 5,
                weight: 16,
                sumMoney: 80,
                serialNumber: 200336
            }, {
                variety: '原子弹',
                origin: '中央兵库',
                unitPrice: 5,
                weight: 19,
                sumMoney: 95,
                serialNumber: 200337
            }],
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
        changeView: function(event, someForm, index) {
            event.preventDefault();
            if (this.cover[index][someForm]) {
                this.$notify({
                    title: '警告通知',
                    message: '请完成所有步骤（完成所有区域内的提交）!!!',
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
        nextStep: function(someForm, dataName, data) {
            this.backView(someForm);
            var that = this;
            if (dataName in this) {
                this[dataName] = data;
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
                window.location.reload();
            };
        },

        submit: function() {
            if (this.active !== 3) {
                this.$notify({
                    title: '错误通知',
                    message: '请完成所有步骤（完成所有区域内的提交）!!!',
                    type: 'error',
                    offset: 200
                });
            } else {
                var flag = confirm("提交成功！是否需要打印？");
                if (flag) {
                    this.$message("打印成功！！(3秒后刷新页面)");
                    this.showPrint = true;
                    var that = this;
                    setTimeout(function() {
                        window.print();
                        setTimeout(function() {
                            that.showPrint = false;
                        })
                    }, 0);
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000)
                };
            }
        },


    },
    computed: {
        today() {
            let date = new Date();
            return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        }
    },
    components: {
        calculator: calculator,
        form_first: form_first,
        form_second: form_second,
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
            height: 636px;
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
                    padding-right: 11px;
                    border-right: 3.5px solid #815C5C;
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
                    flex: 90;
                    height: 100%;
                    padding: 6px 0 0;
                    zoom: 0.7;
                    cursor: pointer;
                    /*调整缩略图*/
                    .tool {
                        padding-top: 100px;
                    }
                    .linkman {
                        display: none;
                    }
                    #back_btn {
                        display: none;
                    }
                    .searchBar {
                        margin: 0 auto;
                    }
                    .customerTable {
                        flex: 1.8;
                        padding-left: 25px;
                        .el-table {
                            font-size: 22px;
                            width: 99%;
                        }
                    }
                    .commodityTable {
                        margin: 33px auto;
                    }
                    /*调整缩略图*/
                }
                .shrinkForm_blur {
                    filter: blur(2px);
                }
                .footer_content {
                    flex: 90;
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
        height: 756px;
        border: 5px ridge #cccccc;
        overflow: hidden;
    }
    .lazyShow-enter-active,
    .lazyShow-leave-active {
        transition: opacity .5s linear, transform .3s ease-in-out;
    }
    .lazyShow-enter {
        opacity: 0.3;
        transform: scale3d(0, 0, 1) rotate(360deg);
    }
    .lazyShow-leave-active {
        display: none;
    }
}

body {
    .el-scrollbar .el-select-dropdown__item {
        font-size: 18px;
        text-align: center;
    }
    #printTable {
        font-size: 1px;
        .table,
        td,
        th {
            text-align: center;
            border: 1px solid black;
        }
        td,
        th {
            width: 20%;
        }
        .table {
            width: 100%;
            margin: 0 auto;
            border-collapse: collapse;
        }
    }
}
</style>
