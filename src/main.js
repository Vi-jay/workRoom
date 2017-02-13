import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
let monthChart = require('./compenonts/monthChart.vue');
let todayChart = require('./compenonts/todayChart.vue');
let shopCallBack = require('./compenonts/shopCallBack.vue');
let shopStock = require('./compenonts/shopStock.vue');
let bottleTrack = require('./compenonts/bottleTrack.vue');
let wj_component = require('./common.vue');
let home = require('./compenonts/home.vue');
let index = require('./compenonts/index.vue');
require('./fonts/style.css');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(wj_component.wj_component);
const routes = [
    {path: '/monthChart', component: monthChart},
    {path: '/todayChart', component: todayChart},
    {path: '/shopStock', component: shopStock},
    {path: '/shopCallBack', component: shopCallBack},
    {path: '/bottleTrack', component: bottleTrack},
    {path: '/home', component: home},
    {path: '/index', component: index}
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
}).$mount('#app');
