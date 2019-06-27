var assign =  Object.assign;

let campus = {
    "type": 2,
    "name": {
        "tr": "Esentepe Yerleşkesi"
    },
    "contactInformation": [],
    "description": {
        "tr": "Esentepe Yerleşkesi"
    },
    "lat": 29.008978,
    "lon": 41.067913,
    "geoPolygon": [],
    "id": 0,
    "dateCreated": "11.05.2017 13:04:41",
    "dateUpdated": "23.05.2017 15:24:54",
    "status": "d",
    "rid": "#15:0"
};

let building =  {
    "academicUnits": [],
    "campus": campus,
    "departments": [],
    "description": {
        "tr": "Esentepe Binasıdır."
    },
    "lat": 41.060069,
    "lon": 28.988111,
    "name": {
        "tr": "Esentepe Binası",
        "en": "Esentepe Building"
    },
    "slug": {
        "tr": "esentepe-binasi",
        "en": "esentepe-building"
    },
    "code": "ESENTEPE1",
    "doorNumber": "NO100",
    "contactInformation": [
        {
            "emails": [
                "burhan.iscan@bartin.edu.tr"
            ],
            "addresses": [
                {
                    "country": {
                        "visibility": "d",
                        "name": {
                            "en": "Turkiye",
                            "tr": "Türkiye"
                        },
                        "id": 6348726,
                        "status": "d"
                    },
                    "city": {
                        "country": 157,
                        "visibility": "d",
                        "name": {
                            "en": "Izmır",
                            "tr": "İzmir"
                        },
                        "state": 496,
                        "plateNumber": "35",
                        "status": "i"
                    },
                    "street": "İnönü Caddesi N.123",
                    "district": {
                        "country": 338,
                        "visibility": "d",
                        "city": 52,
                        "name": {
                            "en": "Konak",
                            "tr": "Konak"
                        },
                        "state": 561,
                        "militaryCode": "",
                        "status": "i"
                    },
                    "title": "ev"
                }
            ],
            "title": {
                "en": "Home",
                "tr": "Ev"
            },
            "type": "s",
            "phoneNumbers": [
                {
                    "number": "9610230",
                    "areaCode": "312",
                    "countryCode": "90"
                },
                {
                    "number": "8290309",
                    "areaCode": "535",
                    "extension": "833",
                    "countryCode": "90"
                },
                {
                    "number": "5321227",
                    "areaCode": "312",
                    "countryCode": "1"
                },
                {
                    "number": "8395812",
                    "areaCode": "535",
                    "extension": "574",
                    "countryCode": "1"
                }
            ]
        }
    ],
    "id": 1,
    "dateCreated": "01.07.2017 00:00:00",
    "dateUpdated": "31.07.2017 15:47:35",
    "status": "a",
    "rid": "#29:0"
};

var buildings = [
    building,
    assign({}, building, {
        id: 2,
        campus: assign({}, campus, {id: 2})
    }),
    assign({}, building, {
        id: 3,
        campus: assign({}, campus, {id: 3})
    }),
    assign({}, building, {
        id: 4,
        campus: assign({}, campus, {id: 4})
    }),
];

var pagination = {
    "pageCount": 1,
    "recordCount": 200,
    "currentPage": 1
};

export default {
    'GET#building/1': {
        "code": 200,
        "result": {
            "set": building,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'GET#buildings': {
        "code": 200,
        "result": {
            "set": buildings,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
};