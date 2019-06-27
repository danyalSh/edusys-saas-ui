import Data from './'

let DepartmentModel =  {
    "academicUnits": {},
    "code": null,
    "dateCreated": "2016-07-20T07:29:15.554Z",
    "dateUpdated": "2016-07-20T07:29:15.554Z",
    "status": "a",
    "name": {},
    "slug": {},
    "description": {},
    "dean": {},
    "url": null
};

let DepartmentService = {

    getDepartment(id) {
        return Data.get('department/' + id);
    },
    listDepartments(filter) {
        return Data.get('departments', filter);
    },
    insertDepartment(data) {
        return Data.post('department', data)
    },
    updateDepartment(data, id) {
        return Data.put("department/" + id, data)
    },
    deleteDepartment(id) {
        return Data.delete('department/' + id)
    },
    updateStatusDepartment(id, status) {
        return Data.put("department/" + id + "/status/" + status)
    },
    updateAcademicUnitDepartment(id, academicUnitId) {
        return Data.put("department/" + id + "/academic-unit/" + academicUnitId);
    },
    updateContactInformation(id, data) {
        return Data.put("campus/" + id + "/contact-information", data);
    },
};

export {DepartmentService, DepartmentModel}