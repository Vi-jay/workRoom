import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
let ElementUI = require('element-ui'),
    App = require('./App.vue');
import axios from 'axios';
     Vue.use(axios);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
});
