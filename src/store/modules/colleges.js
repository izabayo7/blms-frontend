import apis from "@/services/apis";
import router from '@/router'
const getDefaultState = () => ({
    colleges: {
        data: [],
        loaded: false
    },
    selected_college: ''
})
export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        // update the selected college
        set_selected_college(state, id) {
            state.selected_college = id
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get college from backend
        getColleges({ state }) {
            // if colleges not loaded fetch them
            if (!state.colleges.loaded) {
                apis.get(`college`).then(d => {
                    d.data = d.data.data
                    state.colleges.data = d.data
                    //announce that data have been loaded
                    state.colleges.loaded = true
                })
            }
        },
        //get college  by Id
        getCollegeById({ state, commit }, { collegeId }) {
            // if colleges not loaded fetch them
            if (!state.colleges.loaded) {
                apis.get(`college/${collegeId}`).then(d => {
                    d.data = d.data.data
                    state.colleges.data = [d.data]
                    commit('set_selected_college', d.data._id)
                    //announce that data have been loaded
                    state.colleges.loaded = true
                })
            }
        },
        //find a college by name
        findCollegeByName({ state, commit }, { collegeName }) {
            let collegeFound = false
            if (state.colleges.loaded) {
                let colleges = state.colleges.data.filter(college => college.name == collegeName)

                if (colleges.length > 0) {
                    collegeFound = true
                    commit('set_selected_college', colleges[0]._id)
                    return colleges[0]
                }
            }
            if (!collegeFound) {
                return apis.get(`college/name/${collegeName}`).then(d => {
                    d.data = d.data.data
                    if (state.colleges.loaded) {
                        state.colleges.data.push(d.data)
                    } else {
                        state.colleges.data = [d.data]
                    }
                    commit('set_selected_college', d.data._id)
                    return d.data
                })
            }

        },
        //create a college
        createCollege({ state }, { college }) {
            return apis.create('college', college).then(d => {
                state.colleges.data.push(d.data.data)
                router.push('/administration')
            })
        },
        //update a college
        updateCollege({ state, dispatch }, { college, logo }) {
            let collegeIndex
            for (const i in state.colleges.data) {
                if (state.colleges.data[i]._id == state.selected_college) {
                    collegeIndex = i
                    break
                }
            }

            return apis.update('college', state.selected_college, college).then(d => {
                
                d.data = d.data.data

                state.colleges.data[collegeIndex].name = d.data.name
                state.colleges.data[collegeIndex].email = d.data.email
                state.colleges.data[collegeIndex].phone = d.data.phone
                state.colleges.data[collegeIndex].location = d.data.location

                if (logo) {
                    // set the dialog
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Updating College', message: `uploading ${logo.name}` }, { root: true })
                    const formData = new FormData()
                    formData.append("file", logo)
                    apis.update('file/updateCollegeLogo', state.selected_college, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then(collegeData => {
                        state.colleges.data[collegeIndex].logo = collegeData.data.data.logo
                    })
                }
            })

        },
    },
    getters: {
        //get the selected_college
        selected_college: state => {
            return state.selected_college
        },
        //get all colleges
        colleges: state => {
            return state.colleges.data
        },
        //get a specified colleges
        college: state => {
            return state.colleges.data.filter(college => college._id == state.selected_college)[0]
        },
        c_loaded: state => {
            return state.colleges.loaded
        },
    },
}
