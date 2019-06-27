<template>
    <div class="auth-pass-reset-view">
        <div class="login-header">
            <router-link :to="{name: 'login-'+ $route.query.slug}" class="btn-back pull-left">
                <i class="fa fa-long-arrow-left"></i>
            </router-link>

            <b>{{$t('lbl.forgot-password')}}</b>
        </div>

        <div class="login-content text-left">

            <form @submit.prevent="submit('form')" data-vv-scope="form">
                <p class="txt-info">
                    {{$t('text.pass-reset-info')}}
                </p>

                <div class="form-group" :class="{'has-error': errors.has('form.username') }">
                    <label>{{$t('lbl.username')}}</label>
                    <input v-model="username"
                           v-validate="'required'"
                           :data-vv-as="$t('lbl.username')"
                           class="form-control" type="text" name="username"
                           :placeholder="$t('placeholders.username')">
                    <p class="text-danger mt10" v-if="errors.has('form.username')">
                        {{ errors.first('form.username') }}
                    </p>
                </div>

                <div id="captcha" class="mb20"></div>

                <div class="clearfix">
                    <button type="submit" :disabled="loading" class="btn btn-primary btn-block">
                        {{ upper($t('lbl.send')) }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    import store from 'src/services/store'

    import {loading, capitalize, lower, upper, initCaptcha} from 'src/helper'
    import config from 'src/config'
    import {AuthService} from 'src/services/data/auth'

    export default {
        props: [],
        data () {
            return {
                loading: false,
                initData: store.state.auth.initData,
                username: null,
            }
        },
        components: {},
        mounted() {

            initCaptcha('captcha');


        },
        destroy() {

        },
        methods: {
            capitalize, lower, upper,
            submit(scope){

                this.$validator.validateAll(scope).then(result => {
                    this.loading = true;

                    let data = {
                        username: this.username,
                        dashboard: this.$route.query.slug,
                        institution: this.initData.institution,
                    };


                    AuthService.resetPassword(data)
                        .then(res => {
                            this.loading = false;

                            if (res.code == '200.0000') {
                                toastr.success(res.message);
                                this.$router.push({
                                    name: "pass-reset-step-2",
                                    query: {
                                        slug: this.$route.query.slug,
                                        username: this.username
                                    }
                                });
                            }

                        }, err => {
                            this.loading = false;
                        });

                }).catch(err => {

                });


            }
        }

    }
</script>

<style lang="scss" scoped>
</style>
