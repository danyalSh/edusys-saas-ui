<template>
    <div class="mt50">
        <form @submit.prevent="saveForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 col-md-2 control-label">{{ $t('lbl.tax-administration') }}</label>
                <div class="col-sm-10 col-md-6">
                    <input v-model="data.taxInformation.vatOffice"
                           type="text" required
                           :placeholder="$t('lbl.tax-administration')" class="width-full">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 col-md-2 control-label">{{ $t('lbl.tax-no') }}</label>
                <div class="col-sm-10 col-md-6">
                    <input v-model="data.taxInformation.vatNumber"
                           type="text" required
                           :placeholder="$t('lbl.tax-no')" class="width-full">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 col-md-2 control-label">{{ $t('lbl.corporate-title') }}</label>
                <div class="col-sm-10 col-md-6">
                    <input v-model="data.taxInformation.vatTitle"
                           type="text" required
                           :placeholder="$t('lbl.corporate-title')" class="width-full">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button :disabled="loading" type="submit" class="btn btn-primary">{{ $t('lbl.save') | upper }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    import Vue from 'vue'
    import store from 'src/services/store';
    import {InstitutionService} from 'src/services/data/institution'

    import MultiLangText from 'src/components/common/MultiLangText.vue';
    import FileUpload from 'src/components/common/FileUpload.vue';


    export default {
        props: ['data'],
        components: {
        },
        data () {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: false,
            }
        },
        created(){

        },
        mounted(){
        },
        methods: {
            saveForm(){
                this.loading = true;

                InstitutionService.updateTaxInformation(this.appInfo.institution, this.data.taxInformation)
                    .then(res => {
                        this.loading = false;

                        if (res.code == "200.0000") {
                            toastr.success(res.message);
                        }

                    })
                    .catch(e => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
