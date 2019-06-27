var assign = Object.assign;

let institutions = [
    {
        "id": 1,
        "title": {
            "tr": "Aydın Üniversitesi",
            "en": "Aydin University"
        },
        "contactInformation": [
            {
                "title": {
                    "tr": "Ev",
                    "en": "Home",
                },
                "type": "s",
                "phoneNumbers": [
                    {
                        "countryCode": "90",
                        "areaCode": "312",
                        "number": "9610230"
                    },
                    {
                        "countryCode": "90",
                        "areaCode": "535",
                        "number": "8290309",
                        "extension": "833"
                    },
                    {
                        "countryCode": "1",
                        "areaCode": "312",
                        "number": "5321227"
                    },
                    {
                        "countryCode": "1",
                        "areaCode": "535",
                        "number": "8395812",
                        "extension": "574"
                    }
                ],
                "emails": [
                    "burhan.iscan@bartin.edu.tr"
                ],
                "addresses": [
                    {
                        "title": {
                            "tr": "Ev",
                            "en": "Home",
                        },
                        "street": "İnönü Caddesi N.123",
                        "zip": "37365",
                        "neighborhood": {
                            id: 525,
                            "name": {
                                "tr": "Emniyet",
                                "en": "Emniyet"
                            },
                            "status": "i",
                            "visibility": "d",
                            "country": 423,
                            "district": 25,
                            "city": 232,
                            "militaryCode": ""
                        },
                        "district": {
                            id: 25,
                            "name": {
                                "tr": "4.Levent",
                                "en": "Levent"
                            },
                            "status": "i",
                            "visibility": "d",
                            "country": 423,
                            "city": 232,
                            "militaryCode": ""
                        },
                        "city": {
                            id: 232,
                            "name": {
                                "tr": "İstanbul",
                                "en": "İstanbul"
                            },
                            "status": "i",
                            "visibility": "d",
                            "country": 423,
                            "plateNumber": "35"
                        },
                        "country": {
                            "name": {
                                "tr": "Türkiye",
                                "en": "Turkiye"
                            },
                            "status": "d",
                            "visibility": "d",
                            "id": 423
                        },
                        "state": {
                            "name": {

                            },
                            "status": "i",
                            "visibility": "d",
                            "country": 157,
                            "state": 496,
                            "plateNumber": "35"
                        }
                    }
                ]
            }
        ],
        "taxInformation": {
            "vatNumber": "1025765452",
            "vatOffice": "Beyoğlu",
            "vatTitle": "Avusturya Liseliler Eğitim Vakfı Ticari İşletmesi"
        },
        "status": "a",
        "settings": {
            "copyrightMessage": {
                "en": "All rights reserved",
                "tr": "Her hakkı saklıdır"
            },
            "defaultLanguage": "tr",
            "schoolIdPrefix": "",
            "availableLanguages": [],
            "schoolIdPostfix": "",
            "activeModules": []
        },
    }
];

var addresses = [
    {
        "id": 1,
        "title": {
            tr: "İTÜ kampüsü",
            en: "İTÜ kampüsü",
        },
        "street": "Itri Sokak N.24",
        "zip": "cupi",
        "neighborhood": {
            "name": {
                "tr": "4.Levent",
                "en": "4.Levent"
            },
            "status": "d",
            "visibility": "a",
            "country": 263,
            "state": 391,
            "city": 356,
            "district": 37237
        },
        "district": {
            "name": {
                "tr": "Kağıthane",
                "en": "Kagithane"
            },
            "status": "d",
            "visibility": "a",
            "country": 373,
            "state": 277,
            "city": 393,
            "militaryCode": "ve"
        },
        "city": {
            "name": {
                "tr": "İstanbul",
                "en": "Istanbul"
            },
            "status": "d",
            "visibility": "l",
            "country": 126,
            "state": 485,
            "plateNumber": ""
        },
        "state": {
            "name": {
                "tr": "Vircinya",
                "en": "Virginia"
            },
            "status": "i",
            "visibility": "d",
            "country": 789
        },
        "country": {
            "name": {
                "tr": "Türkiye",
                "en": "Turkiye"
            },
            "status": "d",
            "visibility": "l"
        }
    },
    {
        "id": 2,
        "title": {
            tr: "İTÜ kampüsü",
            en: "İTÜ kampüsü",

        },
        "street": "Test Sokak N.24",
        "zip": "cupi",
        "neighborhood": {
            "name": {
                "tr": "Maslak",
                "en": "Maslak"
            },
            "status": "d",
            "visibility": "a",
            "country": 263,
            "state": 391,
            "city": 356,
            "district": 37237
        },
        "district": {
            "name": {
                "tr": "Beşiktaş",
                "en": "Besiktas"
            },
            "status": "d",
            "visibility": "a",
            "country": 373,
            "state": 277,
            "city": 393,
            "militaryCode": "ve"
        },
        "city": {
            "name": {
                "tr": "İstanbul",
                "en": "Istanbul"
            },
            "status": "d",
            "visibility": "l",
            "country": 126,
            "state": 485,
            "plateNumber": ""
        },
        "state": {
            "name": {
                "tr": "Türkiye",
                "en": "Turkey"
            },
            "status": "i",
            "visibility": "d",
            "country": 789
        },
        "country": {
            "name": {
                "tr": "Türkiye",
                "en": "Turkiye"
            },
            "status": "d",
            "visibility": "l"
        }
    },
    {
        "id": 3,
        "title": {
            tr: "İTÜ kampüsü",
            en:"İTÜ kampüsü"
        },
        "street": "Test Sokak N.24",
        "zip": "cupi",
        "neighborhood": {
            "name": {
                "tr": "Maslak",
                "en": "Maslak"
            },
            "status": "d",
            "visibility": "a",
            "country": 263,
            "state": 391,
            "city": 356,
            "district": 37237
        },
        "district": {
            "name": {
                "tr": "Beşiktaş",
                "en": "Besiktas"
            },
            "status": "d",
            "visibility": "a",
            "country": 373,
            "state": 277,
            "city": 393,
            "militaryCode": "ve"
        },
        "city": {
            "name": {
                "tr": "İstanbul",
                "en": "Istanbul"
            },
            "status": "d",
            "visibility": "l",
            "country": 126,
            "state": 485,
            "plateNumber": ""
        },
        "state": {
            "name": {
                "tr": "Türkiye",
                "en": "Turkey"
            },
            "status": "i",
            "visibility": "d",
            "country": 789
        },
        "country": {
            "name": {
                "tr": "Türkiye",
                "en": "Turkiye"
            },
            "status": "d",
            "visibility": "l"
        }
    },
];

var pagination = {
    "pageCount": 1,
    "recordCount": 200,
    "currentPage": 1
};

export default {
    'GET#institution/1': {
        "code": '200.0000',
        "result": {
            "set": institutions[0]
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#institution/1': {
        "code": "200.0000",
        "result": {
            "set": institutions[0]
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#institution/1/tax-information': {
        "code": "200.0000",
        "result": {
            "set": true
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#institution/1/contact-information': {
        "code": "200.0000",
        "result": {
            "set": true
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
};