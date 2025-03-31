const getDefaultState = () => ({
    sidebar_expanded: true,
    group_model: false
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        //change state of side bar expansion
        TOGGLE_SIDEBAR_EXPANSION(state) {
            state.sidebar_expanded = !state.sidebar_expanded;
        },
        TOGGLE_GROUP_MODEL_VISIBILITY(state) {
            state.group_model = !state.group_model
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {},
    getters: {},
}
