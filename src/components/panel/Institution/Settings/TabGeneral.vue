<template>
    <div class="mt50">
        <form @submit.prevent="saveForm" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-2 col-md-2">{{ $t('lbl.school-name') }}:</label>
                <div class="col-sm-10 col-md-6">
                    <multi-lang-text :value="data.title"></multi-lang-text>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2 col-md-2">{{ $t('lbl.active-languages') }}:</label>
                <div class="col-sm-10 col-md-8">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-md-8">
                            <div class="row">
                                <div v-for="lang in allLanguages" class="col-xs-6 col-sm-6 col-md-6">
                                    <label class="pull-left">
                                        <input v-model="lang.checked"
                                               @change="onChangeActiveLanguages"
                                               type="checkbox"
                                               class="pull-left">
                                        <span class="ml10">{{ lang.name[state.lang] }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2 col-md-2">{{ $t('lbl.default-language') }}:</label>
                <div class="col-sm-10 col-md-6">
                    <select v-model="data.settings.defaultLanguage" class="btn-block">
                        <option :value="null">{{ $t('lbl.choose') }}</option>
                        <option v-for="lang in data.settings.availableLanguages" :value="lang">
                            {{appInfo.langTitle[lang]}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group mb30">
                <label class="control-label col-sm-2 col-md-2">{{ $t('lbl.logo') }}:</label>
                <div class="col-sm-10 col-md-6">
                    <file-upload :path="appInfo.logoPath"
                                 :endpoint="uploadInstitutionLogo"
                                 :params="{id: appInfo.institution}"
                                 @onchange="onChangeLogo"></file-upload>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2 col-md-2">{{ $t('lbl.copyright-text') }}:</label>
                <div class="col-sm-10 col-md-6">
                    <multi-lang-text :value="data.settings.copyrightMessage"></multi-lang-text>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-md-offset-2 col-sm-10 col-md-10">
                    <button type="submit" :disabled="loading" class="btn btn-primary">{{ $t('lbl.save') | upper }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    import Vue from 'vue'
    import store from 'src/services/store';
    import {InstitutionService} from 'src/services/data/institution'

    import Dropdown from 'src/components/common/Dropdown.vue';
    import MultiLangText from 'src/components/common/MultiLangText.vue';
    import FileUpload from 'src/components/common/FileUpload.vue';

    export default {
        props: ['data'],
        components: {
            Dropdown,
            MultiLangText,
            FileUpload,
        },
        data () {
            return {
                state: store.state,
                appInfo: store.state.appInfo,
                allLanguages: store.state.appInfo.languages.slice(),
                loading: false,

                uploadInstitutionLogo: InstitutionService.uploadInstitutionLogo.bind(InstitutionService),

                general: {
                    ...this.data,
                },
            }
        },
        created(){
            this.allLanguages.map(lang => {
                if(this.data.settings.availableLanguages.indexOf(lang.code2) !== -1) {
                    lang.checked = true;
                }
            });
        },
        mounted(){
        },
        methods: {
            onChangeActiveLanguages(){
                this.data.settings.defaultLanguage = null;

                this.data.settings.availableLanguages = this.allLanguages
                    .filter(lang => lang.checked)
                    .map(lang => lang.code2);
            },
            onChangeLogo(e){
                this.data.logoPath = e.file;
            },
            saveForm(){

                this.loading = true;

                InstitutionService.updateInstitution(this.appInfo.institution, this.data)
                    .then(res => {
                        this.loading = false;

                        if (res.code == "200.0000") {
                            toastr.success(res.message);
                            this.appInfo.logoPath = this.data.logoPath || this.appInfo.logoPath;
                            this.appInfo.copyrightMessage = this.data.settings.copyrightMessage;
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
