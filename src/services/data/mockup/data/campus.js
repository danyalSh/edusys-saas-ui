var assign =  Object.assign;

var campuses = [
    {
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
        "id": 1,
        "dateCreated": "11.05.2017 13:04:41",
        "dateUpdated": "23.05.2017 15:24:54",
        "status": "d",
        "rid": "#15:0",
        "academicUnits": [],
    },
    {
        "type": 2,
        "name": {
            "tr": "Maslak Yerleşkesi"
        },
        "contactInformation": [],
        "description": {
            "tr": "Maslak Yeleşkesi"
        },
        "lat": 29.0171922,
        "lon": 41.1141013,
        "geoPolygon": [],
        "id": 2,
        "dateCreated": "11.05.2017 13:05:21",
        "dateUpdated": "12.05.2017 21:51:45",
        "status": "a",
        "rid": "#16:0",
        "academicUnits": [],
    }
];


var campusTypes = [
    {
        "id": 1,
        "dateCreated": "2017-05-10T10:04:17+0300",
        "dateUpdated": "2017-05-10T00:00:00+0300",
        "status": "a",
        "name": {
            "en": "Private Campus",
            "tr": "Özel Yerleşke"
        },
        "slug": {
            "en": "private-campus",
            "tr": "ozel-yerleske"
        },
        "description": {
            "tr": "Kurumun kendisine ait özerk alanı olarak kurulmuş yerleşkelerdir. Sınırlarla çevrilidir. Örneğin, İTÜ Ayazağa kampüsü, Koç Üniversitesi kampüsü vb."
        }
    },
    {
        "id": 2,
        "dateCreated": "2017-05-10T10:05:47+0300",
        "dateUpdated": "2017-05-10T10:05:48+0300",
        "status": "a",
        "name": {
            "en": "City Campus",
            "tr": "Şehiriçi Yerleşke"
        },
        "slug": {
            "en": "city-campus",
            "tr": "sehirici-yerleske"
        },
        "description": {
            "tr": "Şehir içinde umumi kullanılan alanlarda bulunan üniversite yerleşkeleridir. Tek bir binadan oluşabilir. Örneğin, Bahçeşehir Üniversitesi Beşiktaş kampüsü, Nişantaşı Üniversitesi vb."
        }
    },
    {
        "id": 9,
        "dateCreated": "2017-05-10T10:06:43+0300",
        "dateUpdated": "2017-05-10T00:00:00+0300",
        "status": "a",
        "name": {
            "en": "Rural Campus",
            "tr": "Şehir Dışı Yerleşke"
        },
        "slug": {
            "en": "rural-campus",
            "tr": "sehir-disi-yerleske"
        },
        "description": {
            "tr": "Şehir dışında yer alan özel yerleşkeler gibi sınırlarla çevrili olmayan ancak onlar gibi büyük veya büyükçe bir yüzölçümünde yerleşmiş, kendi içinde kasaba havasında olan yerleşkelerdir. Örneğin: Virginia Polyechnic Institute"
        }
    }
];

var pagination = {
    "pageCount": 1,
    "recordCount": 200,
    "currentPage": 1
};

export default {
    'GET#campus/1': {
        "code": 200,
        "result": {
            "set": campuses[0],
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'GET#campuses': {
        "code": 200,
        "result": {
            "set": campuses,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'POST#campus': {
        "code": 200,
        "result": {
            "set": { id: 1 },
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'PUT#campus/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'DELETE#campus/1': {
        "code": 200,
        "result": {
            "set": true,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
    'GET#campus-types': {
        "code": 200,
        "result": {
            "set": campusTypes,
            "pagination": pagination
        },
        "message": "İşleminiz başarıyla tamamlanmıştır."
    },
};