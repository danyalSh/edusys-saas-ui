<template>
    <div class="panel-course-list-view">
        <div id="options"></div>

        <div class="panel panel-default">
            <div class="panel-heading">
                {{$t('lbl.course-list')}}
            </div>

            <div class="panel-body">
                <div class="row mb20">
                    <div class="col-md-10">
                        <div class="panel-head-title">
                            Üniversite Bünyesindeki Tüm Dersler
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
                            <td>{{props.item.description | langtext }}</td>
                            <td>{{props.item.defaultCreditInfo.credit}}</td>
                            <td>{{props.item.defaultCreditInfo.theory}}</td>
                            <td>{{props.item.defaultCreditInfo.practice}}</td>
                            <td>{{props.item.defaultCreditInfo.ects}}</td>
                            <td>  
                                <switch-comp v-model="props.item.status"
                                             :truthy="'a'"
                                             :falsy="'i'"
                                             :disabled="props.item.loading"
                                             @input="onChangeSwitch(props.item)"></switch-comp>
                            </td>
                            <td>
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

        <confirm-modal :options="optionsConfirmModal"></confirm-modal>

    </div>
</template>

<script>

    import Vue from 'vue';
    import store from 'src/services/store';
    import {CourseService, CourseModel} from 'src/services/data/course';

    import DataTable from 'src/components/common/DataTable/DataTable.vue';
    import {clone} from 'src/helper';

    import ViewMixin from '../ViewMixin';
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
                modal: null,

                dt: {
                    cols: [
                        {key: 'course-code', title: this.$i18n.t('lbl.course-code'), sortable: true, width: 15},
                        {key: 'course-name', title: this.$i18n.t('lbl.course-name'), sortable: true, width: 30},
                        {key: 'theory', title: this.$i18n.t('lbl.theory'), sortable: true, width: 10},
                        {key: 'practice', title: this.$i18n.t('lbl.practice'), sortable: true, width: 10},
                        {key: 'practical', title: this.$i18n.t('lbl.practical'), sortable: false, width: 10},
                        {key: 'akts', title: this.$i18n.t('lbl.akts'), sortable: true, width: 10},
                        {key: 'status', title: this.$i18n.t('lbl.status'), sortable: true, width: 12},
                        {key: 'transactions', title: this.$i18n.t('lbl.transactions'), sortable: false, width: 10},
                    ],

                    items: [],

                    filterOptions: {
                        types: [
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
                    queryKey: 'name',
                    service: CourseService,
                    listMethod: "listCourseItems",
                    // beforeRequest(){
                    //      return self.getCampusTypes().then(self.getAcademicUnits);
                    // },
                    locales: {
                        placeholderSearch: this.$i18n.t('text.search-by-name')
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
        created(){},
        mounted(){},
        methods: {
            openDeleteModal($event, index, item) {
                item.index = index;
                this.modal = item;
                this.optionsConfirmModal.show = true;
            },
            deleteItem() {
                this.optionsConfirmModal.loading = true;
                CampusService.deleteCampusItem(this.modal.id).then(res => {
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
            onSelectCampusType(type, campus){
                campus.type = type.id;

                CampusService.updateTypeCampusItem(campus.id, campus.type)
                    .then(res => {
                        if (res.code == 200) {
                            toastr.success(res.message);
                        }
                    });

            },
            onClickAcademicUnit(campus) {
                this.academicUnits.map(unit => {
                    campus.academicUnits.map(bUnit => {
                        if(unit.id == bUnit.id) {
                            unit.check = true;
                        }
                    });
                });
                this.$forceUpdate();
            },
            onConfirmDropdownAcademicUnit($event, campus){
                let checkedItems = this.academicUnits.filter(unit => unit.check);
                campus.academicUnits = clone(checkedItems);
                $event.isDisabledButtons = true;
                CampusService.updateAcademicUnitsCampusItem(campus.id, campus.academicUnits)
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
            onHideDropdownAcademicUnit($event, campus){
                this.academicUnits.map(unit => this.$set(unit,'check', false));
            },
            goDetail($event, id){
                if(typeof id != 'undefined') {
                    this.$router.push({ name: 'institution-administration-panel/course-edit', params: { id } });
                }else {
                    this.$router.push({ name: 'institution-administration-panel/course-new'});
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
