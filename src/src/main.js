import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
// import 'swiper/css/swiper.css'
import 'vuetify/dist/vuetify.min.css'
import './plugins/kurious'
import '@/assets/sass/styles.scss'
import vuetify from './plugins/vuetify'
import VueSession from 'vue-session'
import mdi from '@mdi/font/css/materialdesignicons.css'

const options = {
    persist: true,
}

Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
Vue.use(VueSession, options)

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    mdi,
    render: h => h(App)
}).$mount('#app')