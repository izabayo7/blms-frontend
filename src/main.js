import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/globalFilters'
import vuetify from './plugins/vuetify';
import VueSession from 'vue-session'
import VuePlyr from 'vue-plyr'
import VuePdfApp from "vue-pdf-app";
import "skeleton-screen-css";

const options = {
    persist: true,
}

// global vue.js registration
import Flutterwave from 'vue-flutterwave'
Vue.component("vue-pdf-app", VuePdfApp);
Vue.use(Flutterwave, { publicKey: 'FLWPUBK_TEST-cadee1e97424c72cc1bd120ed498f55e-X' })
Vue.use(VueSession, options)
Vue.use(VuePlyr)

Vue.config.productionTip = false

import VueGtag from "vue-gtag"

Vue.use(VueGtag, {
    config: { id: "G-35K20WVBSP" }
});

export default new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
