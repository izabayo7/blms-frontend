import apis from "@/services/apis";
const getDefaultState = () => ({
    users: {
        data: [],
        loaded: false
    },
    selected_user: ''
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        SET_USER(state, user) {
            state.user = user
            state.isLoggedIn = true
        },
        UNSET_USER(state) {
            state.user = null
            state.isLoggedIn = false
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get users from backend
        getUsers({ state }, { collegeId }) {
            // if users not loaded fetch them
            if (!state.users.loaded) {

                apis.get(`user/college/${collegeId}`).then(d => {
                    d.data = d.data.data
                    for (const i in d.data) {
                        state.users.data.push(d.data[i])
                    }
                    //announce that data have been loaded
                    state.users.loaded = true
                })
            }
        },
        //create a user
        createUser({ state }, { user, category, facultyCollegeYear }) {
            let userObj = {}
            return apis.create(`${category}`, user).then(d => {
                userObj = d.data
                if (category == 'student') {
                    apis.create("student-faculty-college-year", {
                        student: d.data._id,
                        facultyCollegeYear: facultyCollegeYear,
                    }).then((_d) => {
                        userObj.studentFacultyCollegeYear = _d.data
                        state.users.data.push(userObj)
                    })
                } else {
                    state.users.data.push(userObj)
                }
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
        selected_user: state => {
            return state.users.data.filter(user => user._id == state.selected_user)[0]
        },
    },
}
