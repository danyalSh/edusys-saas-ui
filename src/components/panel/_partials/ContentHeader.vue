<template>
    <div>
        <div class="row">
            <div class="col-xs-8 col-md-6">
                <h1 class="page-title">
                    {{state.page.title}}
                </h1>
            </div>
            <div class="col-xs-4 col-md-6 text-right mt20 options-container"></div>
        </div>

        <ol v-if="breadcrumbItems.length > 1" class="breadcrumb">
            <li v-for="item in breadcrumbItems">
                <template v-if="state.page.route !== item.route">
                    <template v-if="item.noClick">
                        {{item.title}}
                    </template>
                    <template v-else>
                        <router-link :to="item.route">
                            {{item.title}}
                        </router-link>
                    </template>
                </template>
                <template v-else-if="breadcrumbItems.length > 1 && state.page.route == item.route">
                    {{item.title}}
                </template>
            </li>
        </ol>

    </div>
</template>

<script>
    import store from 'src/services/store'
    import {pages} from 'src/services/pages'

    export default {
        data () {
            return {
                state: store.state,
                breadcrumbItems: []
            }
        },
        computed: {},
        watch: {
            '$route' (to, from) {
                this.generateBreadcrumbs(to);
            }
        },
        mounted(){
            this.generateBreadcrumbs(this.$route);

            store.state.EventBus.$off('$mountedView');
            store.state.EventBus.$on('$mountedView', (view) => {
                this.addOptionsFromChild();
            });
        },
        methods: {
            addOptionsFromChild(){
                document.querySelector('.options-container').innerHTML = "";

                let options = document.querySelector('#options');

                if(options) {
                    document.querySelector('.options-container').appendChild(document.querySelector('#options'));
                }

            },
            generateBreadcrumbs(to){
                let routeName = to.name;

                this.breadcrumbItems = [];

                for (let parent of pages) {
                    if (parent.name == routeName) {
                        this.breadcrumbItems.push(parent);
                    } else if (parent.children && parent.children.length) {

                        for (let child of parent.children) {

                            if (child.name == routeName) {
                                this.breadcrumbItems.push(parent);
                                this.breadcrumbItems.push(child);

                            } else if(child.children && child.children.length) {
                                for (let sub of child.children) {
                                    if (sub.name == routeName) {
                                        this.breadcrumbItems.push(parent);
                                        this.breadcrumbItems.push(child);
                                        this.breadcrumbItems.push(sub);
                                    }
                                }
                            }
                        }
                    }
                }



            }
        },


    }
</script>

<style lang="scss" scoped>

</style>
