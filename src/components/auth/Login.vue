<template>
    <div class="auth-login-view">

        <div class="login-header">
            <router-link :to="{path: '/', query: $route.query}" class="btn-back pull-left">
                <i class="fa fa-long-arrow-left"></i>
            </router-link>

            <b>{{ title | capitalize }}</b>
            <span class="light">{{  $t('lbl.login') | capitalize }}</span>
        </div>

        <div class="login-content text-left">
            <form @submit.prevent="submit('form')" data-vv-scope="form">
                <div class="form-group" :class="{'has-error': errors.has('form.email') }">
                    <label>{{$t('lbl.username')}}</label>
                    <input v-model="username"
                           v-validate="'required'"
                           :data-vv-as="$t('lbl.username')"
                           class="form-control" type="text" name="email"
                           :placeholder="$t('placeholders.username')">
                    <p class="text-danger mt10" v-if="errors.has('form.email')">{{ errors.first('form.email') }}</p>
                </div>

                <div class="form-group" :class="{'has-error': errors.has('form.password') }">
                    <label>{{$t('lbl.password')}}</label>
                    <input v-model="password"
                           v-validate="'required'"
                           :data-vv-as="$t('lbl.password')"
                           class="form-control" type="password" name="password"
                           :placeholder="$t('lbl.password')">
                    <p class="text-danger mt10" v-if="errors.has('form.password')">{{ errors.first('form.password') }}</p>
                </div>

                <div id="captcha" class="mb20"></div>

                <div class="clearfix mb20">
                    <router-link :to="{name: 'pass-reset-step-1', query: {slug: this.slug}}" class='btn-forgot-password pull-right mt10'>
                        {{$t('lbl.forgot-password')}}
                    </router-link>
                </div>

                <div class="action clearfix">
                    <button type="submit" :disabled="loading" class="btn btn-primary btn-block">
                        {{ $t('lbl.do-login') | upper }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>

    import store from 'src/services/store';

    import {loading, capitalize, lower, upper, initCaptcha} from 'src/helper'
    import config from 'src/config'

    import {AuthService} from 'src/services/data/auth'

    import { ErrorBag } from 'vee-validate';

    export default {
        props: [],
        components: {},
        data () {
            return {
                state: store.state,
                loading: false,
                title: "",
                initData: store.state.auth.initData,
                slug: null,
                username: null,
                password: null,
                captcha: null,
            }
        },
        created() {
            this.slug = this.$route.name.split('-')[1];
            this.title = this.$t("lbl." + this.slug);
        },
        mounted(){
            this.captcha = initCaptcha("captcha");
        },
        destroy() {

        },
        methods: {
            submit(scope){
                this.$validator.validateAll(scope).then(result => {
                    this.loading = true;

                    let data = {
                        username: this.username,
                        password: this.password,
                        dashboard: this.slug,
                        institution: this.initData.institution,
                        captcha: grecaptcha.getResponse(this.captcha) || null,
                    };

                    AuthService.login(data).then(res => {
                        this.loading = false;

                        if(res.code == "200.0000") {
                            store.setToken(res.result.set.token);
                            location.href = this.$route.query.redirectPanel || "/panel";
                        }



                    }, err => {
                        this.loading = false;

                        if(err.code == "429.0500") {
                            toastr.warning(err.message);
                            this.captcha = initCaptcha("captcha");
                        } else if(err.code == "401.0002") {
                            toastr.error(err.message)
                        }

                    });

                }).catch(err => {

                });

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
