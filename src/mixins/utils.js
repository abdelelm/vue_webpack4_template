module.exports = {
    data() {
        return {
            mobile: false
        }
    },
    mounted() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.mobile = true;
        }
    },
    methods: {
        hasRight(item) {
            var roles = (!this.$store.state.user ? [] : this.$store.state.user.rights) || [];
            return (item.strict ? item.connected === this.$store.state.connected : (!item.connected || this.$store.state.connected == item.connected)) && (!item.role || roles.find(x => x.name === item.role));
        },
        isGuid(v) {
            return v && /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?$/.test(v);
        }
    }
}