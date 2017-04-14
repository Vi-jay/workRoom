<template>
    <div id="secondForm">
        <slot name="cover"></slot>
        <el-button type="warning" id="back_btn" @click="backhome('secondForm')"><i class="el-icon-d-arrow-left"></i><span style="margin-left:10px">返回</span></el-button>
        <div class="commodityTable">
            <el-table stripe :data="commodityData" border style="width: 98%" height="325">
                <el-table-column label="订单商品条目">
                    <el-table-column fixed prop="variety" label="品种">
                    </el-table-column>
                    <el-table-column prop="origin" label="产地">
                    </el-table-column>
                    <el-table-column prop="unitPrice" label="单价(元/斤)">
                    </el-table-column>
                    <el-table-column prop="weight" label="重量(斤)">
                    </el-table-column>
                    <el-table-column prop="serialNumber" label="编号">
                    </el-table-column>
                    <el-table-column prop="sumMoney" label="金额(元)">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, commodityData)" type="text" size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="tool">
                <span class="totalMoney">总金额:
                <span >{{totalMoney}}</span>元
                </span>
                <span class="totalWeight">总重量:<span >{{totalWeight}}</span> 斤
                </span>
                <el-tooltip class="item" effect="dark" content="添加新商品" placement="left-start">
                    <img src="../../static/img/addKey.jpg" class="addKey" @click="dialogFormVisible=true" alt="" width="60" height="60">
                </el-tooltip>
            </div>
            <div class="btn">
                <el-button type="info" @click="dialogFormVisible=true">添加商品</el-button>
                <el-button type="success" size="large" @click="nextStep('secondForm')" v-bind:disabled="commodityData.length === 0">确认提交
                </el-button>
                <el-button size="large" @click="clearAll">移除所有</el-button>
            </div>
            <el-alert title="小提示:" type="info" description="'加号'或'添加商品'按钮都可添加新商品~" show-icon>
            </el-alert>
        </div>
        <!-- dialog填写表单 -->
        <el-dialog title="添加商品" v-model="dialogFormVisible" class="dialogTool">
            <el-form :model="commodityForm" v-loading="loading" element-loading-text="拼命加载中....">
                <el-form-item label="商品名称">
                    <el-input v-model="commodityForm.variety"></el-input>
                </el-form-item>
                <el-form-item label="商品产地">
                    <el-select v-model="commodityForm.origin" placeholder="请选择商品产地">
                        <el-option label="中国" value="中国"></el-option>
                        <el-option label="印度" value="印度"></el-option>
                        <el-option label="老挝" value="老挝"></el-option>
                        <el-option label="缅甸" value="缅甸"></el-option>
                        <el-option label="越南" value="越南"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品单价">
                    <el-input-number v-model="commodityForm.unitPrice" :min="1">
                    </el-input-number> <span class="units">元/斤</span>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="commodityForm.weight" disabled>
                    </el-input>
                    <el-button type="primary" class="getWeight" @click="dialogTip = true;loading = true">获取重量</el-button>
                </el-form-item>
                <el-form-item label="商品编号">
                    <span class="serialNumber">{{commodityForm.serialNumber}}</span>
                </el-form-item>
                <el-form-item label="商品金额">
                    <el-input disabled v-model="commodityForm.sumMoney"></el-input>
                    <el-button type="primary" class="getMoney" @click="getMoney">获取金额</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addItem" :disabled="commodityForm.weight <= 0">确 定</el-button>
            </div>
        </el-dialog>
        <!-- dialog提示表单 -->
        <el-dialog v-model="dialogTip" class="dialogTool" style="z-index: 2012" :close-on-click-modal=false :close-on-press-escape=false :show-close=false>
            <el-alert title="提示" type="info" description="请将商品放置仪表秤上,点击'开始称重'按钮,并等待系统获取到准确数值(约2~3秒)~~">
            </el-alert>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTip = false;loading=false">放弃秤重</el-button>
                <el-button type="primary" @click="confirm">开始称重</el-button>
            </div>
            <div>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        commodityData: Array,
    },
    data() {
        return {
            loading: false,
            dialogFormVisible: false,
            dialogTip: false,
            commodityForm: {
                variety: '西瓜',
                origin: '上海',
                unitPrice: 5,
                weight: 0,
                serialNumber: parseInt(Math.random() * 1234123),
                sumMoney: 0
            }
        }
    },
    computed: {
        totalMoney() {
            let totalMoney = 0;
            this.commodityData.forEach(function(cur, index, arr) {
                totalMoney += cur.sumMoney;
            });
            return totalMoney;
        },
        totalWeight() {
            let totalWeight = 0;
            this.commodityData.forEach(function(cur, index, arr) {
                totalWeight += cur.weight;
            });
            return totalWeight;
        }
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        confirm() {
            this.getWeight();
            this.dialogTip = false;
        },
        backhome(form) {
            this.$emit('back', form);
        },
        addItem() {
            this.commodityData.push(this.extendCopy(this.commodityForm));
            this.clearObjAttr(this.commodityForm);
            this.dialogFormVisible = false;
        },
        clearAll() {
            this.commodityData.splice(0, this.commodityData.length);
        },extendCopy(obj){
            let c = {};
            for (let i in obj) {
                c[i] = obj[i];
            }
            return c;
        },clearObjAttr(obj){
            for (let i in obj) {
                 obj[i]=null;
            }
            obj.serialNumber=parseInt(Math.random() * 1234123);
        },
        /*称重*/
        getWeight() {
            this.$message({
                showClose: true,
                message: '正在获取重量!!',
            });
            var that = this;
            setTimeout(function() {
                        that.loading = false;
                        that.$http.get("http://localhost:80/SendCMD?idx=1&CMD=R")
                        .then(function(response) {
                                if (response.data.success) {
                                    that.$http.get("http://localhost:80/GetBuffer?idx=1").then(function(response) {
                                            if (response.data.success) {
                                                let re=/^wn([^kg]*)kg/g;
                                                let result=parseFloat(re.exec(response.data.buffer)[1])*2;
                                                that.commodityForm.weight = result;
                                                that.$message("成功获取重量~~");
                                                that.commodityForm.sumMoney = Number((that.commodityForm.weight * that.commodityForm.unitPrice).toFixed(2));
                                            }
                                        }).then(function () {
                                        that.$message.error("获取重量失败~~");
                                    });
                                    }
                                }).then(function () {
                            that.$message.error("请求无响应,请检查设备~~");
                        });

                        }, 500);


                },
                getMoney() {
                    this.$message('以自动获取金额 如果未获取再点击此按钮');
                },
                nextStep(formName) {
                    if (this.commodityData.length > 0) {
                        this.$emit('complete', formName, "commodityData", this.commodityData);
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请至少添加一条商品信息!!',
                            type: 'warning'
                        });
                    }
                }
        },
        components: {}
    };
