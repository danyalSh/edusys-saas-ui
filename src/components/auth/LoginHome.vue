<template>
    <div class="auth-login-home-view">
        <div class="boxes row row-centered">
            <div v-for="module in initData.dashboardTypes"
                 @click="clickModule(module)"
                 class="col-xs-6 col-sm-6 col-md-3 col-centered">
                <div class="box mb20">
                    <div class="box-inner">
                        <span class="box-title">{{ $t('lbl.' + module.slug) | upper }}</span>
                        <span class="box-sub-title">{{ $t('lbl.login') | upper }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import store from 'src/services/store';

    export default {
        props: [],
        data () {
            return {
                loading: false,
                state: store.state,
                initData: store.state.auth.initData,
            }
        },
        components: {},
        created() {

        },
        mounted() {

        },
        methods: {
            clickModule(module){
                let routeName = "login-" + module.slug;

                this.$router.push({ name: routeName, query: this.$route.query });
            }
        }

    }
</script>

<style lang="scss" scoped>
    .login {
        max-width: 450px;
        margin: 0 auto;
    }
</style>
