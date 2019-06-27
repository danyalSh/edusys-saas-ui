export default {
    "routes": {
        // Auth Routes --------------------------------------------------------------
        "auth": {
            "login-home": {
                title: "Choose Account",
                route: "/",
            },
            "login-student": {
                title: "Student Login",
                route: "login/student",
            },
            "login-administration": {
                title: "Administration Login",
                route: "login/administration",
            },
            "login-academician": {
                title: "Academician Login",
                route: "login/academician",
            },
            "login-alumni": {
                title: "Alumni Login",
                route: "login/alumni",
            },
            "pass-reset-step-1": {
                title: "Forgot Password",
                route: "password/reset/request",
            },
            "pass-reset-step-2": {
                title: "Create Password",
                route: "password/reset/new",
            },
        },

        // Panel Routes --------------------------------------------------------------
        "panel": {

            "dashboard": {
                title: "Dashboard",
                route: "dashboard",
            },

            "student-affairs": {
                title: "Öğrenci İşleri",
                route: "ogrenci-isleri",
            },

            "student-affairs/student-lesson-operations": {
                title: "Öğrenci Ders İşlemleri",
                route: "ogrenci-isleri/ogrenci-ders-islemleri",
            },

            "student-affairs/student-lesson-operations/add-student-lesson": {
                title: "Öğrenci Ders Ekle",
                route: "ogrenci-isleri/ogrenci-ders-islemleri/ogrenci-ders-ekle",
            },

            "student-affairs/add-student": {
                title: "Öğrenci Ekle",
                route: "ogrenci-isleri/ogrenci-ekle",
            },

            "discipline-operations": {
                title: "Disiplin İşlemleri",
                route: "disiplin-islemleri",
            },

            "lesson-operations": {
                title: "Ders İşlemleri",
                route: "ders-islemleri",
            },

            "bologna-process-management": {
                title: "Bologna Süreci Yönetim",
                route: "bologna-sureci-yonetim",
            },


            "member-operations": {
                title: "Üyelik İşlemleri",
                route: "uyelik-islemleri",
            },

            "staff-operations": {
                title: "Personel İşlemleri",
                route: "personel-islemleri",
            },

            "dashboard-screens": {
                title: "Dashboard Ekranları",
                route: "dashboard-ekranlari",
            },


            "report-side": {
                title: "Raporlama Alanı",
                route: "raporlama-alani",
            },



            "institution-administration-panel": {
                title: "Kurum Yönetim",
                route: "kurum",
            },
            "institution-administration-panel/building-list": {
                title: "Bina Yönetim",
                route: "kurum/bina/listesi",
            },
            "institution-administration-panel/building-new": {
                title: "Yeni Bina",
                route: "kurum/bina/yeni",
            },
            "institution-administration-panel/building-edit": {
                title: "Bina Düzenle",
                route: "kurum/bina/duzenle",
            },
            "institution-administration-panel/campus-list": {
                title: "Kampüs Yönetim",
                route: "kurum/kampus/listesi",
            },
            "institution-administration-panel/campus-new": {
                title: "Yeni Kampüs",
                route: "kurum/kampus/yeni",
            },
            "institution-administration-panel/campus-edit": {
                title: "Kampüs Düzenle",
                route: "kurum/kampus/duzenle",
            },
            "institution-administration-panel/institution-settings": {
                title: "Kurum Ayarları",
                route: "kurum/ayarlari",
            },


            "academic/calendar-settings": {
                title: "Akademik Takvim",
                route: "akademik/takvim/ayarlari",
            },
        }

    },
    "text": {
        "no-internet-connection": "No found Internet Connection",

        "loading": 'Loading...',
        "loading-login-init": 'Loading initial data...',
        "loading-app-init": 'Loading application info..',

        "pass-reset-info": "To reset your password, enter your username and click on the Submit button. The password change link will be sent to your e-mail address.",
        "update-password": "Your password has been successfully updated. You can login with the new password by clicking on the Login button below to login.",
        "password-validate-field": "The password field is 6-20 digits; Must contain at least 1 uppercase, 1 lowercase letter and number.",
        "dontMatchPasswords": "The passwords do not match.",
        "pin-info": 'Remaining time to <br>enter PIN number (<i>seconds</i>):',
    },
    "placeholders": {
        "username": "TCKN, School No or E-mail",
        "pin": "Enter Your PIN",
        "new-password": "Enter New Password",
        "new-password-repeat": "Repeat Enter New Password",
    },
    "lbl": {

        "username": 'User Name',
        "email": 'E-mail',
        "password": 'Password',
        "login": "Login",
        "do-login": "Login",
        "forgot-password": "Forgot Password",
        "create-password": "Create Password",
        "pin": "PIN",
        "phone": "Phone",
        "address": "Address",
        "new-password": "New Password",
        "new-password-repeat": "Repeat New Password",
        "send": "Send",
        "update-password": "Update Password",
        "student": 'Student',
        "administration": 'Administration',
        "alumni": 'Alumni',
        "academician": 'Academician',
    },
};
