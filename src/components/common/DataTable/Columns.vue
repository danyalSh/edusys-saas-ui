<template>
    <tr>
        <th v-for="col in cols" :width="col.width + '%'">
            {{col.title}}

            <div v-if="col.sortable" class="pull-right" :class="{hide: hideSort}">
                <a @click.prevent="sortItems(col, '+')" href class="sort-icon"
                   :class="{'active': isActive('+' + col.key) && sort}">
                    <i class="fa fa-angle-up"></i>
                </a>
                <a @click.prevent="sortItems(col, '-')" href="" class="sort-icon"
                   :class="{'active': isActive('-' + col.key) && sort}">
                    <i class="fa fa-angle-down"></i>
                </a>
            </div>
        </th>
    </tr>
</template>

<script>

    export default {
        props: ['cols', 'sort', 'hideSort'],
        components: {},
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            isActive(sort) {
                return this.sort == sort;
            },
            sortItems(col, type) {
                let sort = type + col.key;
                this.$emit('update:sort', sort);

            },
        }
    }
</script>

<style lang="scss" scoped>

    th {
        font-family: 'LatoWebHeavy';
        text-align: left;
        border: none !important;

        box-shadow: none;
        padding: 12px 8px;
        .sort-icon {
            display: block;
            font-size: 10px;
            line-height: 0.8;
            letter-spacing: 0.4px;
            text-align: center;
            color: #787c83;
            &.active {
                display: none;
            }
        }
    }
</style>
