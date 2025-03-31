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
        // initialise a new chapter
        initialise_new_chapter(state) {
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    state.courses.data[i].chapters.push({
                        name: '',
                        description: '',
                        quiz: [],
                        attachments: []
                    })
                }
            }
        },
        // update progress of a student in a course
        set_student_progress(state, { courseId, progress }) {
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == courseId) {
                    state.courses.data[i].progress = { id: progress._id, progress: progress.progress, dateStarted: progress.createdAt }
                    break
                }
            }
        },
    },
    actions: {
        //get courses from backend
        getCourses({ state }, { userCategory, userId }) {
            // if courses not loaded fetch them
            if (!state.courses.loaded) {
                apis.get(`course/${userCategory}/${userId}`).then(d => {
                    state.courses.data = d.data
                    //announce that data have been loaded
                    state.courses.loaded = true
                })
            }
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
        //create a course
        createCourse({ state, commit, dispatch }, { course, coverPicture }) {
            let courseObject = {}
            return apis.create('course', course).then(d => {

                courseObject._id = d.data._id
                courseObject.name = d.data.name
                courseObject.description = d.data.description
                courseObject.facultyCollegeYear = d.data.facultyCollegeYear

                commit('set_selected_course', d.data._id)

                if (coverPicture) {
                    // set the dialog
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Creating Course', message: `uploading ${coverPicture.name}` }, { root: true })
                    const formData = new FormData()
                    formData.append("file", coverPicture)
                    apis.update('file/updateCourseCoverPicture', d.data._id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then(courseData => {
                        courseObject.coverPicture = courseData.data.coverPicture
                        dispatch('modal/reset_modal', null, { root: true })
                    })
                }
                courseObject.chapters = []
                state.courses.data.push(courseObject)
                commit('initialise_new_chapter')
            })

        },
        //update a course
        updateCourse({ state, commit, dispatch }, { course, coverPicture }) {
            let courseIndex
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    courseIndex = i
                    break
                }
            }

            return apis.update('course', state.selectedCourse, course).then(d => {

                state.courses.data[courseIndex].name = d.data.name
                state.courses.data[courseIndex].description = d.data.description
                state.courses.data[courseIndex].facultyCollegeYear = d.data.facultyCollegeYear

                if (coverPicture) {
                    // set the dialog
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Updating Course', message: `uploading ${coverPicture.name}` }, { root: true })
                    const formData = new FormData()
                    formData.append("file", coverPicture)
                    apis.update('file/updateCourseCoverPicture', state.selectedCourse, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then(courseData => {
                        state.courses.data[courseIndex].coverPicture = courseData.data.coverPicture
                        dispatch('modal/reset_modal', null, { root: true })
                    })
                }
            })

        },
        //update a chapter
        updateChapter({ state, commit, dispatch }, { chapter, content, video, attachments, quiz }) {

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
            return apis.update('chapter', state.selectedChapter, chapter).then(() => {

                if (content) {
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update('file/updateChapterContent', state.selectedChapter, { content: content }).then(() => {
                        state.courses.data[courseIndex].chapters[chapterIndex].documentContent = content
                    })
                }
                if (quiz) {
                    const quizId = quiz._id
                    // add quiz target
                    quiz.target = {
                        id: state.selectedChapter,
                        type: 'chapter'
                    }
                    //   remove unnecessary fields
                    quiz._id = undefined
                    quiz.__v = undefined
                    quiz.createdAt = undefined
                    quiz.updatedAt = undefined
                    for (const k in quiz.questions) {
                        if (quiz.questions[k].options) {
                            for (const j in quiz.questions[k].options.choices) {
                                if (quiz.questions[k].options.choices[j].src) {
                                    if (quiz.questions[k].options.choices[j].src.includes('http')) {
                                        const mediapath = quiz.questions[k].options.choices[j].src
                                        quiz.questions[k].options.choices[j].src = mediapath.split("/")[mediapath.split("/").length - 1]
                                    }
                                }
                            }
                        }
                    }
                    apis.update('quiz', quizId, quiz).then((quizResponse) => {
                        state.courses.data[courseIndex].chapters[chapterIndex].quiz.push(quizResponse.data)
                        commit('quiz/add_quiz_target', { id: quizId, target: quiz.target }, { root: true })
                    })

                }
                if (video) {
                    // set the dialog
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Updating Chapter', message: `uploading ${video.name}` }, { root: true })
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update('file/updateMainVideo', state.selectedChapter, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            console.log(progressEvent)
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then((videoResponse) => {
                        state.courses.data[courseIndex].chapters[chapterIndex].mainVideo = videoResponse.data.filepath
                        dispatch('modal/reset_modal', null, { root: true })
                    })
                } if (attachments.length > 0) {
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Updating Chapter', message: `uploading attachments` }, { root: true })
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
                    }).then((chapterResponse) => {
                        for (const i in chapterResponse.data) {
                            state.courses.data[courseIndex].chapters[chapterIndex].attachments.push(chapterResponse.data[i])
                        }
                        dispatch('modal/reset_modal', null, { root: true })
                    })

                }
            })

        },
        //publish a course
        tooglePublishCourse({ state, commit, rootGetters }, courseId) {
            if (courseId)
                commit('set_selected_course', courseId)

            apis.update('course/tooglePublishment', state.selectedCourse).then(d => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        state.courses.data[i].published = d.data.published
                        break
                    }
                }
                if (d.data.published) {
                    rootGetters['chat/socket'].emit('course-published', { courseId: d.data._id })
                }
            })
        },
        //delete a course
        delete_course({ state }) {
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
        //delete a course
        delete_chapter({ state }, { id }) {
            apis.delete('chapter', id).then(() => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        for (const k in state.courses.data[i].chapters) {
                            if (state.courses.data[i].chapters[k]._id == id) {
                                state.courses.data[i].chapters.splice(k, 1)
                                break
                            }
                        }
                        break
                    }
                }
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
        findCourseByName({ state, commit }, { userCategory, userId, courseName }) {
            let courseFound = false
            if (state.courses.loaded) {
                let courses = state.courses.data.filter(course => course.name == courseName)

                if (courses.length > 0) {
                    courseFound = true
                    commit('set_selected_course', courses[0]._id)
                    return courses[0]
                }
            }
            if (!courseFound) {
                return apis.get(`course/${userCategory}/${userId}/${courseName}`).then(d => {
                    if (state.courses.loaded) {
                        state.courses.data.push(d.data)
                    } else {
                        state.courses.data = [d.data]
                    }
                    commit('set_selected_course', d.data._id)
                    return d.data
                })
            }

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
        // update student progress
        finish_chapter({ state, commit }, studentId) {
            let courseIndex
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    courseIndex = i
                    break
                }
            }
            return apis.update(`studentProgress`, state.courses.data[courseIndex].progress.id, { student: studentId, course: state.selectedCourse, chapter: state.selectedChapter }).then(d => {
                commit('set_student_progress', { courseId: state.selectedCourse, progress: d.data })

                return { id: d.data._id, progress: d.data.progress, dateStarted: d.data.createdAt }

            })
        },
        // initialise new chapter
        initialise_new_chapter({ commit }) {
            commit('initialise_new_chapter');
        },
        //create a new chapter
        createChapter({ state, commit, dispatch }, { chapter, content, video, attachments, quiz }) {

            let courseIndex, chapterIndex
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    courseIndex = i
                    chapterIndex = state.courses.data[i].chapters.length - 1
                    break
                }
            }
            return apis.create('chapter', chapter).then(d => {

                if (content) {
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update('file/updateChapterContent', d.data._id, { content: content }).then(() => {
                        state.courses.data[courseIndex].chapters[chapterIndex].documentContent = content
                    })
                }
                if (quiz) {
                    const quizId = quiz._id
                    // add quiz target
                    quiz.target = {
                        id: d.data._id,
                        type: 'chapter'
                    }
                    // for (const k in quiz.questions) {
                    //     if (quiz.questions[k].options) {
                    //         for (const j in quiz.questions[k].options.choices) {
                    //             if (quiz.questions[k].options.choices[j].src.includes('http')) {
                    //                 const mediapath = quiz.questions[k].options.choices[j].src
                    //                 quiz.questions[k].options.choices[j].src = mediapath.split("/")[mediapath.split("/").length - 1]
                    //             }
                    //         }
                    //     }
                    // }
                    apis.update('quiz', quizId, quiz).then((quizResponse) => {
                        state.courses.data[courseIndex].chapters[chapterIndex].quiz.push(quizResponse.data)
                        commit('quiz/add_quiz_target', { id: quizId, target: quiz.target }, { root: true })
                    })

                }
                if (video) {
                    // set the dialog
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Saving Chapter', message: `uploading ${video.name}` }, { root: true })
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update('file/updateMainVideo', d.data._id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then((videoResponse) => {
                        state.courses.data[courseIndex].chapters[chapterIndex].mainVideo = videoResponse.data.filepath
                        dispatch('modal/reset_modal', null, { root: true })
                    })
                } if (attachments.length > 0) {
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Saving Chapter', message: `uploading attachments` }, { root: true })
                    const formData = new FormData()
                    for (const i in attachments) {
                        formData.append("files[" + i + "]", attachments[i]);
                    }
                    apis.create(`file/addAttachments/${d.data._id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then((chapterResponse) => {
                        for (const i in chapterResponse.data) {
                            state.courses.data[courseIndex].chapters[chapterIndex].attachments.push(chapterResponse.data[i])
                        }
                        dispatch('modal/reset_modal', null, { root: true })
                    })

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
        //get all courses
        courses: state => {
            return state.courses.data
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