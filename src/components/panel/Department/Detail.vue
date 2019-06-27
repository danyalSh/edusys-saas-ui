<template>
    <div class="panel-department-detail-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ isEdit ? $t('lbl.edit-department') : $t('lbl.insert-new-department') }}
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
                                        <label class="col-sm-2 col-md-2 control-label">Bölüm Adı:</label>
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
                                        <label class="col-sm-2 col-md-2 control-label">Kod:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input v-model="item.code" type="text" placeholder="Kod giriniz">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Başkan:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.dean" class="btn-block">
                                                <option>{{$t('lbl.choose')}}</option>
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Akademik Birim:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.academicUnit" class="btn-block">
                                                <option>{{$t('lbl.choose')}}</option>
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">URL</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input v-model="item.url" type="text" placeholder="http://">
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="contact" class="tab-pane fade contact">
                                <contact-information :data="item.contactInformation">
                                </contact-information>
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
    import {DepartmentService, DepartmentModel} from 'src/services/data/department'
    import {clone} from 'src/helper'

    import MultiLangText from 'src/components/common/MultiLangText.vue';
    import ContactInformation from 'src/components/panel/_partials/ContactInformation';

    import ViewMixin from '../ViewMixin'


    export default {
        mixins: [ViewMixin],
        components: {
            MultiLangText,
            ContactInformation,
        },
        data() {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: false,
                loadingSave: false,

                item: clone(DepartmentModel),

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
            getItem() {
                this.loading = true;

                DepartmentService.getDepartment(this.$route.params.id)
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
                    DepartmentService.updateDepartment(this.item, this.$route.params.id)
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
                    DepartmentService.insertDepartment(this.item)
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
