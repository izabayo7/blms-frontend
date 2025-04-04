import apis from "@/services/apis";
import router from '@/router'

const getDefaultState = () => ({
    // storage for all courses
    courses: {
        data: [],
        loaded: false
    },
    // the current course's id (the one we are viewing or editing)
    selectedCourse: '',
    // the current chapter's id (the one we are viewing or editing)
    selectedChapter: '',
    totalCommentsOnAChapter: "",  //total number of comments based on chapter
    coursesByFaculty: {
        data: ""
    },
    coursesByUserGroup: {
        data: ""
    }
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        // update the selectedCourse
        set_selected_course(state, id) {
            state.selectedCourse = id
        },
        // update the selectedChapter
        set_selected_chapter(state, id) {
            state.selectedChapter = id
        },
        // update number of total comments
        SET_TOTAL_COMMENTS_ON_A_CHAPTER(state, num) {
            state.totalCommentsOnAChapter = num
        },
        // update number of total comments
        DELETE_TOTAL_COMMENTS_ON_A_CHAPTER(state) {
            state.totalCommentsOnAChapter = ""
        },
        // initialise a new chapter
        initialise_new_chapter(state) {
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    state.courses.data[i].chapters.push({
                        name: '',
                        description: '',
                        quiz: [],
                        attachments: [],
                        status: 1
                    })
                }
            }
        },
        // add a new course
        addCourse(state, value) {
            state.courses.data.unshift(value)
        },
        // update progress of a student in a course
        set_student_progress(state, {courseId, progress}) {
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == courseId) {
                    state.courses.data[i].progress = {
                        id: progress._id,
                        progress: progress.progress,
                        dateStarted: progress.createdAt,
                        lastUpdated: progress.updatedAt
                    }
                    break
                }
            }
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        },
        SET_COURSE_BY_FACULTY(state, {data}) {
            state.coursesByFaculty.data = data;
        },
        SET_COURSE_BY_USERGROUP(state, {data}) {
            state.coursesByUserGroup.data = data;
        }
    },
    actions: {
        //get courses from backend
        getCourses({state}, load_new = true) {

            // if courses not loaded fetch them
            if (load_new) {
                state.courses.data = []
                state.courses.loaded = false
                apis.get(`course/user`).then(d => {
                    d.data = d.data.data
                    state.courses.data = d.data
                    //announce that data have been loaded
                    state.courses.loaded = true
                })
            }
        },

        // get faculty courses
        getCourseByFaculty({commit}, {facultyId}) {
            apis.get(`course/faculty/${facultyId}`)
                .then(({data: {data}}) => {
                    commit('SET_COURSE_BY_FACULTY', {data})
                })
        },
        getCourseByUserGroup({commit}, {Id}) {
                apis.get(`course/user_group/${Id}`)
                .then(({data: {data}}) => {
                    commit('SET_COURSE_BY_USERGROUP', {data})
                })
        },

        //get chapterMainContent from backend
        getChapterMainContent({state, commit}, chapterId) {
            // set the selected chapter
            commit('set_selected_chapter', chapterId)
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    for (const k in state.courses.data[i].chapters) {
                        if (state.courses.data[i].chapters[k]._id == chapterId) {
                            // if it is arleady loaded then retun it
                            if (state.courses.data[i].chapters[k].documentContent) {
                                return state.courses.data[i].chapters[k].documentContent
                            } else {
                                return apis.get(`chapter/${chapterId}/document`).then(d => {
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
        createCourse({state, commit, dispatch}, {course, coverPicture}) {
            let courseObject = {}
            return apis.create('course', course).then(d => {
                d.data = d.data.data

                const {_id, name, description, user_group, updatedAt} = d.data
                courseObject = {_id, name, description, user_group, updatedAt}

                commit('set_selected_course', d.data._id)

                if (coverPicture) {
                    // set the dialog
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Creating Course',
                        message: `uploading ${coverPicture.name}`
                    }, {root: true})
                    const formData = new FormData()
                    formData.append("file", coverPicture)
                    apis.update('course', `${d.data._id}/cover_picture`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    }).then(courseData => {
                        courseObject.cover_picture = courseData.data.data.cover_picture
                    })
                }
                courseObject.chapters = []
                state.courses.data.unshift(courseObject)
                commit('initialise_new_chapter')
            })

        },
        //update a course
        updateCourse({state, dispatch}, {course, coverPicture}) {
            let courseIndex
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    courseIndex = i
                    break
                }
            }

            return apis.update('course', state.selectedCourse, course).then(d => {
                d.data = d.data.data
                state.courses.data[courseIndex].name = d.data.name
                state.courses.data[courseIndex].description = d.data.description
                state.courses.data[courseIndex].user_group = d.data.user_group

                if (coverPicture) {
                    // set the dialog
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Updating Course',
                        message: `uploading ${coverPicture.name}`
                    }, {root: true})
                    const formData = new FormData()
                    formData.append("file", coverPicture)
                    apis.update('course', `${state.selectedCourse}/cover_picture`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    }).then(courseData => {
                        state.courses.data[courseIndex].coverPicture = courseData.data.data.coverPicture
                    })
                }
            })

        },
        //update a chapter
        updateChapter({state, commit, dispatch}, {chapter, content, video, attachments, quiz,chapterContent}) {

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
            return apis.update('chapter', state.selectedChapter, chapter).then(async () => {

                if (content) {
                    apis.update(`chapter/${state.selectedChapter}`, 'document', {content: content}).then(() => {
                        state.courses.data[courseIndex].chapters[chapterIndex].documentContent = content
                    })
                }
                // attach quiz
                if (quiz) {
                    // add quiz target
                    const target = {
                        id: state.selectedChapter,
                        type: 'chapter'
                    }

                    apis.update('quiz', `${quiz._id}/target`, target).then((quizResponse) => {
                        if (state.courses.data[courseIndex].chapters[chapterIndex].quiz.length > 0) {
                            commit('quiz/update_quiz_target', {
                                id: state.courses.data[courseIndex].chapters[chapterIndex].quiz[0]._id,
                                target: undefined
                            }, {root: true})
                            state.courses.data[courseIndex].chapters[chapterIndex].quiz.splice(0, 1)
                        }
                        state.courses.data[courseIndex].assignmentsLength++;
                        state.courses.data[courseIndex].chapters[chapterIndex].quiz.push(quizResponse.data.data)
                        commit('quiz/update_quiz_target', {id: quiz._id, target: target}, {root: true})
                    })
                }

                // remove quiz 
                else if (state.courses.data[courseIndex].chapters[chapterIndex].quiz.length > 0 && quiz === undefined) {

                    state.courses.data[courseIndex].assignmentsLength--;
                    apis.delete('quiz', `${state.courses.data[courseIndex].chapters[chapterIndex].quiz[0]._id}/target`).then(() => {
                        commit('quiz/update_quiz_target', {
                            id: state.courses.data[courseIndex].chapters[chapterIndex].quiz[0]._id,
                            target: undefined
                        }, {root: true})
                        state.courses.data[courseIndex].chapters[chapterIndex].quiz.splice(0, 1)
                    })
                }
                if (chapterContent) {
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Creating Chapter',
                        message: `uploading chapter content`
                    }, {root: true})
                    const formData = new FormData()
                    formData.append("file", chapterContent);
                    await apis.create(`chapter/${state.selectedChapter}/uploaded_content`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    })
                }
                if (attachments.length > 0) {
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Updating Chapter',
                        message: `uploading attachments`
                    }, {root: true})
                    const formData = new FormData()
                    for (const i in attachments) {
                        formData.append("files[" + i + "]", attachments[i]);
                    }
                    const chapterResponse = await apis.create(`chapter/${state.selectedChapter}/attachments`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    })

                    state.courses.data[courseIndex].chapters[chapterIndex].attachments = chapterResponse.data.data.attachments

                }

                if (video) {
                    // set the dialog
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Updating Chapter',
                        message: `uploading ${video.name}`
                    }, {root: true})
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update(`chapter/${state.selectedChapter}`, 'video', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    }).then((videoResponse) => {
                        state.courses.data[courseIndex].chapters[chapterIndex].uploaded_video = videoResponse.data.data.uploaded_video
                    })
                }
            })

        },

        //publish a course
        tooglePublishCourse({state, commit, rootGetters}, courseId) {
            if (courseId)
                commit('set_selected_course', courseId)

            apis.update('course/toogle_publishment_status', state.selectedCourse).then(d => {
                d.data = d.data.data
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        state.courses.data[i].published = d.data.published
                        break
                    }
                }
                if (d.data.published) {
                    rootGetters['chat/socket'].emit('course-published', {courseId: d.data._id})
                }
                router.push('/courses')
            })
        },
        //delete a course
        delete_course({state}) {
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
        delete_chapter({state}, {id}) {
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
        deleteAttachment({state}, attachmentName) {
            apis.delete(`chapter/${state.selectedChapter}/attachment`, attachmentName).then(() => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        for (const k in state.courses.data[i].chapters) {
                            if (state.courses.data[i].chapters[k]._id == state.selectedChapter) {
                                for (const l in state.courses.data[i].chapters[k].attachments) {
                                    if (state.courses.data[i].chapters[k].attachments[l].name == attachmentName) {
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
        //delete a video
        deleteVideo({state}) {
            apis.delete(`chapter/${state.selectedChapter}/`, 'video').then(() => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        for (const k in state.courses.data[i].chapters) {
                            if (state.courses.data[i].chapters[k]._id == state.selectedChapter) {
                                state.courses.data[i].chapters[k].uploaded_video = undefined
                            }
                        }
                    }
                }
            })
        },
        deleteChapterDocument({state}) {
            apis.delete(`chapter/${state.selectedChapter}/`, 'uploaded_content').then(() => {
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        for (const k in state.courses.data[i].chapters) {
                            if (state.courses.data[i].chapters[k]._id == state.selectedChapter) {
                                state.courses.data[i].chapters[k].uploaded_content = undefined
                            }
                        }
                    }
                }
            })
        },
        //find a course by name
        findCourseByName({state, commit}, {user_name, courseName}) {
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
                return apis.get(`course/user/${user_name}/${courseName}`).then(d => {
                    d.data = d.data.data
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
        startCourse({state, commit}, user_name) {
            apis.create(`user_progress`, {user: user_name, course: state.selectedCourse}).then(d => {
                d.data = d.data.data
                commit('set_student_progress', {courseId: state.selectedCourse, progress: d.data})
                for (const i in state.courses.data) {
                    if (state.courses.data[i]._id == state.selectedCourse) {
                        router.push(`/courses/${state.courses.data[i].name}`)
                        break
                    }
                }
            })
        },
        // update student progress
        finish_chapter({state, commit}, user_name) {
            let courseIndex
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    courseIndex = i
                    break
                }
            }
            return apis.update(`user_progress`, state.courses.data[courseIndex].progress.id, {
                user: user_name,
                course: state.selectedCourse,
                chapter: state.selectedChapter
            }).then(d => {
                d.data = d.data.data
                commit('set_student_progress', {courseId: state.selectedCourse, progress: d.data})

                return {
                    id: d.data._id,
                    progress: d.data.progress,
                    dateStarted: d.data.createdAt,
                    lastUpdated: d.data.updatedAt
                }

            })
        },
        // initialise new chapter
        initialise_new_chapter({commit}) {
            commit('initialise_new_chapter');
        },
        //create a new chapter
        createChapter({state, commit, dispatch}, {chapter, content, video, attachments, quiz, chapterContent}) {

            let courseIndex, chapterIndex
            for (const i in state.courses.data) {
                if (state.courses.data[i]._id == state.selectedCourse) {
                    courseIndex = i
                    chapterIndex = state.courses.data[i].chapters.length - 1
                    break
                }
            }
            return apis.create('chapter', chapter).then(async (d) => {
                d.data = d.data.data
                if (content) {
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update(`chapter/${d.data._id}`, 'document', {content: content}).then(() => {
                        state.courses.data[courseIndex].chapters[chapterIndex].documentContent = content
                    })
                }
                // attach quiz
                if (quiz) {
                    // add quiz target
                    const target = {
                        id: d.data._id,
                        type: 'chapter'
                    }
                    state.courses.data[courseIndex].assignmentsLength++;
                    apis.update('quiz', `${quiz._id}/target`, target).then((quizResponse) => {
                        if (state.courses.data[courseIndex].chapters[chapterIndex].quiz.length > 0) {
                            commit('quiz/update_quiz_target', {
                                id: state.courses.data[courseIndex].chapters[chapterIndex].quiz[0]._id,
                                target: undefined
                            }, {root: true})
                            state.courses.data[courseIndex].chapters[chapterIndex].quiz.splice(0, 1)
                        }
                        state.courses.data[courseIndex].chapters[chapterIndex].quiz.push(quizResponse.data.data)
                        commit('quiz/update_quiz_target', {id: quiz._id, target: target}, {root: true})
                    })
                }
                if (chapterContent) {
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Updating Chapter',
                        message: `uploading chapter content`
                    }, {root: true})
                    const formData = new FormData()
                    formData.append("file", chapterContent);
                    await apis.create(`chapter/${d.data._id}/uploaded_content`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    })
                }
                if (attachments.length > 0) {
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Updating Chapter',
                        message: `uploading attachments`
                    }, {root: true})
                    const formData = new FormData()
                    for (const i in attachments) {
                        formData.append("files[" + i + "]", attachments[i]);
                    }
                    const chapterResponse = await apis.create(`chapter/${d.data._id}/attachments`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    })

                    state.courses.data[courseIndex].chapters[chapterIndex].attachments = chapterResponse.data.data.attachments

                }

                if (video) {
                    // set the dialog
                    dispatch('modal/set_modal', {
                        template: 'display_information',
                        title: 'Updating Chapter',
                        message: `uploading ${video.name}`
                    }, {root: true})
                    const formData = new FormData()
                    formData.append("file", video)
                    apis.update(`chapter/${d.data._id}`, 'video', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                        }
                    }).then((videoResponse) => {
                        state.courses.data[courseIndex].chapters[chapterIndex].uploaded_video = videoResponse.data.data.uploaded_video
                    })
                }
            })

        },
    },
    getters: {
        loaded: state => {
            return state.courses.loaded
        },
        //get the selectedCourse
        selectedCourse: state => {
            return state.selectedCourse
        },
        //get the selected chapter
        selectedChapter: state => {
            return state.selectedChapter
        },
        //get all courses
        courses: state => {
            return state.courses.data
        },
        // get enrolled courses
        started_courses: state => {
            return state.courses.data.filter((course) => course.progress)
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
        },
        totalComments: state => {
            return state.totalCommentsOnAChapter;
        },
        coursesByFaculty: state => {
            return state.coursesByFaculty.data;
        },
        coursesByUserGroup: state => {
            return state.coursesByUserGroup.data;
        }
    },
}
