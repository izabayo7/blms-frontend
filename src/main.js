import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './plugins/kurious'
import '@/assets/sass/styles.scss'
import vuetify from './plugins/vuetify';
import VueSession from 'vue-session'
import VuePlyr from 'vue-plyr'
import mdi from '@mdi/font/css/materialdesignicons.css'

const options = {
    persist: true,
}

Vue.use(VueSession, options)
Vue.use(Vuetify)
Vue.use(VuePlyr)

const opts = {}

export default new Vuetify(opts)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    mdi,
    vuetify,
    render: h => h(App)
}).$mount('#app')