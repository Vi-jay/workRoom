<template>
    <div id="form">
        <calculator></calculator>
        <div class="outer" >
            <div class="right_tag" ><span>日期</span>：{{orderDate}}</div>
            <div class="right_tag"><span>订单编号</span>：{{orderNumber}}</div>
            <div class="clear"></div>
            <transition name="fade">
                <div class="formWrapper" v-show="active === 1">
                    <form_first v-on:submit="getSubmitForm"></form_first>
                </div>
            </transition>
            <transition name="fade">
                <div class="formWrapper" v-show="active === 2">
                    <form_second v-on:submit="getSubmitForm"></form_second>
                </div>
            </transition>
            <transition name="fade">
                <div class="formWrapper" v-show="active === 3">
                    <form_third v-on:submit="getSubmitForm"></form_third>
                </div>
            </transition>
        </div>
        <div class="stepWrapper">
            <el-steps :center=true :active="active" finish-status="success">
                <el-step title="第一步"></el-step>
                <el-step title="第二步"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <div class="seal">
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
let calculator = require('../compoents/calculator/calculator.vue'),
    form_first = require('./form_first.vue'),
    form_second = require('./form_second.vue'),
    form_third = require('./form_third.vue');
export default {
    data() {
            return {
                orderNumber: 132165465456654,
                orderDate: new Date().toLocaleString(),
                active: 1,
                allFormParams: {
                    aa: 1
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            next() {
                if (this.active++ > 2) alert('提交成功！！');
            },
            getSubmitForm(formData) {
                console.log(formData);
            }
        }, components: {
            calculator: calculator,
            form_first: form_first,
            form_second: form_second,
            form_third: form_third,
        },
};
</script>
<style lang="less" rel="stylesheet/less">
#form {
    padding-bottom: 50px;
    transform: scale(0.5,0.5);
    .outer {
        margin: 110px 20px 0 20px;
        .right_tag {
            font-size: 20px;
            background-color: #8391a5;
            padding: 0 5px;
            height: 35px;
            line-height: 32px;
            color: #fff;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid transparent;
            white-space: nowrap;
            display: inline-block;
            -webkit-user-select: none;
            -moz-user-select: none;
            cursor: default;
            margin: 0 20px 36px 0;
            float: right;
            & span {
                color: darken(#f20d59, 10%);
            }
        }
        .clear {
            clear: right;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s
        }
        .fade-enter {
            opacity: 0
        }
        .fade-leave-active {
            display: none;
        }
    }
    .stepWrapper {
        margin:0 20px;
        position: fixed;
        width: 97%;
        bottom: 60px;
        height:50px;
        .seal {
            width: 185px;
            height: 194px;
            border-radius: 50%;
            background: url('../../static/img/seal.png') no-repeat;
            background-size: 500px 500px;
            background-position: -45px 0;
            position: relative;
            top: -194px;
            left: 80%;
        }
    }
}
</style>
