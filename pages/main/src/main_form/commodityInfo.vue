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
                    <el-table-column prop="unitPrice" label="单价">
                    </el-table-column>
                    <el-table-column prop="weight" label="重量">
                    </el-table-column>
                    <el-table-column prop="serialNumber" label="编号">
                    </el-table-column>
                    <el-table-column prop="sumMoney" label="金额(元)">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template scope="scope">
                            <el-button @click.native.prevent="editRow(scope.$index, commodityData)" type="text"
                                       size="small">
                                修改
                            </el-button>
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
                    <img src="../asset/img/addkey.jpg" class="addIcon" @click="showDialog" alt=""
                         width="60" height="60">
                </el-tooltip>
            </div>
            <!-- 下面的按钮 -->
            <div class="footer_button">
                <el-button type="info" @click="showDialog">添加商品</el-button>
                <el-button type="success" size="large" @click="nextStep('secondForm')"
                           v-bind:disabled="commodityData.length === 0">确认提交
                </el-button>
                <el-button size="large" @click="clearAll">移除所有</el-button>
            </div>
            <el-alert title="小提示:" type="info" description="'加号'或'添加商品'按钮都可添加新商品~" show-icon>
            </el-alert>
        </div>
        <!-- dialog填写表单 -->
        <el-dialog title="商品信息" v-model="dialogFormVisible" class="adding_goods">
            <el-form :model="commodityForm" v-loading="loading" element-loading-text="拼命加载中....">
                <el-form-item label="商品名称">
                    <el-select v-model="commodityForm.variety" placeholder="请选择商品" @change="changeCommodity">
                        <el-option v-for="item in commodity" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-tooltip class="item" effect="dark" content="添加新商品名称" placement="right-start">
                        <el-button class="addInfo_icon" @click="addVariety"><i class="el-icon-plus"></i></el-button>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="商品产地">
                    <el-select v-model="commodityForm.origin" placeholder="请选择产地">
                        <el-option v-for="item in addressOptions" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-tooltip class="item" effect="dark" content="添加新产地信息" placement="right-start">
                        <el-button class="addInfo_icon" @click="addOrigin"><i class="el-icon-plus"></i></el-button>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="商品单价">
                    <el-input-number v-model="commodityForm.unitPrice" :min=1>
                    </el-input-number>
                    <span class="units">元/斤</span>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="commodityForm.weight" disabled id="appendInput">
                        <el-button slot="append" @click="getWeight" :disabled="whetherShowButton">获取重量</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                    <span class="serialNumber">{{commodityForm.serialNumber}}</span>
                </el-form-item>
                <el-form-item label="商品金额">
                    <el-input disabled v-model="goodSumMoney" id="appendInput">
                        <el-button slot="append" @click="getMoney" :disabled="whetherShowButton">获取金额</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addItem" :disabled="commodityForm.weight <= 0">确 定</el-button>
            </div>
        </el-dialog>
        <!-- dialog商品管理 -->
        <el-dialog title="商品管理" v-model="dialogGoodsManage" class="adding_goods">
            <el-form :model="goodsManage" v-loading="loading" element-loading-text="拼命加载中....">
                <el-form-item label="商品名称">
                    <el-autocomplete class="inline-input" v-model="goodsManage.variety" :fetch-suggestions="querySearch"
                                     placeholder="请输入商品名称" @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item label="商品产地">
                    <el-autocomplete class="inline-input" v-model="goodsManage.origin"
                                     :fetch-suggestions="querySearchOrigin" placeholder="请输入商品名称"
                                     @select="handleSelect"></el-autocomplete>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogGoodsManage = false">取 消</el-button>
                    <el-button  type="primary" @click="addGoods" :disabled="whetherAdding">确 定</el-button>
            </div>
        </el-dialog>
        <!-- dialog称重系统 -->
        <el-dialog title="获取重量" size="large" :close-on-click-modal=false :close-on-press-escape=false :show-close=false
                   v-model="dialogGetWeight" class="get_weight_dialog">
            <div class="title"><span class="titleHeightLight">净重称重</span>|<span :class="{titleHeightLight : goodsWeight.Peeled>0}">去皮称重</span>|<span :class="{titleHeightLight : goodsWeight.cumulativeWeight !=='未开启'}">累计称重</span></div>
            <el-form :model="goodsWeight">
                <el-form-item label="去皮设置">
                    <el-input disabled v-model="goodsWeight.Peeled" class="append">
                        <el-button slot="append" @click="getPeeledWeight">点击重设去皮</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="当前物重(净重)">
                    <el-input disabled v-model="goodsWeight.netWeight">
                        <template slot="append">单位 ： 斤</template>

                    </el-input>
                </el-form-item>
                <el-form-item label="累计重量" :class="{disabledLabel : !isAddingUp}">
                    <el-input disabled v-model="goodsWeight.cumulativeWeight" :class="{disableCumulative : !isAddingUp}">
                        <template slot="append">单位 ： 斤</template>
                    </el-input>
                </el-form-item>
                <el-form-item class="button">
                    <!--获取净重-->
                    <el-button type="success" @click="getNetWeight">称取重量</el-button>
                    <el-button @click="executeAddUpHandler" :class="{highLight : isAddingUp}">{{buttonText}}</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogGetWeight">放 弃</el-button>
                <el-button type="primary" @click="submitDialogGetWeight" :disabled="!(goodsWeight.cumulativeWeight>0 || goodsWeight.netWeight>0)">提 交</el-button>
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
                goodsWeight: {
                    Peeled: 0,
                    netWeight: 0,
                    cumulativeWeight: "未开启"
                },
                isEdit:false,
                buttonText: "开启累计",
                isAddingUp: false, //是否开启累计模式
                dialogGetWeight: false,
                goodsManage: {
                    variety: "",
                    origin: ""
                },
                loading: false,
                dialogGoodsManage: false,
                dialogFormVisible: false,
                dialogTip: false,
                timeout: null,
                whetherShowButton: false,
                origins: [],
                restaurants: [],
                commodity: [{
                    value: '西瓜',
                    label: '西瓜'
                }, {
                    value: '香蕉',
                    label: '香蕉'
                }, {
                    value: '鸡蛋',
                    label: '鸡蛋'
                }, {
                    value: '苹果',
                    label: '苹果'
                }, {
                    value: '手枪',
                    label: '手枪'
                }],
                commodityForm: {
                    variety: '西瓜',
                    origin: '',
                    unitPrice: 5,
                    weight: 0,
                    serialNumber: parseInt(Math.random() * 1234123),
                    sumMoney: 0
                },
                palceOfProduction: {
                    "西瓜": [{
                        value: '东莞西平区',
                        label: '东莞西平区'
                    }, {
                        value: '香港尖沙咀',
                        label: '香港尖沙咀'
                    }, {
                        value: '澳大利亚',
                        label: '澳大利亚'
                    }, {
                        value: '东莞东城区',
                        label: '东莞东城区'
                    }, {
                        value: '北京通州区',
                        label: '北京通州区'
                    }],
                    "鸡蛋": [{
                        value: '非洲',
                        label: '非洲'
                    }, {
                        value: '南美洲',
                        label: '南美洲'
                    }, {
                        value: '北美洲',
                        label: '北美洲'
                    }, {
                        value: '亚洲',
                        label: '亚洲'
                    }],
                    "香蕉": [{
                        value: '日本',
                        label: '日本'
                    }, {
                        value: '韩国',
                        label: '韩国'
                    }, {
                        value: '中国',
                        label: '中国'
                    }, {
                        value: '俄罗斯',
                        label: '俄罗斯'
                    }],
                    "苹果": [{
                        value: '火星',
                        label: '火星'
                    }, {
                        value: '金星',
                        label: '金星'
                    }, {
                        value: '木星',
                        label: '木星'
                    }, {
                        value: '冥王星',
                        label: '冥王星'
                    }],
                    "手枪": [{
                        value: '公安局',
                        label: '公安局'
                    }, {
                        value: '中央兵库',
                        label: '中央兵库'
                    }, {
                        value: '黑道',
                        label: '黑道'
                    }, {
                        value: '走私',
                        label: '走私'
                    }]


                },

            }
        },
        computed: {
            whetherAdding() {
                console.log(this.goodsManage.variety && this.goodsManage.origin);
                if (this.goodsManage.variety && this.goodsManage.origin) {
                    return false;
                }
                return true;
            },
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
            },
            addressOptions() {
                return this.palceOfProduction[this.commodityForm.variety];
            },
            goodSumMoney(){
                this.commodityForm.sumMoney=Number(this.commodityForm.weight*Number(this.commodityForm.unitPrice));
               return this.commodityForm.sumMoney;
            },

        },
        methods: {
            submitDialogGetWeight(){
                this.dialogGetWeight=false;
                if(this.goodsWeight.cumulativeWeight>0){
                    this.commodityForm.weight=this.goodsWeight.cumulativeWeight;
                }else{
                    this.commodityForm.weight=this.goodsWeight.netWeight;
                }
            },
            executeAddUpHandler(){
                if (!this.isAddingUp) {
                    this.$confirm('此操作将开启“累计模式”,之后秤取的重量都将会被累计,如需取消“累计模式”再次点击即可', '提示', {
                        confirmButtonText: '确定开启累计',
                        cancelButtonText: '放弃开启累计',
                        type: 'info'
                    }).then(() => {
                        this.isAddingUp = true;
                        this.buttonText = "关闭累计";
                        this.goodsWeight.cumulativeWeight= this.goodsWeight.netWeight;
                        this.$message({
                            type: 'success',
                            message: '开启累计模式...'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消累计操作....'
                        });
                    });
                } else {
                    this.$confirm('注意:"之前累计重量将会清除!!!!!"您已开启累计模式,是否确定关闭累计模式?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.isAddingUp = false;
                        this.buttonText = "开启累计";
                        this.goodsWeight.cumulativeWeight=`未开启`;
                        this.$message({
                            type: 'success',
                            message: '关闭累计模式...'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '继续执行累计操作....'
                        });
                    });

                }
            },
            //获取净重
            getNetWeight(){
                this.$confirm(`请将需要“称重的物体”放置仪表秤上,点击"我已放好"按钮,并等待系统获取到准确数值(约2~3秒)~~`, '提示', {
                    confirmButtonText: '我已放好',
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
                                            result -=that.goodsWeight.Peeled;
                                            if(that.isAddingUp){
                                                let a=that.goodsWeight.cumulativeWeight+Number(result.toFixed(1));
                                                that.goodsWeight.cumulativeWeight=Number(a.toFixed(1));
                                            }
                                            that.goodsWeight.netWeight = Number(result.toFixed(1));
                                            that.$message("成功获取物体重量     :)");
                                        }
                                    }).catch(function () {
                                        that.$message.error("获取重量失败  :(");
                                    });
                                }
                            }).catch(function () {
                            let result=100;
                            result -=that.goodsWeight.Peeled;
                            if(that.isAddingUp){
                                    that.goodsWeight.cumulativeWeight+=result;
                                }
                            that.goodsWeight.netWeight = result;
                            that.$message.error("请求无响应,请检查设备  :(");
                        });

                    }, 500);
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '放弃称重操作   :('
                    });
                });
            },
            //获取去皮重量
            getPeeledWeight(){
                this.$confirm(`请将需要去掉重量的物体放置仪表秤上,点击"我已放好"按钮,并等待系统获取到准确数值(约2~3秒)~~`, '提示', {
                    confirmButtonText: '我已放好',
                    cancelButtonText: '放弃去皮',
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
                                            that.goodsWeight.Peeled = Number(result.toFixed(1));
                                            that.$message("成功获取去皮重量     :)");
                                        }
                                    }).catch(function () {
                                        that.$message.error("获取重量失败  :(");
                                    });
                                }
                            }).catch(function () {
                            that.goodsWeight.Peeled = 9;
                            that.$message.error("请求无响应,请检查设备  :(");
                        });

                    }, 500);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '放弃去皮操作   :('
                    });
                });
            },
            closeDialogGetWeight(){
                this.dialogGetWeight=false;
                this.isAddingUp=false;
                this.buttonText="开启累计";
                for(let key in this.goodsWeight){
                    this.goodsWeight[key]=0;
                    if(key === "cumulativeWeight"){
                        this.goodsWeight[key]="未开启";
                    }
                }
            },
            addGoods() {
                var variety = this.goodsManage.variety;
                var origin = this.goodsManage.origin;
                this.commodity.push({
                    value: variety,
                    label: variety
                });
                if (this.palceOfProduction[variety]) { //如果这个商品已经存在了 即只要添加地址
                    this.palceOfProduction[variety].push({
                        value: origin,
                        label: origin
                    })
                } else {
                    this.palceOfProduction[variety] = [{
                        value: origin,
                        label: origin
                    }]
                }
                this.commodityForm.variety = variety;
                this.commodityForm.origin = origin;
                this.clearObjAttr(this.goodsManage);
                this.dialogGoodsManage = false;
            },
            changeCommodity() {
                this.commodityForm.origin = "";
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            editRow(index, rows) {
                this.isEdit=true;
                this.dialogFormVisible = true;
                this.whetherShowButton = true;
                let row = rows.slice(index, index + 1)[0];
                for (let key in row) {
                    this.commodityForm[key] = row[key];
                }

            },
            addVariety() {
                this.dialogGoodsManage = true;
            },
            addOrigin() {
                if (this.commodityForm.variety) {
                    this.dialogGoodsManage = true;
                    this.goodsManage.variety = this.commodityForm.variety;
                } else {
                    this.$message.error('请先选择一个商品再点击添加它的产地信息哦!         :)');
                }
            },
            backhome(form) {
                this.$emit('back', form);
            },
            showDialog() {
                this.whetherShowButton = false;
                this.dialogFormVisible = true;
                this.clearObjAttr(this.commodityForm);
                this.commodityForm.weight = 0;
                this.commodityForm.sumMoney = 0;
                this.commodityForm.serialNumber = parseInt(Math.random() * 1234123);
            },
            addItem() {
            if(!this.isEdit){
                this.commodityData.push(this.extendCopy(this.commodityForm));
                this.dialogFormVisible = false;
            }else{
                for(let i=0;i< this.commodityData.length;i++){
                    if(this.commodityForm.serialNumber == this.commodityData[i].serialNumber){
                        this.isEdit=false;
                        this.commodityData.splice(i,1,this.extendCopy(this.commodityForm));
                        this.clearObjAttr(this.commodityForm);
                        this.commodityForm.weight = 0;
                        this.commodityForm.sumMoney = 0;
                        this.commodityForm.serialNumber = parseInt(Math.random() * 1234123);
                        this.dialogFormVisible = false;
                    }
                }

            }

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
                for (let key in obj) {
                    obj[key] = null;
                }

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

            getWeight() {

                this.dialogGetWeight = true;
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            querySearchOrigin(queryString, cb) {
                var origins = this.origins;
                var results = queryString ? origins.filter(this.createFilter(queryString)) : origins;
                // 调用 callback 返回建议列表的数据
                cb(results);

            },
            createFilterOrigin(queryString) {
                return (origins) => {
                    return (origins.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [{
                    "value": "蘑菇"
                }, {
                    "value": "冬瓜"
                }, {
                    "value": "青菜"
                }, {
                    "value": "白菜"
                }, {
                    "value": "猪肉"
                }, {
                    "value": "饼干"
                }, {
                    "value": "鸡肉"
                }, {
                    "value": "牛肉"
                }, {
                    "value": "哈密瓜"
                }, {
                    "value": "椰子"
                }, {
                    "value": "桃子"
                }, {
                    "value": "猪肝"
                },];
            },
            loadAllOrigins() {
                return [{
                    "value": "东城区"
                }, {
                    "value": "南城区"
                }, {
                    "value": "西城区"
                }, {
                    "value": "北城区"
                }, {
                    "value": "蛤地"
                }, {
                    "value": "西平"
                }, {
                    "value": "石龙"
                }, {
                    "value": "旗峰公园"
                }, {
                    "value": "日本"
                }, {
                    "value": "香港"
                }, {
                    "value": "澳门"
                }];
            },
            handleSelect(item) {
                console.log(item);
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
            this.origins = this.loadAllOrigins();
        }

    };
</script>
<style lang="less" rel="stylesheet/less">
    #commodityInfo {
        height: inherit;
        overflow: hidden;
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
                .el-table__body-wrapper {
                    overflow-x: hidden;
                }
                .cell .el-button--small {
                    font-size: 24px;
                    display: block;
                    margin: 0 auto;
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
            //添加商品的弹窗
            overflow: hidden;
            margin-top: -100px;
            .el-form-item__label {
                font-size: 25px;
            }
            .el-button, .el-input-group__append {
                font-size: 20px;
                color: #ffffff;
                background: #20a0ff;
                border-color: #20a0ff;
                &.is-disabled {
                    background-color: #eef1f6;
                    border-color: #d1dbe5;
                    color: lighten(black,40%);
                    cursor: not-allowed;
                }
            }
            #appendInput {
                .el-input__inner {
                    width: 120px;
                }
            }
            .addInfo_icon {
                vertical-align: top;
                color: #bfcbd9;
                padding: 11.5px 10px;
                background: transparent;
                border-color: #bfcbd9;
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
            .is-disabled {
                .el-input__inner {
                    color: red;
                }
            }
            .el-loading-spinner .el-loading-text {
                font-size: 25px;
            }
        }
        .get_weight_dialog {
            .el-dialog {
                background: url("../asset/img/bgc.jpg");
            }
            .title { //标题
                margin: 0 auto;
                font-size: 25px;
                text-shadow: 5px 5px 2px #cccccc;
                span {
                    margin: 0 10%;
                }
                .titleHeightLight {
                    font-weight: bold;
                    color: lighten(red, -13%);
                }
            }
            .el-form {
                margin-top: 50px;
            }
            /*内容*/
            .el-form-item__label {
                margin: 10px 15px 0 35px;
                font-size: 32px;
            }
            .el-input-group .el-input-group__append {
                color: #ffffff;
                background: transparent;
                border-radius: 0 8px 8px 0;
                font-size: 23px;
                cursor: not-allowed;
                .el-button {
                    border-color: transparent;
                    margin: 0;
                    padding: 0;
                    height: 52px;
                    font-size: 23px;
                }
            }
            .el-input {
                position: absolute;
                width: 400px;
                height: 50px;
                left: 330px;
                margin: 10px 0;
                font-size: 28px;
                border-radius: 3%;
                background: linear-gradient(30deg, lighten(black, 80%) 55%, lighten(black, 70%) 45%);
                .el-input__inner {
                    height: 50px;
                    color: lighten(red, -10%);
                    padding-left: 20px;
                    background: transparent;
                    border-color: transparent;
                }
                .el-button {
                    font-size: 25px;
                }
            }
            .append {
                background: linear-gradient(30deg, lighten(black, 80%) 55%, lighten(#20a0ff, 10%) 45%);
            }
            .button {
                text-align: center;
                .el-button {
                    margin: 30px 0 0 50px;
                    font-size: 28px;
                }
            }
            .highLight {
                color: red;
                background: lighten(#cccccc, 10%);
            }
            .disableCumulative{
                opacity: 0.4;
                    .el-input__inner {
                    color: lighten(red, -30%);
                }
            }
            .disabledLabel .el-form-item__label{
                color: lighten(#cccccc,-10%);
                cursor: not-allowed;

            }
            .dialog-footer {
                .el-button {
                    margin-left: 50px;
                    font-size: 30px;
                }
            }
        }
    }
</style>
