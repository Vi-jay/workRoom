<template>
    <div class="message">
        <el-col :span="18">
            <el-alert
                    class="message-item"
                    title="扣费成功"
                    type="success"
                    description="于'2017年4月10日'扣除物业费99999万元人民币."
                    show-icon>
            </el-alert>
        </el-col>
        <el-col :span="18">
            <el-alert
                    class="message-item"
                    title="商铺转租推送"
                    type="info"
                    description="1509号摊位急转！价格面议,联系电话：16994554xxxx,店铺已装修......"
                    show-icon>
            </el-alert>
        </el-col>
        <el-col :span="18">
            <el-alert
                    class="message-item"
                    title="安检通知"
                    type="info"
                    description="将于明日举行各商铺安检,请提前做好措施...."
                    show-icon>
            </el-alert>
        </el-col>
        <el-col :span="18">
            <el-alert
                    class="message-item"
                    title="消防演练通知"
                    type="info"
                    description="将于'2017年4月15日'举行消防演练,届时各部门请做好应对措施..."
                    show-icon>
            </el-alert>
        </el-col>
        <el-col :span="18">
            <el-alert
                    class="message-item"
                    title="警告提示"
                    type="warning"
                    description="经举报,1059号商铺存在商品偷税漏税行为,请到物业处办理相关手续,对此警告广大商家...."
                    show-icon>
            </el-alert>
        </el-col>
        <el-col :span="18">
            <el-alert
                    class="message-item"
                    title="处罚通知"
                    type="error"
                    description="对于商铺环境不卫生,车辆乱停乱放等行为将处于一定程度的处罚,详情见《农批市场处罚条例》..."
                    show-icon>
            </el-alert>
        </el-col>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {};
</script>
<style lang="less" rel="stylesheet/less">
    .message-item {
        margin: 10px;
    }
</style>
