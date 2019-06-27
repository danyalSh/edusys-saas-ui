<template>
    <select multiple>
        <option v-for="item in items" :value="item[itemKey]">
            {{ item[propTitle] }}
        </option>
    </select>
</template>

<script>
    global.$ = global.jQuery = require('jquery');
    require('bootstrap-multiselect');
    require('bootstrap-multiselect/dist/css/bootstrap-multiselect.css');

    export default {
        props: ['items', 'value', 'options'],
        data () {
            return {
                el: null,
                isShow: false,
                baseOptions: {
                    nonSelectedText: "Seçilmedi",
                    allSelectedText: "Hepsi Seçildi",
                },
                _options: null
            }
        },
        watch: {
            items: function () {
                this.$nextTick(()=> {
                    this.render();
                })
            }
        },
        computed: {},
        created(){
            // Set props to component context
            for (let key of Object.keys(this.options)) {
                this[key] = this.options[key];
            }
        },
        mounted(){
            // Merge base and prop plugin options
            this._options = Object.assign({}, this.baseOptions, this.pluginOptions);

            // Emit onChange method when change value
            this._options.onChange = this.onChange;

            this.render();
        },
        methods: {
            render(){
                this.el = $(this.$el);

                this.el.multiselect("destroy");
                this.el.multiselect(this._options);

                if (this.value) {
                    this.el.val();
                    this.el.multiselect('select', this.value.map(item => '' + item[this.itemKey]));
                }

            },
            onChange(){
                var emitValue = [];
                var val = this.el.val();

                if (val) {
                    emitValue = val.map(v => {
                        var item = this.items.find(item => item[this.itemKey] == +v);
                        return this.propValue ? item[this.propValue] : item;
                    });
                }

                // Emit Event : onChange
                this.$emit('onChange', {el: this.el, value: emitValue})
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
