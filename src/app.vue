<template>
   <router-view/>
</template>
<script>
    export default {
        name:'app',
        created(){
            console.log(process.env)
        }
    }
</script>