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
    importable_faculties: {
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
        //get facultyCollegeYears from backend
        getFacultyCollegeYears({ state }, user) {
            // when faculty college years not loaded fetch them
            if (!state.facultyCollegeYears.loaded) {
                apis.get(`faculty_college_year/user/${user}`).then(d => {
                    d.data = d.data.data
                    for (const i in d.data) {
                        d.data[i].name = `${d.data[i].faculty_college.faculty.name} year ${d.data[i].college_year.digit}`
                    }
                    state.facultyCollegeYears.data = d.data
                    //announce that data have been loaded
                    state.facultyCollegeYears.loaded = true
                })
            }
        },
        //create a facultyCollegeYear
        createFacultyCollegeYear({ state }, { facultyCollegeYear }) {
            return apis.create('faculty_college_year', facultyCollegeYear).then(d => {
                state.facultyCollegeYears.data.push(d.data)
            })
        },
        //get faculties from backend
        getFaculties({ state }, collegeId) {
            // when faculties not loaded fetch them
            if (!state.faculties.loaded) {
                apis.get(`faculty/college/${collegeId}`).then(d => {
                    state.faculties.data = d.data
                    //announce that data have been loaded
                    state.faculties.loaded = true
                })
            }
        },
        //get faculties that a college can imoprt from backend
        getImportableFaculties({ state }, { collegeId }) {
            // when faculties not loaded fetch them
            if (!state.importable_faculties.loaded) {
                console.log(collegeId)
                apis.get(`faculty/import/college/${collegeId}`).then(d => {
                    state.importable_faculties.data = d.data
                    //announce that data have been loaded
                    state.importable_faculties.loaded = true
                })
            }
        },
        //create a faculty
        // eslint-disable-next-line no-empty-pattern
        createFaculty({ }, { faculty }) {
            return apis.create('faculty', faculty)
        },
        //create a faculty_college
        createFacultyCollege({ state }, { faculty, college }) {
            return apis.create('faculty-college', { faculty: faculty, college: college }).then((d) => {
                state.faculties.data.push({
                    name: d.data.faculty.name,
                    attendants: 0,
                    teacher: "under development",
                    _id: d.data.faculty._id,
                    facultyCollegeId: d.data._id
                })
                for (const i in state.importable_faculties.data) {
                    if (state.importable_faculties.data[i]._id == d.data.faculty._id) {
                        state.importable_faculties.data.splice(i, 1)
                        break
                    }
                }
            })
        },
    },
    getters: {

        loaded: state => {
            return state.facultyCollegeYears.loaded
        },
        f_loaded: state => {
            return state.faculties.loaded
        },
        i_loaded: state => {
            return state.importable_faculties.loaded
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
        //get all specified importable_faculties
        importable_faculties: state => {
            return state.importable_faculties.data
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