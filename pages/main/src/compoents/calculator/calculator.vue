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
            weight: 0
        }
    }, methods: {
        clearWeight: function() {
            this.weight = 0;
        },
        /*称重*/
        getWeight: function() {
            var that = this;
            that.$http.get("http://localhost:80/SendCMD?idx=1&CMD=R")
                .then(function(response) {
                    if (response.data.success) {
                        that.$http.get("http://localhost:80/GetBuffer?idx=1").then(function(response) {
                            if (response.data.success) {
                                let re=/^wn([^kg]*)kg/g;
                                let result=parseFloat(re.exec(response.data.buffer)[1])*2;
                                that.$message("成功获取重量~~");
                                that.weight =result;
                            }
                        }).then(function(){
                            that.$message.error("获取重量失败~~");
                        });
                    }
                }).then(function(){
                that.$message.error("请求无响应,请检查设备~~");
            });

        }
    }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "calculator";
</style>
