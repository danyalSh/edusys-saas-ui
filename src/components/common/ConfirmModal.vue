<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel"
         :data-backdrop="options.loading ? 'static': null"
         :data-keyboard="options.loading">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="confirmModalLabel">
                        {{opt.title}}
                    </h4>
                </div>
                <div class="modal-body">
                    {{opt.body}} {{$t('text.are-you-sure')}}
                </div>
                <div class="modal-footer">
                    <button :disabled="options.loading"
                            type="button"
                            class="btn btn-default"
                            data-dismiss="modal">
                        {{ opt.lblCancel }}
                    </button>
                    <button @click="clickConfirm"
                            :disabled="options.loading"
                            type="button"
                            class="btn btn-danger ">
                         {{ opt.lblConfirm }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['options'],
        components: {},
        data() {
            return {
                opt: null,
            }
        },
        watch: {
            "options.show"(){
                if(this.options.show)
                    $(this.$el).modal('show');
                else
                    $(this.$el).modal('hide');

            },
        },
        created() {
            let defaultOptions = {
                loading: false,
                show: false,

                onClickConfirm: function(){},

                title: this.$i18n.t('lbl.confirm'),
                body: this.$i18n.t('text.confirm'),
                lblCancel: this.$i18n.t('lbl.cancel'),
                lblConfirm: this.$i18n.t('lbl.confirm'),
            };

            this.opt = { ...defaultOptions, ...this.options };
        },
        mounted() {

            $(this.$el).on("shown.bs.modal", () => {
                this.$emit('shown.bs.modal');
            });

            $(this.$el).on("hidden.bs.modal", () => {
                this.$emit('hidden.bs.modal');
                this.options.show = false;
            });
        },
        methods: {
            clickConfirm(){
                this.opt.onClickConfirm();
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
