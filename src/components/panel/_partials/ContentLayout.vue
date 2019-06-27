<template>
    <div >
        <content-header />
        <slot></slot>
    </div>
</template>

<script>
    import store from 'src/services/store'

    import ContentHeader from './ContentHeader'

    export default {
        components: {
            ContentHeader
        },
        data () {
            return {
            }
        },
        computed: {
            appInfo() {
                return store.state.appInfo
            }
        },
        mounted(){

        },
        methods: {
        }

    }
</script>

<style lang="scss" scoped>

</style>
