import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import "@mdi/font/css/materialdesignicons.css";
import "vue-pdf-app/dist/icons/main.css"; 
import '@/assets/sass/styles.scss'

Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont:'mdiSvg'
    }
});
