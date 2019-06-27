import store from 'src/services/store'
import config from 'src/config'
import {loading, redirectLogin} from 'src/helper'

function handleStatusCode(res) {
    switch (res.code) {
        case "598.0000":
            toastr.error(res.message);
            break;
        case 701:
        case 702:
        case 712:
        case 412:
            toastr.warning(res.message);
            break;
        case 401:
            toastr.error(res.message);
            redirectLogin();
            break;
        case 404:
        case 406:
        case 500:
        case 601:
        case 602:
        case 603:
        case 604:
        case 605:
        case 703:
        case 711:
        case 713:
            toastr.error(res.message);
    }
}
export const getResponsePromise = function (url, method, data, contentType) {

    return new Promise((resolve, reject) => {

        if (config.isMock) { // Is Mock Mode
            let mockup = require('../mockup').default;

            mockup(url, method, data).then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);
            });

        } else {

            if(!navigator.onLine) {

                let errorResponse = {
                    code: "598.0000",
                    message: store.state.i18n.t('lbl.no-internet-connection'),
                };

                handleStatusCode(errorResponse);
                reject(errorResponse);

                return;
            }

            // is GET, POST, PUT or DELETE
            var ajaxOptions = {
                type: method,
                url: config.apiRoot + "/" + url,
                data: JSON.stringify(data),
                contentType: contentType || "application/json;charset=utf-8",
                beforeSend: function (request) {
                    if(contentType !== 'multipart/form-data') {
                        request.setRequestHeader("Accept", 'application/json');
                        request.setRequestHeader("Content-Type", 'application/json');
                    }

                    request.setRequestHeader("Authorization", config.authorizationKey);
                    request.setRequestHeader("X-Session-Token", store.state.token);
                },
                success: (res, status, headers) => {

                    if(res) {
                        handleStatusCode(res);
                    }

                    resolve(res);
                },
                error: (res) => {
                    if(config.isDev)
                        console.error("Response Error", res.responseJSON);
                    if(res.responseJSON) {
                        handleStatusCode(res.responseJSON);
                    }
                    reject(res.responseJSON);
                },
            };

            if (method == 'GET') {
                ajaxOptions.data = data;
            }else if(contentType == 'multipart/form-data'){
                ajaxOptions.data = data;
                ajaxOptions.processData = false;
                ajaxOptions.cache = false;
                ajaxOptions.contentType = false;
            }

            store.pushXHR($.ajax(ajaxOptions));
        }

    });
};