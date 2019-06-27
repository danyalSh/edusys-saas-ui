<template>
    <div class="panel-room-detail-view">
        <div class="panel panel-default">
            <div class="panel-heading">
                {{ isEdit ? $t('lbl.edit-room') : $t('lbl.insert-new-room') }}
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
                                <div class="row mt50">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Oda Adı:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <multi-lang-text :value="item.name"></multi-lang-text>
                                            </div>
                                        </div>
                                        <div class="form-group mt40">
                                            <label class="col-sm-2 col-md-3 control-label">Açıklama:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <multi-lang-text :value="item.description" :multiline="true"></multi-lang-text>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Oda Numarası:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <input type="text" v-model="item.roomNr" placeholder="Oda numarası giriniz">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Oda Tipi:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <select v-model="item.type" class="btn-block" required>
                                                    <option :value="null">Oda Türü Seçiniz</option>
                                                    <option v-for="roomType in roomTypes" :value="roomType.id" :key="roomType.id">
                                                        {{roomType.name | langtext}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Oturma Kapasitesi:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <input type="text" v-model="item.seatingCapacity" placeholder="Oturma kapasitesi giriniz">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Sınav Kapasitesi:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <input type="text" v-model="item.examCapacity" placeholder="Sınav kapasitesi giriniz">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Bina:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <select v-model="item.building.id" class="btn-block" required>
                                                    <option :value="null">Odanın bulunduğu binayı seçiniz</option>
                                                    <option v-for="building in buildings" :value="building.id">
                                                        {{building.name | langtext}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Kampüs:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <select v-model="item.campus.id" class="btn-block" required>
                                                    <option :value="null">Odanın bulunduğu seçiniz</option>
                                                    <option v-for="campus in campuses" :value="campus.id" :key="campus.id">
                                                        {{campus.name | langtext}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Oda Özellikleri:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <multiselect v-model="roomFeatures"
                                                    :options="roomOptions"
                                                    :multiple="true"
                                                    :placeholder="$t('lbl.choose')"
                                                    :custom-label="roomFeaturesCustomLabel"
                                                    track-by="key">
                                                </multiselect>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Tahta Tipi:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <select v-model="item.features.boardType" class="btn-block" required>
                                                    <option :value="null">Tahta tipi seçiniz</option>
                                                    <option v-for="(value, key) in boardTypes" :value="key" :key="value.id">
                                                        {{value}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 col-md-3 control-label">Ses Sistemi:</label>
                                            <div class="col-sm-10 col-md-9">
                                                <select v-model="item.features.soundSystem" class="btn-block" required>
                                                    <option :value="null">Ses sistemi seçiniz</option>
                                                    <option>Sony</option>
                                                    <option>JBL</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="contact" class="tab-pane fade contact">
                                <div v-if="isEdit">
                                    <contact-information :data="item.contactInformation"
                                                         :id="item.id"
                                                         :update-service="updateContactInformationService">
                                    </contact-information>
                                </div>
                                <div v-else class="text-center mt40 mb40">
                                    <h4>İçeriği düzenleyerek güncelleyebilirsiniz.</h4>
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

    import {RoomService, RoomModel} from 'src/services/data/room'
    import {CampusService, CampusModel} from 'src/services/data/campus'
    import {BuildingService, BuildingModel} from 'src/services/data/building'

    import {clone} from 'src/helper'

    import MultiLangText from 'src/components/common/MultiLangText';
    import GoogleMaps from 'src/components/common/GoogleMaps';

    import ViewMixin from '../ViewMixin'

    import ContactInformation from 'src/components/panel/_partials/ContactInformation';

    import Multiselect from 'vue-multiselect'

    export default {
        mixins: [ViewMixin],
        components: {
            Multiselect,
            MultiLangText,
            GoogleMaps,
            ContactInformation,
        },
        data() {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: false,
                loadingSave: false,

                boardTypes: {
                    b: this.$i18n.t('lbl.blackboard'),
                    e: this.$i18n.t('lbl.smartboard'),
                    d: this.$i18n.t('lbl.ledboard'),
                    g: this.$i18n.t('lbl.glassboard'),
                    l: this.$i18n.t('lbl.blueboard'),
                    r: this.$i18n.t('lbl.greenboard'),
                    w: this.$i18n.t('lbl.whiteboard')
                },

                roomOptions: [
                    {title:"Projektör", key: "hasProjector"},
                    {title:"Havalandırma", key: "hasAc"},
                    {title:"Pencere", key: "hasWindow"}
                ],

                roomFeaturesCustomLabel({ title }){
                    return `${title}`
                },

                roomFeatures: [],
                campuses: [],
                buildings: [],
                roomTypes: [],
                item: clone(RoomModel),

                updateContactInformationService: CampusService.updateContactInformation,
            }
        },
        created() {
            this.getRoomTypes();
            this.listBuildingItems();
            this.listCampusItems();
            this.isEdit = typeof this.$route.params.id != 'undefined';
            if (this.isEdit)
                this.getItem();
        },
        mounted() {},
        watch: {
            roomFeatures: {
                handler: function (val, oldVal) {
                    oldVal.map(item => this.item.features[item.key] = false);
                    val.map(item => this.item.features[item.key] = true);
                }, deep:true
            }
        },
        methods: {
            getRoomTypes() {
                RoomService.getRoomTypes()
                    .then(res => {
                        if (res.code == 200) {
                            this.roomTypes = res.result.set;
                        }
                    })
            },
            listBuildingItems(){
                BuildingService.listBuildingItems().then(res => {
                    if (res.code == 200) {
                        this.buildings = res.result.set;
                    }
                })
            },
            listCampusItems() {
                CampusService.listCampusItems().then(res => {
                    if (res.code == 200) {
                        this.campuses = res.result.set;
                    }
                })
            },
            getItem() {
                this.loading = true;
                RoomService.getRoom(this.$route.params.id)
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
                    RoomService.updateRoom(this.item, this.$route.params.id)
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
                    RoomService.insertRoom(this.item)
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
