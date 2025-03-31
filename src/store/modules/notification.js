import apis from "@/services/apis";
export default {
    namespaced: true,
    state: {
        // storage for all notifications
        notifications: {
            data: [],
            loaded: false
        },
    },
    mutations: {
        addNotification(state, value) {
            console.log(value)
            state.notifications.data.push(value)
        }
    },
    actions: {
        //get notifications from backend
        getNotifications({ state }, userId) {
            // when faculty college years not loaded fetch them
            if (!state.notifications.loaded) {
                apis.get(`user_notification/user/${userId}`).then(d => {
                    state.notifications.data = d.data
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