<template>
    <div>
        <div id="form" v-show="!showPrint">
            <transition name="lazyShow">
                <div v-show="view.mainView">
                    <!-- 秤重仪 -->
                    <calculator></calculator>
                    <!-- 秤重仪 -->
                    <!-- 日期&编号 -->
                    <div class="serial_number">
                        <div class="right_tag"><span>日期</span>：{{orderDate}}</div>
                        <div class="right_tag"><span>订单编号</span>：{{orderNumber}}</div>
                        <div class="clear">
                        </div>
                    </div>
                    <!-- 日期&编号 -->
                    <!-- 列表内容 -->
                    <div class="list_content">
                        <div class="customer_info" @click.capture="changeView($event,'firstForm',0)">
                            <div class="content_lable">
                                购买者信息
                            </div>
                            <!--<customerInfo class="inner_content" :firstForm_Data="firstForm_Data" :class="{ inner_content_blur: cover[0].firstForm }">-->
                            <!--<div slot="cover"></div>-->
                            <!--</customerInfo>-->
                            <el-tooltip class="item" effect="dark" content="选择或新增购买用户" placement="top">
                                <div class="inner_content" :class="{ 'cover':cover[0].firstForm }">
                                    <div class="inner_content_customerInfo">
                                        <el-form :model="firstForm_Data" ref="firstForm_Data" label-width="210px" style="margin-left: -70px">
                                            <el-form-item label="客户名称">
                                                <el-input v-model="firstForm_Data.customerName" placeholder="请输入客户名称"></el-input>
                                            </el-form-item>
                                            <el-form-item label="客户电话">
                                                <el-input v-model="firstForm_Data.phone_number" placeholder="请输入客户电话"></el-input>
                                            </el-form-item>
                                            <el-form-item label="客户地址">
                                                <el-input v-model="firstForm_Data.address" placeholder="请输入客户地址"></el-input>
                                            </el-form-item>
                                            <el-form-item label="详细地址">
                                                <el-input placeholder="请输入详细地址" v-model="firstForm_Data.addressDetail"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                    <div class="inner_content_tip">
                                        <el-alert title="小提示:" type="success" :closable="false" description="点击此区域任意位置可进入选择用户界面~~">
                                        </el-alert>
                                    </div>
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="commodity_info" @click.capture="changeView($event,'secondForm',1)">
                            <div class="content_lable">
                                商品列表
                            </div>
                            <!--<commodityInfo class="inner_content " :commodityData="commodityData" :class="{ inner_content_blur: cover[1].secondForm }">-->
                            <!--<div  slot="cover"></div>-->
                            <!--</commodityInfo>-->
                            <el-tooltip class="item" effect="dark" content="新增商品条目" placement="bottom">
                                <div class="inner_content" :class="{ 'cover':cover[1].secondForm }">
                                    <div class="inner_content_commodityInfo">
                                        <el-table stripe :data="commodityData" border style="width: 99%;margin-bottom: 15px" height="300">
                                            <el-table-column label="订单商品条目">
                                                <el-table-column fixed prop="variety" label="品种">
                                                </el-table-column>
                                                <el-table-column prop="origin" label="产地">
                                                </el-table-column>
                                                <el-table-column prop="unitPrice" label="单价">
                                                </el-table-column>
                                                <el-table-column prop="weight" label="重量">
                                                </el-table-column>
                                                <el-table-column prop="serialNumber" label="编号">
                                                </el-table-column>
                                                <el-table-column prop="sumMoney" label="金额(元)">
                                                </el-table-column>
                                            </el-table-column>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="inner_content_tip">
                                        <el-alert title="小提示:" type="info" :closable="false" description="点击此区域任意位置可进入添加商品界面~~">
                                        </el-alert>
                                    </div>
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="footer_info">
                            <div class="content_lable">
                                订单结算
                            </div>
                            <div class="footer_container">
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
                                        <el-button type="primary" size="large">提交订单
                                        </el-button>
                                    </a>
                                    <el-button size="large" @click="callOff">取消订单</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 列表内容 -->
                </div>
            </transition>
            <transition name="lazyShow">
                <div v-show="view.firstForm" class="enlargeForm">
                    <customerInfo @back="backView" @complete="nextStep" :firstForm_Data="firstForm_Data"></customerInfo>
                </div>
            </transition>
            <transition name="lazyShow">
                <div v-show="view.secondForm" class="enlargeForm">
                    <commodityInfo @back="backView" @complete="nextStep" :commodityData="commodityData"></commodityInfo>
                </div>
            </transition>
        </div>
        <!-- 打印机表格 -->
        <div v-show="showPrint" id="printTable" style="text-align:center;width: 100%;height: 100%">
            <span>广东省食用农产品批发市场</span>
            <div>
                <span>(富民农批市场)</span>
            </div>
            <span style="float: right;text-decoration-line:underline; ">编号:{{orderNumber}}</span>
            <div style="clear: both;height:2%"></div>
            <div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">买家名称:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">买家地址:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{firstForm_Data.customerName}}</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{computedAddress}}</div>
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
                <tr v-for="item in computedCommodityData">
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
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">档口地址:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">联系电话:</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{sellerForm.sellerAddress}}</div>
                <div style="width: 40%;text-align: left;padding:2% 0 0 5% ">{{sellerForm.sellerPhone}}</div>
            </div>
            <span style="font-size: 12px;float: left;margin:3% 5% ">本销售凭证是假的本销售凭证是假的本销售凭证是假的本销售凭证是假的~</span>
        </div>
        <!-- 打印机表格 -->
    </div>
