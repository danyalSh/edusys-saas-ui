<template>
    <div class="auth-pass-reset-view">
        <div class="login-header">
            <a @click.prevent="back" href class="btn-back pull-left">
                <i class="fa fa-long-arrow-left"></i>
            </a>
            <b>{{$t('lbl.create-password')}}</b>
        </div>

        <div class="login-content text-left">

            <form v-if="!hasUpdatePassword" @submit.prevent="submit('form')" data-vv-scope="form">
                <div class="pin-info" :class="{ 'finish': second == 0}">
                    <span class="text" v-html="$t('text.pin-info')"></span>
                    <span class="second">
                        <a v-if="second == 0" @click.prevent="refreshPIN" href>
                            <i class="fa fa-refresh"></i>
                        </a>
                        <span v-if="second > 0">
                            {{second}}
                        </span>
                    </span>
                </div>
                <div class="form-group" :class="{'has-error': errors.has('form.pin') }">
                    <label>{{$t('lbl.pin')}}</label>
                    <input v-model="pin"
                           v-validate="'required|numeric|min:6|max:6'"
                           @keypress="checkNumber"
                           :data-vv-as="$t('lbl.pin')"
                           class="form-control" type="text" name="pin"
                           minlength="6"
                           maxlength="6"
                           :placeholder="$t('placeholders.pin')">

                    <p class="text-danger mt10" v-if="errors.has('form.pin')">
                        {{ $t('placeholders.pin') }}
                    </p>
                </div>

                <div class="form-group" :class="{'has-error': errors.has('form.password') }">
                    <label>{{$t('lbl.new-password')}}</label>
                    <input v-model="password"
                           v-validate="{ rules: { required: true, regex: regexPassword }}"
                           :data-vv-as="$t('lbl.new-password')"
                           class="form-control" type="password" name="password"
                           :placeholder="$t('placeholders.new-password')">
                    <p class="text-danger mt10" v-if="errors.has('form.password')">
                        {{$t('text.password-validate-field')}}
                    </p>
                </div>

                <div class="form-group" :class="{'has-error': errors.has('form.password-repeat') }">
                    <label>{{$t('lbl.new-password-repeat')}}</label>
                    <input v-model="passwordRepeat"
                           v-validate="{ rules: { required: true, regex: regexPassword }}"
                           :data-vv-as="$t('lbl.new-password-repeat')"
                           class="form-control" type="password" name="password-repeat"
                           :placeholder="$t('placeholders.new-password-repeat')">
                    <p class="text-danger mt10" v-if="errors.has('form.password-repeat')">
                        {{$t('text.password-validate-field')}}
                    </p>

                    <p class="text-danger mt10" v-if="noMatchPassword">
                        {{$t('text.dontMatchPasswords')}}
                    </p>
                </div>

                <div class="clearfix">
                    <button type="submit" :disabled="loading" class="btn btn-primary btn-block">
                        {{ upper($t('lbl.update-password')) }}
                    </button>
                </div>
            </form>

            <div v-else>
                <div class="text-center mb30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                        <g fill="none" fill-rule="evenodd">
                            <path d="M30 2.222C14.683 2.222 2.222 14.683 2.222 30c0 15.317 12.461 27.778 27.778 27.778 15.317 0 27.778-12.461 27.778-27.778C57.778 14.683 45.317 2.222 30 2.222zm11.003 17.7L29.892 43.255a1.113 1.113 0 0 1-1.674.409l-9.93-7.518a1.11 1.11 0 1 1 1.341-1.772l8.843 6.695 10.525-22.102a1.11 1.11 0 1 1 2.006.955z"/>
                            <path fill="#5cb85c" fill-rule="nonzero" d="M30 0C13.458 0 0 13.458 0 30s13.458 30 30 30 30-13.458 30-30S46.542 0 30 0zm0 57.778C14.683 57.778 2.222 45.317 2.222 30 2.222 14.683 14.683 2.222 30 2.222c15.317 0 27.778 12.461 27.778 27.778 0 15.317-12.461 27.778-27.778 27.778z"/>
                            <path fill="#5cb85c" fill-rule="nonzero" d="M40.477 18.441a1.112 1.112 0 0 0-1.48.526L28.472 41.069l-8.843-6.695a1.11 1.11 0 1 0-1.341 1.772l9.93 7.518a1.11 1.11 0 0 0 1.674-.409l11.111-23.333a1.11 1.11 0 0 0-.526-1.48z"/>
                        </g>
                    </svg>
                </div>
                <p class="txt-info">
                    {{$t('text.update-password')}}
                </p>
                <router-link :to="{name: 'login-' + $route.query.slug}" class="btn btn-primary btn-block mt20">
                    {{ upper($t('lbl.do-login')) }}
                </router-link>
            </div>


        </div>
    </div>
</template>

<script>

    import store from 'src/services/store'

    import {loading, capitalize, lower, upper, checkNumber} from 'src/helper'
    import {AuthService} from 'src/services/data/auth'

    export default {
        props: [],
        components: {},
        data () {
            return {
                loading: false,
                username: null,
                pin: null,
                password: null,
                passwordRepeat: null,
                second: 60,
                secondInterval: null,
                hasUpdatePassword: false,
                regexPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,100}$/,
            }
        },
        computed: {
            noMatchPassword(){
                return this.password && this.passwordRepeat && this.password !== this.passwordRepeat;
            }
        },
        created(){
            this.username = this.$route.query.username;
            this.completed = this.$route.query.completed;

            if(this.username == '' || typeof this.username == 'undefined') {
                toastr.warning('Kullanıcı adı bulunamadı.');
                this.$router.push({name: 'pass-reset-step-1'});
            }else if(this.completed) {
                this.hasUpdatePassword = true;
            }
        },
        mounted() {

            this.decreaseSecond();
        },
        methods: {
            capitalize, lower, upper, checkNumber,
            back(){
                if(this.hasUpdatePassword) {
                    this.$router.push({
                        name: 'pass-reset-step-2',
                        query: { slug: this.$route.query.slug, username: this.$route.query.username }
                    });

                    this.hasUpdatePassword = false;
                }else {
                    this.$router.push({ name: "pass-reset-step-1", query: {slug: this.$route.query.slug}});
                }

            },
            decreaseSecond(){

                this.secondInterval = setInterval(() => {
                    if(this.second >= 1)
                        this.second--;
                    else
                        clearInterval(this.secondInterval);

                }, 1000)

            },
            refreshPIN(){
                clearInterval(this.secondInterval);

                this.second = 5;
                this.decreaseSecond();
            },
            submit(scope){
                if(this.noMatchPassword) {
                    return;
                }

                this.$validator.validateAll(scope).then(result => {
                    this.loading = true;

                    let data = {
                        username: this.username,
                        pin: this.pin,
                        password: this.password,
                        passwordRepeat: this.passwordRepeat,
                    };

                    AuthService.updatePassword(data)
                        .then(res => {
                            this.loading = false;

                            if (res.code == '200.0000') {
                                toastr.success(res.message);

                                let query = {...this.$route.query};
                                query.completed = true;

                                this.$router.push({name: this.$route.name, query});

                                this.hasUpdatePassword = true;
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
