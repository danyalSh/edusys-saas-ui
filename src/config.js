toastr.options = {
  closeButton: true,
  timeOut: 3000
};

let isMock = false;
let isDev = process.env.NODE_ENV == "development";

let siteName = "EduSYS";
let reCaptchaKey = "6LcPNiQUAAAAAJxEhUEwDPDXC-zGRneM_Vy5K6L1";
let googleMapsKey = "";

let apiRoot = "";
let authorizationKey = "325235325";

if (isDev) {
  //apiRoot = 'http://192.168.0.196/app_dev.php/v1';
  apiRoot = "";

  if (location.hostname == "192.168.0.136") {
    isMock = false;
  } else {
    isMock = location.search.indexOf("nomock") == -1;
  }
} else if (
  location.host.indexOf("localhost") !== -1 ||
  location.host.indexOf("192.168.0.136") !== -1
) {
  apiRoot = "http://192.168.0.196/app_dev.php/v1";
}

export default {
  siteName,
  apiRoot,
  authorizationKey,
  isMock,
  isDev,
  reCaptchaKey,
  googleMapsKey
};
