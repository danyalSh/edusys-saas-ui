<template>
    <div>
        <form @submit.prevent="saveItem">
            <div class="row">
                <div class="col-md-8">
                    <div class="input-group">
                        <slot :item="item"></slot>
                        <span class="input-group-btn">
                            <button v-if="isUpdate" type="submit" class="btn btn-primary">
                                    <i class="fa fa-plus"></i>
                                    {{$t('lbl.update')}}
                            </button>
                            <button v-else type="submit" class="btn btn-primary">
                                    <i class="fa fa-plus"></i>
                                    {{$t('lbl.add')}}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <ul class="list-group">
                        <li v-if="items.length < 1" class="list-group-item">
                            {{ $t('text.no-entries-yet') }}
                        </li>
                        <li v-for="(item, index) in items"
                            :class="{ 'active-item': activeIndex == index }"
                            class="list-group-item">
                            <span class="pull-left">
                                <slot name="row-template" :item="item"></slot>
                            </span>
                            <span class="pull-right">
                                <a @click.prevent="setActive(index)" href>{{ $t('lbl.edit') }}</a>
                                <a @click.prevent="deleteItem(index)" href>
                                    {{ $t('lbl.delete') }}
                                </a>
                            </span>
                            <span class="clearfix"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: ['items'],
        components: {},
        data() {
            return {
                activeIndex: null,
                item: {
                    value: null,
                },
            }
        },
        computed: {
            isUpdate(){
                return this.activeIndex !== null && this.activeIndex > -1;
            }
        },
        mounted() {
        },
        methods: {
            saveItem(){
                if (this.isUpdate) {
                    this.updateItem();
                } else {
                    this.pushItem();
                }
            },
            pushItem(){
                this.items.push(this.item.value);
                this.item.value = null;
            },
            setActive(index){
                this.activeIndex = index;
                this.item.value = this.items[this.activeIndex];
            },
            updateItem(){
                this.items[this.activeIndex] = this.item.value;
                this.item.value = null;
                this.activeIndex = null;
            },
            deleteItem(index){
                this.item.value = null;
                this.items.splice(index, 1);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
