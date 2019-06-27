<template>
    <div class="panel-course-plan-detail-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ isEdit ? $t('lbl.edit-course') : $t('lbl.insert-new-course-plan') }}
            </div>

            <div class="panel-body pt50">
                <div v-show="loading">
                    <h3 class="text-center">{{$t('lbl.loading')}}</h3>
                </div>
                <div v-if="!loading">
                    <form @submit.prevent="saveItem" class="form-horizontal">

                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">Akademik Yıl:</label>
                            <div class="col-sm-10 col-md-3">
                                <select class="btn-block" required>
                                    <option :value="null">Akademik yılı seçiniz</option>
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">Akademik Program:</label>
                            <div class="col-sm-10 col-md-3">
                                <select class="btn-block" required>
                                    <option :value="null">Akademik program seçiniz</option>
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8" id="course-plan-tab">
                                <ul class="nav nav-tabs">
                                    <li class="active">
                                        <a data-toggle="tab" href="#term-1">
                                            1.YARIYIL
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#term-2">
                                            2.YARIYIL
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#term-3">
                                            3.YARIYIL
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#term-4">
                                            4.YARIYIL
                                        </a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div id="term-1" class="tab-pane fade in active general">
                                        <div class="mt50">
                                            <div class="form-group">
                                                <label class="col-sm-4 col-md-2 col-xs-12 control-label">Zorunlu Ders:</label>
                                                <div class="col-sm-4 col-md-4">
                                                    <select class="btn-block">
                                                        <option>Ders Seçimi</option>
                                                        <option></option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                                    <input type="text" placeholder="">
                                                </div>
                                                <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                                    <input type="text" placeholder="">
                                                </div>
                                                <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                                    <input type="text" placeholder="">
                                                </div>
                                                <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                                    <input type="text" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-md-2"></div>
                                                <div class="col-md-8 pull-left">
                                                    <button class="btn btn-primary add-btn">+</button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div id="term-2" class="tab-pane fade contact">
                                        <div class="mt50">
                                        </div>
                                    </div>
                                    <div id="term-3" class="tab-pane fade contact">
                                        <div class="mt50">
                                        </div>
                                    </div>
                                    <div id="term-4" class="tab-pane fade contact">
                                        <div class="mt50">
                                        </div>
                                    </div>
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
    import SwitchComp from 'src/components/common/Switch';

    import ViewMixin from '../ViewMixin'

    import ContactInformation from 'src/components/panel/_partials/ContactInformation';


    export default {
        mixins: [ViewMixin],
        components: {
            MultiLangText,
            ContactInformation,
            SwitchComp,
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
            onChangeSwitch(item) {
                this.$set(item, 'loading', true);

                CampusService.updateStatusCampusItem(item.id, item.status)
                    .then(res => {
                        this.$set(item, 'loading', false);

                        if (res.code == 200) {
                            toastr.success(res.message);
                        }

                    })
                    .catch(err => {
                        this.$set(item, 'loading', false);
                    })
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

<style lang="scss" scoped>
    #course-plan-tab {
        .nav-tabs {
            border-bottom: solid 3px #7c8f9c;

            li:not(.add-tab) {
                position: relative;

                &:first-child  a{

                }

                &.active {
                    i {
                        color: white;
                    }
                }

                a {
                    display: inline-block;
                    padding-right: 25px;
                }

                i {
                    position: absolute;
                    right: 10px;
                    top: 12px;
                    display: inline-block;
                    cursor: pointer;
                }

            }


        }

        .nav-tabs > li.active > a:after, .nav-tabs > li > a:hover:after {
            content: '';
            position: absolute;
            border-bottom: 0 solid #0092ff;
        }

        .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {
            color: #FFFFFF;
            background-color: #7c8f9c;
            border-radius: 2px;
        }

        .add-tab {
            a {
                display: block;
                min-width: 39px;
                min-height: 39px;
                line-height: 39px;
                border-radius: 2px;
                background-color: rgba(228, 233, 240, 0.4);
                margin-left: 5px;
                text-align: center;
            }

            ul {


                a {
                    margin-left: 0;
                    text-align: left;
                    background: white;
                    min-height: 25px;
                    line-height: 20px;
                }
            }
        }

        .add-btn {
            width: 100%;
        }
    }
</style>
