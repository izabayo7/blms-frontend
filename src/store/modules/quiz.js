import apis from "@/services/apis";
export default {
    namespaced: true,
    state: {
        // storage for all quiz
        quiz: {
            data: [],
            loaded: false
        },
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
    },
    actions: {
        //get quiz from backend
        getQuizes({ state }, { userCategory, userId }) {
            // try to load only new data when there is some available
            apis.get(`quiz/${userCategory}/${userId}`).then(d => {
                state.quiz.data = d.data
                //announce that data have been loaded
                state.quiz.loaded = true
            })
        },
        //create a quiz
        create_qiuz({ state, commit, dispatch }, { quiz, pictures }) {
            let quizObject = {}
            // set the dialog
            dispatch('modal/set_modal', { template: 'display_information', title: 'Creating Course', message: 'Saving information' }, { root: true })
            return apis.create('quiz', quiz).then(d => {
                quizObject = d.data
                if (pictures.length > 0) {
                    commit('modal/update_progress', 0, { root: true })
                    commit('modal/update_message', `uploading pictures`, { root: true })
                    const formData = new FormData()
                    for (const i in pictures) {
                        formData.append("files[" + i + "]", pictures[i]);
                    }
                    apis.create(`http://localhost:7070/kurious/file/quizAttachedFiles/${d.data._id}`, formData, {
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
                state.quiz.data.push(quizObject)
                setTimeout(() => {
                    dispatch('modal/reset_modal', null, { root: true })
                }, 3000);

            })

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
        //get a specified quiz by name
        quiz: state => (name) => {
            return state.quiz.data.filter(quiz => quiz.name == name)[0]
        },
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