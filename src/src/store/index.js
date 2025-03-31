import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: {
            status: {
                stillMember: true,
                active: false
            },
            category: "Student",
            _id: "5f29143034d5ef2e7020ce78",
            surName: "Olivier",
            otherNames: "Umukura",
            nationalId: "0987654321123446",
            phone: "0987654321",
            gender: "Male",
            email: "umukura@gmail.com",
            password: "$2a$10$nV0PKYYLrTbC/hn4jF70Ne4IgG5eAMloJsIC2VSnBB2osaxxRi4Ba",
            college: "5f26a18c91af523bf4810bc8",
            DOB: "1993-01-01T00:00:00.000Z",
            __v: 0
        },
        isLoggedIn: true,
        sidebar: {
            visible: false,
            minivariant: false
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            state.isLoggedIn = true
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user)
        },
    },
})