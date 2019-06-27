var assign = Object.assign;

var coursesIteration = {
  "id": 1,
  "dateCreated": "4353-12-03T16:56:17.088Z",
  "dateUpdated": "2918-02-19T19:34:41.232Z",
  "status": "i",
  "academicYear": "2017-2018",
  "code": "TDL1001-G1",
  "isPassFail": true,
  "name": {
    "tr": "Türk Dili ve Edebiyatı - I"
  },
  "description": {
    "tr": "Türk Dili ve Edebiyatı - I dersine ait G1 varyasyonudur."
  }
}

var coursesIterations =  [
  coursesIteration,
    assign({}, coursesIteration, {
        id: 2,
    }),
    assign({}, coursesIteration, {
        id: 3,
      }),
    assign({}, coursesIteration, {
        id: 4,
      }),
];

var pagination = {
    "pageCount": 1,
    "recordCount": 200,
    "currentPage": 1
};

export default {
    'GET#course-iteration/1': {
        "code": 200,
        "result": {
            "set": coursesIterations[0],
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'POST#course-iteration': {
        "code": 200,
        "result": {
            "set": { id: 1 },
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'DELETE#course-iteration/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course-iteration/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course-iteration/1/status/i': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course-iteration/1/schedule': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course-iteration/1/academic-year/2017-2018': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course-iteration/1/course/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course-iteration/1/lecturer': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#course-iteration/i/student-capacity/50': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'GET#course-iterations': {
        "code": 200,
        "result": {
            "set": coursesIterations,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
};
