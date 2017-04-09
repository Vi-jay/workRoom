<template>
<div id="index">
<vform></vform>
</div>
</template>
<script type="text/ecmascript-6">
    let form =require('../main_form/form.vue');
    export default {
    components:{
        vform:form
    }
    };
</script>
<style lang="less" rel="stylesheet/less">
#index{
    padding-bottom: 50px;
}
</style>
