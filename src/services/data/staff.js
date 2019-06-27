import Data from './'

let StaffModel = {
    "dateCreated": null,
    "dateUpdated": null,
    "status": "v",
    "schooldId": null,
    "photo": null,
    "groups": [],
    "schoolEmails": [],
    "account": {
      "name": {
        "first": null,
        "last": null,
        "middle": null,
        "maiden": null,
        "alias": null,
        "other": null,
        "initials": null,
        "title": null
      },
      "contactInformation": [],
      "description": null,
      "defaultAccessMap": {},
      "institutions": [],
      "lastLoggedInInstitution": null,
      "lastLoginTime": null,
      "sessionCount": null,
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
      "status": "d"
    },
    "type": "ac"
  }


let StaffService = {

    getStaffs(filter) {
        return Data.get('staff', filter);
    },
    getStaff(id) {
        return Data.get('staff/' +id);
    },
    insertStaff(data) {
        return Data.post('staff', data)
    },
    updateStaff(data, id) {
        return Data.put("staff/" + id, data)
    },
    deleteStaff(id) {
        return Data.delete('staff/' + id)
    },

};

export {StaffService, StaffModel}