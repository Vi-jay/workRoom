<template>
    <div id="calculator">
        <div class="container">
            <div class="content">
                <h1>{{weight}}<span id="unit">斤</span></h1>
                <div class="tool" @click="getWeight" ref="clear">称重</div>
                <div class="tool" @click="clearWeight">归零</div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    data() {
        return {
            weight: 100
        }
    }, methods: {
        clearWeight: function() {
            this.weight = 0;
        },
        getWeight: function() {
            this.weight = 100;
        }
    }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "calculator";
</style>
