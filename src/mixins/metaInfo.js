import * as config from "../../config";

function getMeta(vm) {
	const {
		meta
	} = vm.$options
	if (meta) {
		return typeof meta === "function" ?
			meta.call(vm) :
			meta
	} else {
		return null
	}
}

const serverMetaInfoMixin = {
	created() {
		const meta = getMeta(this)
		if (meta) {
			this.$ssrContext.meta = meta
        }
        if (!meta && !this.$ssrContext.meta) {
			this.$ssrContext.meta = config.website  || {}
		}
		
	}
}

const clientMetaInfoMixin = {
	mounted() {
        const meta = getMeta(this) ||  config.website           
		if (meta) {
			document.title = `${meta.title} - ${this.$store.state.info.title}`
			this.setMetaProperty("keywords" ,this.$store.state.info.keywords)
			this.setMetaProperty("description" ,this.$store.state.info.description)
		}
	},
	methods: {
		setMetaProperty(prop , value){
			var el = document.querySelector("meta[property='"+prop+"']") ||document.querySelector("meta[name='"+prop+"']");
			if(el)
				el.setAttribute("content", value);
		}
	}
}

export default process.env.VUE_ENV === "server" ?
	serverMetaInfoMixin :
	clientMetaInfoMixin
