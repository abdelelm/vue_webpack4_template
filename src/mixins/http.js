

import axios from "axios";

export default {
    data(){
        return  { 
			api_url : typeof window !== "undefined" ? window.location.origin + '/api/' : "",
		}
    },
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData({
				store: this.$store,
				route: to
			}).then(next).catch(next)
		} else {
			next()
		}
	},
	created(){
		const { api } = this.$options
		if(api && typeof window !== "undefined")
		{
			this.Get(api).then(res => {
				if(res.status == 200)
				{
					if(res.success)
						this.api_data = res.message;
				}
			}).catch(x => {
				console.log(x);
			})
		}
		
	},
	computed : {
		core_isLoading(){
			return this.$store.state.loading > 0;
		}
	},
	methods:{
		Request(method , api , data){
			this.$store.commit('inc_loading')
			return new Promise((res, rej) => {
				 var handle = (e,j) => {
					this.$store.commit('dec_loading')
					if(e.code === "ECONNABORTED" || e.message === "Network Error")
					{
						var rsp = {
							error :  true,
							success :  false,
							message : this.$t("no_connection"),
							status : 500 ,
							raw : e
						}
	
					}
					else
					{
						if(e instanceof Error)
						e = e.response;					
						if(!e.data)
							e.data = {};
						var rsp = {
							error :  e.status != 200 || e.data.error,
							success :  e.data.success || false,
							message : e.data.message || "",
							status : e.status,
							raw : e
						}
					}
					

				
				
					if(rsp.error && rsp.status != 401)
						this.$store.dispatch("addError", {
							message : rsp.message,
							timeout : 5000,
							type : "error"
						});

						rsp.error ? rej(rsp) : res(rsp);
				}
				var config = {
					timeout: 5000
				}
				if(method === "get")
				return axios.get( this.api_url + api,config).then(handle).catch(handle);
				else
				return axios.post( this.api_url + api,data,config).then(handle).catch(handle);
			})
		},
		Get(api , data){
			if(data)
			{
				api += "?"
				for(var i in data)
					api += i + "=" + data[i];
			}
		
			return this.Request("get", api);
		},
		Post(api , data){
			return this.Request("post", api,data);
		}
	}
}