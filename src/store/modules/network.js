const getDefaultState = () => ({
    onLine: true,
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        changeNetworkStatus(state, value) {
            state.onLine = value
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {},
    getters: {
        onLine: state => {
            return state.onLine
        }
    },
}