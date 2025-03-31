const getDefaultState = () => ({
    sidebar_expanded: true,
    page_actions_visible: true,
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
        // page action is a right side bar used in live on small devices
        TOGGLE_PAGE_ACTIONS_VISIBILITY(state) {
            state.page_actions_visible = !state.page_actions_visible;
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
