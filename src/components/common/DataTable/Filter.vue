<template>
    <div>
        <dropdown :confirm="true" :options="ddOptions"
                  @onConfirm="onApplyDropdown"
                  @onCancel="onResetDropdown"
                  class="filter-selection">
            <a slot="selector" @click.prevent="" href class="filter-btn">
                <i class="fa fa-filter"></i>
                {{ $t('lbl.filter') | upper }}
            </a>
            <div slot="body" class="filter-body">
                <h4>{{ $t('lbl.filter-options') | upper }}</h4>
                <hr>
                <div v-for="(item, index) in types" class="filter-item">
                    <div class="row">
                        <div class="col-md-2">{{item.title}}:</div>
                        <div class="col-md-10">
                            <div class="form-group">

                                <template v-if="item.controls" v-for="(control, index) in item.controls">
                                    <template v-if="item.type == 'radio'">
                                        <input  v-model="item.value"
                                                :name="item.key"
                                                :value="control"
                                                type="radio"
                                                class="custom-radio-button"
                                                :id="item.type + '-' + index">
                                        <label :for="item.type + '-' + index">
                                            {{control.title}}
                                        </label>
                                    </template>

                                </template>

                                <template v-if="item.type == 'multiselect'">
                                    <multiselect v-model="item.value"
                                                 :options="item.items"
                                                 :multiple="true"
                                                 :placeholder="$t('lbl.choose')"
                                                 :custom-label="item.customLabel"
                                                 :track-by="item.trackBy">
                                    </multiselect>
                                </template>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dropdown>
        <ul class="filter-tag">
            <template v-for="(item, index) in options.items">
                <li v-if="item.type == 'radio'">
                    {{item.title}}
                    <span>{{item.value.title}}</span>
                    <a @click.prevent="deleteTag(options.items, index)" href>
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                </li>

                <template v-if="item.type == 'multiselect'">
                    <li v-for="(val, index) in item.value">
                        {{item.title}}
                        <span>{{item.customLabel(val)}}</span>
                        <a @click.prevent="deleteTag(item.value, index)" href>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </li>
                </template>

            </template>



        </ul>
    </div>
</template>

<script>
    import store from 'src/services/store';
    import Dropdown from 'src/components/common/Dropdown';
    import Multiselect from 'vue-multiselect'

    import {clone} from 'src/helper';

    export default {
        props: ['options'],
        components: {
            Dropdown,
            Multiselect
        },
        data() {
            return {
                state: store.state,
                types: [],
                cloneTypes: [],
                ddOptions: {
                    lblCancel: this.$i18n.t('lbl.reset'),
                    lblConfirm: this.$i18n.t('lbl.apply'),
                },
            }
        },
        created() {

            this.options.types.map(type => {

                if(type.controls && type.controls.length) {
                    type.value = type.controls[0];
                }

            });


            this.types = this.options.types;


        },
        mounted() {
        },
        methods: {
            deleteTag(items, index){
                items.splice(index, 1);
                this.options.onSubmit();
            },
            onApplyDropdown(e){
                this.cloneTypes = clone(this.options.types);

                this.options.items = [];

                this.types.map(type => {
                    this.options.items.push(type);
                });

                this.options.onSubmit();

                e.toggleDropdown();
            },
            onResetDropdown(){
                this.options.types.map(type => {
                   type.value = null;
                });

                this.options.items = [];
                this.options.onSubmit();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .filter-selection{
        float: left;
    }

    .filter-body{
        width: 438px;
        margin-left: -10px;
        margin-right: -10px;
        h4{
            font-size: 16px;
            letter-spacing: 0.2px;
            color: #345366;
            text-align: center;
        }
        hr{
            margin-top: 15px;
            margin-bottom: 8px;
        }
    }

    .filter-item{
        margin-left: 15px;
        margin-right: 15px;
        font-size: 14px;
        letter-spacing: 0.2px;
        color: #345366;
    }


    .filter-btn{
        display: block;
        float: left;
        position: relative;
        top: 0px;
        border-radius: 3px;
        background-color: #7c8f9c;
        font-size: 11px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        padding: 10px 12px;
        margin-right: 3px;
        &:hover{
            text-decoration: none;
        }
    }


    ul.filter-tag{
        display: block;
        float: left;
        padding: 0;
        margin: 0;
        list-style-type: none;
        li{
            position: relative;
            float:left;
            background: #e4e9f0;
            margin-right: 3px;
            border-radius: 3px;
            display: block;
            padding: 2px 15px;
            font-size: 9px;
            letter-spacing: 0.2px;
            color: #7c8f9c;
            line-height: 16px;

            span{
                display: block;
                width: 100%;
                font-size: 14px;
            }

            a {
                display: block;
                position: absolute;
                font-size: 10px;
                color: #7c8f9c;
                top: 3px;
                right: 10px;
            }

            &:last-child{
                background-image: linear-gradient(to right, rgba(228, 233, 240, 0.0), #ffffff);
            }
        }
    }

</style>
