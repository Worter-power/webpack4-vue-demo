import Vue from 'vue';
import App from './app.vue';
import Router from 'vue-router';
import Home from './compnonts/home.vue';
import Mine from './compnonts/my.vue';
// const Home = require.ensure([], () => require(`./compnonts/home.vue`), 'home');
Vue.use(Router);
const router = new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component: Home
        },
        {
            path:'/mine',
            name:'mine',
            component: Mine
        }
    ]
});

Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});