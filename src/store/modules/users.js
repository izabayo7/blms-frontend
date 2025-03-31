import apis from "@/services/apis";

const getDefaultState = () => ({
    users: {
        data: [],
        loaded: false
    },
    selected_user: '',
    search_results: {
        data: []
    },
    usersBasedOnFaculties:{
        data:"",
    },
    userByUsername:{
        data:"",
        loaded:false,
    }
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
        },
        SET_USERS_ON_FACULTIES(state,{data}){
            state.usersBasedOnFaculties.data = data;
        },
        SET_USER_BY_USERNAME(state,user){
            state.userByUsername.data = user
        },
        SET_USER_BY_USERNAME_LOADER(state,status){
            state.userByUsername.loaded = status
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

        getUserByUsername({commit},userName){
            commit("SET_USER_BY_USERNAME_LOADER",false)
            commit("SET_USER_BY_USERNAME","")


            apis.get(`user/${userName}`)
                .then(({data:{data}}) => {

                    commit("SET_USER_BY_USERNAME",data)
                    commit("SET_USER_BY_USERNAME_LOADER",true)
            })
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
        searchUser({ state }, { query, page, limit }) {
            let url = `user/search?data=${query}`
            url += page ? `&page=${page}` : ''
            url += limit ? `&limit=${limit}` : ''

            return apis.get(url).then((d) => {
                d.data = d.data.data
                state.search_results.data = d.data.results
                return d.data.results
            })
        },
        searchNewGroupMembers({ state }, { group_code, query, page, limit }) {
            let url = `chat_group/${group_code}/search_members?data=${query}`
            url += page ? `&page=${page}` : ''
            url += limit ? `&limit=${limit}` : ''

            return apis.get(url).then((d) => {
                d.data = d.data.data
                state.search_results.data = d.data.results
                return d.data.results
            })
        },

        loadUsersBasedOnFaculties({commit},{facultyId,category}){
            apis.get(`user/faculty/${facultyId}/${category}`)
                .then(({data:{data}})=> {
                    console.log(data);
                    commit("SET_USERS_ON_FACULTIES",{data})
                })
        }
    },
    getters: {
        //get all users
        users: state =>  state.users.data
        ,
        user_search_results: state =>  state.search_results.data
        ,
        loaded: state =>  state.users.loaded
        ,
        selected_user: state => {
            return state.users.data.filter(user => user._id == state.selected_user)[0]
        },
        usersOnFaculties: state => {
            return state.usersBasedOnFaculties.data;
        },
        userByUsername: state => state.userByUsername.data,
        userByUsernameLoading: state=> !state.userByUsername.loaded
    },
}
