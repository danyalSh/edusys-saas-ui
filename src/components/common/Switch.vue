<template>
    <div class="status-switch" :class="{disabled}">
        <input v-model="val" :id="'switch-' + _uid" type="checkbox"
               :disabled="disabled"
               @change="onChange">
        <label :for="'switch-' + _uid" class="switch-slider"
               :data-active="lblActive | upper"
               :data-passive="lblPassive  | upper"
        ></label>
    </div>
</template>

<script>

    export default {
        props: ['value', 'truthy', 'falsy', 'disabled'],
        components: {},
        data() {
            return {
                val: null,

                lblActive: this.$i18n.t('lbl.active'),
                lblPassive: this.$i18n.t('lbl.passive'),
            }
        },
        created() {
            this.val = this.value;

            if(this.truthy === this.val)
                this.val = true;

            if(this.falsy === this.val)
                this.val = false;

        },
        mounted() {
        },
        methods: {
            onChange(){
                let returnVal = this.val;

                if(typeof this.truthy !== 'undefined' && this.val)
                    returnVal = this.truthy;


                if(typeof this.falsy !== 'undefined' && !this.val)
                    returnVal = this.falsy;


                this.$emit('input', returnVal);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .status-switch {
        position: relative;
        width: 100px;
        letter-spacing: 0;
        border-radius: 3px;

        &.disabled {
            opacity: .2;
        }

        input{
            display: none;
        }

        .switch-slider {
            position: absolute;
            cursor: pointer;
            height: 20px;
            width: 98px;
            line-height: 18px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #7c8f9c;
            -webkit-transition: .4s;
            transition: .4s;
        }

        input:not(:checked) + .switch-slider:before {
            position: absolute;
            display: block;
            content: attr(data-passive);
            width: 50px;
            height: 20px;
            font-size: 11px;
            line-height: 18px;
            font-weight: bold;
            color: #7c8f9c;
            text-align: center;
            background-color: #FFFFFF;
            border: solid 1px #7c8f9c;
            -webkit-transform: translateX(48px);
            -ms-transform: translateX(48px);
            transform: translateX(48px);
            -webkit-transition: .4s;
            transition: .4s;

        }

        input:checked + .switch-slider {
            background-color: #0092ff;
        }

        input:checked + .switch-slider:before {
            content: attr(data-active);
            display: block;
            width: 48px;
            height: 20px;
            font-size: 11px;
            border: solid 1px #0092ff;
            background-color: #FFFFFF;
            font-weight: bold;
            color: #0092ff;
            text-align: center;
            -webkit-transition: .4s;
            transition: .4s;
        }
    }
</style>
