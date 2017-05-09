import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router'
import axios from 'axios';
let ElementUI = require('element-ui'),
    App = require('./App.vue'),
    Estate_message = require('./manages/message.vue');
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.use(VueRouter);
const routes = [
    {path: '/Estate_message', component: Estate_message},
];

const router = new VueRouter({
    routes
});
router.push("/Estate_message");
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    router
});
