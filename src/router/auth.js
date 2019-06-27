import store from 'src/services/store';
import {loading} from 'src/helper';
import locales from '../locales'

import {AppService} from 'src/services/data/app'

let lblRoute = locales[store.state.lang].routes.auth;

// *********************** Auth Components **************************

const AuthLayout = r => require.ensure([], () => {
    require('assets/scss/auth/_layout.scss');
    r(require('components/auth/_Layout'))
}, 'auth');

const AuthLoginHomeView = r => require.ensure([], () => {
    require('assets/scss/auth/login-home.scss');
    r(require('components/auth/LoginHome'))
}, 'auth');

const AuthLogin = r => require.ensure([], () => {
    require('assets/scss/auth/login.scss');
    r(require('components/auth/Login'))
}, 'auth');

const AuthPassResetView = r => require.ensure([], () => {
    require('assets/scss/auth/pass-reset.scss');
    r(require('components/auth/PassReset'));
}, 'auth');

const AuthPassResetStepTwoView = r => require.ensure([], () => {
    require('assets/scss/auth/pass-reset.scss');
    r(require('components/auth/PassResetStepTwo.vue'));
}, 'auth');


let routes = {
    path: '/',
    component: AuthLayout,
    beforeEnter: (to, from, next) => {
        
        let initData = store.state.auth.initData;

        if (!initData) {
            loading.show(store.state.i18n.t("text.loading-login-init"));

            AppService.getInit()
                .then(res => {
                    if (res.code == '200.0000') {
                        store.setLoginInitData(res.result.set);
                        loading.hide();
                        store.setTitle(lblRoute[to.name].title);


                        if(to.query.redirect) {
                            let query = {...to.query};
                            delete query.redirect;

                            next({name: to.query.redirect, query});
                        }
                        else
                            next();
                    }

                })
                .catch(err => {
                    loading.hide();
                })
        } else {
            next();
        }
    },
    children: [
        {
            name: "login-home",
            path: "/",
            component: AuthLoginHomeView
        },
        {
            name: 'login-student',
            path: lblRoute["login-student"].route,
            component: AuthLogin
        },
        {
            name: 'login-administration',
            path: lblRoute["login-administration"].route,
            component: AuthLogin
        },
        {
            name: 'login-alumni',
            path: lblRoute["login-alumni"].route,
            component: AuthLogin
        },
        {
            name: 'login-academician',
            path: lblRoute["login-academician"].route,
            component: AuthLogin
        },
        {
            name: "pass-reset-step-1",
            path: lblRoute["pass-reset-step-1"].route,
            component: AuthPassResetView
        },
        {
            name: "pass-reset-step-2",
            path: lblRoute["pass-reset-step-2"].route,
            component: AuthPassResetStepTwoView
        },

    ]
};


routes.children.map(child => {

   child.meta = {
       layout: "auth"
   };

});

export default routes;
