<template>
    <div>
        <nav v-if="options.totalResult> options.perPageCount" aria-label="Page navigation" class="text-center">
            <span class="pull-left report">
               {{textReport}}

                <select v-model="options.perPageCount" @change="changePerPageCount" class="form-control show-page">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                {{$t('text.pagination.show-result')}}

            </span>
            <ul class="pagination pull-right">
                <li v-bind:class="{disabled: options.currentPage == 1}">
                    <a @click="options.currentPage !== 1 && clickNumber(options.currentPage, 'prev')"
                       href="javascript:void(0)"
                       :title="$t('lbl.prev')">
                        <span aria-hidden="true">ÖNCEKİ</span>
                    </a>
                </li>
                <li v-bind:class="{active: options.currentPage == 1}">
                    <a @click.prevent="clickNumber(1)" href>
                        1
                    </a>
                </li>
                <template v-if="options.currentPage >= 5">
                    <li><span>...</span></li>
                    <li v-if="options.currentPage >= pageLength">
                        <a @click="clickNumber(options.currentPage - 2)" href="javascript:void(0)">
                            {{options.currentPage - 2}}
                        </a>
                    </li>
                    <li>
                        <a @click="clickNumber(options.currentPage - 1)" href="javascript:void(0)">
                            {{options.currentPage - 1}}
                        </a>
                    </li>
                    <li class="active">
                        <a @click="clickNumber(options.currentPage)" href="javascript:void(0)">
                            {{options.currentPage}}
                        </a>
                    </li>
                    <li v-if="options.currentPage < pageLength">
                        <a @click="clickNumber(options.currentPage + 1)" href="javascript:void(0)">
                            {{options.currentPage + 1}}
                        </a>
                    </li>
                </template>

                <li v-if="options.currentPage < 5" v-for="(item, index) in numbers"
                    v-bind:class="{active: options.currentPage == item}">
                    <a @click="clickNumber(item)" href="javascript:void(0)">
                        {{item}}
                    </a>
                </li>
                <template v-if="options.currentPage <= pageLength - 3">
                    <li ><span>...</span></li>
                    <li v-bind:class="{active: options.currentPage == pageLength}">
                        <a @click="clickNumber(pageLength)" href="javascript:void(0)">
                            {{pageLength}}
                        </a>
                    </li>
                </template>
                <li v-bind:class="{disabled: options.currentPage == pageLength}">
                    <a @click="options.currentPage !== pageLength && clickNumber(options.currentPage, 'next')"
                       href="javascript:void(0)"
                       :title="$t('lbl.next')">
                        <span aria-hidden="true">SONRAKİ</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        props: {
            options: {
                type: null,
                default: function () {
                    return {
                        start: 0,
                        currentPage: 1,
                        perPageCount: 10,
                        totalResult: 0
                    }
                }
            },
        },
        data () {
            return {
                numbers: []
            }
        },
        computed: {
            textReport(){
                let str = this.$i18n.t('text.pagination.report');

                let totalResult = this.options.totalResult;
                let start = this.options.start;
                let limit = this.options.start + this.options.perPageCount;

                return str.replace('%total_result%', totalResult)
                          .replace('%start%', start)
                          .replace('%limit%', limit)

            },
            pageLength: function () {
                this.options.start = 0;
                this.options.currentPage = 1;

                var pageLength = Math.ceil(this.options.totalResult / this.options.perPageCount);

                if(pageLength == 0) {
                    pageLength = 1;
                }

                this.numbers = [];
                let pageCount = 0;

                if(pageLength > 5) {
                    pageCount = 5;
                } else {
                    pageCount = pageLength ;
                }

                for(let i=2; i <= pageCount; i++) {
                    this.numbers.push(i);
                }

                return pageLength;
            }
        },
        mounted(){

        },
        methods: {
            changePerPageCount(){
                this.options.start = 0;
                this.options.onChangePageNumber(0, this.options.perPageCount);

            },
            clickNumber(number, type){

                var isTrigger = false;


                if (type == 'first'  && this.options.currentPage !== 1) {
                    this.options.currentPage = 1;
                    isTrigger = true;
                }
                else if (type == 'prev' && this.options.currentPage !== 1) {
                    this.options.currentPage--;
                    isTrigger = true;
                }else if (type == 'last'  && this.options.currentPage !== this.pageLength) {
                    this.options.currentPage = this.pageLength;
                    isTrigger = true;
                } else if (type == 'next' && this.options.currentPage !== this.pageLength) {
                    this.options.currentPage++;
                    isTrigger = true;
                }
                else if (this.currentPage !== number) {
                    this.options.currentPage = number;
                    isTrigger = true;
                }


                if (isTrigger) {
                    var start = (this.options.currentPage * this.options.perPageCount) - this.options.perPageCount
                    var limit = this.options.perPageCount;


                    this.options.onChangePageNumber(start, limit, type);
                }


            }
        }
    }
</script>

<style lang="scss" scoped>

    .pagination {
        border-radius: 3px;

        > li > a, .pagination > li  {
            color: #7c8f9c;

        }

        > li.active > a, .pagination > li > span {
            color: #FFF;
            background: #7c8f9c;
        }

    }

    .report {
        position: relative;
        left: 5px;
        margin-top: 20px;
        font-size: 14px;
        color: #345366;
        font-weight: normal;
    }

    .show-page {
        position: relative;
        display: inline-block;
        width: 70px;
        max-height: 32px;
        margin: 0 5px 0;
        border-radius: 3px;
        border: solid 1px #e4e9f0;
        outline: 0;
    }


</style>
