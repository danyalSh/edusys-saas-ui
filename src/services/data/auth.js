import Data from './'

let MemberModel = {
    username: null,
    password: null,
    passwordRepeat: null,
};

let AuthService = {

    refreshToken(data){
        return Data.put("refreshToken", data);
    },

    login(data){
        return Data.post("login", data);
    },

    resetPassword(data){
        return Data.post("password/reset/request", data);
    },

    updatePassword(data){
        return Data.post("password/reset/new", data);
    },



};

export {AuthService, MemberModel}