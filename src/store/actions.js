export const actions = {
    login({ commit, state }, data) {
        commit("login", data);
    },
    logout({commit, state}) {
        commit("logout");
    },

}
