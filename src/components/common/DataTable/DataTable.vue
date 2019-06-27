<template>
    <div class="data-table">
        <div class="row mb10">
            <div class="col-md-9">
                <dt-filter :options="filterOptions"></dt-filter>

            </div>
            <div class="col-md-3">
                <input v-model="query"
                       @keyup="keyupQuery($event)"
                       class="form-control width-150 pull-right list-search"
                       :placeholder="locales.placeholderSearch" type="text"/>
                <span class="list-search-label">{{$t('lbl.search')}}:</span>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                <columns :cols="options.cols" :sort.sync="sort"></columns>
                </thead>
                <tbody>
                <tr v-if="loading" class="text-center">
                    <td :colspan="options.cols.length">{{locales.lblLoading}}</td>
                </tr>
                <tr v-if="!loading && options.items.length < 1" class="text-center">
                    <td :colspan="options.cols.length">{{locales.lblNotFoundRecord}}</td>
                </tr>

                <slot name="rows"
                      v-if="!loading"
                      v-for="(item, index) in options.items"
                      :item="item"
                      :index="index">
                </slot>

                <columns :cols="options.cols"
                         :sort.sync="sort"
                         :hideSort="true"></columns>

                </tbody>
            </table>
        </div>
        <pagination :options="pagination"></pagination>
    </div>
</template>

<script>
    import store from 'src/services/store';

    import Filter from './Filter';
    import Columns from './Columns';
    import Pagination from './Pagination'

    import {debounce} from 'src/helper';

    import Dropdown from 'src/components/common/Dropdown.vue';

    export default {
        props: ['options'],
        components: {
            Pagination,
            Columns,
            DtFilter: Filter,
            Dropdown,
        },
        data() {
            return {
                loading: true,
                query: null,
                sort: null,
                filterOptions: {
                    items: [],
                    onSubmit: this.listItems
                },
                locales: {
                    lblSearch: this.$t('lbl.search') + '..',
                    lblLoading: this.$t('lbl.loading') + '...',
                    lblNotFoundRecord: this.$t('text.no-record-found') + "..",
                },
                pagination: {
                    start: 0,
                    currentPage: 1,
                    perPageCount: 10,
                    totalResult: 0,
                    onChangePageNumber: this.onChangePageNumber
                },
            }
        },
        watch: {
            sort() {
                this.listItems();
            }
        },
        created() {
            let locales = this.options.locales;

            if (locales) {
                let localeKeys = Object.keys(locales);

                if (localeKeys.length) {
                    localeKeys.map(key => this.locales[key] = locales[key]);
                }
            }

            Object.assign(this.filterOptions, this.options.filterOptions);

        },
        updated() {
        },
        mounted() {
            store.state.EventBus.$off('$dtRefreshItems');

            store.state.EventBus.$on('$dtRefreshItems', () => {
                this.listItems();
            });


            if(this.options.beforeRequest)
                this.options.beforeRequest().then(() => {
                    this.listItems();
                });
            else
                this.listItems();


        },
        methods: {
            listItems() {
                this.loading = true;

                this.pagination.perPageCount = +this.pagination.perPageCount;

                let filter = {
                    offset: this.pagination.start,
                    limit: this.pagination.perPageCount,

                };

                if (this.sort) {
                    filter.sort = [this.sort];
                }

                if (this.query) {
                    filter[this.options.queryKey] = this.query;
                }

                let filterItems = this.filterOptions.items;

                if (filterItems && filterItems.length) {
                    filterItems.map(item => {

                        if (Array.isArray(item.value)) {
                            if (item.value.length > 0) {
                                if (item.valProp) {
                                    filter[item.key] = item.value.map(val => val[item.valProp]);
                                } else {
                                    filter[item.key] = item.value;
                                }
                            }
                            return;
                        }

                        if (item.value) {
                            filter[item.key] = item.value;
                        }

                    })
                }


                this.options.service[this.options.listMethod](filter)
                    .then(res => {
                        this.loading = false;
                        this.options.items = res.result.set;
                        this.pagination.totalResult = res.result.pagination.recordCount;
                    })
                    .catch(err => {
                        this.loading = false;
                    })

            },
            keyupQuery: debounce(function ($event) {
                let key = $event.keyCode || $event.charCode;

                if (key >= 37 && key <= 40) {
                    return;
                }

                if (this.query && this.query.length >= 2) {
                    this.listItems();
                } else if (!this.query) {
                    this.query = null;
                    this.listItems();
                }

            }, 500),
            onChangePageNumber(start, limit) {
                this.pagination.start = start;
                this.listItems();
            },

        }
    }
</script>

<style lang="scss" scoped>

    .list-search {
        height: 35px;
        max-width: 150px;
    }

    .list-search-label {
        display: block;
        position: relative;
        float: right;
        width: 100%;
        text-align: right;
        max-width: 65px;
        line-height: 36px;
        color: #345366;
        right: 5px;
    }

    .data-table {
        font-size: 13px;
        letter-spacing: 0.5px;
        color: #28313b;
        table {
            font-size: 14px;
        }

        tr {
            border-top: solid 1px #e4e9f0;
            font-weight: 400;
            td {
                padding: 11px 8px;
                font-weight: normal;
                color: #345366;

                i {
                    margin-left: 5px;
                }
            }
        }

        tr:first-child {
            height: 45px;
            th {
                font-size: 12px;
            }
        }

        tr:last-child {
            font-family: 'LatoWebHeavy';
            text-align: left;
            border: none;
            box-shadow: none;
            padding: 12px 8px;
            border-top: solid 1px #e4e9f0;
        }
    }

</style>
