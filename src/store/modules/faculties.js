import apis from "@/services/apis";

const getDefaultState = () => ({
    // storage for all facultyCollegeYears
    facultyCollegeYears: {
        data: [],
        loaded: false,
    },
    faculties: {
        data: [],
        loaded: false
    },
    faculty: {
        data: [],
        loaded: false,
    },
    selected_faculty: "",
    importable_faculties: {
        data: [],
        loaded: false
    },
    header: {
        head: "",
        title: ""
    }
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        },

        //mutating page header
        SET_HEADER(state, header) {
            state.header = header;
        },
        UPDATE_FACULTY(state, {id, name, description}) {
            for (const i in state.faculties.data) {
                if (state.faculties.data[i]._id == id) {
                    state.faculties.data[i].name = name
                    state.faculties.data[i].description = description
                    break;
                }
            }
        }
    },
    actions: {
        //get facultyCollegeYears from backend
        getFacultyCollegeYears({state}) {
            // when faculty college years not loaded fetch them
            if (!state.facultyCollegeYears.loaded) {
                apis.get(`user_groups/user`).then(d => {
                    d.data = d.data.data
                    // for (const i in d.data) {
                    //     d.data[i].name = `${d.data[i].faculty_college.faculty.name} year ${d.data[i].college_year.digit}`
                    // }
                    state.facultyCollegeYears.data = d.data
                    //announce that data have been loaded
                    state.facultyCollegeYears.loaded = true
                })
            }
        },
        //create a facultyCollegeYear
        createFacultyCollegeYear({state}, {facultyCollegeYear}) {
            return apis.create('faculty_college_year', facultyCollegeYear).then(d => {
                state.facultyCollegeYears.data.push(d.data)
            })
        },
        //get faculties from backend
        async getFaculties({state}) {
            // when faculties not loaded fetch them
            if (!state.faculties.loaded) {
                const {data: {data}} = await apis.get(`faculty/ALL`)
                state.faculties.data = data
                //announce that data have been loaded
                state.faculties.loaded = true
            }
        },
        async getFaculty({state, dispatch}, facultyId) {
            // when faculties not loaded fetch them
            if (state.selected_faculty !== facultyId) {
                state.selected_faculty = facultyId
            }
            if (!state.faculties.loaded)
                dispatch("getFaculties")
        },
        //get faculties that a college can imoprt from backend
        getImportableFaculties({state}, {collegeId}) {
            // when faculties not loaded fetch them
            if (!state.importable_faculties.loaded) {
                apis.get(`faculty/import/college/${collegeId}`).then(d => {
                    state.importable_faculties.data = d.data
                    //announce that data have been loaded
                    state.importable_faculties.loaded = true
                })
            }
        },
        //create a faculty
        // eslint-disable-next-line no-empty-pattern
        createFaculty({}, {faculty}) {
            return apis.create('faculty', faculty)
        },
        //create a faculty_college
        createFacultyCollege({state}, {faculty, college}) {
            return apis.create('faculty-college', {faculty: faculty, college: college}).then((d) => {
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

        //page header
        changeHeader({commit}, header) {
            commit("SET_HEADER", header)
        }
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
        // get faculty
        faculty: state => {
            if (!state.faculties.data.length)
                return undefined
            return state.faculties.data.filter(e => e._id === state.selected_faculty)[0]
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

        // getting page header
        header: state => {
            return state.header
        }
    },
}