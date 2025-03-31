import apis from "@/services/apis";
export default {
    namespaced: true,
    state: {
        // storage for all quiz
        quiz: {
            data: [],
            loaded: false
        },
        // keep the selected quiz
        selected_quiz: ''
    },
    mutations: {
        // add quiz target
        add_quiz_target(state, { id, target }) {
            for (const i in state.quiz.data) {
                if (state.quiz.data[i]._id === id) {
                    state.quiz.data[i].target = target
                }
                if (state.quiz.data[i].target == target) {
                    state.quiz.data[i].target = undefined
                }
            }
        },
        // update the selected_quiz
        set_selected_quiz(state, id) {
            state.selected_quiz = id
        },
    },
    actions: {
        //get quiz from backend
        getQuizes({ state }, { userCategory, userId }) {
            // try to load only new data when there is no available
            apis.get(`quiz/${userCategory}/${userId}`).then(d => {
                state.quiz.data = d.data
                //announce that data have been loaded
                state.quiz.loaded = true
            })
        },
        //create a quiz
        create_quiz({ state, commit, dispatch }, { quiz, pictures }) {
            let quizObject = {}
            // set the dialog
            dispatch('modal/set_modal', { template: 'display_information', title: 'Creating quiz', message: 'Saving information' }, { root: true })
            return apis.create('quiz', quiz).then(d => {
                quizObject = d.data
                if (pictures.length > 0) {
                    let index = 0
                    let pictureFound = false
                    const formData = new FormData()
                    for (const i in pictures) {
                        for (const k in pictures[i]) {
                            if (pictures[i][k] !== []) {
                                pictureFound = true
                                formData.append("files[" + index + "]", pictures[i][k]);
                                index++
                            }
                        }
                    }
                    if (pictureFound) {
                        commit('modal/update_progress', 0, { root: true })
                        commit('modal/update_message', `uploading pictures`, { root: true })

                        apis.create(`file/quizAttachedFiles/${d.data._id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                            }
                        }).then((response) => {
                            quizObject = response.data
                        })
                    }
                }
                state.quiz.data.push(quizObject)
                setTimeout(() => {
                    dispatch('modal/reset_modal', null, { root: true })
                }, 3000);

            })

        },
        //update a quiz
        update_quiz({ state, commit, dispatch }, { quiz, pictures }) {
            let quizObject = {}
            return apis.update('quiz', state.selected_quiz, quiz).then(d => {
                quizObject = d.data
                if (pictures.length > 0) {
                    let index = 0
                    let pictureFound = false
                    const formData = new FormData()
                    for (const i in pictures) {
                        for (const k in pictures[i]) {
                            if (pictures[i][k] !== []) {
                                pictureFound = true
                                formData.append("files[" + index + "]", pictures[i][k]);
                                index++
                            }
                        }
                    }
                    if (pictureFound) {
                        dispatch('modal/set_modal', { template: 'display_information', title: 'Updating quiz', message: 'uploading pictures' }, { root: true })
                        commit('modal/update_progress', 0, { root: true })

                        apis.create(`file/quizAttachedFiles/${d.data._id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                            }
                        }).then((response) => {
                            quizObject = response.data
                            state.quiz.data.push(quizObject)
                            setTimeout(() => {
                                dispatch('modal/reset_modal', null, { root: true })
                            }, 1000);
                        })
                    }
                }
                return
            })

        },

        //find a quiz by name
        findQuizByName({ state, commit }, { userCategory, userId, quizName }) {
            if (!state.quiz.data.length) {
                apis.get(`quiz/${userCategory}/${userId}/${quizName}`).then(d => {
                    state.quiz.data = [d.data]
                    commit('set_selected_quiz', d.data._id)
                })
            } else {
                let quiz = state.quiz.data.filter(quiz => quiz.name == quizName)[0]
                commit('set_selected_quiz', quiz._id)
            }


        },
        //delete a quiz
        delete_quiz({ state }, { id }) {
            apis.delete('quiz', id).then(() => {
                for (const i in state.quiz.data) {
                    if (state.quiz.data[i]._id == id) {
                        state.quiz.data.splice(i, 1)
                        break
                    }
                }
            })
        },
    },
    getters: {
        //get a specified quiz
        loaded: state => {
            return state.quiz.loaded
        },
        //get the selected_quiz
        selected_quiz: state => {
            return state.quiz.data.filter(quiz => quiz._id == state.selected_quiz)[0]
        },
        // //get a specified quiz by name
        // quiz: state => (name) => {
        //     return state.quiz.data.filter(quiz => quiz.name == name)[0]
        // },
        //get a specified quiz by name
        all_quiz: state => {
            return state.quiz.data
        },
        //get a specified quiz by name
        quizNames: state => {
            let quizNames = []
            for (const element of state.quiz.data) {
                if (!element.target) {
                    quizNames.push(element.name)
                }
            }
            return quizNames
        },
    },
}