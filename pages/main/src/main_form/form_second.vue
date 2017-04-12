<template>
    <div id="secondForm">
        <slot name="cover"></slot>

        <div class="commodityForm">
            <el-table
                    :data="commodityData"
                    border
                    style="width: 100%"
                    height="325"
            >
                <el-table-column label="订单商品条目记录">
                    <el-table-column
                            fixed
                            prop="variety"
                            label="商品品种"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="origin"
                            label="产地"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="unitPrice"
                            label="单价(元/斤)"
                    >
                    </el-table-column>


                    <el-table-column
                            label="数量"
                    >
                        <template scope="scope">
                            <el-input-number size="small" v-model="scope.row.count"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="serialNumber"
                            label="商品编号"
                    >
                    </el-table-column>


                    <el-table-column
                            fixed="right"
                            label="操作"
                    >
                        <template scope="scope">
                            <el-button
                                    @click.native.prevent="deleteRow(scope.$index, commodityData)"
                                    type="text"
                                    size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="tool">
                <img src="../../static/img/addKey.jpg" class="addKey" alt="" width="60" height="60">
            </div>
            <el-alert
                    title="小提示:"
                    type="info"
                    description="点击加号添加商品到订单~~"
                    show-icon>
            </el-alert>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            allFormParams: Object
        },
        data() {
            return {
                commodityData: [{
                    variety: '西瓜',
                    origin: '上海',
                    unitPrice: 5,
                    count: 1,
                    serialNumber: 200331
                }, {
                    variety: '香蕉',
                    origin: '上海',
                    unitPrice: 5,
                    count: 1,
                    serialNumber: 200332
                }, {
                    variety: '榴莲',
                    origin: '上海',
                    unitPrice: 5,
                    count: 12,
                    serialNumber: 200333
                }, {
                    variety: '手枪',
                    origin: '公安局',
                    unitPrice: 5,
                    count: 12,
                    serialNumber: 200334
                }, {
                    variety: '机关枪',
                    origin: '中央兵库',
                    unitPrice: 5,
                    count: 13,
                    serialNumber: 200335
                }, {
                    variety: '手榴弹',
                    origin: '中央兵库',
                    unitPrice: 5,
                    count: 16,
                    serialNumber: 200336
                }, {
                    variety: '原子弹',
                    origin: '中央兵库',
                    unitPrice: 5,
                    count: 19,
                    serialNumber: 200337
                }]
            }
        }, methods: {
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getDialog(data) {
                this.second_form.username = data;
            }
        }, components: {}
    };
</script>
<style lang="less" rel="stylesheet/less">
    #secondForm {
        height: inherit;
        padding: 0 10px;
        .el-alert__content {
            .el-alert__title, .el-alert__description, .el-alert__icon {
                font-size: 24px;

            }
        }
        .el-table__header th .cell:first-child {
            padding: 1%;
            text-align: center;
        }
        .el-alert {
            width: 50%;
            margin: 55px auto;
            .el-alert__icon {
                font-size: 45px;
            }
        }
        .commodityForm {
            margin-top: 30px;
            width: 100%;
            .tool {
                display: flex;
                justify-content: center;
                position: relative;
                top: 0;
                background: #ffffff;
                border: 1px solid #dfe6ec;
                border-bottom: 3px ridge #dfe6ec;
                z-index: 3;
                .addKey {
                    border-radius: 50%;
                    cursor: pointer;
                }

            }
        }
    }
</style>
