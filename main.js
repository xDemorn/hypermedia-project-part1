// object with the translations, filled in `fetchTranslations`
let TRANSLATIONS = {};

const debug = true;

let language = '';

/**
 * Translates the page given the language
 * @param {'en' | 'ca' | 'es' | 'pl'} lang the new language we want to apply
 * @param {boolean} removeSelectedLang if `true` we remove the active class from the current selected language
 */
function changeLanguage(lang, removeSelectedLang = true) {
    // if the current language is the same as the lang from the parameter we don't do anythink
    if (language === lang) return;

    // deselect current active language option
    if (removeSelectedLang) document.querySelector(`li[i18n="lang.${language}"]`)?.classList.remove('active');

    language = lang;

    // select new element based of the language
    document.querySelector(`li[i18n="lang.${lang}"]`)?.classList.add('active');

    // apply the translations
    applyTranslation();
}

/**
 * Gets every tag that have the `i18n` attribute and translates it
 */
function applyTranslation()  {
    // we get all the translatable elements
    const elements = document.querySelectorAll('[i18n]');

    // for every element we get the value and translate it, finally assign the translated value
    elements.forEach(element => {
        const attr = element.getAttribute('i18n');
        const hasTooltip = element.getAttribute('tooltip') != null;

        if (hasTooltip) element.setAttribute('tooltip', translate(attr));
        else element.innerText = translate(attr);
    });
}

/**
 * Gets the translated text given by the `path` parameter
 * @param {string} path the full path of the key we want to translate, separated by a . for nested properties
 * @returns {string} the translated text or the `path` parameter if the final key does'nt exist
 */
function translate(path) {
    // agafem l'objecte de traduccions segons l'idioma actual
    let translated = TRANSLATIONS[language];

    // separem la clau sencera per punts
    const keys = path.split('.');

    // per cada clau si existeix assignem el valor a ella mateixa
    for (const key of keys) {
        if (translated[key]) translated = translated[key];
        else {
            translated = path;
            break;
        }
    }

    return translated;
}

/**
 * Makes all the calls for the diferent languages to get the translations
 * @returns {Promise<{}>}
 */
async function fetchTranslations() {
    return new Promise(async resolve => {
        // we define an array with the names and url of the translations
        const translations = [
            {
                lang: 'en',
                url: 'i18n/en.json'
            },
            {
                lang: 'es',
                url: 'i18n/es.json'
            },
            {
                lang: 'ca',
                url: 'i18n/ca.json'
            },
            {
                lang: 'pl',
                url: 'i18n/pl.json'
            }
        ];

        // we map the url of the translation to a fetch with that url for the Promise.all call
        const fetchs = translations.map(lang => fetch(lang.url));

        // make all the fetch calls
        const data = await Promise.all(fetchs).then(responses => {
            // check if every response is okay
            if (!responses.every(response => response.ok)) throw new Error("Alguna peticio ha fallat!")

            // transform every response to a json object
            return Promise.all(responses.map(response => response.json()));
        });

        // define an empty object for the translations
        const obj = {};

        // for every translation we assign its value to the value of the respective response
        translations.forEach((translation, idx) => obj[translation.lang] = data[idx]);

        // return the full object with translations
        resolve(obj);
    });
}

/**
 * Main function that executes when the body has done loading
 */
async function OnInit() {
    // load the .json files for the translations
    TRANSLATIONS = await fetchTranslations();

    const params = new URLSearchParams(window.location.search);
    const isInURL = params.get('lang') !== null;

    // get the language from the browser
    let lang = isInURL ? params.get('lang') : window.navigator.language.split('-')[0];

    // if the language code doesn't exist in the object, set the default language to english
    if (!TRANSLATIONS[lang]) lang = 'en';

    // we use the function to change the language
    changeLanguage(lang, false);
}

/**
 * Opens a new window with the given `url`
 * @param {string} url the link you want to open
 */
function newTab(url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';

    a.click();

    a.remove();
}