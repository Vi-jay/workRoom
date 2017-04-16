<template>
    <div id="commodityInfo">
        <!-- 返回键 -->
        <el-button type="warning" id="back_btn" @click="backhome('secondForm')">
            <i class="el-icon-d-arrow-left"></i><span style="margin-left:10px">返回</span>
        </el-button>
        <!-- 返回键 -->
        <div class="commodityContent">
            <!-- 商品清单 -->
            <el-table stripe :data="commodityData" border style="width: 98%" height="425">
                <el-table-column label="订单商品条目">
                    <el-table-column fixed prop="variety" label="品种">
                    </el-table-column>
                    <el-table-column prop="origin" label="产地">
                    </el-table-column>
                    <el-table-column prop="unitPrice" label="单价(元/斤)">
                    </el-table-column>
                    <el-table-column prop="weight" label="重量(斤)">
                    </el-table-column>
                    <el-table-column prop="serialNumber" label="编号">
                    </el-table-column>
                    <el-table-column prop="sumMoney" label="金额(元)">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, commodityData)" type="text"
                                       size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <!-- 下面的金额和+号 -->
            <div class="footerInfo">
                <span class="totalMoney">总金额:
                <span>{{totalMoney}}</span>元
                </span>
                <span class="totalWeight">总重量:<span>{{totalWeight}}</span> 斤
                </span>
                <el-tooltip class="item" effect="dark" content="添加新商品" placement="left-start">
                    <img src="../../static/img/addkey.jpg" class="addIcon" @click="dialogFormVisible=true" alt=""
                         width="60" height="60">
                </el-tooltip>
            </div>
            <!-- 下面的按钮 -->
            <div class="footer_button">
                <el-button type="info" @click="dialogFormVisible=true">添加商品</el-button>
                <el-button type="success" size="large" @click="nextStep('secondForm')"
                           v-bind:disabled="commodityData.length === 0">确认提交
                </el-button>
                <el-button size="large" @click="clearAll">移除所有</el-button>
            </div>
            <el-alert title="小提示:" type="info" description="'加号'或'添加商品'按钮都可添加新商品~" show-icon>
            </el-alert>
        </div>
        <!-- dialog填写表单 -->
        <el-dialog title="添加商品" v-model="dialogFormVisible" class="adding_goods">
            <el-form :model="commodityForm" v-loading="loading" element-loading-text="拼命加载中....">
                <el-form-item label="商品名称">
                    <el-autocomplete
                            v-model="commodityForm.variety"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入商品名称"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="商品产地">
                    <el-cascader
                            :options="addressOptions"
                            v-model="commodityForm.origin">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="商品单价">
                    <el-input-number v-model="commodityForm.unitPrice" :min=1>
                    </el-input-number>
                    <span class="units">元/斤</span>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="commodityForm.weight" disabled id="appendInput">
                        <el-button slot="append" @click="confirm">获取重量</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                    <span class="serialNumber">{{commodityForm.serialNumber}}</span>
                </el-form-item>
                <el-form-item label="商品金额">
                    <el-input disabled v-model="commodityForm.sumMoney" id="appendInput">
                        <el-button slot="append" @click="getMoney">获取金额</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addItem" :disabled="commodityForm.weight <= 0">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            commodityData: Array,
        },
        data() {
            return {
                loading: false,
                dialogFormVisible: false,
                dialogTip: false,
                timeout:  null,
                restaurants: [],
                commodityForm: {
                    variety: '西瓜',
                    origin: [],
                    unitPrice: 5,
                    weight: 0,
                    serialNumber: parseInt(Math.random() * 1234123),
                    sumMoney: 0
                }, addressOptions: [{
                    value: '广东省',
                    label: '广东省',
                    children: [{
                        value: '东莞市',
                        label: '东莞市',
                        children: [{
                            value: '东城区',
                            label: '东城区'
                        }, {
                            value: '南城区',
                            label: '南城区'
                        }, {
                            value: '西城区',
                            label: '西城区'
                        }, {
                            value: '北城区',
                            label: '北城区'
                        },]
                    }, {
                        value: '广州市',
                        label: '广州市',
                        children: [{
                            value: '珠海区',
                            label: '珠海区'
                        }, {
                            value: '南沙区',
                            label: '南沙区'
                        }]
                    }]
                }, {
                    value: '江苏省',
                    label: '江苏省',
                    children: [{
                        value: '南京',
                        label: '南京',
                        children: [{
                            value: '玄武区',
                            label: '玄武区'
                        }, {
                            value: '雨花区',
                            label: '雨花区'
                        }, {
                            value: '鼓楼区',
                            label: '鼓楼区'
                        }, {
                            value: '六合区',
                            label: '六合区'
                        }]
                    }, {
                        value: '常州',
                        label: '常州',
                        children: [{
                            value: '武进区',
                            label: '武进区'
                        }, {
                            value: '新北区',
                            label: '新北区'
                        }]
                    }]
                }
                ]
            }
        },
        computed: {
            totalMoney() {
                let totalMoney = 0;
                this.commodityData.forEach(function (cur, index, arr) {
                    totalMoney += Number(cur.sumMoney.toFixed(2));
                });
                return totalMoney;
            },
            totalWeight() {
                let totalWeight = 0;
                this.commodityData.forEach(function (cur, index, arr) {
                    totalWeight += Number(cur.weight.toFixed(2));
                });
                return totalWeight;
            }
        },
        methods: {
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            confirm() {
                this.getWeight();
                this.dialogTip = false;
            },
            backhome(form) {
                this.$emit('back', form);
            },
            addItem() {
                this.commodityData.push(this.extendCopy(this.commodityForm));
                this.clearObjAttr(this.commodityForm);
                this.dialogFormVisible = false;
            },
            clearAll() {
                this.commodityData.splice(0, this.commodityData.length);
            },
            extendCopy(obj) {
                let c = {};
                for (let i in obj) {
                    c[i] = obj[i];
                }
                return c;
            },
            clearObjAttr(obj) {
                for (let i in obj) {
                    obj[i] = null;
                }
                obj.serialNumber = parseInt(Math.random() * 1234123);
            },
            /*称重*/
            getMoney() {
                this.$message('以自动获取金额 如果未获取再点击此按钮');
            },
            nextStep(formName) {
                if (this.commodityData.length > 0) {
                    this.$emit('complete', formName, "commodityData", this.commodityData);
                } else {
                    this.$message({
                        showClose: true,
                        message: '请至少添加一条商品信息!!',
                        type: 'warning'
                    });
                }
            },
            loadAll() {
                return [
                    { "value": "西瓜", "address": "长宁区新渔路144号" },
                    { "value": "香蕉", "address": "上海市长宁区淞虹路661号" },
                    { "value": "苹果", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "冬瓜", "address": "天山西路438号" },
                    { "value": "茄子", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "手枪", "address": "上海市长宁区淞虹路661号" },
                    { "value": "橘子", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "手榴弹", "address": "天山西路438号" },
                    { "value": "火炮", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },

                ];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 0);
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            confirm(){
                this.$confirm(`请将商品放置仪表秤上,点击'开始称重'按钮,并等待系统获取到准确数值(约2~3秒)~~`, '提示', {
                    confirmButtonText: '确认称重',
                    cancelButtonText: '放弃称重',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        showClose: true,
                        message: '正在获取重量      :)',
                    });
                    var that = this;
                    setTimeout(function () {
                        that.loading = false;
                        that.$http.get("http://localhost:80/SendCMD?idx=1&CMD=R")
                            .then(function (response) {
                                if (response.data.success) {
                                    that.$http.get("http://localhost:80/GetBuffer?idx=1").then(function (response) {
                                        if (response.data.success) {
                                            let re = /^wn([^kg]*)kg/g;
                                            let result = parseFloat(re.exec(response.data.buffer)[1]) * 2;
                                            that.commodityForm.weight = result;
                                            that.$message("成功获取重量     :)");
                                            that.commodityForm.sumMoney = Number((that.commodityForm.weight * that.commodityForm.unitPrice).toFixed(2));
                                        }
                                    }).catch(function () {
                                        that.$message.error("获取重量失败  :(");
                                    });
                                }
                            }).catch(function () {
                            that.$message.error("请求无响应,请检查设备  :(");
                        });

                    }, 500);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '放弃称重   :('
                    });
                });
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
        }

    };
