<template>
    <div id="thirdForm">
        <slot name="cover"></slot>
        <el-button type="warning" id="back_btn" @click="backhome('thirdForm')"><i class="el-icon-d-arrow-left"></i><span style="margin-left:10px">返回</span></el-button>
        <div class="seller">
            <el-form :model="sellerForm"  ref="thirdForm" class="sellerForm" style="margin-left: 10px">
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="商家名称" prop="name">
                            <el-input v-model="sellerForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="档口编号" prop="name">
                            <el-input v-model="sellerForm.number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="商家电话" prop="name">
                            <el-input v-model="sellerForm.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="经营范围" prop="name">
                        <el-select v-model="sellerForm.businessScope" placeholder="请选择经营范围">
                                <el-option label="枪械" value="shanghai"></el-option>
                                <el-option label="刀具" value="beijing"></el-option>
                                <el-option label="炮弹" value="beijing"></el-option>
                                <el-option label="火车" value="huoche"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="记住资料" prop="name">
                    <el-switch on-text="" off-text="" v-model="sellerForm.remember"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-alert class="tip" title="小提示:" type="success" :closable="false" description="点击记住资料可避免每次都重复填写哦~~">
                    </el-alert>
                </el-form-item>
                <el-form-item class="push_btn">
                    <el-button type="primary" @click="nextStep('thirdForm')">提交档案</el-button>
                    <el-button @click="resetForm('thirdForm')">重置</el-button>
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
    data() {
        return {
            sellerForm: {
                name: '赵四',
                number: '110',
                phoneNumber: '138566520255',
                businessScope: '炮弹',
            }
        }
    },
    methods: {
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
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getDialog(data) {
            this.ruleForm.username = data;
        },
        backhome(form) {
            this.$emit('back', form);
        },
         nextStep(formName){
        if(this.sellerForm.name &&this.sellerForm.number&&this.sellerForm.phoneNumber&&this.sellerForm.businessScope){
             this.$emit('complete',formName);
        }else{
            this.$message({
          showClose: true,
          message:'请填写正确的个人资料!!',
          type: 'warning'
        });
        }
      }
    },
    components: {
        formDialog: formDialog
    }
};
</script>
<style lang="less" rel="stylesheet/less">
#thirdForm {
    #back_btn {
        margin: 0 1px;
        position: relative;
        span {
            font-size: 30px;
        }
    }
    .seller {
        padding: 1.5% 20px;
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
        .tip {
            margin-top: 50px;
            .el-alert__content{
                .el-alert__title,.el-alert__description,.el-alert__closebtn{
            font-size: 25px;

                }
            }
        }
        .push_btn{
              span {
            font-size: 30px;
        }
        }
    }
}
</style>
