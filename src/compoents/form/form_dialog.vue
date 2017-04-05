<template>
    <div>
        <el-input @focus="dialogFormVisible = true" v-model="searchValue"></el-input>
        <el-dialog title="用户名称" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <search style="margin-left: 120px" v-on:search="getSearchValue"></search>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitDialog">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    let search = require('../search/search.vue');
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    searchValue:""
                },
                formLabelWidth: '120px'
            };
        },
        components:{
            search:search
        },methods:{
            submitDialog:function () {
                this.dialogFormVisible=false;
            },
            getSearchValue:function (data) {
                this.searchValue=data;
            }
        }
    };
</script>
<style lang="less" rel="stylesheet/less">

</style>
