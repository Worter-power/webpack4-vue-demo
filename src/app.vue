<template>
    <div>
        <h4>asdfasdfasdfhjkasdhjkn</h4>
        <router-view/>
        <h4>123456</h4>
        <h4>123456</h4>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name:'app',
    data(){
        return {
            aname: '',
            manes: {
                name: '132'
            },
            arrs:[
                {name:'123'},
                {name:'123'},
                {name: '123'},
                {name: '123'},
                {name: '123'},
                {name: '123'}
            ]
        }
    },
    created(){
        console.log(process.env, moment());
        this.init();
    },
    methods: {
        init(){
            let a = '';
            let c = ()=>{
                a = 'name'
            }
            c()
            this.aname = a
            console.log(123)
        }
    }
}
</script>