<template>

</template>
<script type="text/ecmascript-6">
    import  Vue from 'vue';
    let echart = require('echarts');
    let wj_component = new Vue();

    wj_component.install = function (Vue, options) {
        Vue.mixin({   //在这里定义的东西都会被vue使用时继承过去  可以在这定义全局组件 将会被使用者继承
            methods: {
                getPreDay(date, day) {
                    let timestamp = Date.parse(date);
                    timestamp = timestamp - day * 24 * 60 * 60 * 1000;
                    let newDate = new Date();
                    newDate.setTime(timestamp);
                    return this.getYYYYMMDDStr(newDate);
                },
                NowDateTime() {
                    let curr_time = new Date();
                    return this.getYYYYMMDDStr(curr_time);
                },
                getYYYYMMDDStr(curr_time) {
                    let year = curr_time.getFullYear();
                    let M = curr_time.getMonth() + 1;
                    let MM = (M < 10) ? "0" + M : M;
                    let D = curr_time.getDate();
                    let DD = (D < 10) ? "0" + D : D;
                    return year + "-" + MM + "-" + DD;
                },
                getDate(datestr) {
                    let temp = datestr.split("-");
                    let date = new Date(temp[0], temp[1] - 1, temp[2]);
                    return date;
                },
                initOrderData(data) {
                    let orderDatas = Array;
                    for ( let i = 0; i < data.length; i++) {
                        var orderData = {};
                        orderData.shopName = data[i].second_category_name;
                        orderData.numFor5KG = data[i].num_for_5KG;
                        orderData.numFor15KG = data[i].num_for_15KG;
                        orderData.numFor50KG = data[i].num_for_50KG;
                        orderData.numFor2KG = data[i].num_for_2KG;
                        orderData.CountTotal = orderData.numFor5KG + orderData.numFor15KG
                            + orderData.numFor50KG + orderData.numFor2KG;
                        orderDatas.unshift(orderData);
                    }
                    alert(JSON.stringify(orderDatas));
                    return orderDatas;
                },
                getCurrentMonthFirst() {

                    let date = new Date();
                    date.setDate(1);
                    return this.getYYYYMMDDStr(date);
                },
                getCurrentMonthLast() {
                    let date = new Date();
                    let currentMonth = date.getMonth();
                    let nextMonth = ++currentMonth;
                    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
                    let oneDay = 1000 * 60 * 60 * 24;
                    return this.getYYYYMMDDStr(new Date(nextMonthFirstDay - oneDay));
                },
                initOrderTypeData(data) {

                    let orderTypeDatas = Array;
                    let orderTypeDataMap = {};
                    for ( let i = 0; i < data.length; i++) {
                        let orderTypeData = {};
                        if (orderTypeDataMap[data[i].second_category_name] != null) {
                            orderTypeData = orderTypeDataMap[data[i].second_category_name];
                        }
                        switch (data[i].mode_name) {
                            case '门店自提':
                                orderTypeData['pickUpInSotre'] = data[i].orderNumber;
                                break;
                            case '电话订气':
                                orderTypeData['telephoneOrder'] = data[i].orderNumber;
                                break;
                            case '微信订气':
                                orderTypeData['weiXinOrder'] = data[i].orderNumber;
                                break;
                            default:
                        }
                        orderTypeDataMap[data[i].second_category_name] = orderTypeData;
                    }
                    let tmpData = {};
                    for ( let key in orderTypeDataMap) {
                        tmpData.shopName = '总计';
                        tmpData['门店自提'] = orderTypeDataMap[key].pickUpInSotre == null ? 0
                            : orderTypeDataMap[key].pickUpInSotre;
                        tmpData['电话订气'] = orderTypeDataMap[key].telephoneOrder == null ? 0
                            : orderTypeDataMap[key].telephoneOrder;
                        tmpData['微信订气'] = orderTypeDataMap[key].weiXinOrder == null ? 0
                            : orderTypeDataMap[key].weiXinOrder;
                        orderTypeDatas.push(tmpData);
                    }
                    alert(JSON.stringify(orderTypeDatas));
                    return orderTypeDatas;
                },
                getTimeList(time1, time2) {

                    let start = time1;
                    let end = time2;
                    let startTime = this.getDate(start);
                    let endTime = this.getDate(end);

                    let timeList = [];

                    while ((endTime.getTime() - startTime.getTime()) >= 0) {

                        let timeStr = this.getYYYYMMDDStr(startTime);

                        timeList.push(timeStr);
                        startTime.setTime(startTime.getTime() + 24 * 60 * 60 * 1000);
                    }
                    return timeList;
                },
                initAvgReturnBottleRateData(data, lastTwoMonthDay, lastMonthDay, today) {

                    let sotreBottleNumMap = {};
                    let sotreMap = {};
                    let timeMap = {};
                    let _this=this;
                    for ( let i = 0; i < data.length; i++) {


                        if (data[i].second_category_name != '海岛站'
                            && data[i].second_category_name != '南面站'
                            && data[i].second_category_name != '九门寨站'
                            && data[i].second_category_name != '博美站') {
                            continue;
                        }

                        if (sotreMap[data[i].second_category_name] == null) {
                            sotreMap[data[i].second_category_name] = data[i].second_category_name;
                        }

                        if (timeMap[data[i].order_date] == null) {
                            timeMap[data[i].order_date] = data[i].order_date;
                        }

                        let sotreBottleNum = {
                            getNum : 0,
                            returnNum : 0
                        };

                        let key = data[i].second_category_name + '/' + data[i].order_date;

                        if (sotreBottleNumMap[key] != null) {
                            sotreBottleNum = sotreBottleNumMap[key];
                        }

                        sotreBottleNum.returnNum += data[i].returnBottleNum;
                        sotreBottleNum.getNum += data[i].getBottleNum;

                        sotreBottleNumMap[key] = sotreBottleNum;

                    }

                    let sotreBottleDateNumMap = {};

                    for ( let storeKey in sotreMap) {

                        for ( let timeKey in timeMap) {

                            let key = storeKey + '/' + timeKey;

                            if (sotreBottleNumMap[key] == null) {
                                continue;
                            }

                            let list = [];

                            if (sotreBottleDateNumMap[storeKey] != null) {
                                list = sotreBottleDateNumMap[storeKey];
                            }

                            let dateRate = {
                                date : timeKey,
                                rate : 1.0 * sotreBottleNumMap[key].returnNum
                                / sotreBottleNumMap[key].getNum * 100,
                            };

                            list.push(dateRate);

                            sotreBottleDateNumMap[storeKey] = list;
                        }

                    }

                    let resultList = [];

                    for ( let storeKey in sotreMap) {

                        if (sotreBottleDateNumMap[storeKey] != null) {
                            let list = sotreBottleDateNumMap[storeKey];

                            list.sort(function(a, b) {
                                let x = _this.getDate(a.date);
                                let y = _this.getDate(b.date);
                                return x > y ? 1 : -1;
                            });

                            let sumList = [];
                            let tmpSum = 0;
                            for ( let i = 0; i < list.length; i++) {

                                let sumObject = {};

                                sumObject.date = list[i].date;
                                sumObject.cnt = i;

                                tmpSum = tmpSum + list[i].rate;
                                sumObject.rate = list[i].rate;
                                sumObject.rateSum = tmpSum;

                                sumList.push(sumObject);
                            }

                            let timeList = _this.getTimeList(_this.getPreDay(_this.NowDateTime(),30), _this.NowDateTime());

                            let resultMap = {};

                            resultMap.shopName = storeKey;


                            let dataResult = [];
                            let lastAvgRate = 0;
                            let dateTimeResult = [];
                            let dateAvgRateResult = [];
                            for ( let i = 0; i < timeList.length; i++) {

                                let index = _this.findSumListIndex(sumList,timeList[i]);

                                let avgRate;

                                if(index == -1){
                                    avgRate = lastAvgRate;
                                }else{

                                    let len = index >= 30 ? 30 : index;
                                    avgRate = (sumList[index].rateSum - sumList[index - len].rateSum)/len;
                                }

                                lastAvgRate = avgRate;
                                dateTimeResult.push(_this.getMMDDStr(_this.getDate(timeList[i])));
                                dateAvgRateResult.push(avgRate.toFixed(1));
                            }

                            dataResult.push(dateTimeResult);
                            dataResult.push(dateAvgRateResult);

                            resultMap.data = dataResult;
                            resultList.push(resultMap);
                        }
                    }

                    return resultList;
                },
                initStoreInventoryData(data) {
                    let storeInventoryDatas = [];
                    let storeInventoryDataMap = {};
                    for ( let i = 0; i < data.length; i++) {
                        if(data[i].air_bottle_state == '空瓶'){
                            continue;
                        }
                        let storeInventoryData = {};
                        if(storeInventoryDataMap[data[i].second_category_name] != null){
                            storeInventoryData = storeInventoryDataMap[data[i].second_category_name];
                        }
                        switch (data[i].air_bottle_specifications) {
                            case '2KG':
                                storeInventoryData['numFor2KG'] = data[i].inventory_num;
                                break;
                            case '5KG':
                                storeInventoryData['numFor5KG'] = data[i].inventory_num;
                                break;
                            case '15KG':
                                storeInventoryData['numFor15KG'] = data[i].inventory_num;
                                break;
                            case '50KG':
                                storeInventoryData['numFor50KG'] = data[i].inventory_num;
                                break;
                            default:
                        }
                        storeInventoryDataMap[data[i].second_category_name] = storeInventoryData;
                    }
                    for(let key in storeInventoryDataMap){
                        let tmpData = {};
                        tmpData.shopName = key;
                        tmpData.numFor5KG = storeInventoryDataMap[key].numFor5KG == null ? 0 : storeInventoryDataMap[key].numFor5KG;
                        tmpData.numFor15KG = storeInventoryDataMap[key].numFor15KG == null ? 0 : storeInventoryDataMap[key].numFor15KG;
                        tmpData.numFor50KG = storeInventoryDataMap[key].numFor50KG == null ? 0 : storeInventoryDataMap[key].numFor50KG;
                        tmpData.numFor2KG = storeInventoryDataMap[key].numFor2KG == null ? 0 : storeInventoryDataMap[key].numFor2KG;
                        storeInventoryDatas.push(tmpData);
                    }
                    return storeInventoryDatas;
                },
                getMMDDStr(curr_time) {

                    let year = curr_time.getFullYear();
                    let M = curr_time.getMonth() + 1;
                    let MM = (M < 10) ? "0" + M : M;
                    let D = curr_time.getDate();
                    let DD = (D < 10) ? "0" + D : D;
                    let h = curr_time.getHours();
                    let hh = (h < 10) ? "0" + h : h;
                    let m = curr_time.getMinutes();
                    let mm = (m < 10) ? "0" + m : m;

                    return MM + "-" + DD;
                },
                findSumListIndex(sumList,str){

                    for ( let i = 0; i < sumList.length; i++) {
                        if(sumList[i].date == str){
                            return i;
                        }
                    }
                    return -1;
                }

            },
            data(){
                return{
                    echart:echart,
                    basePath:"/energymanage"
                }
            }
        });
    };
    export default {wj_component};
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
