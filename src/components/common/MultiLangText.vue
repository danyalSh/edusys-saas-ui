<template>
    <div class="multi-lang-text">

        <div class="input-container">
            <textarea v-if="multiline"
                      v-model="value[lang]"
            ></textarea>
            <input v-else v-model="value[lang]"
                   type="text">
            <div class="tabs">
                <button v-for="code in appInfo.availableLanguages"
                        @click="changeLang(code)" :class="{ 'active': lang == code }" type="button">
                    {{code | upper}}
                </button>
            </div>
            <i class="info-tooltip fa fa-info-circle mt10"
               data-toggle="tooltip"
               data-placement="bottom"
               :title="$t('text.multilangtext-tooltip-desc')"></i>
        </div>


    </div>
</template>

<script>
    import store from 'src/services/store';

    export default {
        props: ['value', 'multiline'],
        components: {},
        data() {
            return {
                state: store.state,
                appInfo: store.state.appInfo,
                langCodes: [],
                lang: null,
            }
        },
        created() {
            this.lang = this.appInfo.defaultLanguage;
        },
        mounted() {
            $(this.$el).find('.info-tooltip').tooltip();
            this.langCodes = Object.keys(this.value);
        },
        methods: {
            changeLang(lang) {
                this.lang = lang;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .multi-lang-text {

        .input-container {
            position: relative;

            input, textarea {
                width: 100%;
            }

            textarea{
                outline: 0;
                border-radius: 3px;
                border: solid 1px #e4e9f0;
                background: #fff;
                height: 80px;
                padding-left: 10px;
            }

            .tabs {
                position: absolute;
                top: -22px;
                right: 0;

                button {
                    outline: 0;
                    border-radius: 3px 3px 0 0;
                    border: solid 1px #e4e9f0;
                    font-family: 'LatoWeb';
                    font-size: 13px;
                    font-weight: 500;
                    letter-spacing: 0.2px;
                    text-align: center;
                    background: white;
                    color: #e4e9f0;
                    margin: -10px 0 0 3px;

                    &.active {
                        background-color: #0092ff;
                        border: none;
                        color: #FFF;
                    }
                }
            }

            .info-tooltip {
                position: absolute;
                top: 3px;
                right: 10px;

            }
        }



    }
</style>
