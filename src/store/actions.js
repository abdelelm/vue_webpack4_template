export const actions = {
    inc_loading:({ commit, state }) => {
		commit("inc_loading")
	},
	dec_loading:({ commit, state }) => {
		commit("dec_loading")
    },
    deleteError({ commit, state }, data){
		commit("deleteError",data);
	},
    addError({ commit, state }, data)
	{
		commit("addError",data);
		if(data.timeout)
		{
			setTimeout(() => commit("deleteError",data), data.timeout);
		} 
	}
}