import apis from "@/services/apis";
// import router from '@/router'
export default {
    namespaced: true,
    state: {
        // storage for all facultyCollegeYears
        facultyCollegeYears: {
            data: [],
            loaded: false
        },
    },
    mutations: {
    },
    actions: {
        //get facultyCollegeYears from backend (currently I'm fetching all for faster development but in future we'll fetch according to the current logged in user)
        getFacultyCollegeYears({ state }, collegeId ) {
            apis.get(`faculty-college-year/college/${collegeId}`).then(d => {
                for (const i in d.data) {
                    d.data[i].name = `${d.data[i].facultyCollege.faculty.name} ${d.data[i].collegeYear.digit}`
                }
                state.facultyCollegeYears.data = d.data
                //announce that data have been loaded
                state.facultyCollegeYears.loaded = true
            })
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