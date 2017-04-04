window.onload = function () {
    searchComponent('.search');
};
var reminds = [];
function searchComponent(element) {
    var search = document.querySelector(element),
        keyword;
    getRemind(reminds);
    search.addEventListener('input', function (event) {
        if (!reminds.length) {
            throwLoading();
            return;
        }
        keyword = event.target.value;
        if (!keyword.trim()) {
            hide();
            return;
        }
        showRemind(keyword);
    }, false);

}

function showRemind(keyword) {
    /*根据关键字查找提示*/
    var re = new RegExp(keyword + ".*", "g");
    var keywords = [];
    reminds.forEach(function (item, index, arr) {
        if (re.test(item)) {
            keywords.push(item);
        }
    });
    insertHtml(keywords);

}
function getRemind() {
    /*向服务器获取所有关键词*/
    ajax({
        url: "./keywords.json", success: function (data) {
            reminds = data;
        }
    });
}
function insertHtml(keywords) {
    /*把关键字插入到页面上*/
    var container = hide();
    var ul = document.createElement('ul');
    keywords.forEach(function (item) {
        var li = document.createElement('li');
        li.innerText = item;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}
function throwLoading() {
    /*显示加载动画*/
    console.log('123')
}
function hide() {
    /*隐藏提示框*/
    var container = document.querySelector('.container');
    var length = container.children.length;
    var children = container.children;
    for (var i = 0; i < length; i++) {
        container.removeChild(children[i]);
    }
    return container;
}
function ajax(options) {
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
}