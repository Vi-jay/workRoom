<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-menu default-active="1-2" :unique-opened=true class="el-menu-vertical">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-date"></i>销售报表</template>
                        <el-menu-item-group>
                            <template slot="title">周报表</template>
                            <a class="menu-item" href="#/week_SalesVolume">
                                <el-menu-item index="1-1">销量统计</el-menu-item>
                            </a>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">月报表</template>
                            <a class="menu-item" href="#/month_SalesVolume">
                                <el-menu-item index="1-2">销量统计</el-menu-item>
                            </a>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>物业缴费</template>
                        <el-menu-item-group>
                            <template slot="title">季度报表</template>
                            <el-menu-item index="2-1">缴费统计</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">全年报表</template>
                            <el-menu-item index="2-2">缴费统计</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-menu"></i>客户分析</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">地区分布表</el-menu-item>
                            <el-menu-item index="3-2">年龄段图表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-picture"></i>商品分析</template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">季度商品销量</el-menu-item>
                            <el-menu-item index="4-2">年度商品销量</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-share"></i>市场分析</template>
                        <el-menu-item-group>
                            <template slot="title">农批市场商品分析</template>
                            <el-menu-item index="3-1">市场热卖商品</el-menu-item>
                            <el-menu-item index="3-2">全国热卖商品</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {

    };
</script>
<style lang="less" rel="stylesheet/less">
    .el-menu-vertical {
        background: transparent;
    }

    .menu-item {
        text-decoration: none;
    }
</style>
