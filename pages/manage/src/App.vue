<template>
        <manage></manage>
</template>
<script type="text/ecmascript-6">
    let manage = require('./page_frame/manage.vue');
    export default {
        data() {
            return {}
        },
        created(){

        },
        components: {
            manage: manage
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
        html,body{
                width: 100%;
                height: 100%;
        }
        #main{
                width: inherit;
                height: inherit;
        }
        body{
                background: url("../static/img/bg.jpg");
        }
</style>