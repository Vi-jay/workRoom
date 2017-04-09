<template>
    <div id="calculator">
        <div class="container">
            <div class="content">
                <h1>{{weight}}kg</h1>
                <span class="clear" @click="clearWeight" ref="clear">C</span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                weight: 100
            }
        }, methods: {
            clearWeight: function () {
                this.weight = 0;
                this.$refs.clear.className='clearAnimation';
                var that=this;
                setTimeout(function () {
                    that.$refs.clear.className='clear';
                },200)
            }
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    @import "calculator";
</style>
