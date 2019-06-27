<template>
    <div class="panel-course-iteration-detail-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ isEdit ? $t('lbl.edit-new-course-iteration') : $t('lbl.insert-new-course-iteration') }}
            </div>

            <div class="panel-body pt50">
                <div v-show="loading">
                    <h3 class="text-center">{{$t('lbl.loading')}}</h3>
                </div>
                <div v-if="!loading">
                    <form @submit.prevent="saveItem" class="form-horizontal">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-2 col-md-4 control-label">Akademik Yıl:</label>
                                    <div class="col-sm-10 col-md-5">
                                        <select class="btn-block" required>
                                            <option>Akademik Yıl Seçiniz</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-10 col-md-3">
                                        <select class="btn-block" required>
                                            <option>Yarıyıl</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 col-md-4 control-label">Ders:</label>
                                    <div class="col-sm-10 col-md-8">
                                        <select class="btn-block" required>
                                            <option>Ders Seçiniz</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-2 col-md-2 control-label">Açıklama:</label>
                                    <div class="col-sm-10 col-md-9">
                                        <multi-lang-text :value="item.description" :multiline="true"></multi-lang-text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">Ders Kodu:</label>
                            <div class="col-sm-10 col-md-1 course-code">
                                <span>TDL1001-</span>
                            </div>
                            <div class="col-sm-10 col-md-1">
                                <input type="text" :value="item.studentCapacity" placeholder="100">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">Maks. Öğrenci Kapasitesi:</label>
                            <div class="col-sm-10 col-md-2">
                                <input type="text" placeholder="100">

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">Okutman:</label>
                            <div class="col-sm-10 col-md-4">
                                <select class="btn-block" required>
                                    <option>Okutman Seçiniz</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">Okutman Asistanı:</label>
                            <div class="col-sm-10 col-md-4">
                                <select class="btn-block" required>
                                    <option>Okutman Asistanı Seçiniz</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">Takvim Bilgisi:</label>
                            <div class="date-info">
                                <div class="col-sm-10 col-md-2 date-info-item">
                                    <label class="col-sm-2 col-md-12 control-label">Gün</label>
                                    <select class="btn-block" required>
                                        <option>Gün</option>
                                    </select>
                                </div>
                                <div class="col-sm-10 col-md-1 date-info-item">
                                    <label class="col-sm-2 col-md-12 control-label">Baş. Saati</label>
                                    <input type="text">
                                </div>
                                <div class="col-sm-10 col-md-1 date-info-item">
                                    <label class="col-sm-2 col-md-12 control-label">Bitiş Saati</label>
                                    <input type="text">
                                </div>
                                <div class="col-sm-10 col-md-1 date-info-item">
                                    <label class="col-sm-2 col-md-12 control-label">Oda</label>
                                    <select class="btn-block" required>
                                        <option>Oda</option>
                                    </select>
                                </div>
                                <div class="col-md-1 date-info-item">
                                    <button type="submit" :disabled="loadingSave" class="btn btn-primary">
                                        + GÜN EKLE
                                    </button>
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
    import {CourseIterationService, CourseIterationModel} from 'src/services/data/courseIteration'

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
                item: clone(CourseIterationModel),

            }
        },
        created() {
            this.isEdit = typeof this.$route.params.id != 'undefined';
            if (this.isEdit)
                this.getItem();

        },
        mounted() {

        },

        methods: {
            getCourseIteration() {
                this.loading = true;

                CourseIterationService.getCourseIteration(this.$route.params.id)
                    .then(res => {
                        this.loading = false;

                        if (res.code == 200) {
                            console.log()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .course-code{

    }
    .course-code span{
        display: block;
        width: 120px;
        height: 40px;
        border-radius: 3px;
        background-color: #e4e9f0;
        border: solid 1px #e4e9f0;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        letter-spacing: 0.2px;
        color: #7c8f9c;
    }
    .date-info{
        label{
            text-align: center;
            border-bottom: solid 1px #979797;
            margin-bottom: 29px;
            padding: 10px;
            font-size: 14px;
            letter-spacing: 0.2px;
            color: #345366;
        }
        .date-info-item{
            margin-right: -15px;
            button {
                position: relative;
                bottom: -68px;
                width: 90px;
                height: 40px;
                font-size: 11px;
            }
            &:nth-child(1){
                max-width: 160px
            }

        }
    }
</style>
