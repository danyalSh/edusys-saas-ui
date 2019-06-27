<template>
    <div class="input-group">
        +
        <input v-model="phone.value.countryCode" type="text"
               class="input-country"
               placeholder="90"
               required />
        <input v-model="phone.value.areaCode" type="text"
               placeholder="212"
               class="input-area"
               required />
        <input v-model="phone.value.number" type="text"
               placeholder="2223344"
               class="input-number"
               required />
    </div>
</template>

<script>
    export default {
        props: ['phone'],
        components: {},
        data() {
            return {}
        },
        watch: {
            "phone.value"(){
                if(!this.phone.value) {
                    this.setDefaultObject();
                }
            },
        },
        created() {
            if(!this.phone.value) {
                this.phone.value = { countryCode: null, areaCode: null, number: null };
            }
        },
        mounted() {
        },
        methods: {
            setDefaultObject(){
                this.phone.value = { countryCode: null, areaCode: null, number: null };
            },
        }
    }
</script>

<style lang="scss" scoped>
    .input-country { width: 15%; }
    .input-area { width: 20%; margin-left: 2%  }
    .input-number {  width: 55%; margin-left: 2% }
</style>
