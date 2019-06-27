<template>
    <div class="panel-academic-calendar-settings-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ $t('lbl.academic-calendar-settings') }}
            </div>

            <div class="panel-body pt50">
                <div v-if="loading" class="text-center">
                    <h4>{{$t('lbl.loading')}}</h4>
                </div>
                <div v-if="!loading">
                    <ul class="nav nav-tabs">
                        <li v-for="(tab,index) in tabItems" :class="{active: index == 0}">
                            <a @click="activeTerm = tab" data-toggle="tab" :href="'#' + tab.term + '-' + index">
                                {{getTermTitle(tab.term)}}
                            </a>
                        </li>
                        <!--<li @click="addSeason('y')" class="new-add-season">-->
                            <!--<i>+</i>-->
                        <!--</li>-->
                    </ul>

                    <div class="season-selection col-md-3">
                        <form class="form-horizontal">
                            <div class="form-group form-item">
                                <label class="control-label col-md-4">{{ $t('lbl.season') }}: </label>
                                <div class="col-md-8">
                                    <select v-model="academicYear"
                                            @change="changeYear"
                                            class="form-control">
                                        <option v-for="y in years" :value="y">{{y}}</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="tab-content">
                        <div v-for="(item,index) in tabItems"
                             :id="item.term + '-' + index"
                             class="tab-pane fade"
                             :class="{'in': index == 0, 'active': index == 0}">
                            <div class="mt50">
                                <form @submit.prevent="saveForm" class="form-horizontal">
                                    <div v-for="settingsItem in settings" class="form-group form-item">
                                        <label class="col-sm-3 col-md-3 control-label">
                                            {{ settingsItem.lbl }}:
                                        </label>
                                        <div class="col-sm-4 col-md-3 col-lg-3">
                                            <date-time-picker :value.sync="item.settings[settingsItem.key + 'Start']"
                                                              :endDate="item.settings[settingsItem.key + 'End']"
                                                              :placeholder="$t('lbl.start-date')"/>
                                            <span class="calendar-icon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                                        </div>
                                        <div class="col-sm-4 col-md-3 col-lg-3">
                                            <date-time-picker :value.sync="item.settings[settingsItem.key + 'End']"
                                                              :startDate="item.settings[settingsItem.key + 'Start']"
                                                              :placeholder="$t('lbl.end-date')"/>
                                            <span class="calendar-icon">
                                            <i class="fa fa-calendar"></i>
                                        </span>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-sm-offset-3 col-md-offset-3">
                                            <button type="submit" :disabled="loadingSave" class="btn btn-primary">
                                                {{$t('lbl.save') | upper}}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import store from 'src/services/store';
    import moment from 'moment';
    import {AcademicService} from 'src/services/data/academic'
    import {clone} from 'src/helper'

    import DateTimePicker from '../../common/DateTimePicker'

    import ViewMixin from '../ViewMixin'

    export default {
        mixins: [ViewMixin],
        components: {
            DateTimePicker
        },
        data() {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: true,
                loadingSave: false,

                academicYear: this.getCurrentYear(),
                years: [],

                term: {
                    academicYear: null, // "2017-2018"
                    term: null, // g, s, y
                    settings: {
                        "termStart": null,
                        "termEnd": null,
                        "registrationStart": null,
                        "registrationEnd": null,
                        "addDropStart": null,
                        "addDropEnd": null,
                        "finalStart": null,
                        "finalEnd": null,
                        "midTermStart": null,
                        "midTermEnd": null,
                        "extendedRegistrationStart": null,
                        "extendedRegistrationEnd": null,
                        "exemptionTestStart": null,
                        "exemptionTestEnd": null,
                        "singleCourseTestStart": null,
                        "singleCourseTestEnd": null,
                        "makeupTestStart": null,
                        "makeupTestEnd": null,
                    }
                },
                tabItems: [],

                activeTerm: 'g',

                autumn: null,
                spring: null,
                summer: null,

                settings: [
                    {key: "term", lbl: this.$i18n.t('lbl.term-start-end'),},
                    {key: "registration", lbl: this.$i18n.t('lbl.registration-start-end'),},
                    {key: "addDrop", lbl: this.$i18n.t('lbl.add-drop-start-end'),},
                    {key: "final", lbl: this.$i18n.t('lbl.final-start-end'),},
                    {key: "midTerm", lbl: this.$i18n.t('lbl.mid-term-start-end'),},
                    {key: "extendedRegistration", lbl: this.$i18n.t('lbl.extended-registration-start-end'),},
                    {key: "exemptionTest", lbl: this.$i18n.t('lbl.exemption-test-start-end'),},
                    {key: "singleCourseTest", lbl: this.$i18n.t('lbl.single-course-test-start-end'),},
                    {key: "makeupTest", lbl: this.$i18n.t('lbl.makeup-test-start-end'),},
                ]
            }
        },
        computed: {},
        created() {
            this.setYears();
            this.getAcademicCalendarSettings();

        },
        mounted() {
            this.$nextTick(() => {
                $('.nav-tabs').tab();
            });
        },
        methods: {
            getAcademicCalendarSettings() {

                this.loading = true;

                AcademicService.getAcademicCalendarSettings(this.academicYear)
                    .then(res => {
                        this.loading = false;

                        if (res.code == 200) {
                            let seasons = res.result.set || [];

                            this.autumn = this.findSeason(seasons, 'g');
                            this.spring = this.findSeason(seasons, 's');
                            this.summer = this.findSeason(seasons, 'y');


                            this.tabItems = [
                                this.autumn,
                                this.spring,
                                this.summer,
                            ];

                            this.activeTerm = this.autumn;
                        }

                    })
                    .catch(err => {
                        this.loading = false;
                    })
            },
            getCurrentYear() {
                let currentYear = new Date().getFullYear();
                return currentYear + '-' + (currentYear + 1);
            },
            setYears() {
                let currentYear = new Date().getFullYear();

                let y1 = currentYear - 3, y2 = currentYear + 3;

                for (let i = y1; i <= y2; i++) {
                    this.years.push(i + '-' + (i + 1));
                }
            },

            findSeason(seasons, term) {

                for (let season of seasons) {
                    if (season.term == term) {
                        return season;
                    }
                }

                return this.createSeason(term);
            },

            createSeason(term) {
                let item = clone(this.term);
                item.term = term;

                return item;
            },

            changeYear() {
                this.getAcademicCalendarSettings();
            },

            getTermTitle(term) {
                switch (term) {
                    case 'g':
                        return this.$i18n.t('lbl.autumn');
                    case 's':
                        return this.$i18n.t('lbl.spring');
                    case 'y':
                        return this.$i18n.t('lbl.summer');
                }
            },

            saveForm() {

                this.loadingSave = true;

                AcademicService.updateAcademicCalendarSettings(this.activeTerm.settings, this.academicYear, this.activeTerm.term)
                    .then(res => {
                        this.loadingSave = false;

                        if (res.code == 200) {
                            toastr.success(res.message);
                        }

                    })
                    .catch(err => {
                        this.loadingSave = false;
                    })


            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
