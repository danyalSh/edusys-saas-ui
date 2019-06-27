import Data from './'

let AcademicUnitModel =  {
    "status": "a",
    "name": {},
    "slug": {},
    "description": {},
    "code": null,
    "url": null,
    "type": null,
    "dean": {
        "name": {},
        "contactInformation": [],
        "description": null,
        "defaultAccessMap": {},
        "institutions": [],
        "lastLoggedInInstitution": 0,
        "lastLoginTime": null,
        "sessionCount": 0,
        "lastUsedIp": null,
        "lastUserAgent": null,
        "username": null,
        "ssn": null,
        "createdBy": null,
        "creator": null,
        "createdAt": null,
        "accountTypes": [],
        "gender": null,
        "dateCreated": null,
        "dateUpdated": null,
        "status": "a",
        "institutionId": null,
        "schooldId": null,
        "photo": null,
        "types": [],
        "schoolEmails": []
    },
};

let AcademicProgrammeModel =  {
    "code": null,
    "coordinator": null,
    "department": null,
    "description": {},
    "language": null,
    "name": {},
    "settings": {
        "diplomaType": null,
        "diplomaTitle": {},
        "isThesisRequired": null,
        "isInternshipRequired": false,
        "internshipDuration": null,
        "creditRequirement": null,
        "educationType": null,
        "duration": null,
    },
   "yokSettings": {
       "pointType": null,
       "osymChoiceCode": {},
       "yoksisCode": {},
       "yokApprovalDate": {},
       "yokApprovalNumber": {},
       "yokOpenDate": {},
       "yokApprovalName": {},
       "description": {}
   },
    "url": null,
    "yokcoordinatorings": null,
    "status": "a",
};


let AcademicService = {


    // Academic Unit **************************************************

    getAcademicUnit(id) {
        return Data.get('academic-unit/' + id);
    },
    listAcademicUnits(filter){
        return Data.get('academic-units', filter);
    },
    insertAcademicUnit(data) {
        return Data.post('academic-unit', data)
    },
    updateAcademicUnit(data, id) {
        return Data.put("academic-unit/" + id, data)
    },
    deleteAcademicUnit(id) {
        return Data.delete('academic-unit/' + id)
    },

    updateStatusAcademicUnit(id, status) {
        return Data.put("academic-unit/" + id + "/status/" + status)
    },

    updateDeanAcademicUnit(id, deanId) {
        return Data.put("academic-unit/" + id + "/dean/" + deanId)
    },

    updateTypeAcademicUnit(id, type) {
        return Data.put("academic-unit/" + id + "/type/" + type)
    },

    // Academic Program **************************************************

    getAcademicProgramme(id) {
        return Data.get('academic-programme/' + id);
    },
    listAcademicProgrammes(filter){
        return Data.get('academic-programmes', filter);
    },
    insertAcademicProgramme(data) {
        return Data.post('academic-programme', data)
    },
    updateAcademicProgramme(data, id) {
        return Data.put("academic-programme/" + id, data)
    },
    deleteAcademicProgramme(id) {
        return Data.delete('academic-programme/' + id)
    },

    updateStatusAcademicProgramme(id, status) {
        return Data.put("academic-programme/" + id + "/status/" + status)
    },

    updateDepartmentAcademicProgramme(id, departmentId) {
        return Data.put("academic-programme/" + id + "/department/" + departmentId)
    },

    // Academic Calendar Settings **************************************************

    getAcademicCalendarSettings(academicYear){
        return Data.get("academic/calendar/settings?year=" + academicYear);
    },

    updateAcademicCalendarSettings(data, academicYear, term){
        return Data.put("academic/calendar/settings/" + academicYear + "/" + term, data);
    },


};

export {
    AcademicService,
    AcademicUnitModel,
    AcademicProgrammeModel
}