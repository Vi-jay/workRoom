<template>
    <div id="firstForm">
        <slot name="cover"></slot>
        <div class="firstFormContainer">
            <div class="cloum">
                <div class="searchBar"> 
                <el-form :model="first_form" :rules="rules" ref="search_form" label-width="210px" style="margin-left: -80px">
                <el-form-item label="客户名称">
                   <searchTool ></searchTool>
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
                <div class="customerTable">2</div>
            </div>
            <div class="tool">3</div>
        </div>
       
    
          
    </div>
</template>
<script type="text/ecmascript-6">
let searchTool = require('../compoents/search/search.vue');
export default {
    data() {
        return {
           formData: {
                orderNumber: 132165465456654,
                orderDate: new Date().toLocaleString(),
                palce:'',
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
    .el-input__inner{
        height: 50px;
    }
    .firstFormContainer {
        height: inherit;
        display: flex;
        .cloum {
            display: flex;
            flex: 5;
            height: 100%;
            flex-wrap: wrap;
            padding: 2% 0 -2% 0;
            .searchBar,
            .customerTable {
                width: 100%;
                height: 50%;
                box-sizing: border-box;
                padding: 10px;
                overflow: hidden;
            }
            .searchBar{
                border-bottom: 4px ridge #cccccc;
            }
        }
        .tool {
            flex: 1;
            height: 100%;
            display: block;
            box-sizing: border-box;
            border-left: 4px ridge #cccccc;
            padding: 2% ;
                overflow: hidden;
        }
    }
}
</style>
