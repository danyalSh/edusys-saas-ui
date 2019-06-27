import mockupData from './data';

function mockup(url, method, data) {
    data = JSON.stringify(data);
    console.info("Request:", url, "| Method: " + method, '| Data:', data ? data : '-');

    var defaultResponse = {
        "code": 200,
        "message": "Default Response Message",
        "result": {}
    };

    return new Promise(function (resolve, reject) {
        setTimeout(function () {

            var routeResponse = mockupData[method+'#'+url];

            if(typeof routeResponse == 'undefined') {
                routeResponse = defaultResponse;
                console.log("Not found mock object:" , "'"+method + '#' + url+ "', used Default Response");
            }

            resolve(routeResponse);

        }, 100);
    })
}

export default mockup;
