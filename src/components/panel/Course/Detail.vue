<template>
    <div class="panel-course-detail-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ isEdit ? $t('lbl.edit-course') : $t('lbl.insert-new-course') }}
            </div>

            <div class="panel-body pt50">
                <div v-show="loading">
                    <h3 class="text-center">{{$t('lbl.loading')}}</h3>
                </div>
                <div v-if="!loading">
                    <form @submit.prevent="saveItem" class="form-horizontal">
                
                        <div id="general" class="tab-pane fade in active general">
                            <div class="mt50">
                                <div class="form-group">
                                    <label class="col-sm-2 col-md-2 control-label">Ders Adı:</label>
                                    <div class="col-sm-10 col-md-4">
                                        <multi-lang-text :value="item.name"></multi-lang-text>
                                    </div>
                                </div>
                                <div class="form-group mt40">
                                    <label class="col-sm-2 col-md-2 control-label">Açıklama:</label>
                                    <div class="col-sm-10 col-md-4">
                                        <multi-lang-text :value="item.description"
                                                            :multiline="true"></multi-lang-text>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 col-md-2 control-label">Ders Kodu:</label>
                                    <div class="col-sm-10 col-md-4">
                                        <input type="text" :value="item.code" placeholder="Ders Kodu Giriniz...">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 col-md-2 col-xs-12 control-label line-height-85">Varsayılan Kredi Bilgisi:</label>
                                    <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                        <label class="col-sm-12 col-md-12 control-label">Teori</label>
                                        <input type="text" :value="item.defaultCreditInfo.credit" placeholder="">
                                    </div>
                                    <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                        <label class="col-sm-12 col-md-12 control-label">Uygulama</label>
                                        <input type="text" :value="item.defaultCreditInfo.theory" placeholder="">
                                    </div>
                                    <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                        <label class="col-sm-12 col-md-12 control-label">Pratik</label>
                                        <input type="text" :value="item.defaultCreditInfo.practice" placeholder="">
                                    </div>
                                    <div class="col-sm-2 col-md-1 col-xs-3 credit-info-item">
                                        <label class="col-sm-12 col-md-12 control-label">AKTS</label>
                                        <input type="text" :value="item.defaultCreditInfo.ects" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 col-md-2 control-label">Geçti/Kaldı Durumu:</label>
                                    <div class="col-md-6 pt7">
                                        <switch-comp v-model="item.status"
                                                        :truthy="'a'"
                                                        :falsy="'i'"
                                                        @input="onChangeSwitch(item)"></switch-comp>
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
    import {CourseService, CourseModel} from 'src/services/data/course'

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
                item: clone(CourseModel),
            }
        },
        created() {
            this.isEdit = typeof this.$route.params.id != 'undefined';
            if (this.isEdit)
                this.getItem();

        },
        mounted() {},
        methods: {
            getItem() {
                this.loading = true;
                CourseService.getCourse(this.$route.params.id)
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
                CourseService.updateStatusCourseItem(item.id, item.status)
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
                    CourseService.updateCourseItem(this.item, this.$route.params.id)
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
                    CourseService.insertCourseItem(this.item)
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
