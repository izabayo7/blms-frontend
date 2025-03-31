
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
        }
    },
    getters: {

    },
}
