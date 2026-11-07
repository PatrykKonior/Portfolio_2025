import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

import site from "../../site.config.js";
import { dictionaries } from "../i18n/index.js";
import { gsap, motionOK } from "./motion.js";

// The banner only exists once a Google Analytics ID is configured: without analytics the site
// sets no tracking cookies, so there is nothing to ask consent for. In development,
// ?cookies previews the banner without an ID (nothing is loaded either way).
const preview = import.meta.env.DEV && new URLSearchParams(window.location.search).has("cookies");
export const consentEnabled = Boolean(site.gaMeasurementId) || preview;

let gaLoaded = false;
let started = false;

const gtag = (...args) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
};

// Google Consent Mode v2: everything starts denied; GA is only fetched after analytics is accepted.
const syncAnalytics = () => {
    const granted = CookieConsent.acceptedCategory("analytics");
    if (!site.gaMeasurementId) return;
    if (granted && !gaLoaded) {
        gaLoaded = true;
        gtag("consent", "default", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "denied",
        });
        gtag("js", new Date());
        gtag("config", site.gaMeasurementId);
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`;
        document.head.appendChild(script);
    }
    if (gaLoaded) gtag("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
};

const translation = (lang) => {
    const c = dictionaries[lang].cookies;
    return {
        consentModal: {
            title: c.title,
            description: c.description,
            acceptAllBtn: c.acceptAll,
            acceptNecessaryBtn: c.rejectAll,
            showPreferencesBtn: c.manage,
        },
        preferencesModal: {
            title: c.prefsTitle,
            acceptAllBtn: c.acceptAll,
            acceptNecessaryBtn: c.rejectAll,
            savePreferencesBtn: c.save,
            closeIconLabel: c.close,
            sections: [
                { title: c.necessaryTitle, description: c.necessaryDesc, linkedCategory: "necessary" },
                { title: c.analyticsTitle, description: c.analyticsDesc, linkedCategory: "analytics" },
            ],
        },
    };
};

// Animates with the standalone `translate` property so the library's own centring transform
// on the modals is left untouched.
const animateIn = ({ modalName }) => {
    if (!motionOK()) return;
    const selector = modalName === "consentModal" ? "#cc-main .cm" : "#cc-main .pm";
    gsap.fromTo(selector,
        { translate: "0 48px", opacity: 0, filter: "blur(12px)" },
        { translate: "0 0px", opacity: 1, filter: "blur(0px)", duration: 1, ease: "expo.out", clearProps: "translate,opacity,filter" });
    gsap.fromTo(`${selector} .cm__btn, ${selector} .pm__btn, ${selector} .pm__section`,
        { translate: "0 16px", opacity: 0 },
        { translate: "0 0px", opacity: 1, duration: 0.7, stagger: 0.04, delay: 0.2, ease: "expo.out", clearProps: "translate,opacity" });
};

export const startConsent = (lang) => {
    if (!consentEnabled || started) return;
    started = true;
    CookieConsent.run({
        guiOptions: {
            consentModal: { layout: "box", position: "bottom left", equalWeightButtons: true },
            preferencesModal: { layout: "box", equalWeightButtons: true },
        },
        categories: {
            necessary: { enabled: true, readOnly: true },
            analytics: { autoClear: { cookies: [{ name: /^_ga/ }, { name: "_gid" }] } },
        },
        onConsent: syncAnalytics,
        onChange: syncAnalytics,
        onModalShow: animateIn,
        language: {
            default: lang,
            translations: { en: translation("en"), pl: translation("pl") },
        },
    });
};

// Only once the banner is running: calling setLanguage before run() leaves it never shown.
export const setConsentLanguage = (lang) => {
    if (started) CookieConsent.setLanguage(lang, true);
};

export const showCookieSettings = () => CookieConsent.showPreferences();
