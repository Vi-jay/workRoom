<template>
    <div id="form" >
        <calculator></calculator>
        <transition name="fade">
            <div class="formWrapper" v-show="active === 1">
                <form_one v-on:submit="getSubmitForm"></form_one>
            </div>
        </transition>
        <transition name="fade">
            <div class="formWrapper" v-show="active === 2">
                <form_two v-on:submit="getSubmitForm"></form_two>
            </div>
        </transition>
        <transition name="fade">
            <div class="formWrapper" v-show="active === 3">
                <form_three v-on:submit="getSubmitForm"></form_three>
            </div>
        </transition>
        <div class="stepWrapper">
            <el-steps :center=true :active="active" finish-status="success">
                <el-step title="第一步"></el-step>
                <el-step title="第二步"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    let calculator = require('../compoents/calculator/calculator.vue'),
        form_one = require('./form_one.vue'),
        form_two = require('./form_two.vue'),
        form_three = require('./form_three.vue');
    export default {
        data() {
            return {
                active: 1,
                allFormParams: {aa: 1}
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }, next () {
                if (this.active++ > 2) alert('提交成功！！');
            }, getSubmitForm(formData){
                console.log(formData);
            }
        }, components: {
            calculator: calculator,
            form_one: form_one,
            form_two: form_two,
            form_three: form_three,
        },
    };
</script>
<style lang="less" rel="stylesheet/less">
    #form {
        padding-bottom: 50px;
        .formWrapper {
            margin-top: 20px;
            margin-right: 20px;
        }
        .stepWrapper {
            margin-right: 20px;
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s
        }
        .fade-enter {
            opacity: 0
        }
        .fade-leave-active {
            display: none;
        }
        .stepWrapper {
            margin-left: 15px
        }
    }
</style>
