import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters('user', ['disableFunctionalities', 'userCategory']),
        showPage() {
            if (!this.disableFunctionalities || this.userCategory === 'ADMIN')
                return true
            else
                return this.$route.name ? this.$route.name.includes('chating') || this.$route.name.includes('Settings') : false
        }
    },
    methods: {
        redirect() {
            if (this.userCategory !== 'ADMIN')
                if (this.disableFunctionalities && this.$route.name ? !(this.$route.name.includes('chating') || this.$route.name.includes('Settings')) : true)
                    if (this.$route.path !== '/settings/payments')
                        this.$router.push('/settings/payments')
        }
    }
}