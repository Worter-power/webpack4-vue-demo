import Vue from 'vue';
import My from '../compnonts/my.vue';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    template: '<My/>',
    components: {
        My
    }
});