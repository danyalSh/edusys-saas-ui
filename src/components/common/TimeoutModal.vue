<template>
    <div class="modal fade"
         id="timeoutModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="timeoutModalLabel"
         data-backdrop="static"
         data-keyboard="false">

        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title" id="timeoutModalLabel">{{ $t('text.timeout-title') }}</h4>
                </div>

                <div class="modal-body">
                    {{ $t('text.timeout-body') }} {{secondOfAMinute}}
                </div>

                <div class="modal-footer">
                    <button @click="refreshToken"
                            :disabled="loading"
                            type="button" class="btn btn-success">
                        {{ $t('lbl.refresh') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from 'src/services/store'
    import {AuthService} from 'src/services/data/auth'
    import {redirectLogin} from 'src/helper'

    export default {
        props: ['expireSeconds', 'remainingSeconds', 'autoRefresh'],
        data () {
            return {
                loading: false,
                intervalSecond: null,
                timeoutSecond: null,
                secondOfAMinute: 0,
            }
        },
        created(){
            this.secondOfAMinute = this.remainingSeconds;
        },
        mounted(){
            this.startTimeout();
        },
        methods: {
            startTimeout(){
                let extractMinute = this.expireSeconds - this.remainingSeconds;

                clearTimeout(this.timeoutSecond);
                this.timeoutSecond = setTimeout(() => {
                    this.startInterval();

                    if(!this.autoRefresh)
                        $('#timeoutModal').modal('show');

                }, extractMinute * 1000);

            },
            startInterval(){

                clearInterval(this.intervalSecond);
                this.intervalSecond = setInterval(() => {

                    if (this.secondOfAMinute == 0) {
                        redirectLogin();
                        clearInterval(this.intervalSecond);
                    } else {

                        if(this.autoRefresh){
                            this.refreshToken();
                        }else {
                            this.secondOfAMinute--;
                        }

                    }


                }, 1000);
            },
            refreshToken(){
                this.loading = true;

                AuthService.refreshToken().then(res => {
                    this.loading = false;

                    if (res.code == '200.0000') {

                        this.secondOfAMinute = this.remainingSeconds;

                        clearInterval(this.intervalSecond);
                        this.startTimeout();


                        if(!this.autoRefresh){
                            toastr.success(res.message);
                            $('#timeoutModal').modal('hide');
                        }


                    }
                }, e => {
                    this.loading = false;
                })


            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
