<template>
    <el-form :model="first_form" :rules="rules" ref="first_form" label-width="210px" id="first-form">
        <el-row :gutter="10">
            <el-col :span="11">
                <el-form-item label="客户名称">
                    <el-input  placeholder="请输入客户名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="客户电话">
                    <el-input placeholder="请输入客户电话"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="19">
                <el-form-item label="客户地址">
                    <el-input placeholder="请输入客户地址"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="11">
                <el-form-item label="客户年龄">
                    <el-select placeholder="请选择客户年龄">
                        <el-option label="少年" value="shaonian"></el-option>
                        <el-option label="青年" value="qingnian"></el-option>
                        <el-option label="老年" value="laonian"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="客户性别">
                    <el-select placeholder="请选择客户性别">
                        <el-option label="男" value="man"></el-option>
                        <el-option label="女" value="woman"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" size="large" @click="submitForm('first_form')">下一步</el-button>
            <el-button @click="resetForm('first_form')" size="large">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script type="text/ecmascript-6">
let formDialog = require('./form_dialog.vue');
export default {
    data() {
        return {
            first_form: {
                orderNumber: 132165465456654,
                orderDate: new Date().toLocaleString(),
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
        formDialog: formDialog
    }
};
</script>
<style lang="less" rel="stylesheet/less">
#first-form {
    .el-form-item__label {
        font-size: 26px;
        text-align: center;
        padding: 2px 0 0 50px;
    }
    .el-button {
        margin-top: 28px;
        span {
            font-size: 30px;
        }
    }
    
}
</style>
