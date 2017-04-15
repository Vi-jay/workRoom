<template>
    <div id="customerInfo">
    <!-- 返回键 -->
        <el-button type="warning" id="back_btn" @click="backhome('firstForm')">
        <i class="el-icon-d-arrow-left"></i><span style="margin-left:10px">返回</span>
        </el-button>
        <!-- 总容器 -->
        <div class="content">
            <div class="left_content">
                <div class="customer_search_form">
                    <!--查询表单-->
                    <el-form :model="firstForm_Data" :rules="rules" ref="firstForm_Data" label-width="210px" style="margin-left: -70px">
                        <el-form-item label="客户名称">
                            <searchTool :firstForm_Data="firstForm_Data" prop="customerName"></searchTool>
                        </el-form-item>
                        <el-form-item label="客户电话">
                            <el-input v-model="firstForm_Data.phone_number" prop="phone_number" placeholder="请输入客户电话"></el-input>
                        </el-form-item>
                        <el-form-item label="客户地址">
                            <el-input v-model="firstForm_Data.address" prop="address" placeholder="请输入客户地址"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="large" @click="search">查询</el-button>
                            <el-button @click="resetForm" size="large">重置</el-button>
                            <a @click="nextStep('firstForm')" class="nextStep">
                                <el-button type="success" size="large" v-bind:disabled="multipleSelection.length === 0">确定</el-button>
                            </a>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="customerTable">
                    <!--表格内容-->
                    <el-table stripe :data="customerData" border  height="350" @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column  prop="customerName" label="姓名">
                        </el-table-column>
                        <el-table-column prop="phone_number" label="手机号">
                        </el-table-column>
                        <el-table-column prop="province" label="省份">
                        </el-table-column>
                        <el-table-column prop="city" label="市区">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="right_content">
                <el-alert title="小提示:" type="info" :closable="false" description="点击下面的图像按钮可添加新的用户哦~~">
                </el-alert>
                <img src="../../static/img/linkman.png" alt="" width="250" height="300" class="linkman" @click="dialogFormVisible = true">

            </div>
        </div>
        <!-- dialog表单 -->
        <el-dialog title="添加用户" v-model="dialogFormVisible" class="dialogTool">
            <el-form >
                <el-form-item label="用户名称">
                    <searchTool class="dialog_search" :firstForm_Data="firstForm_Data" prop="customerName"></searchTool>
                </el-form-item>
                <el-form-item label="用户电话">
                <el-input v-model="firstForm_Data.phone_number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户地址">
                    <el-select v-model="firstForm_Data.address" placeholder="请选择用户区域">
                        <el-option label="中国" value="中国"></el-option>
                        <el-option label="印度" value="印度"></el-option>
                        <el-option label="老挝" value="老挝"></el-option>
                        <el-option label="缅甸" value="缅甸"></el-option>
                        <el-option label="越南" value="越南"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="nextStep('firstForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
let searchTool = require('../compoents/search/search.vue');
export default {
    props:{
        firstForm_Data:Object
    },
    data() {
        return {
            customerData: [{
                customerName: '张三',
                phone_number: '1216654',
                province: '上海',
                city: '普陀区',
                address: '南城区',
            }, {
                customerName: '李四',
                phone_number: '1216654',
                province: '上海',
                city: '普陀区',
                address: '西城区',

            }, {
                customerName: '王五',
                phone_number: '12166544',
                province: '上海',
                city: '普陀区',
                address: '北城区',

            }, {
                customerName: '赵六',
                phone_number: '1216654',
                province: '上海',
                city: '普陀区',
                address: '东城区',

            }, {
                customerName: '周七',
                phone_number: '1214654',
                province: '上海',
                city: '普陀区',
                address: '东北城区',

            }, {
                customerName: '陈八',
                phone_number: '1214654',
                province: '上海',
                city: '普陀区',
                address: '东南城区',

            }, {
                customerName: '何九',
                phone_number: '1214654',
                province: '上海',
                city: '普陀区',
                address: '西北城区',

            }],
            rules: {
                customerName: [{
                    required: true,
                    message: '请输入用户名称',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 5,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }],
                phone_number: [{
                    required: true,
                    message: '请输入电话号码',
                    trigger: 'change'
                }],
                address: [{
                    type: 'date',
                    required: true,
                    message: '请选择地址',
                    trigger: 'change'
                }]

            },
            dialogFormVisible: false,
            form: {
                name: null,
                region: '',
                address: ''
            },
            multipleSelection: []
        }
    }, methods: {
        search() {
            this.$message.error('暂时无真实数据,正在维护中....');
        },
        resetForm() {
            this.$message.error('暂时无真实数据,正在维护中....');
        },
        backhome(form) {
            this.$emit('back', form);
        },
        handleSelectionChange(val) {
            val.splice(0,val.length-1);

            this.multipleSelection = val;
            console.log(val);
            if (val) {
                this.firstForm_Data.customerName = val[0].customerName;
                this.firstForm_Data.phone_number = val[0].phone_number;
                this.firstForm_Data.address = val[0].address;
            }
        },
        nextStep(formName) {
            if (this.multipleSelection.length > 0 || (this.firstForm_Data.customerName && this.firstForm_Data.phone_number && this.firstForm_Data.address)) {
                this.$emit('complete', formName,"firstForm_Data",this.firstForm_Data);
                this.dialogFormVisible = false;
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择下列表格中的用户,或者新建用户进行下一步操作!!',
                    type: 'warning',
                });
            }
        }
    }, components: {
        searchTool: searchTool
    }
};
</script>
<style lang="less" rel="stylesheet/less">
#customerInfo {
    height: inherit;
    th .el-checkbox__inner{ //隐藏table第一栏的checkbox
        display: none;
    }
    #back_btn {  //返回键
        margin: 0 1px;
        position: absolute;
    }
    //更改UI框架样式
    .el-button {
        margin-top: 28px;
        span {
            font-size: 30px;
        }
    }
    .el-input {
        width: 550px;
    }
    .el-input__inner {
        height: 45px;
        width: 550px;
        font-size: 26px;
    }
    .el-alert__content {
        .el-alert__title,
        .el-alert__description {
            font-size: 24px;
        }
    }
    //更改UI框架样式
    //内容
    .content {
        height: inherit;
        display: flex;
        .left_content {  //左边的格子
            display: flex;
            flex: 3;
            height: 100%;
            justify-content: space-between;
            flex-direction: column;
            padding: 2% 0 -2% 0;
            .customer_search_form,
            .customerTable {
                box-sizing: border-box;
                padding:0 10px;
                overflow: hidden;

            }
            .customer_search_form {
                flex: 1;
                margin-top: 55px;
                .el-button {
                    margin-top: 10px;
                }
                .nextStep {
                    margin-left: 20px;
                }
            }
            .customerTable {
                flex: 1;
                .el-table { //下面的table
                    width: 99%;
                    font-size: 17px;
                    .el-checkbox__inner{
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }
        .right_content {
            flex: 1;
            height: 100%;
            display: block;
            box-sizing: border-box;
            border-left: 4px ridge #cccccc;
            padding: 2%;
            overflow: hidden;
            .linkman {
                position: relative;
                bottom: -170px;
                opacity: 0.8;
                cursor: pointer;
            }

        }
    }
    .dialogTool{
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
    .dialog_search{
        margin-left: 154px;
    }
    }
}
</style>
