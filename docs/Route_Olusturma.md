# Route oluşturma


Döküman genelinde örnek sayfa başlığımız "Profil" olacak.


#### 1. CSS dosyası nereye oluşturulur?
------------------------------------

İster layout ister component dosyası olsun tek bir sass dosyası kullanıyoruz.

    /src/assets/scss/panel/profile.scss


#### 2. Component dosyası nereye oluşturulur?
----------------------------------------

Componentlerin belirli bir klasör yapılandırması vardır. Örneğin;

Kampüs ile ilgili componentler "Campus" klasörüne şu şekilde yaratılabilir.

    /src/components/panel/Campus/List.vue
    /src/components/panel/Campus/Detail.vue
    /src/components/panel/Campus/Insert.vue
    /src/components/panel/Campus/Update.vue


Peki biz Profil componentini nereye oluşturabiliriz? Bu proje dökümanına göre değişebilir.
Ama örnek vermek gerekirse "Settings" diye bir klasör oluşturup onun içine koyabiliriz.

**/src/components/panel/Settings/Profile**


#### 3. Sayfanın locale değerlerini giriyoruz.

    Path: /src/locales/tr.js

```
...

"academic/calendar-settings": {
    title: "Akademik Takvim",
    route: "akademik/takvim/ayarlari",
},

"profile": {
    title: "Profil",
    route: "profil",
},

...

```

    Path: /src/locales/en.js

```
...

"academic/calendar-settings": {
    title: "Akademik Takvim",
    route: "akademik/takvim/ayarlari",
},

"profile": {
    title: "Profile",
    route: "profile",
},

...

```

Burada verdiğimiz obje keyi olan ``profile`` bir sonraki aşamada bize lazım olacak!



#### 4. Route ve Componentleri bağlamak
---

Sayfayı oluşturmak tabii ki yetmiyor. Componentlerimizi routelara bağlamalıyız.
Profil için oluşturduğumuz component ve css dosyalarını aşağıdaki gibi
require ediyoruz.


    Path: /src/router/panel.js

```
const PanelProfileView = r => require.ensure([], () => {
    require('assets/scss/panel/profile.scss');
    r(require('components/panel/Profile'));
}, 'panel.profile');
```

Önceki aşamada belirlediğimiz obje keyimizi (``profile``) burada kullanıyoruz.

``strRoute["profile"].route``

Route'u aşağıdaki gibi ekleyebilirsiniz.


```
...

//********************************************************
{
    name: 'academic/calendar-settings',
    path: strRoute["academic/calendar-settings"].route,
    component: PanelAcademicView,
},
//********************************************************
{
    name: 'profile',
    path: strRoute["profile"].route,
    component: PanelProfileView,
},

...

```



#### 5. Oluşturduğumuz Route'u menu alanında göstermek
---

Bazı sayfaları menude gostermek istemeyebiliriz. Ama göstermek istersek
şu şekilde ekleyebiliriz.
locales dosyasında eklediğimiz obje keyini (``profile``) burada da kullanmaktayız.


    Path: /src/components/panel/_partials/NavBar.vue


```

...

{
    name: "academic/calendar-settings",
    title: strRoute["academic/calendar-settings"].title,
    route: '/panel/' + strRoute["academic/calendar-settings"].route,
    icon: 'fa-bar-chart',
},
{
    name: "profile",
    title: strRoute["profile"].title,
    route: '/panel/' + strRoute["profile"].route,
    icon: 'fa-user',
},

...


```


