import Apis from "@/services/apis";
import jwt from 'jsonwebtoken'
import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        user: null,
        isLoggedIn: false,
        paymentStatus: false
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            state.isLoggedIn = true
        },
        TOOGLE_DISABLE_FUNCTIONALITIES(state, value) {
            state.paymentStatus = value
        },
        UNSET_USER(state) {
            state.user = null
            state.isLoggedIn = false
        },
        toogleActionConfirmation(state) {
            state.action_confirmed = !state.action_confirmed
        }
    },
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user)
        },
        unsetUser({ commit }) {
            commit('UNSET_USER')
            // reset the whole store
        },
        async removeProfilePicture({ state, dispatch }) {
            const splited = state.user.profile.split("/");
            // set the dialog
            const response = await Apis.remove_user_profile(
                splited[splited.length - 1]
            );

            // set the token in the session
            Vue.prototype.$session.set("jwt", response.data.data);

            const user = await jwt.decode(Vue.prototype.$session.get("jwt"));
            dispatch("setUser", user);
        },
    },
    getters: {
        // get user
        user(state) {
            return state.user
        },
        // get user full names
        user_full_names(state) {
            return `${state.user.sur_name} ${state.user.other_names}`
        },
        // get user username
        username(state) {
            return state.user.user_name
        },
        disableFunctionalities(state){
          return state.paymentStatus.disabled
        },
        paymentStatus(state){
            return state.paymentStatus
        },
        userCategory(state) {
            return state.user.category.name
        }
    },
}
