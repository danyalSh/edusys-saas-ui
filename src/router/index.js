import Vue from 'vue';
import VueRouter from 'vue-router';

import store from 'src/services/store';

import {AppService} from 'src/services/data/app';
import {isDev} from 'src/config';
import {loading} from 'src/helper';

import locales from '../locales'

import AuthRoutes from 'src/router/auth';
import PanelRoutes from 'src/router/panel';

let lblRoute = locales[store.state.lang].routes;

Vue.use(VueRouter);


// Common Components
const ErrorView = require('components/Error');

let routerOptions = {
    mode: window.history && window.history.pushState ? 'history' : undefined,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes: [
        AuthRoutes,
        PanelRoutes,
        {
            path: "*",
            component: ErrorView
        },

    ]
};

export default {

    instance: new VueRouter(routerOptions),
    init() {
        this.instance.beforeEach((to, from, next) => {
            // store.state.xhrs.map(function (req) {
            //     req.abort()
            // });

            store.clearXHRs();

            store.setTitle(lblRoute[to.meta.layout][to.name].title);

            next();

        })

    }

}