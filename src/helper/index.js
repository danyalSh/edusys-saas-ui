import Vue from 'vue'

import store from 'src/services/store'
import config from 'src/config'
import locales from '../locales'


export const loading = {
    selector: null,
    text: null,
    defaultText: locales[store.state.lang].lbl.loading,
    show: function (text) {
        this.text = text || this.defaultText;

        this.selector = this.selector || document.querySelector('#loading');
        this.selector.querySelector('.loader--text').innerHTML = this.text;
        this.selector.style.display = 'block';
    },
    hide: function () {
        this.selector.style.display = 'none';
    }
};


export const clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

export const checkNumber = function (e) {
    var key = e.keyCode || e.charCode;

    if ((key >= 48 && key <= 57) || key == 8 || key == 46 || (key >= 37 && key <= 40)) {

    } else {
        e.preventDefault();
    }
}

export const checkAlphabet = function (e) {
    var key = e.keyCode || e.charCode;

    if ($.isNumeric(key)) {
        e.preventDefault();
    }
};

export const initCaptcha = (id, options = {}) => {
    if (navigator.onLine)
        return grecaptcha.render(id, {
            'sitekey': config.reCaptchaKey,
            ...options
        });
};

export const capitalize = (val) => {
    return upper(val.charAt(0)) + lower(val.slice(1));
};

export const upper = (val) => {

    if (store.state.lang == 'tr')
        val = val.turkishToUpper();
    else
        val = val.toUpperCase();

    return val;
};

export const lower = (val) => {
    if (store.state.lang == 'tr')
        val = val.turkishToLower();
    else
        val = val.toLowerCase();

    return val;
};

export const redirectLogin = function () {
    loading.show(store.state.i18n.t('text.loading'));
    store.setToken(null);

    setTimeout(() => {
        loading.hide();

        store.state.router.push({
            path: '/',
            query: {
                redirectPanel: location.pathname,
            }
        });

    }, 1000);
};

export const isMobile = () => {
    return $(window).width() <= 768
};

export const debounce = function debounce(func, wait, immediate) {
    var timeout;

    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export const generateSlug = function slug(text) {
    let trChars = {
        'çÇ': 'c',
        'ğĞ': 'g',
        'şŞ': 's',
        'üÜ': 'u',
        'ıİ': 'i',
        'öÖ': 'o'
    };

    for (let key in trChars) {
        text = text.replace(new RegExp('[' + key + ']', 'g'), trChars[key]);
    }
    return text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // rakam ve ingilizce karekterler dışındakileri at
        .replace(/\s/gi, "-") // boşlukları - karakterine çevir
        .replace(/[-]+/gi, "-") // tekrar eden - kalmasın
        .toLowerCase(); // ve sonucu küçük harfe dönüştür
};

String.prototype.turkishToLower = function () {
    let string = this;
    let letters = {"İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç"};
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
        return letters[letter];
    })
    return string.toLowerCase();
};

String.prototype.turkishToUpper = function () {
    let string = this;
    let letters = {"i": "İ", "ı": "I", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç"};
    string = string.replace(/(([iışğüçö]))/g, function (letter) {
        return letters[letter];
    })
    return string.toUpperCase();
}

Array.prototype.findIndexWithKey = function (obj) {
    var rt = null;

    Object.keys(obj).map(function (key, value) {
        this.map(function (e, i) {
            if (e[key] == obj[key]) {
                rt = i
            }
        })
    }.bind(this))

    return rt
}

Vue.filter('capitalize', capitalize);
Vue.filter('upper', upper);
Vue.filter('lower', lower);

Vue.filter('langtext', (obj) => {
    return obj[store.state.lang];
});