<template>
    <input :value="value" type="text" class="form-control" required/>
</template>

<script>

    /*

     Using:

     <mask-input v-model="props.item.value"
                :value="props.item.value"
                pattern="(000) 000 00 00"
                placeholder="+ ( __ ) ___ __ __">
        </mask-input>

     */
    export default {
        props: ['pattern', 'value'],
        components: {},
        data() {
            return {}
        },
        created() {
        },
        mounted() {
            this.initMask();
        },
        methods: {
            initMask(){
                let self = this;

                let options = {
                    onChange(val){
                        self.$emit('input', val);
                    }
                };

                $(this.$el).mask(this.pattern, options);
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>
