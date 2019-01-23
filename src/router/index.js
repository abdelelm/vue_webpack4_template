import Vue from "vue"
import Router from "vue-router"
import NotFound from "views/@public/_notfound.vue"
Vue.use(Router)

let routes = [];
//GLOBAL ROUTER INJECTION
routes.push({ name : "notfound" ,path: "*", component: NotFound})

export function createRouter(store) {
    
	var _router = new Router({
		mode: "history",
		scrollBehavior: () => ({ y: 0 }),
		routes
    })
    
	_router.beforeEach((to, from, next) => {

	if(to.meta.connected && !store.state.connected)
		next({ path : "/login" , query: { to : (to.path === "/logout" ? "/" : encodeURIComponent(to.fullPath)) }});
    else if (to.meta.role && !(store.state.user.rights || []).find(x => x.name === to.meta.role))
        next({ path: "/404" })
    else
		next();
	})

	return _router;
}

