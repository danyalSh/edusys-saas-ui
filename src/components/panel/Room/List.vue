<template>
    <div class="panel-room-list-view">
        <div id="options"></div>

        <div class="panel panel-default">
            <div class="panel-heading">
                {{$t('lbl.room-list')}}
            </div>

            <div class="panel-body">
                <div class="row mb20">
                    <div class="col-md-10">
                        <div class="panel-head-title">
                            Üniversite Bünyesindeki Oda Listesi
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
                            <td> {{props.item.roomNr }} </td> 
                            <td> {{props.item.name | langtext}} </td> 
                             <td>
                                {{ getBuildingById(props.item.building.id).name | langtext }}
                                <dropdown :close="true" class="dropdown-selection">
                                    <a slot="selector" @click.prevent="" href>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                    <div slot="body">
                                        <ul>
                                            <li v-for="building in buildings" :key="building.id">
                                                <a @click.prevent="onSelectBuilding(props.item, building)" href>
                                                    {{building.name | langtext}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </dropdown>
                            </td>

                            <td>
                                {{ getCampusesById(props.item.campus.id).name | langtext }}
                                <dropdown :close="true" class="dropdown-selection">
                                    <a slot="selector" @click.prevent="" href>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                    <div slot="body">
                                        <ul>
                                            <li v-for="campus in campuses" :key="campus.id">
                                                <a @click.prevent="onSelectCampusType(props.item, campus)" href>
                                                    {{campus.name | langtext}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </dropdown>
                            </td>

                            <td>{{ getRoomType(props.item.type).name | langtext }}</td>  
                            <td>{{props.item.seatingCapacity}}</td>
                            <td> {{props.item.examCapacity}} </td>
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
    import {CampusService, CampusModel} from 'src/services/data/campus';

    import {RoomService, RoomModel} from 'src/services/data/room';

    import {BuildingService} from 'src/services/data/building';

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

                campuses: [],
                buildings: [],
                roomTypes: [],

                dt: {
                    cols: [
                        {key: 'room-number', title: this.$i18n.t('lbl.room-number'), sortable: true, width: 10},
                        {key: 'room-name', title: this.$i18n.t('lbl.room-name'), sortable: true, width: 15},
                        {key: 'room-building', title: this.$i18n.t('lbl.room-building'), sortable: true, width: 15},
                        {key: 'campus', title: this.$i18n.t('lbl.campus'), sortable: true, width: 15},
                        {key: 'room-type', title: this.$i18n.t('lbl.room-type'), sortable: false, width: 8},
                        {key: 'room-capacity', title: this.$i18n.t('lbl.room-capacity'), sortable: true, width: 10},
                        {key: 'exam-capacity', title: this.$i18n.t('lbl.exam-capacity'), sortable: false, width: 10},
                        {key: 'status', title: this.$i18n.t('lbl.status'), sortable: true, width: 10},
                        {key: 'transactions', title: this.$i18n.t('lbl.transactions'), sortable: false, width: 7},
                    ],

                    items: [],

                    filterOptions: {
                        types: [{
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
                    service: RoomService,
                    listMethod: "getRooms",
                    beforeRequest(){
                        return self.getRoomTypes().then(self.getBuildings).then(self.getCampuses);
                    },
                    locales: {
                        placeholderSearch: this.$i18n.t('text.search-by-name')
                    },
                },

                optionsConfirmModal: {
                    loading: false,
                    show: false,
                    onClickConfirm: this.deleteItem,
                    onClickCancel(){},
                },
            }
        },
        created(){
        },
        mounted() {
        },
        methods: {
           getBuildings() {
                return BuildingService.listBuildingItems()
                    .then(res => {
                        if (res.code == 200) {
                            this.buildings = res.result.set;
                        }
                    })
            },
            getCampuses() {
                return CampusService.listCampusItems()
                    .then(res => {
                        if (res.code == 200) {
                            this.campuses = res.result.set;
                            //this.dt.filterOptions.types[0].items = this.campuses;
                        }
                    })
            },
            getRoomTypes() {
                return RoomService.getRoomTypes()
                    .then(res => {
                        if (res.code == 200) {
                            this.roomTypes = res.result.set;
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
            getBuildingById(id){
                return this.buildings.find(building => building.id == id);
            },
            getCampusesById(id){
                return this.campuses.find(type => type.id == id);
            },
            getRoomType(id){    
                return this.roomTypes.find(type => type.id == id);
            },
            onSelectCampusType(room, campus){
                room.campus = clone(campus);                
                CampusService.updateTypeCampusItem(room.id, campus.id).then(res => {
                    if (res.code == 200) {
                        toastr.success(res.message);
                    }
                });
            },
            onSelectBuilding(room, building){
                room.building = clone(building);                
                RoomService.updateBuildingOfRoom(room.id, building.id).then(res => {
                    if (res.code == 200) {
                        toastr.success(res.message);
                    }
                });
            },
            goDetail($event, id){
                if(typeof id != 'undefined') {
                    this.$router.push({ name: 'institution-administration-panel/room-edit', params: { id } });
                }else {
                    this.$router.push({ name: 'institution-administration-panel/room-new'});
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
