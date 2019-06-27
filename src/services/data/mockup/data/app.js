var assign = Object.assign;

var init = {
  institution: 1,
  notifications: ["Bir öğrenci kayıt oldu!", "Lütfen şifrenizi güncelleyiniz!"],
  version: "v1.1.0",
  forceUpdate: true,
  availableLanguages: ["tr", "en"],
  defaultLanguage: "tr",
  logoPath: "localhost:3002/static/img/panel/logo.png",
  copyrightMessage: {
    tr: "T.C. İstanbul Şişli Meslek Yüksekokulu",
    en: "T.C. Istanbul Sisli High School"
  },
  availableModules: ["academic-calendar-settings"],
  member: {
    id: 1,
    email: "sbkilicoglu@gamil.com",
    pass: "",
    passConfirmation: ""
  },

  dashboardTypes: [
    {
      slug: "student",
      title: {
        tr: "ÖĞRENCİ",
        en: "STUDENT"
      }
    },
    {
      slug: "academician",
      title: {
        tr: "AKADEMİSYEN",
        en: "ACADEMICIAN"
      }
    },
    {
      slug: "administration",
      title: {
        tr: "İDARİ İŞLER",
        en: "ADMINISTRATION"
      }
    },
    {
      slug: "alumni",
      title: {
        tr: "MEZUN",
        en: "ALUMNI"
      }
    }
  ]
};

let languages = [
  {
    id: 1,
    name: {
      en: "Turkish",
      tr: "Türkçe"
    },
    code: "tr-TR",
    code2: "tr",
    isSaasDefault: "y"
  },
  {
    id: 2,
    name: {
      en: "English",
      tr: "İngilizce"
    },
    code: "en-US",
    code2: "en",
    isSaasDefault: "n"
  },
  {
    id: 3,
    name: {
      de: "Deutsch",
      en: "German",
      tr: "Almanca"
    },
    code: "de-DE",
    code2: "de",
    isSaasDefault: "n"
  },
  {
    id: 4,
    name: {
      de: "Fransözisch",
      en: "French",
      fr: "Française",
      tr: "Fransızca"
    },
    code: "fr-FR",
    code2: "fr",
    isSaasDefault: "n"
  }
];

let countries = [
  {
    id: 423,
    name: {
      tr: "Türkiye",
      en: "Turkey"
    },
    status: "d",
    visibility: "l"
  },
  {
    id: 423,
    name: {
      tr: "Amerika",
      en: "America"
    },
    status: "d",
    visibility: "l"
  }
];

let states = [
  {
    id: 423,
    name: {
      tr: "New York",
      en: "New York"
    },
    status: "i",
    visibility: "d",
    country: 2
  }
];

let cities = [
  {
    id: 232,
    name: {
      tr: "Albany",
      en: "Albany"
    },
    status: "d",
    visibility: "l",
    country: 2,
    state: 423,
    plateNumber: ""
  }
];

let districts = [
  {
    id: 25,
    name: {
      tr: "AlbanyDistrict",
      en: "AlbanyDistrict"
    },
    status: "d",
    visibility: "l",
    country: 2,
    state: 423,
    city: 232,
    plateNumber: ""
  }
];

let neighborhoods = [
  {
    id: 525,
    name: {
      tr: "AlbanyHood",
      en: "AlbanyHood"
    },
    status: "d",
    visibility: "l",

    country: 2,
    district: 25,
    state: 423,
    city: 232,
    plateNumber: ""
  }
];

export default {
  "GET#init/saas-web": {
    code: "200.0000",
    result: {
      set: init
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "GET#languages": {
    code: "200.0000",
    result: {
      set: languages
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "GET#countries": {
    code: "200.0000",
    result: {
      set: countries
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "GET#states?country=423": {
    code: "200.0000",
    result: {
      set: states
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "GET#cities?country=423": {
    code: "200.0000",
    result: {
      set: cities
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "GET#cities?state=423": {
    code: "200.0000",
    result: {
      set: cities
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "GET#districts?city=232": {
    code: "200.0000",
    result: {
      set: districts
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  },
  "GET#neighborhoods?district=25": {
    code: "200.0000",
    result: {
      set: neighborhoods
    },
    message: "İşleminiz başarıyla tamamlanmıştır."
  }
};
