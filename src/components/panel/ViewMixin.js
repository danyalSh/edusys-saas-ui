import store from 'src/services/store';

export default {
    mounted: function () {
        store.state.EventBus.$emit('$mountedView', this);
    },
    methods: {
    }
};