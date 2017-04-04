import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router';
let common = require('./common.vue'),
    ElementUI = require('element-ui'),
    App = require('./App.vue');
let index = require('./main_page/index/index.vue'),
    manage = require('./main_page/manage/manage.vue'),
    report = require('./main_page/report/report.vue');

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(common.component);
const routes = [
    {path: '/index', component: index},
    {path: '/manage', component: manage},
    {path: '/report', component: report}
];
const router = new VueRouter({
    linkActiveClass: 'active',
    routes
});
router.push('/index');
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    router
});
