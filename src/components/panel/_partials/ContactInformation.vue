<template>
    <div>
        <div class="row text-right">
            <div class="col-md-12 mb10 mt10">
                <button @click="openAddEditModal($event,null,null, 'insert')"
                        type="button"
                        data-toggle="modal"
                        data-target="#editModal"
                        class="btn btn-primary btn-sm">
                    {{ $t('lbl.new-add') | upper}}
                </button>
            </div>
        </div>
        <div class="row">
            <div v-if="!data || data.length < 1" class="col-sm-12 col-md-6 col-lg-4">
                <div class="contact-box">
                    <a @click="openAddEditModal($event,null,null, 'insert')" href
                       data-toggle="modal"
                       data-target="#editModal"
                       class="new-add-address">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        {{ $t('lbl.new-add') | upper}}
                    </a>
                </div>
            </div>
            <div v-for="(item, index) in data" class="col-sm-12 col-md-6 col-lg-4">
                <div class="contact-box">
                    <div class="contact-box-header">

                        <p class="title">{{item.title | langtext}}</p>

                        <div class="links">
                            <a @click.prevent="openAddEditModal($event,index,item)" href
                               data-toggle="modal"
                               data-target="#editModal">Düzenle</a>

                            <a @click.prevent="openDeleteModal($event,index,item)" href>{{ $t('lbl.delete')}}</a>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="contact-box-content">
                        <p>{{item.addresses && item.addresses.length ? getMergedAddress(item.addresses[0]) : '-'}}</p>
                        <p>{{item.phoneNumbers && item.phoneNumbers.length ? phoneTemplate(item.phoneNumbers[0]) : '-'}}</p>
                        <p>{{item.emails && item.emails.length ? item.emails[0] : '-'}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="saveInformation" class="form-horizontal">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="editModalLabel">{{ $t('lbl.address') }} {{ $t('lbl.add-edit')
                                }}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row mt20">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-sm-1 control-label">{{ $t('lbl.title') }}:</label>
                                        <div class="col-sm-11">
                                            <multi-lang-text :value="modal.title"></multi-lang-text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <ul class="nav nav-tabs">
                                        <li class="active">
                                            <a data-toggle="tab" href="#address-phone">
                                                {{ $t('lbl.phone')}}
                                            </a>
                                        </li>
                                        <li><a data-toggle="tab" href="#address-email">{{ $t('lbl.email') }}</a></li>
                                        <li><a data-toggle="tab" href="#address-address">{{ $t('lbl.address') }}</a>
                                        </li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="address-phone" class="tab-pane fade in active">
                                            <div class="mt20">
                                                <matrix :items="modal.phoneNumbers">
                                                    <template scope="props">
                                                        <phone-input :phone="props.item"></phone-input>
                                                    </template>
                                                    <template slot="row-template" scope="propsTpl">
                                                        {{phoneTemplate(propsTpl.item)}}
                                                    </template>
                                                </matrix>
                                            </div>
                                        </div>

                                        <div id="address-email" class="tab-pane fade">
                                            <div class="mt20">
                                                <matrix :items="modal.emails">
                                                    <template scope="props">
                                                        <input v-model="props.item.value"
                                                               type="email" class="form-control"
                                                               :placeholder="$t('placeholders.email')" required/>
                                                    </template>
                                                    <template slot="row-template" scope="propsTpl">
                                                        {{propsTpl.item}}
                                                    </template>
                                                </matrix>
                                            </div>
                                        </div>

                                        <div id="address-address" class="tab-pane fade">
                                            <div class="mt20">
                                                <div class="col-md-5 mt20" id="address-contact-boxes">
                                                    <div v-if="modal.addresses && modal.addresses.length < 1" class="alert alert-info">
                                                        {{ $t('text.no-entries-yet') }}
                                                    </div>
                                                    <div v-for="(address,index) in modal.addresses"
                                                         class="address-contact-box">
                                                        <div class="address-contact-box-header">
                                                            <p class="title">{{address.title | langtext}}</p>
                                                            <div class="address-links">
                                                                <a @click.prevent="editAddress(address, index)" href>
                                                                    {{$t('lbl.edit')}}
                                                                </a>
                                                                <a @click.prevent="deleteAddress(index)" href>
                                                                    {{$t('lbl.delete')}}
                                                                </a>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="address-contact-box-content">
                                                            <p>{{getMergedAddress(address)}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-7 col-sm-12 col-xs-12 pull-right">
                                                    <div id="address-form-items">
                                                        <form @submit.prevent="saveAddress">
                                                            <div class="form-group mt20">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">
                                                                    {{ $t('lbl.title')}}:
                                                                </label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <multi-lang-text
                                                                            :value="modal.address.title"></multi-lang-text>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">{{ $t('lbl.address')
                                                                    }}:</label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <input v-model="modal.address.street"
                                                                           type="text"
                                                                           class="form-control block"
                                                                           :placeholder="$t('lbl.enter')" required>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">{{ $t('lbl.zipcode')
                                                                    }}:</label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <input v-model="modal.address.zip"
                                                                           type="text"
                                                                           class="form-control block"
                                                                           :placeholder="$t('lbl.enter')" required>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">
                                                                    {{ $t('lbl.country')}}:
                                                                </label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <select v-model="modal.address.country"
                                                                            @change="changeCountry"
                                                                            required
                                                                            class="form-control block">
                                                                        <option :value="null">
                                                                            {{$t('lbl.choose')}}
                                                                        </option>
                                                                        <option v-for="country in state.countries"
                                                                                :value="country">
                                                                            {{country.name | langtext}}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div v-if="states && states.length > 0" class="form-group">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">
                                                                    {{ $t('lbl.state')}}:
                                                                </label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <select v-model="modal.address.state"
                                                                            class="form-control block"
                                                                            @change="changeState">
                                                                        <option :value="null">
                                                                            {{$t('lbl.choose')}}
                                                                        </option>
                                                                        <option v-for="state in states" :value="state">
                                                                            {{state.name | langtext}}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">
                                                                    {{ $t('lbl.city')}}:
                                                                </label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <select v-model="modal.address.city"
                                                                            @change="changeCity"
                                                                            required
                                                                            class="form-control block">
                                                                        <option :value="null">{{$t('lbl.choose')}}
                                                                        </option>
                                                                        <option v-for="city in cities" :value="city">
                                                                            {{city.name | langtext}}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">
                                                                    {{ $t('lbl.district')}}:
                                                                </label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <select v-model="modal.address.district"
                                                                            @change="changeDistrict"
                                                                            required
                                                                            class="form-control block">
                                                                        <option :value="null">
                                                                            {{$t('lbl.choose')}}
                                                                        </option>
                                                                        <option v-for="district in districts"
                                                                                :value="district">
                                                                            {{district.name | langtext}}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3 col-sm-2 col-xs-3">
                                                                    {{ $t('lbl.neighborhood')}}:
                                                                </label>
                                                                <div class="col-md-9 col-sm-10 col-xs-9 pl0">
                                                                    <select v-model="modal.address.neighborhood"
                                                                            required
                                                                            class="form-control block">
                                                                        <option :value="null">
                                                                            {{$t('lbl.choose')}}
                                                                        </option>
                                                                        <option v-for="neighborhood in neighborhoods"
                                                                                :value="neighborhood">
                                                                            {{neighborhood.name | langtext}}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="row align-left">
                                                                <div class="col-lg-offset-3 address-save-btn">
                                                                    <button v-if="modal.address.editMode"
                                                                            type="submit"
                                                                            class="btn btn-primary btn-sm">
                                                                        {{ $t('lbl.finish-it') | upper }}
                                                                    </button>
                                                                    <button v-else
                                                                            type="submit"
                                                                            class="btn btn-primary btn-sm">
                                                                        {{ $t('lbl.add') | upper }}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default cancel-btn"
                                    data-dismiss="modal">{{ $t('lbl.cancel') }}
                            </button>
                            <button :disabled="loadingModal"
                                    type="submit"
                                    class="btn btn-primary send-btn">{{ $t('lbl.save') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <confirm-modal :options="optionsConfirmModal"></confirm-modal>
    </div>
</template>

<script>

    import Vue from 'vue'
    import store from 'src/services/store';

    import {AppService, AddressModel} from 'src/services/data/app';
    import {generateSlug, clone} from 'src/helper';

    import MultiLangText from 'src/components/common/MultiLangText';
    import MaskInput from 'src/components/common/MaskInput';
    import PhoneInput from 'src/components/common/PhoneInput';
    import Matrix from 'src/components/common/Matrix';
    import ConfirmModal from 'src/components/common/ConfirmModal';

    let ContactInformationModel = {
        "title": {},
        "type": "c",
        "phoneNumbers": [],
        "emails": [],
        "addresses": [],
        address: clone(AddressModel),
    };

    export default {
        props: ['data', 'id', 'updateService'],
        components: {
            MultiLangText,
            MaskInput,
            PhoneInput,
            Matrix,
            ConfirmModal,
        },
        data () {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                loading: false,
                loadingModal: false,

                modal: clone(ContactInformationModel),

                states: [],
                cities: [],
                districts: [],
                neighborhoods: [],

                optionsConfirmModal: {
                    loading: false,
                    show: false,

                    onClickConfirm: this.deleteInformation,
                    onClickCancel(){
                    },
                },
            }
        },
        created(){
            if (store.state.countries.length < 1) {
                AppService.getCountries()
                    .then(res => {
                        store.state.countries = res.result.set;
                    });
            }
        },
        watch: {
            '$route' (to, from) {
                //this.toggleModal(to.params.type);
            }
        },
        mounted(){
            this.$editModal = $('#editModal');

            this.toggleModal(this.$route.params.type);

            this.$editModal.on('shown.bs.modal', () => {
//                let type =  typeof this.modal.index !== 'undefined' ? this.$i18n.t('lbl.update') : this.$i18n.t('lbl.insert');
//                type = this.generateSlug(type);

//                this.$router.push({
//                    name: "institution-administration-panel/institution-settings",
//                    params: { tab: this.$route.params.tab, type, }
//                });
            });

            this.$editModal.on('hidden.bs.modal', () => {
//                this.$router.push({
//                    name: "institution-administration-panel/institution-settings",
//                    params: { tab: this.$route.params.tab }
//                });
            });

        },
        methods: {
            generateSlug,
            toggleModal(type){
                if(type == this.generateSlug(this.$i18n.t('lbl.insert'))) {
                    this.modal = clone(ContactInformationModel);
                    this.$editModal.modal('show');
                } else if(type == this.generateSlug(this.$i18n.t('lbl.update')) && typeof this.modal.index == 'undefined') {
                    this.$router.push({
                        name: "institution-administration-panel/institution-settings",
                        params: { tab: this.$route.params.tab }
                    });
                }
            },
            openAddEditModal($event, index, item, type){
                if (type == 'insert') {
                    this.modal = clone(ContactInformationModel);
                } else {
                    this.modal = clone(item);
                    this.modal.address = clone(AddressModel);
                    this.modal.index = index;
                }
            },
            openDeleteModal($event, index, item){
                item.index = index;
                this.modal = item;

                this.optionsConfirmModal.show = true;
            },
            deleteInformation(){
                if(!this.updateService) {

                    this.optionsConfirmModal.show = false;
                    this.data.splice(this.modal.index, 1);
                    return;

                }

                this.optionsConfirmModal.loading = true;

                this.updateService(this.id, this.data).then(res => {
                    this.optionsConfirmModal.loading = false;

                    if (res.code == 200) {
                        toastr.success(res.message);
                        this.data.splice(this.modal.index, 1);

                        this.optionsConfirmModal.show = false;
                    }

                }).catch(err => {
                    this.optionsConfirmModal.loading = false;
                })
            },
            saveInformation(){
                let modal = this.modal;


                let data = clone(this.data);

                data.push(this.modal);



                if (typeof modal.index !== 'undefined') { // Is Update Mode

                    if(!this.updateService) {
                        $('#editModal').modal('hide');
                        this.$set(this.data, modal.index, modal);
                        return;
                    }
                    this.loadingModal = true;


                    this.updateService(this.id, data).then((res) => {
                        this.loadingModal = false;

                        if (res.code == 200) {
                            $('#editModal').modal('hide');
                            this.$set(this.data, modal.index, modal);
                            toastr.success(res.message)
                        }

                    }).catch(e => {
                        this.loadingModal = false;
                    });

                } else {  // and Is Insert

                    if(!this.updateService) {
                        $('#editModal').modal('hide');
                        this.data.push(modal);
                        return;
                    }

                    this.loadingModal = true;

                    this.updateService(this.id, data).then((res) => {
                        this.loadingModal = false;

                        if (res.code == 200) {
                            $('#editModal').modal('hide');
                            modal.id = res.result.set.id;
                            this.data.push(modal);
                            toastr.success(res.message)
                        }

                    }).catch(() => {
                        this.loadingModal = false;
                    });

                }
            },

            getMergedAddress(address){
                return `
                    ${address.street ? address.street : '-'} - ${address.zip ? address.zip : '-'} -
                    ${address.neighborhood ? address.neighborhood.name[store.state.lang] : '-'} /
                    ${address.district ? address.district.name[store.state.lang] : '-'} /
                    ${address.city ? address.city.name[store.state.lang] : '-'} /
                    ${address.country ? address.country.name[store.state.lang] : '-'}
                `
            },
            phoneTemplate(phone){
                return `+(${phone.countryCode}) ${phone.areaCode} ${phone.number}`;
            },

            editAddress(item, index){
                item.editMode = true;

                let country = item.country ? item.country.id : null;
                let state = item.state ? item.state.id : null;
                let city = item.city ? item.city.id : null;
                let district = item.district ? item.district.id : null;
                let neighborhood = item.neighborhood ? item.neighborhood.id : null;


                this.getStates(country)
                    .then(this.getCities.bind(null, country))
                    .then(this.getDistricts.bind(null, city))
                    .then(this.getNeighborhoods.bind(null, district))
                    .then(() => {
                        if(country) item.country = this.state.countries[this.state.countries.findIndexWithKey({id: country})];

                        if(state) item.state = this.states[this.states.findIndexWithKey({id: state})];

                        if(city) item.city = this.cities[this.cities.findIndexWithKey({id: city})];

                        if(district) item.district = this.districts[this.districts.findIndexWithKey({id: district})];

                        if(neighborhood) item.neighborhood = this.neighborhoods[this.neighborhoods.findIndexWithKey({id: neighborhood})];

                        this.modal.address = item;
                        this.modal.address.index = index;

                        this.$forceUpdate();

                    });
            },

            deleteAddress(index){
                this.modal.addresses.splice(index, 1);
            },
            saveAddress(){
                if (this.modal.address.editMode) {
                    this.modal.address = clone(AddressModel);
                    this.$forceUpdate();

                } else {
                    this.modal.addresses.push(clone(this.modal.address));
                    this.modal.address = clone(AddressModel);
                }
            },

            changeCountry(){
                this.modal.address.state = null;
                this.modal.address.city = null;
                this.modal.address.district = null;
                this.modal.address.neighborhood = null;

                this.states = [];
                this.cities = [];
                this.districts = [];
                this.neighborhoods = [];

                if(this.modal.editMode) {

                } else {
                    this.getStatesAndCities();
                }


            },

            changeState(){
                this.modal.address.city = null;
                this.modal.address.district = null;
                this.modal.address.neighborhood = null;

                this.cities = [];
                this.districts = [];
                this.neighborhoods = [];

                let stateId = this.modal.address.state ? this.modal.address.state.id : null;

                if(this.modal.editMode) {

                } else {
                    this.getCities(stateId, null);
                }
            },

            changeCity(){
                this.modal.address.district = null;
                this.modal.address.neighborhood = null;

                this.districts = [];
                this.neighborhoods = [];

                if(this.modal.editMode) {

                } else {


                    this.getDistricts();
                }
            },

            changeDistrict(){
                this.modal.address.neighborhood = null;

                this.neighborhoods = [];

                if(this.modal.editMode) {

                } else {
                    this.getNeighborhoods();
                }
            },

            getStatesAndCities(country){
                country = typeof country !== 'undefined' ? country : this.modal.address.country ? this.modal.address.country.id : null;

                if(country) {
                    return AppService.getStates(country)
                        .then(res => {
                            this.states = res.result.set;

                            if (this.states && this.states.length < 1) {
                                return this.getCities(null, country);
                            }

                        });
                }

            },

            getStates(country){
                country = country ? country : this.modal.address.country ? this.modal.address.country.id : null;

                if(country) {
                    return AppService.getStates(country)
                        .then(res => {
                            this.states = res.result.set;
                        });
                }

                return new Promise((resolve,reject) => resolve());

            },

            getCities(state, country){
                let isState = false;

                let val = null;


                if(state) {
                    isState = true;
                    val = this.modal.address.state ? this.modal.address.state.id : null;
                }else {
                    val = this.modal.address.country ? this.modal.address.country.id : null;
                }


                if(val) {
                    return AppService.getCities(isState ? val : null, !isState ? val : null)
                        .then(res => {
                            this.cities = res.result.set;
                        });
                }

                return new Promise((resolve,reject) => resolve());

            },

            getDistricts(city){
                city = city ? city : this.modal.address.city ? this.modal.address.city.id : null;

                if(city) {
                    return AppService.getDistricts(city)
                        .then(res => {
                            this.districts = res.result.set;
                        });
                }

                return new Promise((resolve,reject) => resolve());

            },

            getNeighborhoods(district){
                district = district ? district : this.modal.address.district ? this.modal.address.district.id : null;

                if(district) {
                    return AppService.getNeighborhoods(district)
                        .then(res => {
                            this.neighborhoods = res.result.set;
                        });
                }

                return new Promise((resolve,reject) => resolve());

            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>




    .input-group {

        .form-control {
            min-height: 40px;
        }
    }

    .modal-header{
        padding: 17px;
    }

    .address-save-btn{
        padding: 0 15px;
    }
</style>
