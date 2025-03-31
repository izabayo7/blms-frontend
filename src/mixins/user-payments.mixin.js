import {mapGetters} from "vuex";

export default {
    computed:{
        ...mapGetters('user', ['disableFunctionalities']),
        showPage() {
            if (!this.disableFunctionalities)
                return true
            else
                return this.$route.name ? this.$route.name.includes('chating') || this.$route.name.includes('Settings') : false
        }
    },
    methods: {
        redirect(){
            if (this.disableFunctionalities && this.$route.name ? !(this.$route.name.includes('chating') || this.$route.name.includes('Settings')) : true)
                this.$router.push('/settings/payments')
        }
    }
}