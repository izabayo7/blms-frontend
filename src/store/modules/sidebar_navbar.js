
export default {
    namespaced:true,
    state:{
        sidebar_expanded:false,
    },
    mutations:{
        //change state of side bar expansion
        TOGGLE_SIDEBAR_EXPANSION(state){
            state.sidebar_expanded = !state.sidebar_expanded;
        }
    },
    actions:{},
    getters:{},
}
