export const mutations = {
    deleteError(state, data){
		data.show = false;
		var index = state.errors.indexOf(data);
		if(index > -1)
			state.errors.splice(index,1)
	},
    addError(state, data)
	{
		state.errors.push(data);
	},
    inc_loading(state)  {
		state.loading++;
	},
	dec_loading(state)  {
		if(state.loading > 0)
		state.loading--;
    }
}