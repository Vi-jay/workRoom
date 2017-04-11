<template>
    <div id="main">
        <mian></mian>
    </div>
</template>
<script type="text/ecmascript-6">
let mian = require('./main_form/form.vue');
export default {
    data() {
            return {}
        },
        created() {
        },
        components: {
            mian: mian
        },
}
</script>
<style lang="less" rel="stylesheet/less">
html,
body {
    width: 100%;
    height: 100%;
}

#main {
    width: inherit;
    height: inherit;
    overflow: hidden;
}

body {
    background: url("../static/img/bg.jpg");
}
</style>