</template>
<script type="text/ecmascript-6">
let calculator = require('../compoents/calculator/calculator.vue'),
    customerInfo = require('./customerInfo.vue'),
    commodityInfo = require('./commodityInfo.vue');
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
                address: [],
                addressDetail: ''
            },
            commodityData: [{
                variety: '手枪',
                origin: '公安局',
                unitPrice: 5,
                weight: 12,
                sumMoney: 60,
                serialNumber: 204334
            }, {
                variety: '机关枪',
                origin: '中央兵库',
                unitPrice: 5,
                weight: 13,
                sumMoney: 65,
                serialNumber: 220335
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
                serialNumber: 100336
            }, {
                variety: '原子弹',
                origin: '中央兵库',
                unitPrice: 5,
                weight: 19,
                sumMoney: 95,
                serialNumber: 204337
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
                    message: '请完成上一步骤!!!',
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
            this.$confirm(`是否放弃订单？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '成功放弃订单,正在刷新页面   :)'
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消放弃订单操作   :('
                });
            });


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
                this.$confirm('提交成功！是否需要打印？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.showPrint = true;
                    var that = this;
                    document.querySelector(".el-message-box__wrapper").style.display = "none";
                    setTimeout(function() {
                        window.print();
                        setTimeout(function() {
                            that.showPrint = false;
                            that.$message("打印成功！！2秒后刷新页面 :)");
                        }, 0)
                    }, 0);
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000)

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消打印 :('
                    });
                });
            }
        },


    },
    computed: {
        today() {
            let date = new Date();
            return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        },
        computedAddress() {
            return this.firstForm_Data.address.join("");
        },
        computedCommodityData() {
            let myData = [];
            this.commodityData.forEach((cur) => {
                for (let key in cur) {
                    if (Array.isArray(cur[key])) {
                        cur[key] = cur[key].join("");
                    }
                }
                myData.push(cur);
            });
            return myData;
        }
    },
    components: {
        calculator: calculator,
        customerInfo: customerInfo,
        commodityInfo: commodityInfo,
    },
};
</script>
<style lang="less" rel="stylesheet/less">
#form {
    .serial_number {
        //编号&时间
        padding: 0 1%;
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
    .list_content {
        //列表信息开始
        height: 636px;
        .customer_info {
            height: 28%;
        }
        .commodity_info {
            height: 50%;
        }
        .footer_info {
            height: 120px;
            box-sizing: content-box;
        }
        .customer_info,
        .commodity_info, //公共信息
        .footer_info {
            display: flex;
            overflow: hidden;
            border-bottom: 5px ridge #D4C8CC;
            cursor: pointer;
            .content_lable {
                //列表左侧的lable
                font-size: 20px;
                width: 20px;
                line-height: 24px;
                flex: 1;
                letter-spacing: 2px;
                text-align: center;
                writing-mode: tb-rl;
                cursor: default;
                padding: 0 11px;
                border-right: 3.5px solid #815C5C;
            }
            .cover {
                background: rgba(190, 190, 190, 0.7);
                filter: blur(2px);
                cursor: not-allowed;
            }
            .inner_content {
                //三个格子中的内容
                position: relative;
                flex: 90;
                height: 100%;
                padding: 6px 0 0;
                display: flex;
                justify-content: space-between;
                .inner_content_customerInfo,
                .inner_content_commodityInfo {
                    flex: 3;
                    margin: 0 20px 0 20px;
                    display: flex;
                    align-items: center;
                }
                .inner_content_tip {
                    flex: 1;
                    margin: 0 20px;
                    display: flex;
                    align-items: center;
                }
                /*调整格子中的控件大小*/
                .el-table__body-wrapper {
                    overflow-y: auto;
                    overflow-x: hidden;
                    tr {
                        background: transparent;
                    }
                }
                .el-input {
                    width: 500px;
                }
                .el-form-item__label {
                    font-size: 21px;
                    line-height: 8px;
                    font-weight: bold;
                }
                .el-table__header th .cell:first-child {
                    font-weight: bold;
                }
                .el-input__inner {
                    height: 35px;
                    width: 500px;
                    font-size: 22px;
                    cursor: default;
                }
                .el-form-item {
                    margin-bottom: 5px;
                }
                .el-alert__content {
                    .el-alert__title,
                    .el-alert__description,
                    .el-alert__icon {
                        font-size: 19px;
                    }
                }
                //修改UI框架
            }
            .footer_container {
                //footer中右边的内容
                flex: 90;
                .step_container {
                    position: relative;
                    padding: 16px 60px 3px;
                    .seal {
                        //盖章的图片
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
                    //按钮
                    padding-left: 50%;
                    margin-left: -100px;
                }
            }
        }
    }
    //列表信息缩略图结束
    .enlargeForm {
        height: 756px;
        border: 5px ridge #cccccc;
        overflow: hidden;
    }
    //旋转显示效果
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
</style>
