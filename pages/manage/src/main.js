import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import axios from 'axios';
let ElementUI = require('element-ui'),
    App = require('./App.vue');
Vue.use(ElementUI);
Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
});
