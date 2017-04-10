import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router'
import axios from 'axios';
let ElementUI = require('element-ui'),
    App = require('./App.vue'),
    week_SalesVolume = require('./reports/week_SalesVolume_Report.vue'),
    month_SalesVolume = require('./reports/month_SalesVolume_Report.vue'),
    tip = require('./reports/tip.vue');
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.use(VueRouter);
const routes = [
    {path: '/week_SalesVolume', component: week_SalesVolume},
    {path: '/month_SalesVolume', component: month_SalesVolume},
    {path: '/tip', component: tip},
];

const router = new VueRouter({
    routes
});
router.push("/tip");
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    router
});
