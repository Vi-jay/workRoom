import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
let ElementUI = require('element-ui'),
    App = require('./App.vue');
Vue.use(ElementUI);

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
});
