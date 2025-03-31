export default {
    namespaced: true,
    state: {
        show: false,
        message: "",
        status: "info"
    },
    mutations: {
        RESET_NOTIFICATION(state) {
            state.show = false
            state.message = ""
            state.status = "info"
        }
    },
    actions: {
        SET_NOTIFICATION({ state, commit }, { message, status, uptime }) {
            console.log(message, status, uptime)
            state.message = message
            state.status = status
            state.show = true
            setTimeout(() => {
                commit('RESET_NOTIFICATION')
            }, uptime);
        },
    },
    getters: {
        show(state) {
            return state.show
        },
        message(state) {
            return state.message
        },
        status(state) {
            return state.status
        }
    }
}
