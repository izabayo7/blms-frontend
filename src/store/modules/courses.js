import apis from "@/services/apis";

export default {
    namespaced:true,
    state:{
        course_details:{
            data:[],
            loaded:false
        }
    },
    mutations:{},
    actions:{
        //get courses from backend
        getCourseDetails({state},id){
           apis.get(`course/${id}`).then( d=> {
               state.course_details.data = d.data
               //announce that data have been loaded
               state.course_details.loaded = true
           })
        }
    },
    getters:{},
}