import Data from './'

let CampusModel = {
    "name": {},
    "contactInformation": [],
    "description": {},
    "lat": 0,
    "lon": 0,
    "geoPolygon": [],
    "academicUnits": [],
    "type": null
};

let CampusService = {
    url: "campuses",

    getCampus(id) {
        return Data.get('campus/' + id);
    },
    listCampusItems(filter) {
        return Data.get(this.url, filter);
    },
    insertCampusItem(data) {
        return Data.post('campus', data)
    },
    updateCampusItem(data, id) {
        return Data.put("campus/" + id, data)
    },
    deleteCampusItem(id) {
        return Data.delete('campus/' + id)
    },
    getCampusTypes(filter) {
        return Data.get("campus-types", filter)
    },
    updateStatusCampusItem(id, status) {
        return Data.put("campus/" + id + "/status/" + status)
    },
    updateAcademicUnitsCampusItem(id, academicUnits) {
        return Data.put("campus/" + id + "/academic-units", academicUnits);
    },
    updateTypeCampusItem(id, typeId) {
        return Data.put("campus/" + id + "/type/" + typeId);
    },
    updateContactInformation(id, data) {
        return Data.put("campus/" + id + "/contact-information", data);
    },


};

export { CampusService, CampusModel }