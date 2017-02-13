<template>
    <div>
        <transition name="fade">
            <div class="wrapper" v-show="flag">
                <img src="../img/logo.png" class="image">
                <p class="text">欢迎使用富民燃气系统！</p>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                flag: false
            }
        },
        created(){
            this.$nextTick(()=>{
                this.flag=true;
            })
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .wrapper
        margin 0 auto
        padding-top 100px
        text-align center
        transition: all 2.5s
        .image
            display inline-block
        .text
            margin-top 50px
            font-weight 700
            color #1d90e6
            line-height 30px
            font-size 25px
        &.fade-enter, &.fade-leave-active
            opacity: 0
            transform translate3d(0,400px,0)

</style>
