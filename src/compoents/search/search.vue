<template>
    <div id="search">
        <div id="outer">
            <el-input  class="search" v-on:input="searchComponent($event)" v-model="searchContent"></el-input>
            <div class="container" ref="container" v-loading="loading">
            </div>
        </div>
    </div>
</template>
<script src="./searchBegin.js"></script>
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
                this.ajax({
                    url: "./JSON/keywords", success: function (response) {
                        that.reminds = response.data;
                    }
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
                        that.$emit("search",that.searchContent);
                    }, false);
                    ul.appendChild(li);
                });
                container.appendChild(ul);
            },
            hide: function () {
                /*隐藏提示框*/
                var container =this.$refs.container;
                console.log(container);
                var length = container.children.length;
                var children = container.children;
                for (var i = 0; i < length; i++) {
                    container.removeChild(children[i]);
                }
                return container;
            },
            ajax: function (options) {
                var defaultOptions = {
                    url: false, //ajax 请求地址
                    type: "GET",
                    data: false,
                    success: false, //数据成功返回后的回调方法
                    complete: false //ajax完成后的回调方法
                };
                for (var i in defaultOptions) {
                    if (options[i] === undefined) {//如果传入的option中有些默认配置为定义的话
                        options[i] = defaultOptions[i];//就设为默认配置
                    }
                }
                var xhr = new XMLHttpRequest();
                var url = options.url;
                xhr.open(options.type, url);//打开该链接
                xhr.onreadystatechange = onStateChange;
                if (options.type === 'POST') {
                    //如果是发送post要设置请求头
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                }
                xhr.send(options.data ? options.data : null);//如果data有参数则发送参数 否则发送null

                function onStateChange() {
                    if (xhr.readyState == 4) {//当请求完成时
                        var result,
                            status = xhr.status;

                        if ((status >= 200 && status < 300) || status == 304) {//当响应头为成功接收到响应
                            result = xhr.responseText;//获取返回内容
                            if (window.JSON) {//如果浏览器支持json方法
                                result = JSON.parse(result);//把返回内容转为json
                            } else {
                                result = eval('(' + result + ')');//否则转为对象
                            }
                            ajaxSuccess(result, xhr);//使用ajax成功处理方法
                        } else {
                            console.log("ERR", xhr.status);//否则的话报错
                        }
                    }
                }

                function ajaxSuccess(data, xhr) {//设置成功响应时的方法
                    var status = 'success';
                    ajaxComplete(status);//响应方法表示ajax彻底完成
                    options.success && options.success(data, options, status, xhr);//给回调的方法赋值参数
                }

                function ajaxComplete(status) {
                    options.complete && options.complete(status);
                }
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
