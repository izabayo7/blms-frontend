import apis from "@/services/apis";
import user from "@/store/modules/user";

const getDefaultState = () => ({
  // storage for all quiz_submissions
  quiz_submission: {
    data: [],
    loaded: false,
  },
  // keep the selected quiz_submission
  selected_quiz_submission: "",
});

export default {
  namespaced: true,
  state: getDefaultState,
  mutations: {
    // add quiz_submission marks
    add_quiz_target(state, { id, target }) {
      for (const i in state.quiz_submission.data) {
        if (state.quiz_submission.data[i]._id === id) {
          state.quiz_submission.data[i].target = target;
        }
        if (state.quiz_submission.data[i].target == target) {
          state.quiz_submission.data[i].target = undefined;
        }
      }
    },
    add_assignment_submission_marks(
      state,
      { id, submission_id, marks, feedback }
    ) {
      for (const i in state.quiz_submission.data) {
        if (state.quiz_submission.data[i]._id === id) {
          for (const j in state.quiz_submission.data[i].submissions) {
            if (
              state.quiz_submission.data[i].submissions[j]._id === submission_id
            ) {
              if (marks) {
                state.quiz_submission.data[i].submissions[j].total_marks =
                  marks;
                state.quiz_submission.data[i].submissions[j].marked = true;
              } else if (feedback)
                state.quiz_submission.data[i].submissions[j].total_feedbacks =
                  feedback;
              break;
            }
          }
          break;
        }
      }
    },
    // add feedback to answer
    add_answer_feedback(state, { answer_id, feedback }) {
      for (const i in state.quiz_submission.data) {
        if (
          state.quiz_submission.data[i]._id === state.selected_quiz_submission
        ) {
          for (const k in state.quiz_submission.data[i].answers) {
            if (state.quiz_submission.data[i].answers[k]._id == answer_id) {
              state.quiz_submission.data[i].answers[k].feedback = feedback;
            }
          }
        }
      }
    },
    // remove feedback from answer
    remove_answer_feedback(state, { answer_id }) {
      for (const i in state.quiz_submission.data) {
        if (
          state.quiz_submission.data[i]._id === state.selected_quiz_submission
        ) {
          for (const k in state.quiz_submission.data[i].answers) {
            if (state.quiz_submission.data[i].answers[k]._id == answer_id) {
              state.quiz_submission.data[i].answers[k].feedback = undefined;
            }
          }
        }
      }
    },
    // update the selected_quiz_submission
    set_selected_quiz_submission(state, id) {
      state.selected_quiz_submission = id;
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    //get quiz_submissions  from backend
    getQuizSubmissions({ state }) {
      // if submission not loaded fetch them
      // if (!state.quiz_submission.loaded) {

      return apis.get(`quiz_submission/user`).then(async (d) => {
        d.data = d.data.data;

        let res = await apis.get(`assignment_submission`);

        state.quiz_submission.data = d.data.concat(res.data.data);

        res = await apis.get(`exam_submission`);
        state.quiz_submission.data = state.quiz_submission.data.concat(
          res.data.data
        );

        //announce that data have been loaded
        state.quiz_submission.loaded = true;

        return state.quiz_submission.data;
      });
      // }
    },

    //get quiz_submissions  in a quiz
    async getQuizSubmissionsInQuiz(
      { state, dispatch },
      { quiz_id, isAssignments, isExam }
    ) {
      let result = state.quiz_submission.data.filter(
        (e) =>
          e._id === quiz_id &&
          e.submissions[0][
            isExam ? "exam" : isAssignments ? "assignment" : "quiz"
          ]
      );

      // if submission not loaded fetch them
      if (!result.length) {
        // eslint-disable-next-line no-undef
        result = await dispatch("getQuizSubmissions", {
          user_name: user.state.user.user_name,
        });
        result = state.quiz_submission.data.filter(
          (e) =>
            e._id === quiz_id &&
            e.submissions[0][
              isExam ? "exam" : isAssignments ? "assignment" : "quiz"
            ]
        );
      }

      return result[0];
    },

    //get quiz_submissions  in a quiz
    async markResultsAsSeen({ state }, { course_id, submission_id }) {
      apis
        .update("quiz_submission/", `${submission_id}/results_seen`)
        .then(() => {
          for (const i in state.quiz_submission.data) {
            if (state.quiz_submission.data[i]._id == course_id) {
              state.quiz_submission.data[i].unread_results--;
              break;
            }
          }
        });
    },

    //create a quiz_submission
    create_quiz_submission(
      { state, commit, dispatch },
      { submission, attachments }
    ) {
      let submissionObject = {};
      return apis.create("quiz_submission", submission).then((d) => {
        d.data = d.data.data;
        submissionObject = d.data.document;
        if (attachments.length > 0) {
          const formData = new FormData();
          for (const i in attachments) {
            formData.append("files[" + i + "]", attachments[i].file);
          }

          // set the dialog
          dispatch(
            "modal/set_modal",
            {
              template: "display_information",
              title: "Creating submission",
              message: "Uploading attachments",
            },
            { root: true }
          );
          apis
            .create(
              `quiz_submission/${d.data.document._id}/attachment`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                  commit(
                    "modal/update_progress",
                    parseInt(
                      Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                      )
                    ),
                    { root: true }
                  );
                },
              }
            )
            .then((response) => {
              submissionObject = response.data.data;
              dispatch("modal/reset_modal", null, { root: true });
            });
        }
        state.quiz_submission.data.push(submissionObject);
        return d.data.is_selection_only;
      });
    },

    //create a quiz_submission
    update_quiz_submission({ state, dispatch }, { submission }) {
      submission.totalMarks = undefined;
      return apis
        .update(
          submission.exam ? "exam_submission" : "quiz_submission",
          state.selected_quiz_submission,
          submission
        )
        .then((d) => {
          if (![200, 201].includes(d.data.status)) {
            dispatch("app_notification/SET_NOTIFICATION", {
              message: d.data.message,
              status: "danger",
              uptime: 2000,
            },{ root: true });
            return false
          } else {
            d.data = d.data.data;
            for (const i in state.quiz_submission.data) {
              for (const k in state.quiz_submission.data[i].submissions) {
                if (
                  state.quiz_submission.data[i].submissions[k]._id == d.data._id
                ) {
                  state.quiz_submission.data[i].submissions[k].answers =
                    d.data.answers;
                  state.quiz_submission.data[i].submissions[k].total_marks =
                    d.data.total_marks;
                  state.quiz_submission.data[i].submissions[k].updatedAt =
                    d.data.updatedAt;
                  state.quiz_submission.data[i].submissions[k].marked =
                    d.data.marked;
                  return;
                }
              }
            }
          }
        });
    },

    //find a quiz_submission by user name and submission name
    findQuizSubmissionByUserAndQuizNames(
      { state, commit },
      { userName, quizName, isExam }
    ) {
      let submissionFound = false;
      if (state.quiz_submission.loaded) {
        let quiz_submission = state.quiz_submission.data.filter(
          (quiz_submission) =>
            quiz_submission.user.user_name === userName &&
            (isExam
              ? quiz_submission._id === quizName
              : quiz_submission.quiz.name === quizName)
        );
        if (quiz_submission.length > 0) {
          submissionFound = true;
          commit("set_selected_quiz_submission", quiz_submission[0]._id);
          return quiz_submission[0];
        }
      }
      if (!submissionFound) {
        return apis
          .get(
            `${
              isExam ? "exam_submission" : "quiz_submission"
            }/user/${userName}/${quizName}`
          )
          .then((d) => {
            d.data = d.data.data;
            if (!d.data) return d.data;

            if (state.quiz_submission.loaded) {
              // const found = state.quiz_submission.data.filter(e=>e._id == d._id)
              state.quiz_submission.data.push(d.data);
            } else {
              state.quiz_submission.data = [d.data];
            }
            commit("set_selected_quiz_submission", d.data._id);
            return d.data;
          });
      }
    },
    findExamSubmissionByUserAndQuizNames(
      { state, commit },
      { userName, exam_id }
    ) {
      let submissionFound = false;
      if (state.quiz_submission.loaded) {
        let quiz_submission = state.quiz_submission.data.filter(
          (quiz_submission) =>
            quiz_submission.user.user_name === userName &&
            quiz_submission._id === exam_id
        );
        if (quiz_submission.length > 0) {
          submissionFound = true;
          commit("set_selected_quiz_submission", quiz_submission[0]._id);
          return quiz_submission[0];
        }
      }
      if (!submissionFound) {
        return apis
          .get(`exam_submission/user/${userName}/${exam_id}`)
          .then((d) => {
            d.data = d.data.data;
            if (!d.data) return d.data;

            if (state.quiz_submission.loaded) {
              // const found = state.quiz_submission.data.filter(e=>e._id == d._id)
              state.quiz_submission.data.push(d.data);
            } else {
              state.quiz_submission.data = [d.data];
            }
            commit("set_selected_quiz_submission", d.data._id);
            return d.data;
          });
      }
    },
  },
  getters: {
    //get a specified quiz_submission
    loaded: (state) => {
      return state.quiz_submission.loaded;
    },
    //get the selected_quiz_submission
    selected_quiz_submission: (state) => {
      return state.quiz_submission.data.filter(
        (quiz_submission) =>
          quiz_submission._id == state.selected_quiz_submission
      )[0];
    },
    //get all quiz submissions
    quiz_submissions: (state) => {
      try {
        return state.quiz_submission.data.length
          ? state.quiz_submission.data.filter(
              (x) => !x.submissions[0].exam && !x.submissions[0].assignment
            )
          : [];
      } catch (e) {
        return [];
      }
    },
    exam_submissions: (state) => {
      try {
        return state.quiz_submission.data.length
          ? state.quiz_submission.data.filter(
              (x) => !x.submissions[0].quiz && !x.submissions[0].assignment
            )
          : [];
      } catch (e) {
        return [];
      }
    },
    assignment_submissions: (state) => {
      try {
        return state.quiz_submission.data.length
          ? state.quiz_submission.data.filter(
              (x) => x.submissionMode || x.submissions[0].assignment
            )
          : [];
      } catch (e) {
        return [];
      }
    },
  },
};
