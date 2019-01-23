// JS
import Vue from "vue"
import Vuetify from 'vuetify'
import VueI18n from "vue-i18n"
import VueI18nFilter from 'vue-i18n-filter'
import config from "../config"
import App from "./app.vue"
import { createStore } from "./store"
import { createRouter } from "./router"
import { sync } from "vuex-router-sync"
import Directives from "./directives";
import Mixins from "./mixins";
import Filters from "./filters";
// CSS
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/global.scss';
// GLOBAL COMPONENTS
// GLOBAL LAYOUTS

//Uses
Vue.use(VueI18n)
Vue.use(VueI18nFilter)
Vue.use(Vuetify)
// Register Directives
Directives(Vue.directive.bind(Vue))
// Register Mixins
Mixins(Vue.mixin.bind(Vue))
// Register Filters
Filters(Vue.filter.bind(Vue))
// Translations 
var messages = (() => {
    var _t = {};
    for(var i in config.translations)
            _t[i] = require('./i18n/' + config.translations[i].filename+'.json')
    return _t;
})();

const i18n = new VueI18n({
    locale: config.language_key ,
    fallbackLocale: config.language.fallback,
    messages
});

const store = createStore()
const router = createRouter(store)
sync(store, router)


var deletecache  = (localStorage && localStorage.getItem && localStorage.getItem("BUILDVERSION") !== window.BUILDVERSION);
if(deletecache && localStorage)
{
	localStorage.clear();
	localStorage.setItem("BUILDVERSION" , window.BUILDVERSION);
}

// service worker
if(config.service_worker && navigator && navigator.serviceWorker)
{
	if(deletecache)
	{
		navigator.serviceWorker.getRegistrations().then(function(registrations) {
			for (let registration of registrations) {
				registration.unregister()
			}
		})
	}

	if (config.PROD && "serviceWorker" in navigator) {
		navigator.serviceWorker.register("/service-worker.js")
	} else {
		navigator.serviceWorker.getRegistrations().then(function(registrations) {
			console.log("Unregistering service workers for development")
			for (let registration of registrations) {
				registration.unregister()
			}
		})
	}
}



const app = new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App)
}).$mount("#app")