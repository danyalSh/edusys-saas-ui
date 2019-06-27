import Data from './'

let RoomModel = {
    "name": {},
    "examCapacity": null,
    "seatingCapacity": null,
    "roomNr": null,
    "description": {},
    "type": null,
    "roomNr": null,
    "building": {},
    "campus": {},
    "features": {
        "boardType": null,
        "soundSystem": null,
        "hasProjector": false,
        "hasAc": false,
        "hasWindow": false
    }
}

let RoomService = {
    getRooms(filter) {
        return Data.get('rooms', filter);
    },
    getRoom(id) {
        return Data.get('room/' +id);
    },
    insertRoom(data) {
        return Data.post('room', data)
    },
    updateRoom(data, id) {
        return Data.put("room/" + id, data)
    },
    deleteRoom(id) {
        return Data.delete('room/' + id)
    },
    updateBuildingOfRoom(id, buildingId) {
        return Data.put("room/" + id + '/building/' + buildingId)
    },
    getRoomTypes(filter) {
        return Data.get("room-types", filter)
    },
}

export {RoomModel, RoomService}