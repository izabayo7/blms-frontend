<template>
  <v-dialog v-model="visible" :persistent="!closable">
    <div class="faculty-dialog-body">
      <div class="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          @click="$emit('closeModal')"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
          />
        </svg>
      </div>
      <div class="tittle pa-6 pb-0">Create a faculty</div>
      <div class="row px-6 pt-0">
        <div class="col-12 col-lg-6">
          <div class="input-group">
            <div class="label">
              <label for="faculty-name">Faculty name</label>
              <span class="important">*</span>
            </div>
            <div class="input-container">
              <input
                type="text"
                id="faculty-name"
                placeholder="Type name here"
              />
            </div>
          </div>
          <div class="input-group">
            <div class="label">
              <label for="faculty-description">Faculty desciption</label>
              <span class="important">*</span>
            </div>
            <div class="input-container">
              <textarea
                id="faculty-description"
                placeholder="Type the description here"
                rows="4"
                cols="50"
              >
              At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
              </textarea>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="input-group">
            <div class="label">
              <label for="faculty-name">Assign a dean (Optional) </label>
              <!-- <span class="important">*</span> -->
            </div>
            <div class="input-container">
              <select name="" id="">
                <option value="">Select dean instructor</option>
              </select>
              <!-- <input
                type="text"
                id="faculty-name"
                placeholder="Type name here"
              /> -->
            </div>
          </div>
          <div class="input-group">
            <div class="label">
              <label for="faculty-description">Faculty desciption</label>
              <span class="important">*</span>
            </div>
            <div class="input-container">
              <textarea
                id="faculty-description"
                placeholder="Type the description here"
                rows="4"
                cols="50"
              >
              At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    closable: false,
  }),
  computed: {
    visible() {
      return 1;
    },
  },
  beforeMount() {
    setTimeout(() => {
      const dialog = document.querySelector(".v-dialog--active");
      dialog.style.maxWidth = "1078px";
      dialog.style.setProperty("height", "538px", "important");
    }, 0);
  },
};
</script>

<style>
</style>
<style lang="scss">
.v-dialog:not(.v-dialog--fullscreen) {
  height: 538px !important;
  width: 100% !important;
  max-width: 1078px;
  border-radius: 0 !important;
  .faculty-dialog-body {
    height: 100%;
    padding: 30px;
    background-color: white;
    // padding-top: 50px;
    text-align: left;

    .close {
      /* position: relative; */
      float: right;
      margin-top: -20px;
    }

    .tittle {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 25px;
      color: #000000;
      margin-bottom: 34px;
    }
    .input-group {
      .label {
        display: flex;
        margin-bottom: 8px;
        label {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 12.4057px;
          line-height: 19px;
          display: flex;
          align-items: center;
          color: #09101d;
        }
        .important {
          color: #da1414;
          opacity: 0.8;
          margin-left: 6px;
        }
      }
    }
    .input-container {
      margin-bottom: 31px;
      input,
      textarea,
      select {
        border: 0.954286px solid #858c94;
        box-sizing: border-box;
        border-radius: 7.63429px;
        width: 305.37px;
        height: 45.9px;
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 15.2686px;
        line-height: 23px;
        color: #6d7580;
        padding: 11.5px;
      }
      textarea {
        min-height: 122px;
      }
      select:focus {
        outline: none;
      }
      select {
        padding: 2px 2px 2px 2px;
        border: none;
        background-image: url("http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png");
        background-position: right center; /*Positioning*/
        background-repeat: no-repeat; /*Prevent showing multiple background images*/
      }
    }
  }
}
</style>