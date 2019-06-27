import Data from './'

let BuildingModel = {
    "academicUnits": [],
    "campus": null,
    "departments": [],
    "description": {
    },
    "lat": 0,
    "lon": 0,
    "name": {
    },
    "slug": {
    },
    "code": null,
    "doorNumber": null,
    "contactInformation": [],
    "status": "a",
};

let BuildingService = {
    url: "buildings",

    getBuilding(id){
        return Data.get('building/' + id);
    },
    listBuildingItems(filter){
        return Data.get(this.url, filter);
    },
    insertBuildingItem(data){
        return Data.post(this.url, data)
    },
    updateBuildingItem(data, id){
        return Data.put(this.url + "/" +id, data)
    },
    updateStatusBuildingItem(id, status){
        return Data.put("building/" +id + "/status/" + status)
    },
    updateAcademicUnitsBuildingItem(id, academicUnits){
        return Data.put("building/" +id + "/academic-units", academicUnits);
    },
    updateCampusBuildingItem(id, campusId){
        return Data.put("building/" +id + "/campus/" + campusId);
    },

    updateContactInformation(id, data){
        return Data.put("building/" + id + "/contact-information", data);
    },

    deleteBuildingItem(id){
        return Data.delete(this.url + "/" + id)
    }


};

export {BuildingService, BuildingModel}