<template>
    <div class="panel-academic-programme-list-view">
        <div id="options"></div>

        <div class="panel panel-default">
            <div class="panel-heading">
                {{$t('lbl.academic-programme-list')}}
            </div>

            <div class="panel-body">
                <div class="row mb20">
                    <div class="col-md-10">
                        <div class="panel-head-title">
                            Üniversite Bünyesindeki Akademik Program Listesi
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
                                {{props.item.department ? props.item.department.name[state.lang] : '' }}
                                <dropdown :close="true" class="dropdown-selection">
                                    <a slot="selector" @click.prevent="" href>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                    <div slot="body">
                                        <ul>
                                            <li v-for="department in departments" :key="department.id">
                                                <a @click.prevent="onSelectDepartment(department, props.item)" href>
                                                    {{department.name | langtext}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </dropdown>
                            </td>
                            <td>
                                {{props.item.coordinator ? props.item.coordinator.name.title + ' ' + props.item.coordinator.name.first + ' ' + props.item.coordinator.name.last : '-'}}
                            </td>
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
                                                <a @click.prevent="openDeleteModal($event, props.index, props.item)"
                                                   href>
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

    import Vue from 'vue'
    import store from 'src/services/store';
    import {AcademicService} from 'src/services/data/academic'
    import {DepartmentService} from 'src/services/data/department'

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
                modal: null,

                departments: [],

                dt: {
                    cols: [
                        {key: 'code', title: this.$i18n.t('lbl.code'), sortable: true, width: 10},
                        {key: 'name', title: this.$i18n.t('lbl.name'), sortable: true, width: 25},
                        {key: 'department', title: this.$i18n.t('lbl.department'), sortable: true},
                        {key: 'coordinator', title: this.$i18n.t('lbl.coordinator'), sortable: true, width: 18},
                        {key: 'status', title: this.$i18n.t('lbl.status'), sortable: true, width: 18},
                        {key: 'transactions', title: this.$i18n.t('lbl.transactions'), sortable: false, width: 16},
                    ],

                    items: [],

                    queryKey: 'name',

                    service: AcademicService,
                    listMethod: "listAcademicProgrammes",

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
                                customLabel({name}) {
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
                                customLabel({name}) {
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
                    onClickCancel() {
                    },
                },
            }
        },
        mounted() {
            this.getDepartments();
//            this.getAcademicUnits();
        },
        methods: {
            getDepartments() {
                DepartmentService.listDepartments()
                    .then(res => {
                        if (res.code == 200) {
                            this.departments = res.result.set;
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

                AcademicService.deleteAcademicProgramme(this.modal.id).then(res => {
                    this.optionsConfirmModal.loading = false;

                    if (res.code == 200) {
                        toastr.success(res.message);
                        store.state.EventBus.$emit('$dtRefreshItems');

                        this.optionsConfirmModal.show = false;
                    }

                }).catch(err => {
                    this.optionsConfirmModal.loading = true;
                })
            },
            onChangeSwitch(item) {
                this.$set(item, 'loading', true);

                AcademicService.updateStatusAcademicProgramme(item.id, item.status)
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
            onSelectDepartment(department, item) {
                item.department = clone(department);

                AcademicService.updateDepartmentAcademicProgramme(item.id, item.department.id)
                    .then(res => {
                        if (res.code == 200) {
                            toastr.success(res.message);
                        }
                    });

            },
            goDetail($event, id){
                if(typeof id != 'undefined') {
                    this.$router.push({ name: 'institution-administration-panel/academic-programme-edit', params: { id } });
                }else {
                    this.$router.push({ name: 'institution-administration-panel/academic-programme-new'});
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
