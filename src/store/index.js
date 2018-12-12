import Vue from "vue"
import Vuex from "vuex"
import * as config from "../../config";
import { actions } from "./actions"
import { mutations } from "./mutations"

Vue.use(Vuex)
export function createStore() {
	return new Vuex.Store({
		strict: config.DEV,
		state: {
			info : config.website,
			errors : [],
			loading :0,
			connected :false,
			error: null
		},
		actions,
		mutations
	})
}
