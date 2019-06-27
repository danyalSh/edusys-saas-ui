<template>
    <div class="panel-layout">
        <timeout-modal :expire-seconds="300000"
                       :remainingSeconds="30"
                       :auto-refresh="true">
        </timeout-modal>

        <header-bar/>

        <div class="sidebar hidden-xs">
            <nav-bar/>
        </div>

        <div class="content">
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="content-inner">
                        <content-layout>
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </content-layout>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import store from 'src/services/store'

    import {AppService} from 'src/services/data/app'

    import HeaderBar from './_partials/HeaderBar'
    import NavBar from './_partials/NavBar'
    import ContentLayout from './_partials/ContentLayout'
    import TimeoutModal from '../common/TimeoutModal'

    export default {
        props: [],
        data(){
            return {
                state: store.state,
                appInfo: store.state.appInfo,
            }
        },
        components: {
            HeaderBar,
            NavBar,
            ContentLayout,
            TimeoutModal
        },
        created(){
            store.setLang(localStorage.lang || this.appInfo.defaultLanguage, this.$i18n, this.$validator);
        },
        mounted() {
            $('[data-toggle="tooltip"]').tooltip();
        },
        destroy() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
