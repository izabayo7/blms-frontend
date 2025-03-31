import Apis from "@/services/apis";

const getDefaultState = () => ({
    sidebar_expanded: true,
    page_actions_visible: true,
    group_model: false,
    college: {},
    plan: {},
    showChatMobileNavbar: false,
    total_unread_messages: 0,
    total_undone_assignments: 0,
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        //change state of side bar expansion
        TOGGLE_SIDEBAR_EXPANSION(state) {
            state.sidebar_expanded = !state.sidebar_expanded;
        },

        SET_TOTAL_UNREAD(state, {number, total_assignments}) {
            if (number)
                state.total_unread_messages = number
            if (total_assignments)
                state.total_undone_assignments = total_assignments
        },

        TOGGLE_CHAT_MOBILE_NAVBAR(state) {
            state.showChatMobileNavbar = !state.showChatMobileNavbar;
        },
        SET_COLLEGE_INFO(state, college) {
            state.college = college
        },
        SET_COLLEGE_PLAN(state, plan) {
            state.plan = plan
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
    actions: {
        async removeLogo({state}) {
            const splited = state.college.logo.split("/");
            // set the dialog
            await Apis.delete(`college/${state.college._id}/logo`, splited[splited.length - 1]);
            state.college.logo = undefined
        },
    },
    getters: {
        showChatMobileNavbar: (state) => state.showChatMobileNavbar,
    },
}
