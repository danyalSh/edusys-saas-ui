import Data from './'

let InstitutionService = {
    url: "institution",

    uploadInstitutionLogo(data){
        return Data.post(this.url +  "/logo", data);
    },

    getInstitution(id){
        return Data.get(this.url + "/" + id);
    },

    updateInstitution(id, data){
        return Data.put("institution/" + id, data);
    },

    updateTaxInformation(id, data){
        return Data.put("institution/" + id + "/tax-information", data);
    },

    updateContactInformation(id, data){
        return Data.put("institution/" + id + "/contact-information", data);
    },

};

export {
    InstitutionService,
}