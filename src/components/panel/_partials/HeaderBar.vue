<template>
    <div class="header">

        <div class="header-wrapper">
            <div class="header-left visible-xs">
                <div class="mobil-hamburger-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>

            <div class="header-right">
                <div class="search-container hidden-xs hidden-sm">
                    <input type="text"
                           class="search-input"
                           :placeholder="$t('text.what-you-wanted-to-find')">
                    <i class="fa fa-search"></i>
                </div>
                <div class="top-bar-container">
                    <div class="top-bar-item">
                        <dropdown :align-right="true">
                            <a slot="selector" @click.prevent="" href id="profile1" class="member-info">
                                <span class="avatar-img">
                                    <img src="/static/img/panel/avatar.png" alt="">
                                </span>
                                <span class="dropdown-arrow">
                                    <i class="fa fa-caret-down"></i>
                                </span>
                                <span class="clearfix"></span>
                            </a>
                            <div slot="body">
                                <h4>{{$t('lbl.profile')}}</h4>
                                <hr>
                            </div>
                        </dropdown>
                    </div>
                    <div class="bracket"></div>
                    <div class="top-bar-item hidden-xs">
                        <dropdown :align-right="true">
                            <a slot="selector" @click="showNotifications" href="javascript:void(0)" class="notification-inner">
                                <i class="fa fa-bullhorn"></i>
                                <span v-show="!isReadNotifications" class="notification-circle">
                                    <i></i>
                                </span>
                            </a>
                            <div slot="body">
                                <h4>{{$t('lbl.notifications')}}</h4>
                                <hr>
                                <ul class="list-unstyled">
                                    <li v-for="notification in appInfo.notifications">
                                        {{notification}}
                                        <hr>
                                    </li>
                                </ul>
                            </div>
                        </dropdown>
                    </div>
                    <div class="bracket hidden-xs"></div>
                    <div class="top-bar-item">
                        <span class="language-choese">
                            <select v-model="lang" @change="setLang" class="form-control">
                                <option v-for="lang in appInfo.availableLanguages" :value="lang">
                                    {{lang | upper}}
                                </option>
                            </select>
                        </span>
                        <span class="dropdown-arrow">
                            <i class="fa fa-caret-down"></i>
                        </span>
                        <span class="clearfix"></span>
                    </div>
                    <div class="bracket hidden-xs"></div>
                    <div class="top-bar-item hidden-xs">
                        <a href="javascript:void(0)"
                       @click="doLogout"
                       class="btn-logout">
                        <i class="fa fa-power-off"></i>
                    </a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>


        <!--<div>-->
            <!--<button @click="state.isOpenSidebar = !state.isOpenSidebar;"-->
                    <!--v-show="!state.isOpenSidebar" class="btn btn-gray mt10">-->
                <!--<i class="fa fa-bars"></i>-->
            <!--</button>-->
        <!--</div>-->
        <!--<div class="search-container col-center">-->
            <!--<input type="text" class="search-input" placeholder="Neyi bulmak istediniz?">-->
            <!--<i class="fa fa-search"></i>-->
        <!--</div>-->
    </div>
</template>

<script>
    import store from 'src/services/store'
    import {loading, redirectLogin} from 'src/helper'

    import Dropdown from 'src/components/common/Dropdown.vue';

    export default {
        components: {
            Dropdown
        },
        data () {
            return {
                state: store.state,

                lang: store.state.lang,
                isReadNotifications: false,
            }
        },
        computed: {
            appInfo() {
                return store.state.appInfo
            }
        },
        created(){

        },
        mounted(){
            let self = this;

            $(this.$el).find('.dropdown-menu').on("click", (e) => {
                e.stopPropagation();
            });

        },
        methods: {
            setLang(){
                store.setLang(this.lang, this.$i18n, this.$validator, true);

                let search = location.search ? location.search : '?';
                let redirect = "&redirect=" + this.$route.name;

                if (search == "?") {
                    redirect = redirect.substr(1);
                }

                location.href = "/" + search + redirect;
            },
            showNotifications(){
                this.isReadNotifications = true;
            },
            doLogout(){
                location.href = "/";
            },
        }

    }
</script>

<style lang="scss" scoped>

</style>
