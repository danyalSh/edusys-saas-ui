<template>
    <div class="dropdown">
        <span class="dropdown-toggle" data-toggle="dropdown">
            <slot name="selector"></slot>
        </span>
        <div class="dropdown-menu" :class="{ 'right': alignRight }">
            <slot name="body"></slot>

            <div v-if="confirm">
                <hr>
                <div class="pull-right">
                    <button @click="onCancel" class="reset-btn" :disabled="isDisabledButtons">
                        {{ dtOptions.lblCancel | upper }}
                    </button>
                    <button @click="onConfirm"
                            class="apply-btn" :disabled="isDisabledButtons">
                        {{ dtOptions.lblConfirm | upper }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*

     Using:

     <dropdown :close="true">
        <span slot="selector">TIKLA</span>
        <div slot="body">Lorem ipsum</div>
     </dropdown>

     */

    export default {
        props: ['confirm', 'close', 'alignRight', 'options'],
        components: {},
        data() {
            return {
                loading: false,
                isDisabledButtons: false,
                dtOptions: {
                    lblCancel: this.$i18n.t('lbl.cancel'),
                    lblConfirm: this.$i18n.t('lbl.confirm'),
                },
            }
        },
        created() {
            this.dtOptions = Object.assign({}, this.dtOptions, this.options);
        },
        mounted() {
            this.$dropdown = $(this.$el);
            this.$dropdownToggle = this.$dropdown.find('.dropdown-toggle');
            this.$dropdownMenu = this.$dropdown.find('.dropdown-menu');

            this.$dropdownToggle.dropdown();

            this.$dropdownMenu.on("click", e => {
                if (!this.close) {
                    e.stopPropagation()
                }
            });


            this.$dropdown.on('hide.bs.dropdown', () => {
                this.$emit('onHide', this);
            });
        },
        methods: {
            toggleDropdown() {
                this.$dropdownToggle.dropdown('toggle');
            },
            onCancel() {
                this.$emit('onCancel', this);
                this.toggleDropdown();
            },
            onConfirm() {
                this.$emit('onConfirm', this);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .dropdown {
        display: inline-block;

        .dropdown-menu {
            position: absolute;
            left: auto;
            padding: 10px;
            border-radius: 3px;
            box-shadow: 0 4px 8px 0 rgba(228, 233, 240, 0.7);
            border: solid 1px #e4e9f0;

            &.right {
                right: 0;
            }
        }

        .controls {
            margin-left: 15px;
            margin-right: 15px;
            font-size: 14px;
            letter-spacing: 0.2px;
            color: #345366;
        }
    }

</style>
