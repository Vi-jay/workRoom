<template>
    <div id="main" v-loading="loading" element-loading-text="玩命加载中....">
        <transition name="lazyShow">
                <homePage v-show="openOrder" :sellerForm="sellerForm"></homePage>
        </transition>
        <div class="messageContainer" v-if="showMessageContainer">
            <el-card :body-style="{ padding: '0px' }">
                <img class="blanceScales" ref="blanceScales" width="491" height="312">
                <div style="padding: 14px;" @click="openOrder = true;showMessageContainer=false">
                    <el-alert title="新的订单" type="success" description="开启一张新的订单!!!" :closable="false" show-icon>
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
        <el-dialog title="填写基本资料" v-model="sellerDialog" v-if="sellerDialog" class="dialogTool" :close-on-click-modal=false :close-on-press-escape=false :show-close=false>
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
let homePage = require('./main_form/homePage.vue');
export default {
    data() {
            return {
                loading: true,
                openOrder: false,
                sellerDialog: false,
                showMessageContainer: false,
                sellerForm: {
                    sellerName: "测试员",
                    sellerAddress: "速成科技",
                    sellerPhone: "123165465",
                    sellerArea: "后街",
                }
            }
        },
        created() {
            this.$nextTick(function() {
                this.loadCompent();
            })
        },
        methods: {
            loadCompent: function() {
                let timmers = [];
                let MessageContainerTimer = {
                    fun: () => {
                        this.showMessageContainer = true;
                    }, //show  MessageContainer
                    time: 800
                }
                let LoadingTimer = {
                    fun: () => {
                        let blanceScales = this.$refs.blanceScales;
                        blanceScales.setAttribute("src", "../static/img/yibiaocheng.jpg"); //loadding blanceScales
                        blanceScales.onload = () => {
                            this.loading = false; //close loading
                            let sellerName = localStorage.sellerName;
                            if (!sellerName) {
                                this.sellerDialog = true;
                            } else {
                                setTimeout(() => { //if user is loagin  show welcome!
                                    this.$message("欢迎您  :  " + sellerName);
                                    delete localStorage.sellerName;
                                }, 1000);
                            }
                        }
                    },
                    time: 1000
                }
                timmers.push(MessageContainerTimer);
                timmers.push(LoadingTimer);
                this.lazyLoad(timmers); //Batch processing timmers

            },
            lazyLoad: function(arrary) {
                arrary.forEach(function(cur) {
                    setTimeout(cur.fun, cur.time);
                })
            },
            setSellerInfo: function() {
                if (this.sellerForm.sellerName && this.sellerForm.sellerAddress && this.sellerForm.sellerArea && this.sellerForm.sellerPhone) {
                    localStorage.sellerName = this.sellerForm.sellerName;
                    this.sellerDialog = false;
                    setTimeout(() => { //if user is loagin  show welcome!
                        this.$message("欢迎您  :  " + localStorage.sellerName);
                    }, 0);
                } else {
                    this.$message.error('请填写完整的信息');
                }
            },

        },
        components: {
            homePage: homePage
        }
}
</script>
<style lang="less" rel="stylesheet/less">
html,
body {
    width: 100%;
    height: 100%;
    background: url("../static/img/bg.jpg");
    overflow: hidden;
    user-select: none;
    /*重写一些element框架插件的字体大小*/
    .el-message .el-message__group p {
        font-size: 22px;
    }
    .el-scrollbar .el-select-dropdown__item {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 3px;
        text-align: center;
    }
    .el-message-box {
        .el-message-box__header .el-message-box__title {
            font-size: 20px;
        }
        .el-message-box__content {
            font-size: 24px;
        }
        .el-button {
            font-size: 20px;
        }
    }
    .el-alert__content {
        .el-alert__title,
        .el-alert__description,
        .el-alert__icon {
            font-size: 24px;
        }
    }
    .el-autocomplete-suggestion li {
        font-size: 22px;
        text-align: center;
    }
    .el-dialog__title {
        font-size: 25px;
    }
    .el-form-item__label {
        font-size: 26px;
        text-align: center;
        padding: 12px 0 0 50px;
    }
    .el-cascader-menu {
        padding: 0;
        .el-cascader-menu__item {
            font-size: 18px;
            height: auto;
        }
    }
    .el-cascader__label {
        line-height: 42px;
        font-size: 25px;
    }
    /*重写一些element框架插件的字体大小*/
    /*打印机页面样式*/
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
    /*打印机*/
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
        .blanceScales {
            width: 491px;
            height: 312px;
            padding: 3px;
            background: #f0f0f0;
        }
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
    /*弹层样式*/
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
    /*弹层样式*/
}

.lazyShow-enter-active,
.lazyShow-leave-active {
    transition: transform .3s ease-in-out;
}

.lazyShow-enter {
    transform: scale3d(0.3,0.3,0);
}

.lazyShow-leave-active {
    display: none;
}
</style>
