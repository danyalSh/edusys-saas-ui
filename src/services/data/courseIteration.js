import Data from './'

let CourseIterationModel = {
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

let CourseIterationService = {
    url: "course-iterations",

    getCourseIteration(id) {
        return Data.get('course-iteration/' + id);
    },
    insertCourseIteration(data) {
        return Data.post('course-iteration/', data);
    },
    deleteCourseIteration(id) {
        return Data.delete("course-iteration/" + id);
    },
    updateCourseIteration(data, id) {
        return Data.put("course-iteration/" + id, data);
    },
    updateStatusCourseIteration(id, status) {
        return Data.put("course-iteration/" + id + "/status/" + status);
    },
    updateScheduleStatusCourseIteration(id) {
        return Data.put("course-iteration/" + id + "/schedule/");
    },
    updateAcademicYearCourseIteration(id, academicYear) {
        return Data.put("course-iteration/" + id + "/academic-year/" + academicYear);
    },
    updateCourseDataCourseIteration(id, courseId) {
        return Data.put("course-iteration/" + id + "/course/" + courseId);
    },
    updateLecturerCourseIteration(id) {
        return Data.put("course-iteration/" + id + "/lecturer/");
    },
    updateStudentCapacityCourseIteration(id, studentCapacity) {
        return Data.put("course-iteration/" + id + "/student-capacity/" + studentCapacity);
    },
    listCourseIterations(filter){
        return Data.get(this.url, filter);
    }
}

export { CourseIterationModel, CourseIterationService }