<template>
    <div id="firstForm">
        <slot name="cover"></slot>
        <div class="firstFormContainer">
            <div class="cloum">
                <div class="searchBar">
                    <!--查询表单-->
                    <el-form :model="first_form" :rules="rules" ref="search_form" label-width="210px"
                             style="margin-left: -70px">

                        <el-form-item label="客户名称">
                            <searchTool></searchTool>
                        </el-form-item>
                        <el-form-item label="客户电话">
                            <el-input placeholder="请输入客户电话"></el-input>
                        </el-form-item>
                        <el-form-item label="客户地址">
                            <el-select v-model="formData.palce" placeholder="请选择客户地址">
                                <el-option label="亚洲" value="yazhou"></el-option>
                                <el-option label="欧洲" value="ouzhou"></el-option>
                                <el-option label="非洲" value="feizhou"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" size="large" @click="submitForm('search_form')">查询</el-button>
                            <el-button @click="resetForm('search_form')" size="large">重置</el-button>
                        </el-form-item>

                    </el-form>
                </div>
                <div class="customerTable">
                    <!--表单下面显示的表格内容-->
                    <el-table
                            :data="customerData"
                            border
                            style="width: 100%"
                            height="300">
                        <el-table-column
                                fixed
                                prop="name"
                                label="姓名"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="phone_number"
                                label="手机号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="province"
                                label="省份"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="city"
                                label="市区"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址"
                        >
                        </el-table-column>
                    </el-table>

                </div>
            </div>
            <div class="tool">
                <el-alert
                        title="小提示:"
                        type="info"
                        :closable="false"
                        description="点击下面的图像按钮可添加新的用户哦~~">
                </el-alert>
                <img src="../../static/img/linkman.png" alt="" width="250" height="300" class="linkman">
            </div>
        </div>


    </div>
</template>
<script type="text/ecmascript-6">
    let searchTool = require('../compoents/search/search.vue');
    export default {
        data() {
            return {
                formData: {
                    palce: null,
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    username: ""
                },
                customerData: [{
                    name: '张三',
                    phone_number: '1216654654',
                    province: '上海',
                    city: '普陀区',
                    address: '没有地址',
                }, {
                    name: '李四',
                    phone_number: '1216654654',
                    province: '上海',
                    city: '普陀区',
                    address: '没有地址',

                }, {
                    name: '王五',
                    phone_number: '1216654654',
                    province: '上海',
                    city: '普陀区',
                    address: '没有地址',

                }, {
                    name: '赵六',
                    phone_number: '1216654654',
                    province: '上海',
                    city: '普陀区',
                    address: '没有地址',

                }, {
                    name: '周七',
                    phone_number: '1216654654',
                    province: '上海',
                    city: '普陀区',
                    address: '没有地址',

                }],
                rules: {
                    name: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }],
                    region: [{
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    date1: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    date2: [{
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    type: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],
                    resource: [{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }]
                }
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit("submit", this.first_form);
                    } else {
                        this.$message.error('请填写完整相关信息!!');
                        this.$emit("submit", this.first_form);
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getDialog(data) {
                this.first_form.username = data;
            }
        }, components: {
            searchTool: searchTool
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    #firstForm {
        height: inherit;
        .el-form-item__label {
            font-size: 26px;
            text-align: center;
            padding: 12px 0 0 50px;
        }
        .el-button {
            margin-top: 28px;
            span {
                font-size: 30px;
            }
        }
        .el-input__inner {
            height: 50px;
            width: 550px;
            font-size: 26px;
        }
        .el-alert__content {
            .el-alert__title, .el-alert__description {
                font-size: 24px;
            }
        }
        .firstFormContainer {
            height: inherit;
            display: flex;
            .cloum {
                display: flex;
                flex: 3;
                height: 100%;
                justify-content: space-between;
                flex-direction: column;
                padding: 2% 0 -2% 0;
                .searchBar,
                .customerTable {
                    height: 50%;
                    box-sizing: border-box;
                    padding: 10px;
                    overflow: hidden;
                }

            }
            .tool {
                flex: 1;
                height: 100%;
                display: block;
                box-sizing: border-box;
                border-left: 4px ridge #cccccc;
                padding: 2%;
                overflow: hidden;
                .linkman{
                    position: relative;
                    bottom: -170px;
                    opacity: 0.8;
                    cursor: pointer;
                }
            }
        }
    }
</style>
