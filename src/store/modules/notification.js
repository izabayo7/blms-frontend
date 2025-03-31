import apis from "@/services/apis";

const getDefaultState = () => ({
    // storage for all notifications
    notifications: {
        data: [],
        loaded: false
    },
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        addNotification(state, value) {
            if (state.notifications.data.indexOf(value) < 0)
                state.notifications.data.unshift(value)
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get notifications from backend
        getNotifications({state}) {
            // when faculty college years not loaded fetch them
            if (!state.notifications.loaded) {
                apis.get(`user_notification/user`).then(d => {
                    state.notifications.data = d.data.data
                    //announce that data have been loaded
                    state.notifications.loaded = true
                })
            }
        },
    },
    getters: {
        loaded: state => {
            return state.notifications.loaded
        },
        //get all notifications
        notifications: state => {
            return state.notifications.data
        },
    },
}