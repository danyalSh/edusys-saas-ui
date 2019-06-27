<template>
    <div>
        <contact-information :data="data.contactInformation"
                             :id="contactInfo.id"
                             :update-service="contactInfo.updateContactInformationService">
        </contact-information>
    </div>
</template>

<script>

    import Vue from 'vue'
    import store from 'src/services/store';
    import {InstitutionService} from 'src/services/data/institution'

    import ContactInformation from 'src/components/panel/_partials/ContactInformation';

    export default {
        props: ['data'],
        components: {
            ContactInformation,
        },
        data () {
            return {
                state: store.state,
                appInfo: store.state.appInfo,

                contactInfo: {
                    id: store.state.appInfo.institution,
                    updateContactInformationService: InstitutionService.updateContactInformation,
                }


            }
        },
        computed:{

        },
        created(){

        },
        mounted(){

        },
        methods: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
