import apis from "@/services/apis";
import router from '@/router'
export default {
    namespaced: true,
    state: {
        users: {
            data: [],
            loaded: false
        },
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
        //get users from backend
        getUsers({ state }, { collegeId }) {
            // if users not loaded fetch them
            if (!state.users.loaded) {
                apis.get(`instructor/college/${collegeId}`).then(d => {
                    state.users.data = d.data
                    apis.get(`student/college/${collegeId}`).then(_d => {
                        for (const i in _d.data) {
                            state.users.data.push(_d.data[i])
                        }
                        //announce that data have been loaded
                        state.users.loaded = true
                    })
                })
            }
        },
        //create a user
        createUser({ state }, { user, category }) {
            return apis.create(`${category}`, user).then(d => {
                state.users.data.push(d)
                router.push('/administration')
            })
        },
    },
    getters: {
        //get all users
        users: state => {
            return state.users.data
        },
        loaded: state => {
            return state.users.loaded
        },
    },
}
