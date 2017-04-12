<template>
    <div id="search">
        <div id="outer">
            <el-input placeholder="请输入客户名称" class="search" v-on:input="searchComponent($event)" v-model="searchContent"></el-input>
            <div class="container" ref="container" v-loading="loading">
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                reminds: [],
                searchContent: "",
                loading: false
            }
        },
        created(){
            this.$nextTick(function () {
                this.getRemind();
            })
        },
        methods: {
            searchComponent: function (event) {
                var keyword = this.searchContent;

                if (!this.reminds.length) {
                    this.loading = true;

                    if (!keyword.trim()) {
                        this.loading = false;
                    }
                    return;
                }
                if (!keyword.trim()) {
                    this.hide();
                    return;
                }
                this.showRemind(keyword);

            },
            showRemind: function (keyword) {
                /*根据关键字查找提示*/
                var re = new RegExp("^" + keyword + ".*", "g");
                var keywords = [];
                var reminds = [];
                this.deepCopy(this.reminds, reminds);
                reminds = reminds.map(function (item) {
                    if (item.match(re)) {
                        keywords.push(item);
                    } else {
                        return item;
                    }
                });
                re = new RegExp(".*" + keyword + ".*", "g");
                reminds.forEach(function (item) {
                    if (item && item.match(re)) {
                        if (keywords.length < 10) {
                            keywords.push(item);
                        } else {
                            keywords.splice(10, keywords.length - 10);
                            return;
                        }
                    }
                });
                this.insertHtml(keywords);

            },
            getRemind: function () {
                /*向服务器获取所有关键词*/
                var that = this;
                this.$http.get("./JSON/keywords").then(function (response) {
                    that.reminds = response.data;
                });
            },
            insertHtml: function (keywords) {
                /*把关键字插入到页面上*/
                var container = this.hide();
                var ul = document.createElement('ul');
                var that = this;
                keywords.forEach(function (item) {
                    var li = document.createElement('li');
                    li.innerText = item;
                    li.addEventListener('click', function (event) {
                        that.searchContent = event.target.innerText;
                        that.hide();
                        that.$emit("search", that.searchContent);
                    }, false);
                    ul.appendChild(li);
                });
                container.appendChild(ul);
            },
            hide: function () {
                /*隐藏提示框*/
                var container = this.$refs.container;
                var length = container.children.length;
                var children = container.children;
                for (var i = 0; i < length; i++) {
                    container.removeChild(children[i]);
                }
                return container;
            },
            deepCopy: function (p, c) { //深拷贝
                var c = c || {};
                for (var i in p) {
                    if (typeof p[i] === 'object') {
                        c[i] = (p[i].constructor === Array) ? [] : {};
                        deepCopy(p[i], c[i]);
                    } else {
                        c[i] = p[i];
                    }
                }
                return c;
            }
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    @import "style";
</style>
