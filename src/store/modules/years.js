import apis from "@/services/apis";
const getDefaultState = () => ({
    // storage for all collegeYears
    collegeYears: {
        data: [],
        loaded: false
    },
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get collegeYears from backend
        getCollegeYears({ state }) {
            // when college years not loaded fetch them
            if (!state.collegeYears.loaded) {
                apis.get(`college-year`).then(d => {
                    state.collegeYears.data = d.data
                    //announce that data have been loaded
                    state.collegeYears.loaded = true
                })
            }
        },
        //create a facultyCollegeYear
        createCollegeYear({ state }, { year }) {
            return apis.create('college-year', year).then(d => {
                state.collegeYears.data.push(d.data)
            })
        },
    },
    getters: {

        loaded: state => {
            return state.collegeYears.loaded
        },
        //get all specified collegeYears
        collegeYears: state => {
            return state.collegeYears.data
        },
    },
}