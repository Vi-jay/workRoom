<template>
    <div id="secondForm">
        <slot name="cover"></slot>
        <el-button type="warning" id="back_btn" @click="backhome('secondForm')"><i class="el-icon-d-arrow-left"></i><span style="margin-left:10px">返回</span></el-button>
        <div class="commodityTable">
            <el-table :data="commodityData" border style="width: 98%" height="325">
                <el-table-column label="订单商品条目记录">
                    <el-table-column fixed prop="variety" label="商品品种">
                    </el-table-column>
                    <el-table-column prop="origin" label="产地">
                    </el-table-column>
                    <el-table-column prop="unitPrice" label="单价(元/斤)">
                    </el-table-column>
                    <el-table-column label="数量">
                        <template scope="scope">
                            <el-input-number size="small" v-model="scope.row.count"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="serialNumber" label="商品编号">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, commodityData)" type="text" size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="tool">
                <img src="../../static/img/addKey.jpg" class="addKey" @click="addItem" alt="" width="60" height="60">
            </div>
            <div class="btn">
              <el-button type="success" size="large" @click="nextStep('secondForm')" v-bind:disabled="commodityData.length === 0">确认提交</el-button>
                  <el-button size="large" @click="clearAll">移除所有</el-button>
            </div>                                                      
            <el-alert title="小提示:" type="info" description="点击加号添加商品到订单~~" show-icon>
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
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        backhome(form) {
            this.$emit('back', form);
        },
        addItem(){
            this.$message.error('此功能正在维护中');
        },
        clearAll(){
            this.commodityData.splice(0,this.commodityData.length);
        },
         nextStep(formName){
        if(this.commodityData.length>0 ){
             this.$emit('complete',formName);
        }else{
            this.$message({
          showClose: true,
          message:'请至少添加一条商品信息!!',
          type: 'warning'
        });
        }
      }
    },
    components: {}
};
</script>
<style lang="less" rel="stylesheet/less">
#secondForm {
    height: inherit;
    #back_btn {
        margin: 0 1px;
        position: relative;
        span {
            font-size: 30px;
        }
    }
    .el-alert__content {
        .el-alert__title,
        .el-alert__description,
        .el-alert__icon {
            font-size: 24px;
        }
    }
    .el-table__header th .cell:first-child {
        padding: 1%;
        text-align: center;
    }
    .el-alert {
        width: 50%;
        margin: 12px auto;
        .el-alert__icon {
            font-size: 45px;
        }
    }
    .commodityTable {
        margin-top: 30px;
        width: 100%;
        padding: 0 10px;
        .el-table {
            font-size: 24px;
            text-align: center;
        }
        .tool {
            display: flex;
            justify-content: center;
            position: relative;
            top: 0;
            background: #ffffff;
            border: 1px solid #dfe6ec;
            border-bottom: 3px ridge #dfe6ec;
            margin-right: 24px;
                cursor: pointer;
            .addKey {
                border-radius: 50%;
            }
        }
        .btn{
            display: flex;
            justify-content:center;
            padding: 10px;
            span {
            font-size: 30px;
        }
        }
    }
}
</style>
