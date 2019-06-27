<template>
    <div class="auth-layout">
        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-right">
                        <a href="javascript:void(0)"
                           class="btn-show-language"
                           data-toggle="dropdown"
                           aria-haspopup="true"
                           aria-expanded="false">

                            {{state.lang | upper}} <i class="fa fa-arrow-down"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dLabel">
                            <!--<a v-for="lang in initData.availableLanguages" @click.prevent="setLang(lang)" href>TR/a>-->
                            <a  v-for="lang in initData.availableLanguages" @click.prevent="setLang(lang)" href>
                                {{lang | upper}}
                            </a>
                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <router-link to="/">
                            <img :src="initData.logoPath" alt="" class="logo">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt50">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <div class="container">
                <div class="text-center">
                    <span class="footer-title">{{initData.copyrightMessage | langtext}}</span><br>
                    <span class="footer-copyright">© EduSYS | Üniversite Yönetim Sistemi v1.0.0</span>
                </div>
            </div>
        </footer>
    </div>

</template>

<script>
    import store from 'src/services/store';

    import {loading, capitalize, upper, lower} from 'src/helper'


    export default {
        props: [],
        data () {
            return {
                state: store.state,
                initData: store.state.auth.initData
            }
        },
        components: {},
        created(){
            store.setLang(localStorage.lang || this.initData.defaultLanguage, this.$i18n, this.$validator);
        },
        mounted() {
        },
        destroy() {

        },
        methods: {
            capitalize, upper, lower,
            setLang(lang){
                store.setLang(lang, this.$i18n, this.$validator, true);

                let search = location.search ? location.search : '?';
                let redirect = "&redirect=" + this.$route.name;

                if(search == "?") {
                    redirect = redirect.substr(1);
                }

                location.href = "/" + search + redirect;
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>
