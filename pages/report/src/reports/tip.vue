<template>
    <div class="tipItem">
        <el-col :span="15">
        <el-alert
                title="消息提示"
                type="info"
                description="点击左侧高亮按钮显示本月/本周报表（测试数据）"
                show-icon
                :closable=true>
        </el-alert>
            </el-col>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {};
</script>
<style lang="less" rel="stylesheet/less">
.tipItem{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    margin:10% 10% 0 10% ;
}
</style>
