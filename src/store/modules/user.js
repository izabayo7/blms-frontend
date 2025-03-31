
export default {
    namespaced: true,
    state: {
        user: null,
        isLoggedIn: false
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            state.isLoggedIn = true
        },
        UNSET_USER(state) {
            state.user = null
            state.isLoggedIn = false
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user)
        }, 
        unsetUser({ commit }) {
            commit('UNSET_USER')
            // reset the whole store
        }
    },
    getters: {
        // get user
        user(state){
            return state.user
        },
        // get user full names
        user_full_names(state){
            return `${state.user.sur_name} ${state.user.other_names}`
        },
        // get user username
        username(state){
            return state.user.user_name
        }
    },
}
