import Vue from "vue"
import Router from "vue-router"
import NotFound from "views/@public/notfound/_index.vue"
Vue.use(Router)
let routes = [];
//<ROUTING>
routes.push({ path: "*", component: NotFound})
export function createRouter(store) {
	var _router = new Router({
		mode: "history",
		scrollBehavior: () => ({ y: 0 }),
		routes
	})
	_router.beforeEach((to, from, next) => {
		if(to.meta.connected && !store.state.connected)
			next({ path : "/login" , query: { to : (to.path == "/logout" ? "/" : to.path) }});
		else if(!to.meta.connected && store.state.connected && to.matched[0].path !== "*")
			next("/dashboard");
		 else
			next();
	})

	return _router;
}