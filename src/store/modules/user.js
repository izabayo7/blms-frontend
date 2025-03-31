
export default {
    namespaced:true,
    state:{
        user:null,
        isLoggedIn:false
    },
    mutations:{
        SET_USER(state, user) {
            state.user = user
            state.isLoggedIn = true
        },
    },
    actions:{
        setUser({commit},user){
            commit('SET_USER',user)
        }
    },
    getters:{

    },
}