</script>
<style lang="less" rel="stylesheet/less">
    #commodityInfo {
        height: inherit;
        .el-cascader__label {
            font-size: 18px;
            line-height: 50px;
            height: auto;
            left: 25px;
            font-weight: bold;

        }
        #back_btn {
            margin: 0 1px;
            position: relative;
            span {
                font-size: 30px;
            }
        }
        .el-alert {
            width: 50%;
            margin: 12px auto;
            .el-alert__icon {
                font-size: 30px;
            }
        }
        //正文
        .commodityContent {
            margin-top: 30px;
            width: 100%;
            padding: 0 10px;
            .el-table {
                font-size: 24px;
                text-align: center;
                .cell .el-button--small {
                    font-size: 24px;
                }
            }
            //第一行标题栏
            .el-table__header th .cell:first-child {
                padding: 1%;
                text-align: center;
            }
            //下面的金额 数量等信息
            .footerInfo {
                position: relative;
                vertical-align: middle;
                top: 0;
                background: #ffffff;
                border: 1px solid #dfe6ec;
                border-bottom: 3px ridge #dfe6ec;
                margin-right: 24px;
                cursor: pointer;
                overflow: hidden;
                .totalMoney,
                .totalWeight {
                    line-height: 60px;
                    font-size: 25px;
                    margin-left: 100px;
                    & span {
                        color: red;
                    }
                }
                .addIcon {
                    float: right;
                    margin-right: 60px;
                    border-radius: 50%;
                    opacity: 0.8;
                    &:hover {
                        opacity: 1;
                    }
                }
            }
            .footer_button {
                display: flex;
                justify-content: center;
                padding: 10px;
                span {
                    font-size: 30px;
                }
            }
        }
        .adding_goods {
            overflow: hidden;
            margin-top: -100px;
            .el-form-item__label {
                font-size: 25px;
            }
            #appendInput {
                .el-input__inner {
                    width: 120px;

                }
                .el-input-group__append {
                    background: #20a0ff;
                    border-color: #20a0ff;
                }
                .el-button {
                    font-size: 20px;
                    color: #ffffff;
                }
            }
            .el-input {
                width: 230px;
                margin-left: 30px;
            }
            .el-input-number {
                width: 230px;
                margin-left: 30px;
                .el-input-number__decrease,
                .el-input-number__increase {
                    height: 50px;
                    padding-top: 8px;
                    .el-icon-minus {
                    }
                }
                .el-input {
                    margin-left: 0;
                }
            }
            .units {
                position: absolute;
                top: 6px;
                left: 250px;
                font-size: 26px;
            }
            .el-input__inner {
                height: 50px;
                width: 230px;
                font-size: 25px;
            }
            .el-button {
                font-size: 26px;
            }
            .serialNumber {
                font-size: 23px;
                position: absolute;
                top: 3px;
                left: 180px;
                color: darkred;
                background: #cccccc;
                padding: 3px;
                border-radius: 5px;
            }
            .el-alert {
                width: auto;
            }
            .getMoney,
            .is-disabled .el-input__inner {
                color: red;
            }
            .el-loading-spinner .el-loading-text {
                font-size: 25px;
            }
        }
    }
</style>
