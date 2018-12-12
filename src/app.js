// JS
import Vue from "vue"
import App from "./App.vue"
import Vuetify from 'vuetify'
import VueI18n from "vue-i18n"
import http from "./mixins/http"
import utils from "./mixins/utils"
import * as config from "../config"
import { createStore } from "./store"
import { createRouter } from "./router"
import { sync } from "vuex-router-sync"
import metaInfo from "./mixins/metaInfo"
import directives from "./directives/index"
// CSS
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css';


//Use
Vue.use(VueI18n)
Vue.use(Vuetify)

//Mixins
Vue.mixin(metaInfo)
Vue.mixin(utils)
Vue.mixin(http)

//Directives
directives(Vue.directive.bind(Vue));
const messages = {
	"en": require(`./i18n/en.json`),
	"fr": require(`./i18n/fr.json`),
	"nl": require(`./i18n/nl.json`)
}
export function createApp(ssrContext) {
	const i18n = new VueI18n({
		locale: MAINFILELANGUAGE,
		messages
	})
	const store = createStore()
	const router = createRouter(store)
	// sync the router with the vuex store.
	// this registers `store.state.route`
	sync(store, router)

	// create the app instance.
	const app = new Vue({
		router,
		store,
		i18n,
		ssrContext,
		render: (h) => h(App)
	});
	
	return { app, router, store}
}
