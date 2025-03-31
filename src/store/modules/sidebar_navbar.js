
export default {
    namespaced:true,
    state:{
        sidebar_expanded:false,
        group_model:false
    },
    mutations:{
        //change state of side bar expansion
        TOGGLE_SIDEBAR_EXPANSION(state){
            state.sidebar_expanded = !state.sidebar_expanded;
        },
        TOGGLE_GROUP_MODEL_VISIBILITY(state){
          state.group_model = !state.group_model
        }
    },
    actions:{},
    getters:{},
}
