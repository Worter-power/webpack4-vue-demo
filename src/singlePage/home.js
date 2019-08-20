import Vue from 'vue';
import Home from '../compnonts/home.vue';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    template: '<Home/>',
    components: {
        Home
    }
});