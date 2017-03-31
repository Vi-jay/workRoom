import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router';
let common = require('./common.vue'),
    ElementUI=require('element-ui'),
    App = require('./App.vue');

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(common.component);
// const routes = [
//     {path: '/monthChart', component: monthChart},
//     {path: '/todayChart', component: todayChart},
//     {path: '/shopStock', component: shopStock},
//     {path: '/shopCallBack', component: shopCallBack},
//     {path: '/bottleTrack', component: bottleTrack},
//     {path: '/home', component: home},
//     {path: '/index', component: index}
// ];
// const router = new VueRouter({
//     linkActiveClass: 'active',
//     routes
// });
// router.push('/index');
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    // router
});
