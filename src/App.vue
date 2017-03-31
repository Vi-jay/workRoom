<template>
    <el-table
            v-loading.body="loading"
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="date"
                label="日期"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址">
        </el-table-column>
    </el-table>
    <!--<router-view :allResource="allResource" ref="compoents" class="viewItem"></router-view>--><!--在此显示路由后显示的内容-->
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                loading: false
            };
        },
        created(){
            console.log(456);
            console.log(123);

        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "./test";

    div {
        color: @color;
    }
</style>