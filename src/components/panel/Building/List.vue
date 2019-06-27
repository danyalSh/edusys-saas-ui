<template>
    <div class="panel-building-list-view">
        <div id="options"></div>

        <div class="panel panel-default">
            <div class="panel-heading">
                {{$t('lbl.building-list')}}
            </div>

            <div class="panel-body">
                <div class="row mb20">
                    <div class="col-md-10">
                        <div class="panel-head-title">
                            Üniversite Bünyesinde Bulunan Yapıların Listesi
                        </div>
                        <div class="panel-head-subtitle">
                            Lorem Ipsum Dolor Sit Amet
                        </div>
                    </div>
                    <div class="col-md-2 text-right">
                        <div class="new-add-btn">
                            <a @click.prevent="goDetail($event)" href class="btn btn-primary">
                                <i class="fa fa-plus"></i>
                                {{ $t('lbl.new-add') | upper }}
                            </a>
                        </div>
                    </div>
                </div>

                <data-table :options="dt">
                    <template slot="rows" scope="props">
                        <tr>
                            <td>{{props.item.code}}</td>
                            <td>{{props.item.name | langtext }}</td>
                            <td>
                                {{props.item.campus ? (props.item.campus.name[state.lang]) : '-'}}
                                <dropdown :close="true"  class="dropdown-selection">
                                    <a slot="selector" @click.prevent="" href>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                    <div slot="body">
                                        <ul>
                                            <li v-for="campus in campuses">
                                                <a @click.prevent="onSelectCampus(campus, props.item)" href>
                                                    {{campus.name | langtext}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </dropdown>
                            </td>
                            <td>
                                {{props.item.academicUnits.length}}
                                <dropdown class="academic-unit-selection"
                                          :confirm="true"
                                          @onConfirm="onConfirmDropdownAcademicUnit($event, props.item)"
                                          @onHide="onHideDropdownAcademicUnit(props.item)">

                                    <a slot="selector" @click.prevent="onClickAcademicUnit(props.item)" href>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                    <div slot="body" class="academic-units">
                                        <ul>
                                            <li v-for="(unit, index) in academicUnits">
                                                <div class="form-group">
                                                    <input v-model="unit.check"
                                                           :id="'au-' + unit.id  + '-' + index"
                                                           type="checkbox"
                                                           class="custom-checkbox-button">
                                                    <label :for="'au-' + unit.id + '-' + index">{{unit.name | langtext}}</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </dropdown>
                            </td>
                            <td>
                                <switch-comp v-model="props.item.status"
                                             :truthy="'a'"
                                             :falsy="'i'"
                                             :disabled="props.item.loading"
                                             @input="onChangeSwitch(props.item)"></switch-comp>
                            </td>
                            <td>
                                <a href="#">
                                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                                </a>
                                <dropdown :close="true" class="dropdown-selection">
                                    <a slot="selector" @click.prevent="" href>
                                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                    </a>
                                    <div slot="body">
                                        <ul>
                                            <li>
                                                <a @click.prevent="goDetail($event, props.item.id)" href>
                                                    {{$t('lbl.edit')}}
                                                </a>
                                            </li>
                                            <li>
                                                <a @click.prevent="openDeleteModal($event, props.index, props.item)" href>
                                                    {{$t('lbl.delete')}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </dropdown>
                            </td>
                        </tr>
                    </template>
                </data-table>

            </div>
        </div>

    </div>
</template>

<script>

    import Vue from 'vue'
    import store from 'src/services/store';
    import {BuildingService, BuildingModel} from 'src/services/data/building'
    import {CampusService} from 'src/services/data/campus'
    import {AcademicService} from 'src/services/data/academic'

    import DataTable from 'src/components/common/DataTable/DataTable.vue';
    import {clone} from 'src/helper';

    import ViewMixin from '../ViewMixin'
    import Dropdown from 'src/components/common/Dropdown.vue';
    import SwitchComp from 'src/components/common/Switch';
    import ConfirmModal from 'src/components/common/ConfirmModal';

    export default {
        mixins: [ViewMixin],
        components: {
            DataTable,
            Dropdown,
            SwitchComp,
            ConfirmModal,
        },
        data() {
            let self = this;

            return {
                state: store.state,
                loadingModal: false,
                loadingDelete: false,
                modal: clone(BuildingModel),

                campuses: [],
                academicUnits: [],

                dt: {
                    cols: [
                        {key: 'code', title: this.$i18n.t('lbl.code'), sortable: true, width: 10},
                        {key: 'building-name', title: this.$i18n.t('lbl.building-name'), sortable: true, width: 18},
                        {key: 'campus', title: this.$i18n.t('lbl.campus'), sortable: true},
                        {key: 'academic-unit', title: this.$i18n.t('lbl.academic-unit'), sortable: true, width: 18},
                        {key: 'status', title: this.$i18n.t('lbl.status'), sortable: true, width: 18},
                        {key: 'transactions', title: this.$i18n.t('lbl.transactions'), sortable: false, width: 18},
                    ],

                    items: [],

                    queryKey: 'name',

                    service: BuildingService,
                    listMethod: "listBuildingItems",

                    locales: {
                        placeholderSearch: this.$i18n.t('text.search-by-name')
                    },

                    filterOptions: {
                        types: [
                            {
                                type: 'multiselect',
                                title: this.$i18n.t('lbl.campus'),

                                key: 'campus',
                                value: [],

                                items: [],

                                valProp: 'id',
                                trackBy: 'id',
                                customLabel ({ name }) {
                                    return name[store.state.lang]
                                },

                            },
                            {
                                type: 'multiselect',
                                title: this.$i18n.t('lbl.academic-unit'),

                                key: 'academicUnits',
                                value: [],

                                items: [],

                                valProp: 'id',
                                trackBy: 'id',
                                customLabel ({ name }) {
                                    return name[store.state.lang]
                                },

                            },
                            {
                                type: 'radio',
                                title: this.$i18n.t('lbl.status'),

                                key: 'status',
                                value: null,

                                controls: [
                                    {
                                        title: this.$i18n.t('lbl.active'),
                                        value: 'a'
                                    },
                                    {
                                        title: self.$i18n.t('lbl.passive'),
                                        value: 'i'
                                    },
                                ]
                            },
                        ]
                    },
                },

                optionsConfirmModal: {
                    loading: false,
                    show: false,

                    onClickConfirm: this.deleteItem,
                    onClickCancel(){
                    },
                },
            }
        },
        mounted() {
            this.getCampusItems();
            this.getAcademicUnits();
        },
        methods: {
            getCampusItems() {
                CampusService.listCampusItems()
                    .then(res => {
                        if (res.code == 200) {
                            this.campuses = res.result.set;
                            this.dt.filterOptions.types[0].items = this.campuses;
                        }
                    })
            },
            getAcademicUnits() {
                AcademicService.listAcademicUnits()
                    .then(res => {
                        if (res.code == 200) {
                            this.academicUnits = res.result.set;
                            this.dt.filterOptions.types[1].items = this.academicUnits;
                        }
                    })
            },
            openDeleteModal($event, index, item) {
                item.index = index;
                this.modal = item;

                this.optionsConfirmModal.show = true;
            },
            deleteItem() {
                this.optionsConfirmModal.loading = true;

                BuildingService.deleteBuildingItem(this.modal.id).then(res => {
                    this.optionsConfirmModal.loading = false;

                    if (res.code == 200) {
                        toastr.success(res.message);
                        store.state.EventBus.$emit('$dtRefreshItems');

                        this.optionsConfirmModal.show = false;
                    }

                }).catch(err => {
                    this.optionsConfirmModal.loading = false;
                })
            },
            onChangeSwitch(item) {
                this.$set(item, 'loading', true);

                BuildingService.updateStatusBuildingItem(item.id, item.status)
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
            onSelectCampus(campus, building){
                building.campus = clone(campus);
                BuildingService.updateCampusBuildingItem(building.id, building.campus.id)
                    .then(res => {
                        if (res.code == 200) {
                            toastr.success(res.message);
                        }
                    });

            },
            onClickAcademicUnit(building) {

                this.academicUnits.map(unit => {

                    building.academicUnits.map(bUnit => {
                        if(unit.id == bUnit.id) {
                            unit.check = true;
                        }
                    });

                });

                this.$forceUpdate();

            },
            onConfirmDropdownAcademicUnit($event, building){
                let checkedItems = this.academicUnits.filter(unit => unit.check);

                building.academicUnits = clone(checkedItems);

                $event.isDisabledButtons = true;

                BuildingService.updateAcademicUnitsBuildingItem(building.id, building.academicUnits)
                    .then(res => {
                        $event.isDisabledButtons = false;
                        $event.toggleDropdown();

                        if (res.code == 200) {
                            toastr.success(res.message);
                        }
                    })
                    .catch(err => {
                        $event.isDisabledButtons = false;
                    });


            },
            onHideDropdownAcademicUnit($event, building){
                this.academicUnits.map(unit => this.$set(unit,'check', false));
            },
            goDetail($event, id){

                if(typeof id != 'undefined') {
                    this.$router.push({ name: 'institution-administration-panel/building-edit', params: { id } });
                }else {
                    this.$router.push({ name: 'institution-administration-panel/building-new'});
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .dropdown-selection {
        position: absolute;
        margin-left: 10px;
        color: #7c8f9c;
        i {
            color: #7c8f9c;
        }
        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            li {
                a {
                    display: block;
                    font-size: 14px;
                    line-height: 1.93;
                    color: #7c8f9c;
                    text-decoration: none;
                }
            }
        }
    }

    .academic-unit-selection {
        position: absolute;
        margin-left: 10px;
        i {
            color: #7c8f9c;
        }
        .academic-units {
            width: 305px;
            ul {
                display: block;
                list-style-type: none;
                padding: 0;
                margin: 5px 0 0;
                li {
                    display: block;
                    font-size: 14px;
                    line-height: 18px;
                    color: #345366;
                    text-decoration: none;
                    max-height: 16px;
                }
            }
        }
    }

</style>
