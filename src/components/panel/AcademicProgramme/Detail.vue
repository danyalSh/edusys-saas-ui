<template>
    <div class="panel-academic-programme-detail-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ isEdit ? $t('lbl.edit-academic-programme') : $t('lbl.insert-new-academic-programme') }}
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
                                <a data-toggle="tab" href="#programme-settings">{{ $t('lbl.programme-settings') }}</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#programme-codes">{{ $t('lbl.programme-codes') }}</a>
                            </li>
                        </ul>

                        <div class="tab-content">
                            <div id="general" class="tab-pane fade in active general">
                                <div class="mt50">
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Program İsmi:</label>
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
                                        <label class="col-sm-2 col-md-2 control-label">Kod</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input v-model="item.code" type="text" placeholder="Kod giriniz">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Eğitim Dili:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.language" class="btn-block">
                                                <option :value="null">{{$t('lbl.choose')}}</option>
                                                <option v-for="language in appInfo.languages" :value="language.code"
                                                        :key="language.id">
                                                    {{language.name | langtext}} 
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Bölüm:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.department" class="btn-block">
                                                <option :value="null">{{$t('lbl.choose')}}</option>
                                                <option v-for="department in departments" :value="department"
                                                        :key="department.id">
                                                    {{department.name | langtext}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Koordinatör:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.coordinator" class="btn-block">
                                                <option :value="null">{{$t('lbl.choose')}}</option>
                                                <option v-for="coordinator in coordinators" :value="coordinator"
                                                        :key="coordinator.id">
                                                    {{coordinator.account.name.first + " " + coordinator.account.name.last}}
                                                </option>
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
                            <div id="programme-settings" class="tab-pane fade contact">
                                <div class="mt50">
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Diploma Tipi:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.settings.diplomaType" class="btn-block">
                                                <option>{{$t('lbl.choose')}}</option>
                                                <option value="b">{{$t('lbl.bachelor')}}</option>
                                                <option value="d">{{$t('lbl.doctorate')}}</option>
                                                <option value="m">{{$t('lbl.masters')}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group mt40">
                                        <label class="col-sm-2 col-md-2 control-label">Diploma Başlığı:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <multi-lang-text :value="item.settings.diplomaTitle"></multi-lang-text>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Eğitim Tipi:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.settings.educationType" class="btn-block">
                                                <option :value="null">{{$t('lbl.choose')}}</option>
                                                <option value="o">{{$t('lbl.online')}}</option>
                                                <option value="s">{{$t('lbl.second')}}</option>
                                                <option value="r">{{$t('lbl.regular')}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Eğitim Süresi:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.settings.duration" class="btn-block">
                                                <option :value="null">Eğitim Süresi belirleyiniz (Yıl)</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Tezli / Tezsiz:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select v-model="item.settings.isThesisRequired" class="btn-block">
                                                <option :value="null">{{$t('lbl.choose')}}</option>
                                                <option value="1">{{$t('lbl.thesis')}}</option>
                                                <option value="2">{{$t('lbl.withoutthesis')}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Staj Zorunluluğu:</label>
                                        <div class="col-sm-1 col-md-1">
                                            <input type="checkbox" v-model="item.settings.isInternshipRequired"
                                                   class="custom-checkbox-button" id="internship">
                                            <label for="internship" class="internship">Zorunlu</label>
                                        </div>
                                        <div class="col-sm-9 col-md-5">
                                            <input v-if="item.settings.isInternshipRequired" type="text"
                                                   v-model="item.settings.internshipDuration"
                                                   placeholder="Staj Süresi giriniz (Gün)">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Kredi Gereksinimi:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input type="text" v-model="item.settings.creditRequirement">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="programme-codes" class="tab-pane fade contact">
                                <div class="mt50">
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">Sınav Türü:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <select class="btn-block" v-model="item.yokSettings.pointType">
                                                <option :value="null">Sınav Türü Seçiniz</option>
                                                <option value="YGS-1">YGS-1</option>
                                                <option value="YGS-2">YGS-2</option>
                                                <option value="YGS-3">YGS-3</option>
                                                <option value="YGS-4">YGS-4</option>
                                                <option value="YGS-5">YGS-5</option>
                                                <option value="YGS-6">YGS-6</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8" id="programme-type-tab">
                                        <ul class="nav nav-tabs">
                                            <li v-for="scholar in addedScholarships"
                                                :class="{ 'active': activeScholarship.code == scholar.code }" :key="scholar.id">
                                                <a @click="selectScholarship($event, scholar)" data-toggle="tab" href @click.prevent="">
                                                    {{scholar.title}}
                                                </a>
                                                <i v-if="scholar.code !== 0" @click="removeScholarship(scholar)" class="fa fa-times"></i>
                                            </li>
                                            <li v-if="addedScholarships.length !== scholarships.length" class="add-tab">
                                                <dropdown :close="true">
                                                    <a slot="selector" data-toggle="tab" @click.prevent="" href>
                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                    </a>
                                                    <div slot="body">
                                                        <ul class="list-unstyled">
                                                            <li v-for="scholar in scholarships" v-if="!hasExistScholarship(scholar)">
                                                                <a href @click.prevent="addScholarship(scholar)">
                                                                    {{scholar.title}}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </dropdown>
                                            </li>


                                        </ul>
                                    </div>
                                </div>
                                <div class="mt20">
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">ÖSYM Tercih Kodu:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input v-model="item.yokSettings.osymChoiceCode[activeScholarship.code]"
                                                   type="text"
                                                   placeholder="ÖSYM tercih kodunu giriniz">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">YÖKSİS Kodu:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input v-model="item.yokSettings.yoksisCode[activeScholarship.code]"
                                                   type="text"
                                                   placeholder="YÖKSİS kodu giriniz">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">YÖK Onay Tarihi</label>
                                        <div class="col-sm-10 col-md-6">
                                            <date-time-picker :value.sync="item.yokSettings.yokApprovalDate[activeScholarship.code]"
                                                              placeholder="YÖK onay tarihi seçiniz"/>
                                            <span class="calendar-icon">
                                                    <i class="fa fa-calendar"></i>
                                                </span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">YÖK Onay Numarası:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input v-model="item.yokSettings.yokApprovalNumber[activeScholarship.code]"
                                                   type="text"
                                                   placeholder="YÖK onay numarası giriniz">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">YÖK Açılış Tarihi</label>
                                        <div class="col-sm-10 col-md-6">
                                            <date-time-picker :value.sync="item.yokSettings.yokOpenDate[activeScholarship.code]" placeholder="YÖK açılış tarihi seçiniz"/>
                                            <span class="calendar-icon">
                                                    <i class="fa fa-calendar"></i>
                                                </span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">YÖK Onay Adı:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <input v-model="item.yokSettings.yokApprovalName[activeScholarship.code]"
                                                   type="text"
                                                   placeholder="YÖK onay adı giriniz">
                                        </div>
                                    </div>
                                    <div class="form-group mt40">
                                        <label class="col-sm-2 col-md-2 control-label">Açıklama:</label>
                                        <div class="col-sm-10 col-md-6">
                                            <textarea class="form-control" rows="5"
                                                      v-model="item.yokSettings.description[activeScholarship.code]"></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <hr>
                                <button type="submit" :disabled="loadingSave" class="btn btn-primary">KAYDET</button>
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
    import {AcademicService, AcademicProgrammeModel} from 'src/services/data/academic'
    import {DepartmentService} from 'src/services/data/department'
    import {StaffService} from 'src/services/data/staff'
    import {clone} from 'src/helper'

    import MultiLangText from 'src/components/common/MultiLangText.vue';
    import DateTimePicker from '../../common/DateTimePicker'
    import Dropdown from '../../common/Dropdown'

    import ViewMixin from '../ViewMixin'


    export default {
        mixins: [ViewMixin],
        components: {
            MultiLangText,
            DateTimePicker,
            Dropdown
        },
        data() {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: false,
                loadingSave: false,

                departments: [],
                coordinators: [],

                activeScholarship: {},
                scholarships: [
                    {
                        code: 0,
                        title: "BURSSUZ"
                    },
                    {
                        code: 25,
                        title: "ÖSYM 25%"
                    },
                    {
                        code: 50,
                        title: "ÖSYM 50%"
                    },
                    {
                        code: 75,
                        title: "ÖSYM 75%"
                    },
                    {
                        code: 100,
                        title: "ÖSYM 100%"
                    },
                ],
                addedScholarships: [],

                item: clone(AcademicProgrammeModel),
            }
        },
        created() {
            this.getDepartments();
            this.getCoordinators();

            this.isEdit = typeof this.$route.params.id != 'undefined';

            if (this.isEdit)
                this.getItem();

            this.activeScholarship = this.scholarships[0];

            this.addedScholarships.push(this.scholarships[0]);
        },
        mounted() {

        },

        methods: {
            setDepartment() {
                for (let item of this.departments) {
                    if (this.item.department.id == item.id) {
                        this.item.department = item;
                        break;
                    }
                }
            },
            getDepartments() {
                DepartmentService.listDepartments()
                    .then(res => {
                        if (res.code == 200) {
                            this.departments = res.result.set;
                        }
                    })
            },
            getCoordinators() {
                StaffService.getStaffs()
                    .then(res => {
                        if (res.code == 200) {
                            this.coordinators = res.result.set;
                        }
                    })
            },
            getItem() {
                this.loading = true;

                AcademicService.getAcademicProgramme(this.$route.params.id)
                    .then(res => {
                        this.loading = false;

                        if (res.code == 200) {
                            this.item = res.result.set;

                            this.item.name = this.item.name || {};
                            this.item.description = this.item.description || {};

                            this.setDepartment();
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                    });
            },
            saveItem() {
                this.loadingSave = true;

                if (this.isEdit) {
                    AcademicService.updateAcademicProgramme(this.item, this.$route.params.id)
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
                    AcademicService.insertAcademicProgramme(this.item)
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
            hasExistScholarship(scholar){
                return this.addedScholarships.indexOf(scholar) !== -1;
            },
            addScholarship(scholar){
                this.activeScholarship = scholar;
                this.addedScholarships.push(scholar);
            },
            selectScholarship($event, scholar){
                if($event.target.tagName != 'I') {
                    this.activeScholarship = scholar;
                }
            },
            removeScholarship(scholar){
                let {yokSettings} = this.item;

                for (let item in yokSettings) {
                    let obj = yokSettings[item];
                    if(obj) delete obj[scholar.code]; 
                }

                let index = this.addedScholarships.indexOf(scholar);
                this.addedScholarships.splice(index, 1);

                this.activeScholarship = this.addedScholarships[this.addedScholarships.length - 1];
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .internship {
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
    }

    input, button {
        position: relative;
        border: solid 1px #e4e9f0;
        border-radius: 3px;
    }

    .calendar-icon {
        position: absolute;
        top: 9px;
        right: 25px;
        i {
            font-size: 15px;
            color: #7c8f9c;
        }
    }

    #programme-type-tab {
        .nav-tabs {
            border-bottom: solid 3px #7c8f9c;

            li:not(.add-tab) {
                position: relative;

                &:first-child  a{
                    padding-right: 15px;
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
    }

</style>
