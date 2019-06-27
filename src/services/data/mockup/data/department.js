var assign =  Object.assign;

var departments = [
    {
        "academicUnit": {
            "code": "10",
            "dean": "#23:18",
            "deanTitle": null,
            "description": null,
            "name": {
                "tr": "Meslek Yüksek Okulu"
            },
            "slug": {
                "tr": "meslek-yuksek-okulu"
            },
            "type": "p",
            "url": null,
            "id": 1494843500489,
            "dateCreated": "15.05.2017 16:18:20",
            "dateUpdated": "15.05.2017 16:18:20",
            "status": "a",
            "rid": "#25:0"
        },
        "code": "1001",
        "dean": null,
        "description": {},
        "name": {
            "tr": "Bankacılık ve Sigortacılık"
        },
        "slug": {
            "tr": "bankacilik-ve-sigortacilik"
        },
        "url": null,
        "id": 1,
        "dateCreated": "16.05.2017 03:25:56",
        "dateUpdated": "16.05.2017 03:25:56",
        "status": "a",
        "rid": "#31:0"
    },
    {
        "academicUnit": {
            "code": "10",
            "dean": "#23:18",
            "deanTitle": null,
            "description": null,
            "name": {
                "tr": "Meslek Yüksek Okulu"
            },
            "slug": {
                "tr": "meslek-yuksek-okulu"
            },
            "type": "p",
            "url": null,
            "id": 1494843500489,
            "dateCreated": "15.05.2017 16:18:20",
            "dateUpdated": "15.05.2017 16:18:20",
            "status": "a",
            "rid": "#25:0"
        },
        "code": "1040",
        "dean": null,
        "description": null,
        "name": {
            "tr": "Uygulamalı İngilizce ve Çevirmenlik"
        },
        "slug": {
            "tr": "uygulamali-ingilizce-ve-cevirmenlik"
        },
        "url": null,
        "id": 1494883556418,
        "dateCreated": "16.05.2017 03:25:56",
        "dateUpdated": "16.05.2017 03:25:56",
        "status": "a",
        "rid": "#31:1"
    },
    {
        "academicUnit": {
            "code": "10",
            "dean": "#23:18",
            "deanTitle": null,
            "description": null,
            "name": {
                "tr": "Meslek Yüksek Okulu"
            },
            "slug": {
                "tr": "meslek-yuksek-okulu"
            },
            "type": "p",
            "url": null,
            "id": 1494843500489,
            "dateCreated": "15.05.2017 16:18:20",
            "dateUpdated": "15.05.2017 16:18:20",
            "status": "a",
            "rid": "#25:0"
        },
        "code": "1036",
        "dean": null,
        "description": null,
        "name": {
            "tr": "Radyo ve Televizyon Programcılığı"
        },
        "slug": {
            "tr": "radyo-ve-televizyon-programciligi"
        },
        "url": null,
        "id": 1494883556388,
        "dateCreated": "16.05.2017 03:25:56",
        "dateUpdated": "16.05.2017 03:25:56",
        "status": "a",
        "rid": "#31:2"
    },
    {
        "academicUnit": {
            "code": "10",
            "dean": "#23:18",
            "deanTitle": null,
            "description": null,
            "name": {
                "tr": "Meslek Yüksek Okulu"
            },
            "slug": {
                "tr": "meslek-yuksek-okulu"
            },
            "type": "p",
            "url": null,
            "id": 1494843500489,
            "dateCreated": "15.05.2017 16:18:20",
            "dateUpdated": "15.05.2017 16:18:20",
            "status": "a",
            "rid": "#25:0"
        },
        "code": "1032",
        "dean": null,
        "description": null,
        "name": {
            "tr": "Alternatif Enerji Kaynakları Teknolojisi "
        },
        "slug": {
            "tr": "alternatif-enerji-kaynaklari-teknolojisi-"
        },
        "url": null,
        "id": 1494883556348,
        "dateCreated": "16.05.2017 03:25:56",
        "dateUpdated": "16.05.2017 03:25:56",
        "status": "a",
        "rid": "#31:3"
    },
    {
        "academicUnit": {
            "code": "10",
            "dean": "#23:18",
            "deanTitle": null,
            "description": null,
            "name": {
                "tr": "Meslek Yüksek Okulu"
            },
            "slug": {
                "tr": "meslek-yuksek-okulu"
            },
            "type": "p",
            "url": null,
            "id": 1494843500489,
            "dateCreated": "15.05.2017 16:18:20",
            "dateUpdated": "15.05.2017 16:18:20",
            "status": "a",
            "rid": "#25:0"
        },
        "code": "1028",
        "dean": null,
        "description": null,
        "name": {
            "tr": "İlk ve Acil Yardım (İÖ)"
        },
        "slug": {
            "tr": "ilk-ve-acil-yardim-io"
        },
        "url": null,
        "id": 1494883556314,
        "dateCreated": "16.05.2017 03:25:56",
        "dateUpdated": "16.05.2017 03:25:56",
        "status": "a",
        "rid": "#31:4"
    },
    {
        "academicUnit": {
            "code": "10",
            "dean": "#23:18",
            "deanTitle": null,
            "description": null,
            "name": {
                "tr": "Meslek Yüksek Okulu"
            },
            "slug": {
                "tr": "meslek-yuksek-okulu"
            },
            "type": "p",
            "url": null,
            "id": 1494843500489,
            "dateCreated": "15.05.2017 16:18:20",
            "dateUpdated": "15.05.2017 16:18:20",
            "status": "a",
            "rid": "#25:0"
        },
        "code": "1024",
        "dean": null,
        "description": null,
        "name": {
            "tr": "Fizyoterapi"
        },
        "slug": {
            "tr": "fizyoterapi"
        },
        "url": null,
        "id": 1494883556290,
        "dateCreated": "16.05.2017 03:25:56",
        "dateUpdated": "16.05.2017 03:25:56",
        "status": "a",
        "rid": "#31:5"
    },
];


var pagination = {
    "pageCount": 1,
    "recordCount": 200,
    "currentPage": 1
};

export default {
    'GET#department/1': {
        "code": 200,
        "result": {
            "set": departments[0],
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'GET#departments': {
        "code": 200,
        "result": {
            "set": departments,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'POST#department': {
        "code": 200,
        "result": {
            "set": { id: 1 },
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#department/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'DELETE#department/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
};