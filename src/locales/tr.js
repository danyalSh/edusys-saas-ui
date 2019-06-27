export default {
  routes: {
    // Auth Routes --------------------------------------------------------------
    auth: {
      "login-home": {
        title: "Hesap Seçimi",
        route: "/"
      },
      "login-student": {
        title: "Öğrenci Girişi",
        route: "giris/ogrenci"
      },
      "login-administration": {
        title: "İdari İşler Girişi",
        route: "giris/idari-isler"
      },
      "login-academician": {
        title: "Akademisyen Girişi",
        route: "giris/ogretim-gorevlisi"
      },
      "login-alumni": {
        title: "Mezun Girişi",
        route: "giris/mezun"
      },
      "pass-reset-step-1": {
        title: "Şifremi Unuttum",
        route: "parola/sifirlama/talebi"
      },
      "pass-reset-step-2": {
        title: "Şifre Oluştur",
        route: "parola/sifirlama/yeni"
      }
    },

    // Panel Routes --------------------------------------------------------------
    panel: {
      dashboard: {
        title: "Dashboard",
        route: "dashboard"
      },

      "student-affairs": {
        title: "Öğrenci İşleri",
        route: "ogrenci-isleri"
      },

      "student-affairs/student-lesson-operations": {
        title: "Öğrenci Ders İşlemleri",
        route: "ogrenci-isleri/ogrenci-ders-islemleri"
      },

      "student-affairs/student-lesson-operations/add-student-lesson": {
        title: "Öğrenci Ders Ekle",
        route: "ogrenci-isleri/ogrenci-ders-islemleri/ogrenci-ders-ekle"
      },

      "student-affairs/add-student": {
        title: "Öğrenci Ekle",
        route: "ogrenci-isleri/ogrenci-ekle"
      },

      "discipline-operations": {
        title: "Disiplin İşlemleri",
        route: "disiplin-islemleri"
      },

      "lesson-operations": {
        title: "Ders İşlemleri",
        route: "ders-islemleri"
      },

      "bologna-process-management": {
        title: "Bologna Süreci Yönetim",
        route: "bologna-sureci-yonetim"
      },

      "member-operations": {
        title: "Üyelik İşlemleri",
        route: "uyelik-islemleri"
      },

      "staff-operations": {
        title: "Personel İşlemleri",
        route: "personel-islemleri"
      },

      "dashboard-screens": {
        title: "Dashboard Ekranları",
        route: "dashboard-ekranlari"
      },

      "report-side": {
        title: "Raporlama Alanı",
        route: "raporlama-alani"
      },

      "institution-administration-panel": {
        title: "Kurum Yönetim",
        route: "kurum"
      },

      // Building *****************************************

      "institution-administration-panel/building-list": {
        title: "Bina Yönetim",
        route: "bina/listesi"
      },
      "institution-administration-panel/building-new": {
        title: "Yeni Bina",
        route: "bina/yeni"
      },
      "institution-administration-panel/building-edit": {
        title: "Bina Düzenle",
        route: "bina/duzenle"
      },

      // Campus *****************************************

      "institution-administration-panel/campus-list": {
        title: "Kampüs Yönetim",
        route: "kampus/listesi"
      },
      "institution-administration-panel/campus-new": {
        title: "Yeni Kampüs",
        route: "kampus/yeni"
      },
      "institution-administration-panel/campus-edit": {
        title: "Kampüs Düzenle",
        route: "kampus/duzenle"
      },

      // Department *****************************************

      "institution-administration-panel/department-list": {
        title: "Bölüm Yönetim",
        route: "bolum/listesi"
      },

      "institution-administration-panel/department-new": {
        title: "Yeni Bölüm",
        route: "bolum/yeni"
      },

      "institution-administration-panel/department-edit": {
        title: "Bölüm Düzenle",
        route: "bolum/duzenle"
      },

      // Academic Unit *****************************************

      "institution-administration-panel/academic-unit-list": {
        title: "Akademik Birim Yönetim",
        route: "akademik-birim/listesi"
      },

      "institution-administration-panel/academic-unit-new": {
        title: "Yeni Akademik Birim",
        route: "akademik-birim/yeni"
      },

      "institution-administration-panel/academic-unit-edit": {
        title: "Akademik Birim Düzenle",
        route: "akademik-birim/duzenle"
      },

      // Academic Programme *****************************************

      "institution-administration-panel/academic-programme-list": {
        title: "Akademik Program Yönetim",
        route: "akademik-program/listesi"
      },

      "institution-administration-panel/academic-programme-new": {
        title: "Yeni Akademik Program",
        route: "akademik-program/yeni"
      },

      "institution-administration-panel/academic-programme-edit": {
        title: "Akademik Program Düzenle",
        route: "akademik-program/duzenle"
      },

      // Room *****************************************

      "institution-administration-panel/room-list": {
        title: "Oda Yönetim",
        route: "oda/listesi"
      },

      "institution-administration-panel/room-new": {
        title: "Yeni Oda",
        route: "oda/yeni"
      },

      "institution-administration-panel/room-edit": {
        title: "Oda Düzenle",
        route: "oda/duzenle"
      },

      // Courses *****************************************

      "institution-administration-panel/course-list": {
        title: "Dersler Yönetim",
        route: "ders/listesi"
      },

      "institution-administration-panel/course-new": {
        title: "Yeni Ders",
        route: "ders/yeni"
      },

      "institution-administration-panel/course-edit": {
        title: "Ders Düzenle",
        route: "ders/duzenle"
      },

      // Course Plan *****************************************

      "institution-administration-panel/course-plan-list": {
        title: "Müfredat Yönetim",
        route: "mufredat/listesi"
      },

      "institution-administration-panel/course-plan-new": {
        title: "Yeni Müfredat ",
        route: "mufredat/yeni"
      },

      "institution-administration-panel/course-plan-edit": {
        title: "Müfredat Düzenle",
        route: "mufredat/duzenle"
      },

      // Course Iteration *****************************************

      "institution-administration-panel/course-iteration-list": {
        title: "Ders Varyasyon Yönetim",
        route: "ders-varyasyon/listesi"
      },

      "institution-administration-panel/course-iteration-new": {
        title: "Yeni Ders Varyasyon ",
        route: "ders-varyasyon/yeni"
      },

      "institution-administration-panel/course-iteration-edit": {
        title: "Ders Varyasyon Düzenle",
        route: "ders-varyasyon/duzenle"
      },

      // Institution Settings *****************************************

      "institution-administration-panel/institution-settings": {
        title: "Kurum Ayarları",
        route: "kurum/ayarlari"
      },

      "academic/calendar-settings": {
        title: "Akademik Takvim",
        route: "akademik/takvim/ayarlari"
      }
    }
  },
  text: {
    loading: "Yükleniyor...",
    "loading-login-init": "Başlangıç verisi alınıyor...",
    "loading-app-init": "Uygulama bilgileri alınıyor..",
    "pass-reset-info":
      "Şifrenizi sıfırlamak için kullanıcı adınızı giriniz ve Gönder butonuna tıklayınız. Şifre değiştirme bağlantısı e-posta adresinize gönderilecektir.",
    "update-password":
      "Şifreniz başarılı bir şekilde güncellendi. Giriş yapmak için aşağıdaki Giriş Yap butonuna tıklayarak yeni belirlediğiniz şifre ile giriş yapabilirsiniz.",
    "password-validate-field":
      "Şifre alanı en az 6 hane olmak üzere; en az 1 büyük, 1 küçük harf ve numara içermelidir.",
    "pin-info": "PIN numarasını girmek <br>için kalan süre (<i>saniye</i>):",
    dontMatchPasswords: "Parolalar eşleşmiyor.",
    "no-connection-internet": "Internet bağlantısı bulunamadı",
    "drag-file-or-click": "Dosya sürükleyin ya da tıklayın.",
    "uploading-file": "Dosya Yükleniyor...",
    confirm: "Onaylıyor musunuz?",
    "are-you-sure": "Emin misiniz?",

    "no-entries-yet": "Henüz kayıt eklenmedi.",
    "no-record-found": "Kayıt bulunamadı",

    "search-by-name": "İsme göre ara",

    // TimeoutModal ****************************************************
    "timeout-title": "Oturumunuz kapanmak üzere...",
    "timeout-body":
      "Oturumunuz sonlanacaktır. Oturumunuzu yenilemek için aşağıdaki butona tıklayınız. Kalan saniye: ",

    // MultiLangText ***************************************************
    "multilangtext-tooltip-desc":
      "Farklı bir dilde giriş yapmak için sağ üstteki tabler arasında geçiş yapın.",

    "file-size-not-be-larger": "Dosya boyutu şundan büyük olamaz:",

    "what-you-wanted-to-find": "Neyi bulmak istediniz?",

    pagination: {
      report: "%total_result% kayıttan %start% ve %limit% arası",
      "show-result": "sonuç göster"
    }
  },
  placeholders: {
    username: "TCKN, Okul No veya E-posta Adresi Giriniz",
    pin: "PIN Numaranızı Giriniz",
    "new-password": "Yeni Şifre Giriniz",
    "new-password-repeat": "Yeni Şifrenizi Tekrar Giriniz",

    // Panel
    title: "Başlık Giriniz",
    email: "E-posta Adresi Giriniz"
  },
  lbl: {
    name: "İsim",
    username: "Kullanıcı Adı",
    email: "E-posta",
    password: "Şifre",
    login: "Giriş",
    "do-login": "Giriş Yap",
    "forgot-password": "Şifremi Unuttum",
    "create-password": "Şifre Oluştur",
    pin: "PIN",
    phone: "Telefon",
    address: "Adres",
    "new-password": "Yeni Şifre",
    "new-password-repeat": "Yeni Şifre Tekrarı",
    send: "Gönder",
    "update-password": "Şifremi Güncelle",
    student: "Öğrenci",
    administration: "İdari İşler",
    alumni: "Mezun",
    academician: "Akademisyen",
    "new-add": "Yeni Ekle",
    delete: "Sil",
    update: "Güncelle",
    edit: "Düzenle",
    "add-edit": "Ekle / Düzenle",
    cancel: "İptal",
    save: "Kaydet",
    confirm: "Onayla",
    zipcode: "Posta Kodu",
    country: "Ülke",
    state: "Eyalet",
    city: "Şehir",
    district: "İlçe",
    neighborhood: "Mahalle",
    add: "Ekle",
    choose: "Seçiniz",
    enter: "Giriniz",
    profile: "Profil",
    notifications: "Bildirimler",
    "not-found": "Bulunamadı",

    id: "ID",
    title: "Başlık",
    description: "Açıklama",
    status: "Durum",
    transactions: "İşlemler",
    type: "Tür",
    invoice: "Fatura",
    contact: "İletişim",
    despatch: "Gönderi",
    "active-languages": "Aktif Diller",
    "school-name": "Okul Adı",
    "default-language": "Varsayılan Dil",
    logo: "Logo",
    "copyright-text": "Telif Metni",
    insert: "Ekle",

    "institution-information-update": "Kurum Bilgi Güncelleme",
    "building-list": "Bina Listesi",
    "campus-list": "Kampüs Listesi",
    "department-list": "Bölüm Listesi",
    "academic-unit-list": "Akademik Birim Listesi",
    "academic-programme-list": "Akademik Program Listesi",
    "room-list": "Oda Listesi",
    "course-list": "Ders Listesi",

    "insert-new-building": "Yeni Bina Ekleme",
    "insert-new-campus": "Yeni Kampüs Ekleme",
    "insert-new-academic-unit": "Yeni Akademik Birim Ekleme",
    "insert-new-academic-programme": "Yeni Akademik Program Ekleme",
    "insert-new-department": "Yeni Bölüm Ekleme",
    "insert-new-room": "Yeni Oda Ekleme",
    "insert-new-course": "Yeni Ders Ekleme",
    "insert-new-course-plan": "Yeni Müfredat Ekleme",
    "insert-new-course-iteration": "Yeni Ders Varyasyonu Ekleme",

    "edit-building": "Bina Düzenle",
    "edit-campus": "Kampüs Düzenle",
    "edit-academic-unit": "Akademik Birim Düzenle",
    "edit-academic-programme": "Akademik Program Düzenle",
    "edit-department": "Bölüm Düzenle",
    "edit-room": "Oda Düzenle",
    "edit-course": "Ders Düzenle",
    "edit-new-course-iteration": "Ders Varyasyonu Düzenle",

    "academic-calendar-settings": "Akademik Takvim Ayarları",
    "start-date": "Başlangıç Tarihi",
    "end-date": "Bitiş Tarihi",

    "term-start-end": "Dönem Başlangıç - Bitiş",
    "registration-start-end": "Kayıt Başlangıç - Bitiş",
    "extended-registration-start-end": "Ek Kayıt Başlangıç - Bitiş",
    "add-drop-start-end": "Ders Ekle/Çıkar Başlangıç - Bitiş",
    "final-start-end": "Final Tarihleri",
    "exemption-test-start-end": "Muafiyet Sınavı Tarihleri",
    "single-course-test-start-end": "Tek Ders Sınavı Tarihleri",
    "makeup-test-start-end": "Mazeret Sınavı Tarihleri",
    "mid-term-start-end": "Vize Tarihleri",

    "programme-settings": "Program Ayarları",
    "programme-codes": "Program Kodları",

    filter: "Filtre",
    "filter-options": "Filtre Seçenekleri",
    reset: "Sıfırla",
    apply: "Uygula",
    active: "Aktif",
    passive: "Pasif",

    autumn: "Güz",
    spring: "Bahar",
    summer: "Yaz",

    season: "Sezon",
    general: "Genel",
    tax: "Vergi",
    "tax-administration": "Vergi Dairesi",
    "tax-no": "Vergi Numarası",
    "corporate-title": "Kurum Ünvanı",
    search: "Ara",
    refresh: "Yenile",
    loading: "Yükleniyor",

    "first-page": "İlk Sayfa",
    "last-page": "Son Sayfa",
    next: "İleri",
    prev: "Geri",
    "finish-it": "Bitir",

    // Building List
    code: "Kod",
    "building-name": "Yapı Adı",
    campus: "Kampüs",
    "academic-unit": "Akademik Birim",

    // Campus
    "campus-name": "Kampüs Adı",
    "campus-type": "Türü",

    // Academic Unit
    "unit-name": "Birim Adı",
    "academic-unit-name": "Akademik Birim Adı",
    "academic-unit-type": "Tipi",
    "academic-unit-dean": "Dekan",
    coordinator: "Koordinatör",
    manager: "Yönetici",
    "manager-authority": "Yönetici Yetkisi",

    // Academic Department
    department: "Bölüm",
    "department-name": "Bölüm Adı",
    "department-chair": "Bölüm Başkanı",
    chair: "Başkan",

    // Room
    "room-number": "Oda No",
    "room-name": "İsim",
    "room-building": "Bina",
    "room-type": "Tip",
    "room-capacity": "Oda Kaps.",
    "exam-capacity": "Sınav Kaps.",

    // Room Board Types
    blackboard: "Kara Tahta",
    soundSystem: "Ses Sistemi",
    hasProjector: "Projector",
    hasWindow: "Pencere",
    smartboard: "Akıllı Tahta",
    ledboard: "Led Tahta",
    glassboard: "Cam Tahta",
    blueboard: "Mavi Tahta",
    greenboard: "Yeşil Tahta",
    whiteboard: "Beyaz Tahta",

    // Courses
    "course-code": "Ders Kodu",
    "course-name": "Ders Adı",
    theory: "Teori",
    practice: "Uygulama",
    practical: "Pratik",
    akts: "AKTS",

    // Course Plan

    // Diploma Types
    bachelor: "Lisans",
    doctorate: "Doktora",
    masters: "Yüksek Lisans",

    // Education Types
    online: "Uzaktan öğrenim",
    second: "(2. öğrenm.)",
    regular: "Örgün",

    thesis: "Tezli",
    withoutthesis: "Tezsiz"
  }
};
