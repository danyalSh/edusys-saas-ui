var assign = Object.assign;

var member = {
  email: "Sbkilicoglu@gmail.com",
  id: 1,
  pass: "",
  passConfirmation: "",
  contactInformation: {
    mobile: "523-333-2312"
  }
};

export default {
  "PATCH#member/password/1": {
    code: "200.0000",
    result: {
      set: member
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "POST#login": {
    code: "200.0000",
    result: {
      set: {
        token: 123123
      }
    },
    message: "Başarıyla giriş yapıldı."
  }
};
