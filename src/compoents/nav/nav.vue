<template>
            <nav id="menu" class="nav">
                <ul>
                    <li>
                        <a  href=""  @click.prevent="showPage('report')" >
								<span class="icon">
									<i class="icon-file-text"></i>
								</span>
                            <span>图表</span>
                        </a>
                    </li>
                    <li>
                        <a href=""  @click.prevent="showPage('main')" >
								<span class="icon">
									<i class="icon-home"></i>
								</span>
                            <span>主页</span>
                        </a>
                    </li>
                    <li>
                        <a  href=""  @click.prevent="showPage('manage')" >
								<span class="icon">
									<i class="icon-equalizer"></i>
								</span>
                            <span>管理</span>
                        </a>
                    </li>
                </ul>
            </nav>
</template>
<script type="text/ecmascript-6">
    export default {
        methods:{
            showPage(mark){
                this.$emit('showPage',mark);
            }
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    @import "nav";

</style>
