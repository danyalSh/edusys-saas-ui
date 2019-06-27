<template>
    <input :value="value" type="text" class="form-control">
</template>

<script>
    import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
    import moment from 'moment';

    $.fn.datetimepicker = require('eonasdan-bootstrap-datetimepicker');

    export default {
        props: ['value', 'options', 'startDate', 'endDate'],
        data () {
            return {
                el: null,
                defaultOptions: {
                    format: "DD.MM.YYYY HH:mm",
                    locale: 'tr',
                    useCurrent: false,
                    icons: {
                        time: 'fa fa-clock-o',
                        date: 'fa fa-calendar',
                        up: 'fa fa-chevron-up',
                        down: 'fa fa-chevron-down',
                        previous: 'fa fa-chevron-left',
                        next: 'fa fa-chevron-right',
                        today: 'fa fa-calendar-o',
                        clear: 'fa fa-trash',
                        close: 'fa fa-remove'
                    }
                },
                _options: {}
            }
        },
        computed: {},
        watch: {
            startDate(){
                if(this.startDate) {
                    this.el.data("DateTimePicker").minDate(this.parseDate(this.startDate));
                }

            },
            endDate(){
                if(this.endDate) {
                    this.el.data("DateTimePicker").maxDate(this.parseDate(this.endDate));
                }

            }
        },
        created(){
            this._options = Object.assign({}, this.defaultOptions, this.options ?  this.options  : {});

            if(this.startDate)
                this._options.minDate = this.parseDate(this.startDate);


            if(this.endDate)
                this._options.maxDate = this.parseDate(this.endDate);

        },
        mounted(){
            this.render();
        },
        methods: {
            parseDate(date){
                return moment(date, 'DD.MM.YYYY HH:mm')
            },
            render(){
                this.el = $(this.$el);

                this.el.datetimepicker(this._options);
                this.el.on('dp.change', this.changeDate);
            },
            changeDate(e){
                this.$emit('update:value', this.el.val());
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
