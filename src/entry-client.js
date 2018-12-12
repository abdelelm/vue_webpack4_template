import Vue from "vue"
import "es6-promise/auto"
import { createApp } from "./app"
import * as config from "../config"

//---REGISTRATION---
const { app, router, store } = createApp();
router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)
		let diffed = false
		const activated = matched.filter((component, i) => {
			return diffed || (diffed = (prevMatched[i] !== component))
		})
		if (!activated.length) {
			return next()
        }
        
		Promise.all(activated.map((c) => {
			if (c.asyncData) {
				return c.asyncData({ store, route: to })
			}
		})).then(() => {
			next()
		}).catch(next)
	})

	// actually mount to DOM
	app.$mount("#app")
})
// service worker
if(navigator.serviceWorker)
{
	if (config.DEV && "serviceWorker" in navigator) {
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

