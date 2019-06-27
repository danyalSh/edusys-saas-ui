<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import store from 'src/services/store'
    import {isMobile} from 'src/helper';

    export default {
        components: {},
        data(){
            return {}
        },
        store,
        created(){

        },
        mounted(){
            store.state.isMobile =  isMobile();
        },
    }
</script>

<style lang="scss">
</style>
