import apis from "@/services/apis";
import router from '@/router'
export default {
    namespaced: true,
    state: {
        // storage for all courses
        courses: {
            data: [],
            loaded: false
        },
        // the current course's id (the one we are viewing or editing)
        selectedCourse: '',
        // the current chapter's id (the one we are viewing or editing)
        selectedChapter: '',
    },
    mutations: {
        // update the selectedCourse
        set_selected_course(state, id) {
            state.selectedCourse = id
        },
        // update the selectedChapter
        set_selected_chapter(state, id) {
            state.selectedChapter = id
        },
        // update progress of a student in a course
        set_student_progress(state, { courseId, progress }) {
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == courseId) {
                    state.courses.data[i].progress = { progress: progress.progress, dateStarted: progress.createdAt }
                    break
                }
            }
        },
    },
    actions: {
        //get courses from backend (mukanya)
        getCourses({ state }, { userCategory, userId }) {
            apis.get(`course/${userCategory}/${userId}`).then(d => {
                state.courses.data = d.data
                //announce that data have been loaded
                state.courses.loaded = true
            })
        },
        //get chapterMainContent from backend
        getChapterMainContent({ state, commit }, chapterId) {
            // set the selected chapter
            commit('set_selected_chapter', chapterId)
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    for (const k in state.courses.data[i].chapters) {
                        if (state.courses.data[i].chapters[k]._id == chapterId) {
                            // if it is arleady loaded then retun it
                            if (state.courses.data[i].chapters[k].documentContent) {
                                return state.courses.data[i].chapters[k].documentContent
                            }
                            else {
                                return apis.get(`file/chapterDocument/${chapterId}`).then(d => {
                                    state.courses.data[i].chapters[k].documentContent = d.data
                                    return d.data
                                })
                            }
                        }
                    }
                }
            }

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
        //update a course
        updateCourse({ state, commit }, { course, coverPicture }) {
            commit('modal/update_title', "Updating course", { root: true })
            commit('modal/update_message', "uploading changes", { root: true })
            commit('modal/toogle_visibility', null, { root: true })
            return apis.update('course', state.selectedCourse, course, {
                onUploadProgress: (progressEvent) => {
                    commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                }
            }).then(d => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        state.courses.data[i].name = d.data.name
                        state.courses.data[i].description = d.data.description
                        state.courses.data[i].facultyCollegeYear = d.data.facultyCollegeYear
                        break
                    }
                }
                if (coverPicture) {
                    commit('modal/update_message', `uploading ${coverPicture.name}`, { root: true })
                    const formData = new FormData()
                    formData.append("file", coverPicture)
                    apis.update('file/updateCourseCoverPicture', state.selectedCourse, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    })
                }
                setTimeout(() => {
                    commit('modal/toogle_visibility', null, { root: true })
                    commit('modal/reset_progress', null, { root: true })
                    commit('modal/reset_message', null, { root: true })
                    commit('modal/reset_title', null, { root: true })
                }, 1000);

            })

        },
        //update a chapter
        updateChapter({ state, commit }, { chapter, content, video, attachments }) {
            commit('modal/update_title', "Updating chapter", { root: true })
            commit('modal/update_message', "uploading changes", { root: true })
            commit('modal/toogle_visibility', null, { root: true })
            let courseIndex, chapterIndex
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    for (const k in state.courses.data[i].chapters) {
                        if (state.courses.data[i].chapters[k]._id == state.selectedChapter) {
                            courseIndex = i
                            chapterIndex = k
                            break
                        }
                    }
                    break
                }
            }
            return apis.update('chapter', state.selectedChapter, chapter, {
                onUploadProgress: (progressEvent) => {
                    commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                }
            }).then(d => {

                state.courses.data[courseIndex].chapters[chapterIndex].name = d.data.name
                state.courses.data[courseIndex].chapters[chapterIndex].description = d.data.description

                if (content) {
                    commit('modal/update_progress', 0, { root: true })
                    commit('modal/update_message', `uploading content`, { root: true })
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update('file/updateChapterContent', state.selectedChapter, { content: content }, {
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then(()=>{
                        state.courses.data[courseIndex].chapters[chapterIndex].documentContent = content
                    })
                }
                if (video) {
                    commit('modal/update_progress', 0, { root: true })
                    commit('modal/update_message', `uploading ${video.name}`, { root: true })
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update('file/updateMainVideo', state.selectedChapter, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    })
                } if (attachments.length > 0) {
                    commit('modal/update_progress', 0, { root: true })
                    commit('modal/update_message', `uploading attachments`, { root: true })
                    const formData = new FormData()
                    for (const i in attachments) {
                        formData.append("files[" + i + "]", attachments[i]);
                    }
                    apis.create(`file/addAttachments/${state.selectedChapter}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then((chapterResponse)=>{
                        for (const i in chapterResponse.data) {
                            state.courses.data[courseIndex].chapters[chapterIndex].attachments.push(chapterResponse.data[i])
                        }
                    })
                    
                }
                setTimeout(() => {
                    commit('modal/toogle_visibility', null, { root: true })
                    commit('modal/reset_progress', null, { root: true })
                    commit('modal/reset_message', null, { root: true })
                    commit('modal/reset_title', null, { root: true })
                }, 1000);

            })

        },
        //publish a course
        tooglePublishCourse({ state }, courseId) {
            console.log(state.selectedCourse || courseId)
            apis.update('course/tooglePublishment', state.selectedCourse || courseId).then(d => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        state.courses.data[i].published = d.data.published
                        break
                    }
                }
            })
        },
        //delete a course
        deleteCourse({ state }) {
            apis.delete('course', state.selectedCourse).then(() => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        state.courses.data.splice(i, 1)
                        break
                    }
                }
                router.push('/courses')
            })
        },
        //delete an attachment
        deleteAttachment({ state }, attachmentId) {
            apis.delete('file/removeAttachment', attachmentId).then(() => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        for (const k in state.courses.data[i].chapters) {
                            if (state.courses.data[i].chapters[k]._id == state.selectedChapter) {
                                for (const l in state.courses.data[i].chapters[k].attachments) {
                                    if (state.courses.data[i].chapters[k].attachments[l]._id == attachmentId) {
                                        state.courses.data[i].chapters[k].attachments.splice(l, 1)
                                        return
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },
        //find a course by name
        findCourseByName({ commit, dispatch }, { userCategory, userId, courseName }) {
            return dispatch('getCourse', {
                userCategory: userCategory,
                userId: userId,
                courseName: courseName
            }).then((course) => {
                commit('set_selected_course', course._id)
            })
        },
        // create student progress in a lesson
        startCourse({ state, commit }, studentId) {
            apis.create(`studentProgress`, { student: studentId, course: state.selectedCourse }).then(d => {
                commit('set_student_progress', { courseId: state.selectedCourse, progress: d.data })
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        router.push(`/courses/${state.courses.data[i].name}`)
                        break
                    }
                }
            })
        },
    },
    getters: {
        //get a specified courses
        loaded: state => {
            return state.courses.loaded
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
            return state.courses.data.filter(course => course.progress ? course.progress.progress < 100 : !course.progress)
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