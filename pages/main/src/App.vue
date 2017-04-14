<template>
    <div id="main">
        <transition name="lazyShow">
            <mian v-show="openOrder" :sellerForm="sellerForm"></mian>
        </transition>
        <div class="messageContainer" id="messageContainer">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../static/img/yibiaocheng.jpg" class="image">
                <div style="padding: 14px;" @click="openOrder = true">
                    <el-alert title="新的订单"  type="success" description="开启一张新的订单!!!" :closable="false" show-icon>
                    </el-alert>
                    <div class="button">
                        <el-tooltip content="开启一张新的订单!!!" placement="bottom-start">
                            <el-button type="text" size="large" @click="openOrder = true">Open!</el-button>
                        </el-tooltip>
                    </div>
                </div>
            </el-card>
        </div>
        <!-- dialog表单 -->
        <el-dialog title="填写基本资料" v-model="sellerDialog" class="dialogTool" :close-on-click-modal=false :close-on-press-escape=false :show-close=false>
            <el-form v-model="sellerForm">
                <el-form-item label="商家名称">
                    <el-input placeholder="请输入商家名称" v-model="sellerForm.sellerName"></el-input>
                </el-form-item>
                <el-form-item label="档口编号">
                    <el-input placeholder="请选输入档口编号" v-model="sellerForm.sellerAddress"></el-input>
                </el-form-item>
                <el-form-item label="商家电话">
                    <el-input placeholder="请选输入手机号码" v-model="sellerForm.sellerPhone"></el-input>
                </el-form-item>
                <el-form-item label="经营范围">
                    <el-select v-model="sellerForm.sellerArea" placeholder="请选择经营范围">
                        <el-option label="枪械" value="枪械"></el-option>
                        <el-option label="刀具" value="刀具"></el-option>
                        <el-option label="炮弹" value="炮弹"></el-option>
                        <el-option label="火车" value="火车"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="记住资料">
                    <el-switch on-text="" off-text=""></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setSellerInfo">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script type="text/ecmascript-6">
let mian = require('./main_form/form.vue');
export default {
    data() {
            return {
                openOrder: false,
                sellerDialog: false,
                sellerForm: {
                    sellerName: "测试员",
                    sellerAddress: "速成科技",
                    sellerPhone: "123165465",
                    sellerArea: "中央政府",
                }
            }
        },
        created() {
            this.$nextTick(function() {
                let name = localStorage.sellerName;
                if (!name) {
                    this.sellerDialog = true;
                } else {
                    var that=this;
                    setTimeout(function(){
                    that.$message("欢迎您  :  " + name)
                    },1000);
                }
            })
        },
        methods: {
            setSellerInfo: function() {
                if (this.sellerForm.sellerName && this.sellerForm.sellerAddress && this.sellerForm.sellerArea && this.sellerForm.sellerPhone) {
                    localStorage.sellerName = this.sellerForm.sellerName;
                    this.sellerDialog = false;
                } else {
                    this.$message.error('请填写完整的信息');
                }
            },

        },
        components: {
            mian: mian
        }
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
            cursor: pointer;
            .button {
                text-align: center;
                margin: 0 auto;
                font-size: 25px;
            }
            .el-button--large {
                font-size: 50px;
            }
            .el-alert .el-alert__description {
                font-size: 25px;
            }
        }
        .dialogTool {
            overflow: hidden;
            .el-form-item__label {
                font-size: 25px;
            }
            .el-input {
                width: 230px;
                max-width: 230px;
                margin-left: 30px;
            }
            .el-input__inner {
                height: 50px;
                width: 230px;
                max-width: 230px;
                font-size: 26px;
            }
            .dialog_search {
                margin-left: 154px;
                .container {
                    margin-left: 30px;
                    font-size: 25px;
                }
            }
            .el-switch {
                margin-left: 30px;
            }
        }
    }
    .lazyShow-enter-active,
    .lazyShow-leave-active {
        transition: opacity .5s linear, transform .5s ease-in-out;
    }
    .lazyShow-enter {
        opacity: 0.3;
        transform: translate(-100%, 0);
    }
    .lazyShow-leave-active {
        display: none;
    }
}

</style>