</script>
<style lang="less" rel="stylesheet/less">
#secondForm {
    height: inherit;
    #back_btn {
        margin: 0 1px;
        position: relative;
        span {
            font-size: 30px;
        }
    }
    .el-alert__content {
        .el-alert__title,
        .el-alert__description,
        .el-alert__icon {
            font-size: 24px;
        }
    }
    .el-table__header th .cell:first-child {
        padding: 1%;
        text-align: center;
    }
    .el-alert {
        width: 50%;
        margin: 12px auto;
        .el-alert__icon {
            font-size: 30px;
        }
    }
    .commodityTable {
        margin-top: 30px;
        width: 100%;
        padding: 0 10px;
        .el-table {
            font-size: 24px;
            text-align: center;
            .cell .el-button--small {
                font-size: 24px;
            }
        }
        .tool {
            position: relative;
            vertical-align: middle;
            top: 0;
            background: #ffffff;
            border: 1px solid #dfe6ec;
            border-bottom: 3px ridge #dfe6ec;
            margin-right: 24px;
            cursor: pointer;
            overflow: hidden;
            .totalMoney,
            .totalWeight {
                line-height: 60px;
                font-size: 25px;
                margin-left: 100px;
                & span {
                    color: red;
                }
            }
            .addKey {
                float: right;
                margin-right: 60px;
                border-radius: 50%;
                opacity: 0.8;
                &:hover {
                    opacity: 1;
                }
            }
        }
        .btn {
            display: flex;
            justify-content: center;
            padding: 10px;
            span {
                font-size: 30px;
            }
        }
    }
    .dialogTool {
        overflow: hidden;
        margin-top: -100px;
        .el-form-item__label {
            font-size: 25px;
        }
        .el-input {
            width: 230px;
            margin-left: 30px;
        }
        .el-input-number {
            width: 230px;
            margin-left: 30px;
            .el-input-number__decrease,
            .el-input-number__increase {
                height: 50px;
                padding-top: 8px;
                .el-icon-minus {}
            }
            .el-input {
                margin-left: 0;
            }
        }
        .units {
            position: absolute;
            top: 6px;
            left: 230px;
            font-size: 26px;
        }
        .el-input__inner {
            height: 50px;
            width: 230px;
            font-size: 25px;
        }
        .el-button {
            font-size: 26px;
        }
        .serialNumber {
            font-size: 23px;
            position: absolute;
            top: 3px;
            left: 140px;
            color: darkred;
            background: #cccccc;
            padding: 3px;
            border-radius: 5px;
        }
        .el-alert{
            width: auto;
        }
        .getMoney,
        .getWeight {
            position: absolute;
            left: 280px;
            font-size: 22px;
            padding: 13px 6px;
        }
        .is-disabled .el-input__inner {
            color: red;
        }
        .el-loading-spinner .el-loading-text {
            font-size: 25px;
        }
    }
}
</style>
