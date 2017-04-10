<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-menu default-active="6-2" :unique-opened=true class="el-menu-vertical">
                    <el-submenu index="1">
                        <template slot="title"><i class="icon-address-book "></i>客户管理</template>
                        <el-menu-item-group>
                            <a class="menu-item" href="#/week_SalesVolume">
                                <el-menu-item index="1-1">资料管理</el-menu-item>
                            </a>
                            <a class="menu-item" href="#/month_SalesVolume">
                                <el-menu-item index="1-2">类型管理</el-menu-item>
                            </a>
                            <a class="menu-item" href="#/month_SalesVolume">
                                <el-menu-item index="1-3">角色管理</el-menu-item>
                            </a>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="icon-database"></i>商品库存管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">商品信息管理</el-menu-item>
                            <el-menu-item index="2-2">商品类型管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="icon-calendar"></i>业务模块管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">本日订单管理</el-menu-item>
                            <el-menu-item index="3-2">本月订单管理</el-menu-item>
                            <el-menu-item index="3-3">撤销订单管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>仪表秤设置</template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">去皮重量设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="icon-file-zip"></i>订单打印</template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1">打印今日订单</el-menu-item>
                            <el-menu-item index="5-2">打印往期订单</el-menu-item>
                            <el-menu-item index="5-2">订单打印设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-message"></i>物业通知信息</template>
                        <el-menu-item-group>
                            <el-menu-item index="6-1">已读信息</el-menu-item>
                            <el-menu-item index="6-2"><el-badge  :value="2000" :max="99" >未读信息</el-badge></el-menu-item>
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
    @import "../icon/style";
    .el-menu-vertical {
        background: transparent;
    }

    .menu-item {
        text-decoration: none;
    }
</style>
