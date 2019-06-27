import Data from './'

let AddressModel = {
    "title": {},
    "street": null,
    "neighborhood": null,
    "district": null,
    "state": null,
    "city": null,
    "country": null
}

let AppService = {
    getInit(){
        return Data.get("init/saas-web");
    },

    getCountries(){
        return Data.get("countries");
    },

    getStates(country){
        return Data.get("states?country=" + country);
    },

    getCities(state, country){
        let data = {
            id: null,
            type: null,
        };

        if(state !== null) {
            data.id = state;
            data.type = 'state';
        }else {
            data.id = country;
            data.type = "country";
        }

        return Data.get("cities?" + data.type + "=" + data.id);
    },

    getDistricts(city){
        return Data.get("districts?city=" + city);
    },

    getNeighborhoods(district){
        return Data.get("neighborhoods?district=" + district);
    },

    getLanguages(){
        return Data.get("languages");
    },

    uploadFile(){
        return Data.post("upload");
    },


};

export {AppService, AddressModel}