<template>
    <input :value="value" type="text" class="form-control">
</template>

<script>
    import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css';

    import 'bootstrap-datepicker';
    import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.tr.min';

    import store from 'src/services/store';

    export default {
        props: ['value', 'startDate', 'options'],
        data () {
            return {
                el: null,
                defaultOptions: {
                    format: "dd.mm.yyyy",
                    todayBtn: false,
                    autoclose: true,
                    todayHighlight: false,
                    language: store.state.lang,
                },
                _options: {}
            }
        },
        computed: {},
        watch: {
            value(){
                this.el.datepicker('update', this.value);
            },
            startDate(){
                this.el.datepicker('setStartDate', this.startDate);
            }
        },
        created(){
            this._options = Object.assign({}, this.defaultOptions, this.options ?  this.options  : {});

            this._options.startDate = this.startDate;
        },
        mounted(){
            this.render();
        },
        methods: {
            render(){
                this.el = $(this.$el);

                this.el.datepicker(this._options);
                this.el.datepicker().on('changeDate', this.changeDate);
            },
            changeDate(e){
                this.$emit('update:value', this.el.val());
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
