import Vue from 'vue'
import Vuex from 'vuex'
import courses from "@/store/modules/courses";
import faculties from "@/store/modules/faculties";
import modal from "@/store/modules/modal";

Vue.use(Vuex)
export default new Vuex.Store({
    namespaceed: true,
    state: {
        user: null,
        isLoggedIn: false,
        sidebar: {
            visible: false,
            minivariant: false
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            state.isLoggedIn = true
        },
        unSetUser(state) {
            state.user = null
            state.isLoggedIn = false
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        unSetUser({ commit }) {
            commit('unSetUser')
        },
    },
    modules: {
        courses,
        faculties,
        modal
    }
})