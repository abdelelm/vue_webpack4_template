import { createApp , Import } from "./app"

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (context) => {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp(context)

		router.push(context.url)
		// wait until router has resolved possible async hooks
		router.onReady(() => {
			if (store.state.error) store.commit("CLEAR_ERROR")

			const matchedComponents = router.getMatchedComponents()
			// Call fetchData hooks on components matched by the route.
			// A preFetch hook dispatches a store action and returns a Promise,
			// which is resolved when the action is complete and store state has been
			// updated.
			Promise.all(matchedComponents.map((component) => {
				return component.asyncData && component.asyncData({
					store,
					route: router.currentRoute
				})
			})).then(() => {
				// After all preFetch hooks are resolved, our store is now
				// filled with the state needed to render the app.
				// Expose the state on the render context, and let the request handler
				// inline the state in the HTML response. This allows the client-side
				// store to pick-up the server-side state without having to duplicate
				// the initial data fetching on the client.

				resolve(app)
			}).catch(reject)
		}, reject)
	})
}
