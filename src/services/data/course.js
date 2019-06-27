import Data from './'

let CourseModel = {
    "code": null,
    "name": {},
    "description": {},
    "status": null,
    "defaultCreditInfo": {
        "credit": null,
        "theory": null,
        "practice": null,
        "ects": null
    },
    "isPassFail": null
}

let CourseService = {
    url: "courses",

    getCourse(id) {
        return Data.get('course/' + id);
    },
    listCourseItems(filter) {
        return Data.get(this.url, filter);
    },
    insertCourseItem(data) {
        return Data.post('course', data);
    },
    updateCourseItem(data, id) {
        return Data.put("course/" + id, data);
    },
    deleteCourseItem(id) {
        return Data.delete("course/" + id);
    },
    updateStatusCourseItem(id, status) {
        return Data.put("course/" + id + "/status/" + status)
    },
}

export { CourseModel, CourseService }