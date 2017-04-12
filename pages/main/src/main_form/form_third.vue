<template>
    <div id="thirdForm">
        <slot name="cover"></slot>
        <div class="seller">
            <el-form :model="sellerForm" :rules="rules" ref="ruleForm" class="sellerForm" style="margin-left: 10px">
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="商家名称" prop="name">
                            <el-input v-model="sellerForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="档口编号" prop="name">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="商家电话" prop="name">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="经营范围" prop="name">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="记住资料" prop="name">
                    <el-switch on-text="" off-text="" v-model="sellerForm.remember"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-alert class="tip"
                            title="小提示:"
                            type="success"
                            :closable="false"
                            description="点击记住资料可避免每次都重复填写哦~~">
                    </el-alert>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('sellerForm')">立即创建个人档案</el-button>
                    <el-button @click="resetForm('sellerForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    let formDialog = require('./form_dialog.vue');
    export default {
        props: {
            allFormParams: Object
        },
        data(){
            return {
                sellerForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '', username: ""
                }, rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit("submit", this.ruleForm);
                    } else {
                        alert('请填写完整相关信息!!');
                        this.$emit("submit", this.ruleForm);
                        return false;
                    }
                });
            }, resetForm(formName) {
                this.$refs[formName].resetFields();
            }, getDialog(data){
                this.ruleForm.username = data;
            }
        }, components: {
            formDialog: formDialog
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    #thirdForm {
        padding: 30px 20px;
        .seller {
            padding-top: 1%;
            .el-form-item__label {
                font-size: 26px;
                text-align: center;
            }
            .el-input {
                .el-input__inner {
                    height: 50px;
                    font-size: 26px;
                }
            }
            .el-form-item__error {
                font-size: 18px;
            }
            .tip{
                margin-top: 50px;
            }

        }
    }
</style>
