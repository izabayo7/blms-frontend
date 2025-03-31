import apis from "@/services/apis";

export default {
    namespaced: true,
    state: {
        course_details: {
            data: [],
            loaded: false
        },
        // storage for all courses
        courses: {
            data: [],
            loaded: false
        },
        // the current course's id (the one we are viewing or editing)
        selectedCourse: ''
    },
    mutations: {
        // update the selectedCourse
        set_selected_course(state, id) {
            state.selectedCourse = id
        },
        // update progress of a student in a course
        set_student_progress(state, {courseId, progress}) {
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == courseId) {
                    state.courses.data[i].progress = {progress: progress.progress, dateStarted: progress.createdAt}
                }
            }
        }
    },
    actions: {
        //get courses from backend
        getCourseDetails({ state }, id) {
            apis.get(`course/${id}`).then(d => {
                state.course_details.data = d.data
                //announce that data have been loaded
                state.course_details.loaded = true
            })
        },
        //get courses from backend
        getCourses({ state }, { userCategory, userId }) {
            apis.get(`course/${userCategory}/${userId}`).then(d => {
                state.courses.data = d.data
                //announce that data have been loaded
                state.courses.loaded = true
            })
        },
        //get a course by name from backend
        getCourse({ state }, { userCategory, userId, courseName }) {
            if (state.courses.data.length < 1) {
                return apis.get(`course/${userCategory}/${userId}/${courseName}`).then(d => {
                    state.courses.data = [d.data]
                    return d.data
                })
            }
            return state.courses.data.filter(course => course.name == courseName)[0]
        },
        //find a course by name
        findCourseByName({ commit, dispatch }, { userCategory, userId, courseName }) {
            return dispatch('getCourse', {
                userCategory: userCategory,
                userId: userId,
                courseName: courseName
            }).then((course) => {
                commit('set_selected_course', course._id)
                return course
            })
        },
        //startCourse
        startCourse({ state, commit }, studentId) {
            return apis.cteate(`studentProgress`,{student: studentId, course: state.selectedCourse}).then(d => {
                commit('set_student_progress', {courseId: state.selectedCourse, progress: d.data})
                return 'OK'
            })
        },
    },
    getters: {
        //get a specified courses
        loaded: state => {
            return state.courses.data.loaded
        },
        //get the selectedCourse
        selectedCourse: state => {
            return state.selectedCourse
        },
        //get a specified courses
        course: state => {
            return state.courses.data.filter(course => course._id == state.selectedCourse)[0]
        },
        //get ongoing courses (student)
        ongoingCourses: state => {
            return state.courses.data.filter(course => course.progress ? course.progress.progress < 100 : false)
        },
        //get finished courses (student)
        finishedCourses: state => {
            return state.courses.data.filter(course => course.progress ? course.progress.progress == 100 : false)
        },
        //get published courses (instructor)
        publishedCourses: state => {
            return state.courses.data.filter(course => course.published)
        },
        //get unpublished courses (instructor)
        unpublishedCourses: state => {
            return state.courses.data.filter(course => !course.published)
        }
    },
}