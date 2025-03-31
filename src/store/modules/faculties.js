import apis from "@/services/apis";
const getDefaultState = () => ({
    // storage for all facultyCollegeYears
    facultyCollegeYears: {
        data: [],
        loaded: false
    },
    faculties: {
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
        //get facultyCollegeYears from backend (currently I'm fetching all for faster development but in future we'll fetch according to the current logged in user)
        getFacultyCollegeYears({ state }, collegeId) {
            // when faculty college years not loaded fetch them
            if (!state.facultyCollegeYears.loaded) {
                apis.get(`faculty-college-year/college/${collegeId}`).then(d => {
                    for (const i in d.data) {
                        d.data[i].name = `${d.data[i].facultyCollege.faculty.name} year ${d.data[i].collegeYear.digit}`
                    }
                    state.facultyCollegeYears.data = d.data
                    //announce that data have been loaded
                    state.facultyCollegeYears.loaded = true
                })
            }
        },
        //get faculties from backend (currently I'm fetching all for faster development but in future we'll fetch according to the current logged in user)
        getFaculties({ state }, collegeId) {
            // when faculties not loaded fetch them
            if (!state.facultyCollegeYears.loaded) {
                apis.get(`faculty/college/${collegeId}`).then(d => {
                    state.faculties.data = d.data
                    //announce that data have been loaded
                    state.faculties.loaded = true
                })
            }
        },
    },
    getters: {
        //get a specified facultyCollegeYears
        loaded: state => {
            return state.facultyCollegeYears.loaded
        },
        //get a specified facultyCollegeYear by name
        facultyCollegeYear: state => (name) => {
            return state.facultyCollegeYears.data.filter(facultyCollegeYear => facultyCollegeYear.name == name)[0]
        },
        //get all specified facultyCollegeYears
        facultyCollegeYears: state => {
            return state.facultyCollegeYears.data
        },
        //get all specified faculties
        faculties: state => {
            return state.faculties.data
        },
        //get a specified facultyCollegeYear by name
        facultyCollegeYearNames: state => {
            let facultyCollegeYearNames = []
            for (const element of state.facultyCollegeYears.data) {
                facultyCollegeYearNames.push(element.name)
            }
            return facultyCollegeYearNames
        },
    },
}