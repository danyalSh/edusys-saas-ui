import Vue from 'vue';
import config from 'src/config';

const state = {
    loading: false,
    config: {
        ...config
    },
    auth: {
        initData: null
    },
    appInfo: {},
    countries: [],

    token: localStorage.token,
    lang: localStorage.lang || 'tr',

    page: {},
    isOpenSidebar: true,

    EventBus: new Vue(),
    xhrs: []
};

const store = {
    debug: config.isDev,
    state,
    setTitle(title){
        document.title =  title + " - " + store.state.config.siteName;
    },
    setToken(token) {
        if (token) {
            state.token = localStorage.token = token;
        } else {
            state.token = null;
            delete localStorage.token;
        }
    },
    setAppInfo(data) {
        state.appInfo = data;
    },
    setLoginInitData(data) {
        state.auth.initData = data;
    },
    setLang(lang, $i18n, $validator, forceUpdate) {
        if(localStorage.lang && !forceUpdate) {
            state.lang = localStorage.lang;
        }else {
            state.lang = localStorage.lang = lang;
        }

        if($i18n)
            $i18n.locale = lang;

        if($validator)
            $validator.setLocale(lang);
    },
    clearXHRs() {
        state.xhrs = [];
    },
    pushXHR(xhr) {
        state.xhrs.push(xhr);
    },
};

export default store;