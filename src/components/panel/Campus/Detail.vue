<template>
    <div class="panel-campus-detail-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ isEdit ? $t('lbl.edit-campus') : $t('lbl.insert-new-campus') }}
            </div>

            <div class="panel-body pt50">
                <div v-show="loading">
                    <h3 class="text-center">{{$t('lbl.loading')}}</h3>
                </div>
                <div v-if="!loading">
                    <form @submit.prevent="saveItem" class="form-horizontal">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a data-toggle="tab" href="#general">{{ $t('lbl.general') }}</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#contact">{{ $t('lbl.contact') }}</a>
                            </li>
                        </ul>

                        <div class="tab-content">
                            <div id="general" class="tab-pane fade in active general">
                                <div class="mt50">

                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Kampüs Adı:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <multi-lang-text :value="item.name"></multi-lang-text>
                                        </div>
                                    </div>
                                    <div class="form-group mt40">
                                        <label class="col-sm-2 col-md-2 control-label">Açıklama:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <multi-lang-text :value="item.description"
                                                             :multiline="true"></multi-lang-text>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Kampüs Tipi:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.type" class="btn-block" required>
                                                <option :value="null">Bulunduğu tipi seçiniz</option>
                                                <option v-for="type in campusTypes" :value="type.id">
                                                    {{type.name | langtext}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Konum:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <google-maps :coordinate="item" :height="250"></google-maps>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="contact" class="tab-pane fade contact">
                                <div v-if="isEdit">
                                    <contact-information :data="item.contactInformation"
                                                         :id="item.id"
                                                         :update-service="updateContactInformationService">
                                    </contact-information>
                                </div>
                                <div v-else class="text-center mt40 mb40">
                                    <h4>İçeriği düzenleyerek güncelleyebilirsiniz.</h4>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <hr>
                                <button type="submit" :disabled="loadingSave" class="btn btn-primary">
                                    {{$t('lbl.save')}}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from 'src/services/store';
    import {CampusService, CampusModel} from 'src/services/data/campus'

    import {clone} from 'src/helper'

    import MultiLangText from 'src/components/common/MultiLangText';
    import GoogleMaps from 'src/components/common/GoogleMaps';

    import ViewMixin from '../ViewMixin'

    import ContactInformation from 'src/components/panel/_partials/ContactInformation';


    export default {
        mixins: [ViewMixin],
        components: {
            MultiLangText,
            GoogleMaps,
            ContactInformation,
        },
        data() {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: false,
                loadingSave: false,

                campusTypes: [],
                item: clone(CampusModel),

                updateContactInformationService: CampusService.updateContactInformation,


            }
        },
        created() {
            this.getCampusTypes();

            this.isEdit = typeof this.$route.params.id != 'undefined';

            if (this.isEdit)
                this.getItem();

        },
        mounted() {

        },

        methods: {
            getCampusTypes() {
                CampusService.getCampusTypes()
                    .then(res => {
                        if (res.code == 200) {
                            this.campusTypes = res.result.set;
                        }
                    })
            },
            getItem() {
                this.loading = true;

                CampusService.getCampus(this.$route.params.id)
                    .then(res => {
                        this.loading = false;

                        if (res.code == 200) {
                            this.item = res.result.set;
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                    });
            },
            saveItem() {
                this.loadingSave = true;

                if (this.isEdit) {
                    CampusService.updateCampusItem(this.item, this.$route.params.id)
                        .then(res => {
                            this.loadingSave = false;

                            if (res.code == 200) {
                                toastr.success(res.message);
                            }
                        })
                        .catch(err => {
                            this.loadingSave = false;
                        });
                } else {
                    CampusService.insertCampusItem(this.item)
                        .then(res => {
                            this.loadingSave = false;

                            if (res.code == 200) {
                                toastr.success(res.message);
                            }
                        })
                        .catch(err => {
                            this.loadingSave = false;
                        });
                }

            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
