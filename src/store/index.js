import Vue from 'vue'
import Vuex from 'vuex'
import courses from "@/store/modules/courses";
import chat from "@/store/modules/chat";
import user from "@/store/modules/user";

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        sidebar: {
            visible: false,
            minivariant: false
        },
    },
    mutations: {
    },
    actions: {
    },
    modules:{
        courses,
        chat,
        user
    }
})
