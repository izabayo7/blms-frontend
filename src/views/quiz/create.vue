<template>
  <div id="create-quiz">
    <div id="quiz-info">
      <div class="label">Quiz creation wizzard</div>
      <div class="input-group">
        <label for="quiz-title">Title</label>
        <input id="quiz-title" type="text">
      </div>
      <div class="input-group">
        <label>Instructions</label>
        <div class="quiz-instructions">
          <Editor
              v-if="mode !== ''"
              ref="editor"
              mode="edit"
              :defaultContent="'<ol><li><p>Write your custom instructions</p></li></ol>'"
          />
        </div>
      </div>
      <div class="flex">
        <div class="input-group">
          <label for="quiz-duration">Duration</label>
          <div class="duration-input" id="quiz-duration">
            <input class="inner-input" type="number"> hrs : <input class="inner-input" type="number"> mins
          </div>
        </div>
        <div class="input-group ml-auto">
          <label for="quiz-pass-marks">Pass-marks (%)</label>
          <input id="quiz-pass-marks" type="number">
        </div>
      </div>
    </div>
    <div id="quiz-questions">
      <div class="question">
        <div class="question-number">1</div>
        <div class="question-content">
          <div class="row">
            <div class="col-12 col-md-6">
              <select-ui
                  label="Select question type"
                  name="question-type"
                  id="question-type"
                  class="mb-15px"
                  :options="questions_types"
                  @input="
                (e) => {
                  console.log(e)
                }
              "
              />
            </div>
            <div class="col-12 col-md-2">
              <div class="required mb-15px d-flex">
                <div class="text">Required</div>
                <switch-ui :active="true"/>
              </div>
            </div>
            <div class="col-12 col-md-3 text-md-right pt-0">
              <div class="marks mb-15px ml-auto">
                <div class="input-group">
                  <label>Marks</label>
                  <input class="question-marks" type="number">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-1">
              <div class="delete-question mb-15px">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                    <path
                        d="M7.0026 22.1657C7.0026 23.449 8.0526 24.499 9.33594 24.499H18.6693C19.9526 24.499 21.0026 23.449 21.0026 22.1657V8.16569H7.0026V22.1657ZM22.1693 4.66569H18.0859L16.9193 3.49902H11.0859L9.91927 4.66569H5.83594V6.99902H22.1693V4.66569Z"
                        fill="#FF0808"/>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="28" height="28" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="quiz-action full d-none">Add question</button>
    <div id="quiz-actions">
      <button class="quiz-action cancel">Cancel</button>
      <button class="quiz-action">Add questions</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateQuiz",
  components: {
    Editor: () => import("@/components/reusable/Editor"),
    SelectUi: () => import("@/components/reusable/ui/select-ui"),
    SwitchUi: () => import("@/components/reusable/ui/switcher")
  },
  data: () => ({
    questions_types: [],

  })
};
</script>
<style lang="scss">
@import '../../assets/sass/imports/createQuiz';
</style>
