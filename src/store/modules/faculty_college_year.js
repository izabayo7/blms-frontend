import apis from "@/services/apis";
const getDefaultState = () => ({
    // storage for all facultyCollegeYears
    faculty_college_years:{
        data:""
    }
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        SET_FACULTY_COLLEGE_YEARS(state,{data}){
            state.faculty_college_years.data = data
        }
    },
    actions: {
        getFacultyCollegeYearsByFaculty({commit}, {facultyId}) {
            apis.get(`faculty_college_year/college/${facultyId}`)
                .then(({data:{data}}) => {
                    commit('SET_FACULTY_COLLEGE_YEARS',{data})
                })
        }
    },
    getters: {
        facultyCollegeYears: state => {
            return state.faculty_college_years.data
        }
    },
}