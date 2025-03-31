import apis from "@/services/apis";

const getDefaultState = () => ({
    // storage for all facultyCollegeYears
    faculty_college_years: {
        data: undefined,
        selected: ""
    }
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        SET_FACULTY_COLLEGE_YEARS(state, {data}) {
            state.faculty_college_years.data = data
        },
        SET_SELECTED_FACULTY_COLLEGE_YEAR(state, id) {
            state.faculty_college_years.selected = id
        }
    },
    actions: {
        getFacultyCollegeYearsByFaculty({commit}, {facultyId}) {
            apis.get(`user_groups/college/${facultyId}`)
                .then(({data: {data}}) => {
                    commit('SET_FACULTY_COLLEGE_YEARS', {data})
                })
        }
    },
    getters: {
        facultyCollegeYears: state => {
            return state.faculty_college_years.data
        },
        facultyCollegeYear: state => {
            if (!state.faculty_college_years.data)
                return undefined
            return state.faculty_college_years.data.filter(e => e._id === state.faculty_college_years.selected)[0]
        }
    },
}