<template>
    <div class="panel-institution-settings-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ $t('lbl.institution-information-update') }}
            </div>

            <div class="panel-body pt50">
                <div v-if="loading">
                    <h4 class="mt20 text-center"> {{ $t('lbl.loading') }} </h4>
                </div>
                <div v-if="!loading && institution">
                    <ul class="nav nav-tabs institution-tabs">
                        <li class="active">
                            <a data-toggle="tab" :href="'#' + generateSlug($t('lbl.general'))">
                                {{ $t('lbl.general')}}
                            </a>
                        </li>
                        <li>
                            <a data-toggle="tab" :href="'#' + generateSlug($t('lbl.tax'))">
                                {{ $t('lbl.tax') }}
                            </a>
                        </li>
                        <li>
                            <a data-toggle="tab" :href="'#' + generateSlug($t('lbl.contact'))">
                                {{ $t('lbl.contact')}}
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <template v-if="institution">
                            <div :id="generateSlug($t('lbl.general'))" class="tab-pane fade in active general">
                                <tab-general :data="institution"></tab-general>
                            </div>
                            <div :id="generateSlug($t('lbl.tax'))" class="tab-pane fade tax">
                                <tab-tax :data="institution"></tab-tax>
                            </div>
                            <div :id="generateSlug($t('lbl.contact'))" class="tab-pane fade contact">
                                <tab-contact :data="institution"></tab-contact>
                            </div>
                        </template>

                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import store from 'src/services/store';
    import {InstitutionService} from 'src/services/data/institution'
    import {generateSlug} from 'src/helper'

    import TabGeneral from './TabGeneral.vue';
    import TabTax from './TabTax.vue';
    import TabContact from './TabContact.vue';

    import ViewMixin from '../../ViewMixin'


    export default {
        mixins: [ViewMixin],
        components: {
            TabGeneral,
            TabTax,
            TabContact
        },
        data () {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: true,

                institution: null,
            }
        },
        created(){
            this.getInstitution();

        },
        mounted(){
        },

        methods: {
            generateSlug,
            initTabLinks(){
                let self = this;


                $('.institution-tabs > li > a').click(function () {
                    let tabKey = $(this).attr("href").substr(1);

                    let params = {tab: tabKey};

                    if (tabKey == self.generateSlug(self.$i18n.t('lbl.contact'))) {
                        params.type = self.$route.params.type;
                    }

                    self.$router.push({
                        name: "institution-administration-panel/institution-settings",
                        params
                    });

                });
            },
            setDefaultProperties(institution){

                institution.contactInformation = institution.contactInformation || [];

                institution.taxInformation = institution.taxInformation || {
                        vatOffice: null,
                        vatNumber: null,
                        vatTitle: null,
                    };

            },
            getInstitution(){
                this.loading = true;

                InstitutionService.getInstitution(this.appInfo.institution)
                    .then(res => {
                        this.loading = false;

                        if (res.code == "200.0000") {
                            this.institution = res.result.set;

                            this.setDefaultProperties(this.institution);

                            this.$nextTick(() => {
                                this.initTabLinks();

                                let tabRoute = this.$route.params.tab;

                                if (tabRoute) {
                                    $(`.institution-tabs > li > a[href="#${tabRoute}"]`).click();
                                }
                            });

                        }
                    })
                    .catch(err => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
