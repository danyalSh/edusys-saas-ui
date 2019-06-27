import Vue from 'vue'
import store from 'src/services/store'

import {getResponsePromise} from './util'


function get(url, filter) {
    return getResponsePromise(url, 'GET', filter);
}

function post(url,  data) {
    return getResponsePromise(url, 'POST', data);
}

function put(url, data) {
    return getResponsePromise(url, 'PUT', data);
}

function patch(url, data) {
    return getResponsePromise(url, 'PATCH', data);
}

function del(url, data) {
    return getResponsePromise(url, 'DELETE', data);
}


export default {
    get: get,
    post: post,
    put: put,
    patch: patch,
    "delete": del
};
