<template>
    <div class="panel-update-password-view">
        <div class="row">
            <div class="col-md-12 ">
                <div class="content-box-header panel-heading">
                    <div class="panel-title ">Şifreni Güncelle</div>
                </div>
                <div class="content-box-large box-with-header">
                    <form @submit.prevent="submitPassword($event)" id="updatePasswordForm">
                        <ul class="list-unstyled">
                            <li><b>E-Posta:</b> {{member.email}}</li>
                        </ul>
                        <hr>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label>Şifre</label>
                                    <input v-model="pass"
                                           type="password"
                                           minlength="5"
                                           maxlength="20"
                                           title="Şifre alanına 5 ve 20 arası harf veya sayı girmelisiniz"
                                           class="form-control width-300"
                                           placeholder="Lütfen yeni şifreyi girin" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label>Şifre Tekrar</label>
                                    <input v-model="passConfirmation"
                                           type="password"
                                           minlength="5"
                                           maxlength="20"
                                           class="form-control width-300"
                                           title="Şifre alanına 5 ve 20 arası harf veya sayı girmelisiniz"
                                           placeholder="Lütfen yeni şifreyi tekrar girin" required>
                                </div>
                            </div>
                        </div>
                        <button :disabled="loading" type="submit" class="btn btn-primary">
                            Güncelle
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from 'src/services/store'

    import {AuthService, MemberModel} from 'src/services/data/auth'
    import {locales} from 'src/config'
    import {validateForm, helper} from 'src/helper'

    export default {
        components: {},
        data () {
            return {
                loading: false,
                member: clone(MemberModel),
                pass: "",
                passConfirmation: "",
            }
        },
        mounted(){
            this.member = store.state.appInfo.member;
        },
        methods: {
            submitPassword(e){

                // For Safari
                if (!validateForm(e.target)) {
                    return;
                }

                if (this.pass !== this.passConfirmation) {
                    toastr.warning(locales.passDidNotMatch);
                    return;
                }

                this.loading = true;

                var data = {
                    id: this.member.id,
                    pass: this.pass,
                    passConfirmation: this.passConfirmation
                };

                AuthService.updatePassword(data)
                    .then((res) => {
                        this.loading = false;

                        if (res.code == '200.0000') {
                            this.pass = '';
                            this.passConfirmation = '';
                            toastr.success(res.message)
                        }

                    }).catch(e => {
                        this.loading = false;
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
