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
      <div class="flex d-block d-md-flex">
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
          <div class="question-details d-block">
            <div class="input-group">
              <label>Question text</label>
              <textarea
                  placeholder="Type your question here ..."
                  class="kurious--textarea mb-4 customScroll"
                  rows="8"
              ></textarea>
            </div>
          </div>
          <div class="text-select">
            <div class="option d-block d-md-flex">
              <div class="details">
                              <textarea
                                  placeholder="option 1"
                                  class="kurious--textarea mb-4 customScroll"
                                  rows="8"
                              ></textarea>
              </div>
              <div class="status mx-auto">
                <label>Correct</label>
<!--                <transition name="fade" >-->
                  <svg class="d-none" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.613894" y="5.7721" width="13.5057" height="13.5057" rx="1.84168" stroke="#828282" stroke-width="1.22779"/>
                    <path d="M3.68555 10.0695L7.36891 16.2084L16.5773 2.08887" stroke="#828282" stroke-width="2.45558" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.613894" y="0.72034" width="13.5057" height="13.5057" rx="1.84168" stroke="#828282" stroke-width="1.22779"/>
                  </svg>

<!--                </transition>-->
              </div>
              <button class="delete">Delete option</button>
            </div>
            <button class="add-option">Add option</button>
          </div>
          <div class="image-select"></div>
          <div class="file-upload"></div>

        </div>
      </div>
    </div>
    <button class="quiz-action full d-none">Add question</button>
    <div id="quiz-actions" class=" d-flex mb-12 mt-6">
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
