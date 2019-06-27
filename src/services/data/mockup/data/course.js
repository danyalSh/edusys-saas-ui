var assign = Object.assign;

var courses = [
    {
        "id": 1,
        "code": "TDL1001",
        "description": {
          "tr": "Türk Dili ve Edebiyatı Dersi",
          "en": "Turkish Language Lesson"
        },
        "name": {
          "tr": "Türk Dili ve Edebiyatı - I",
          "en": "Turkish Language - I"
        },
        "isPassFail": true,
        "defaultCreditInfo": {
            "credit": "10",
            "theory": "10",
            "practice": "10",
            "ects": "10"
        }
    },
    {
        "id": 2,
        "code": "IDL2001",
        "description": {
          "tr": "İngiliz Dili ve Edebiyatı Dersi",
          "en": "English Language Lesson"
        },
        "name": {
          "tr": "İngiliz Dili ve Edebiyatı - I",
          "en": "English Language - I"
        },
        "isPassFail": true,
        "defaultCreditInfo": {
            "credit": "10",
            "theory": "10",
            "practice": "10",
            "ects": "10"
        }
    },
    {
        "id": 3,
        "code": "ADL3001",
        "description": {
          "tr": "Alman Dili ve Edebiyatı Dersi",
          "en": "German Language Lesson"
        },
        "name": {
          "tr": "Alman Dili ve Edebiyatı - I",
          "en": "German Language - I"
        },
        "isPassFail": true,
        "defaultCreditInfo": {
            "credit": "10",
            "theory": "10",
            "practice": "10",
            "ects": "10"
        }
    },
    {
        "id": 4,
        "code": "FDL4001",
        "description": {
          "tr": "Fransız Dili ve Edebiyatı Dersi",
          "en": "French Language Lesson"
        },
        "name": {
          "tr": "Fransız Dili ve Edebiyatı - I",
          "en": "French Language - I"
        },
        "isPassFail": true,
        "defaultCreditInfo": {
            "credit": "10",
            "theory": "10",
            "practice": "10",
            "ects": "10"
        }
    }
];

var pagination = {
    "pageCount": 1,
    "recordCount": 200,
    "currentPage": 1
};

export default {
    'GET#course/1': {
        "code": 200,
        "result": {
            "set": courses[0],
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'GET#courses': {
        "code": 200,
        "result": {
            "set": courses,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'POST#course': {
        "code": 200,
        "result": {
            "set": { id: 1 },
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'DELETE#course/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
};
