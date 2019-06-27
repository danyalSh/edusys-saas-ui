import Vue from 'vue'

import VeeValidate from 'vee-validate';
import validatorTrLocale from 'src/assets/js/validator-locales-tr';

import VueI18n from 'vue-i18n'

import store from 'src/services/store';

import Router from 'src/router/'
import locales from './locales'
import App from './App.vue'

import './assets/scss/main.scss';

Vue.use(VueI18n);

// VeeValidate
Vue.use(VeeValidate, {
    locale: store.state.lang,
    strict: false,
    dictionary: {
        tr: {
            messages: validatorTrLocale
        }
    }
});

// Set VueI18n to Store
store.state.i18n = new VueI18n({
    locale: store.state.lang,
    messages: locales,
});

moment.locale(store.state.lang);

// Set Router to Store
store.state.router = Router.instance;

new Vue({
    router: store.state.router,
    i18n: store.state.i18n,
    render: h => h(App),
}).$mount('#app');



Router.init();

