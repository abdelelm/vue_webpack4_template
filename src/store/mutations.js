export const mutations = {
	login(state, data)
	{
		state.user = data;
		state.connected = true;
	},
	logout(state)
	{
		state.user = null;
		state.connected = false;
	}

}