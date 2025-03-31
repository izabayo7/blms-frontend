import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import './plugins/kurious'
import './plugins/globalFilters'
import '@/assets/sass/styles.scss'
import vuetify from './plugins/vuetify';
import VueSession from 'vue-session'
import VuePlyr from 'vue-plyr'
import mdi from '@mdi/font/css/materialdesignicons.css'
import "skeleton-screen-css";
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'animate.css/animate.min.css'

const options = {
    persist: true,
}

// global vue.js registration
//never mind
Vue.use(VueSession, options)
Vue.use(vuetify)
Vue.use(VuePlyr)

// const opts = {}

// export default new Vuetify(opts)

Vue.config.productionTip = false

new Vue({
    store,
    router,
    mdi,
    vuetify,
    render: h => h(App)
}).$mount('#app')
