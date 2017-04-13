<template>
    <div id="secondForm">
        <slot name="cover"></slot>
        <el-button type="warning" id="back_btn" @click="backhome('secondForm')"><i
                class="el-icon-d-arrow-left"></i><span style="margin-left:10px">返回</span></el-button>
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
                    <el-table-column prop="sumMoney" label="总金额(元)">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, commodityData)" type="text"
                                       size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="tool">
                <img src="../../static/img/addKey.jpg" class="addKey" @click="dialogFormVisible=true" alt="" width="60" height="60">
            </div>
            <div class="btn">
                <el-button type="success" size="large" @click="nextStep('secondForm')"
                           v-bind:disabled="commodityData.length === 0">确认提交
                </el-button>
                <el-button size="large" @click="clearAll">移除所有</el-button>
            </div>
            <el-alert title="小提示:" type="info" description="点击加号添加商品到订单~~" show-icon>
            </el-alert>
        </div>
        <!-- dialog表单 -->
        <el-dialog  title="添加商品" v-model="dialogFormVisible" class="dialogTool">
            <el-form :model="commodityForm">
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
                    <el-input-number v-model="commodityForm.unitPrice"  :min="1"
                                     >
                    </el-input-number>                    <span class="units">元/斤</span>

                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="commodityForm.weight" disabled>
                    </el-input>                        <el-button type="primary" class="getWeight" @click="getWeight">获取重量</el-button>

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
                <el-button type="primary" @click="addItem">确 定</el-button>
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
                dialogFormVisible: false,
                commodityForm: {
                    variety: '西瓜',
                    origin: '上海',
                    unitPrice: 5,
                    weight: 0,
                    serialNumber: parseInt(Math.random()*1234123),
                    sumMoney:0
                }
            }
        },
        methods: {
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            backhome(form) {
                this.$emit('back', form);
            },
            addItem(){
                this.commodityData.push(this.commodityForm);
                this.dialogFormVisible=false;
            },
            clearAll(){
                this.commodityData.splice(0, this.commodityData.length);
            },
            getWeight(){
                this.$message({
                    showClose: true,
                    message: '请把商品放上仪表称!!',
                });
                var that=this;
                setTimeout(function () {
                    that.commodityForm.weight=20;
                    that.commodityForm.sumMoney=that.commodityForm.weight * that.commodityForm.unitPrice;
                },1000);
            },
            getMoney(){
                this.$message('以自动获取金额 如果未获取再点击此按钮');
            },
            nextStep(formName){
                if (this.commodityData.length > 0) {
                    this.$emit('complete', formName,"commodityData",this.commodityData);
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
                font-size: 45px;
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
                display: flex;
                justify-content: center;
                position: relative;
                top: 0;
                background: #ffffff;
                border: 1px solid #dfe6ec;
                border-bottom: 3px ridge #dfe6ec;
                margin-right: 24px;
                cursor: pointer;
                .addKey {
                    border-radius: 50%;
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
            margin-top:-100px ;
            .el-form-item__label{
                font-size: 25px;

            }
            .el-input {
                width: 230px;
                margin-left: 30px;
            }
            .el-input-number{
                width: 230px;
                margin-left: 30px;
                .el-input-number__decrease,.el-input-number__increase{
                    height: 50px;
                    padding-top: 8px;

                    .el-icon-minus{
                    }
                }
                .el-input{
                    margin-left:0;
                }

            }
            .units{
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
            .el-button{
                font-size: 26px;
            }
            .serialNumber{
                font-size: 23px;
                position: absolute;
                top: 3px;
                left: 140px;
                color: darkred;
                background: #cccccc;
                padding: 3px;
                border-radius: 5px;
            }
            .getMoney,.getWeight{
                position: absolute;
                left: 280px;
                    font-size: 22px;
                padding: 13px 6px;
            }
            .is-disabled .el-input__inner{
                color: red;
            }
        }

    }
</style>
