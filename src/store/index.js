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
			user : {},
			info : config.website,
			connected :true,
		},
		actions,
		mutations
	})
}
