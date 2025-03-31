<template>
  <v-dialog v-model="visible" :persistent="!closable">
    <div class="faculty-dialog-body">
      <div class="tittle px-0 px-md-6 pa-6 pb-0">{{ editMode ? 'Edit' : 'Create a' }} faculty</div>
      <div class="row px-0 px-md-6 pt-0">
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
                  v-model="faculty.name"
              />
            </div>
          </div>
          <div class="input-group">
            <div class="label">
              <label for="faculty-description">Faculty description</label>
              <span class="important">*</span>
            </div>
            <div class="input-container">
              <textarea
                  id="faculty-description"
                  placeholder="Type the description here"
                  rows="4"
                  cols="50"
                  v-model="faculty.description"
              >
              </textarea>
            </div>
          </div>
          <div class=" hidden-sm-and-down send-container">
            <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
              Cancel
            </button>
            <button class="add-email send" @click="validate">
              Save progress
            </button>
          </div>
        </div>
        <div class="col-12 col-lg-6">
<!--          <div class="input-group">-->
<!--            <div class="label">-->
<!--              <label for="faculty-name">Assign a dean (Optional) </label>-->
<!--              &lt;!&ndash; <span class="important">*</span> &ndash;&gt;-->
<!--            </div>-->
<!--            <div class="input-container">-->
<!--              <select-ui-->
<!--                  label="Select dean instructor"-->
<!--                  name="role"-->
<!--                  id="user_category"-->
<!--                  :options="instructor_names"-->
<!--                  @input="-->
<!--                  (e) => {-->
<!--                    select_dean(e);-->
<!--                  }-->
<!--                "-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
          <div class="input-group">
            <div class="label">
              <label for="faculty-description"
              >Add a student group to faculty
              </label>
              <span class="important">*</span>
            </div>
            <div class="d-block d-md-flex">
              <div class="input-container coloured">
                <input type="text" v-model="currentStudentGroup" id=""/>
                <svg
                    v-if="currentStudentGroup.length"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    @click="currentStudentGroup = ''"
                >
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
                  />
                </svg>
              </div>
              <div class="vertically--centered">
                <button v-if="!isEditing" @click="addStudentGroup" class="add-student-group">
                  <svg
                      width="12"
                      height="11"
                      viewBox="0 0 12 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M6 1V9.5"
                        stroke="#193074"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                    <path
                        d="M10.25 5.25L1.75 5.25"
                        stroke="#193074"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                  </svg>
                  Add student group
                </button>
                <button v-else @click="saveStudentGroupChanges">Save</button>
              </div>
            </div>
          </div>
          <div class="added-student-groups customScroll">
            <div v-for="(item, i) in addedStudentGroups" :key="i" :class="{'d-none': isEditing && editingIndex === i}" class="item">
              <div class="name">{{ item.name }}</div>
              <div class="actions ml-auto">
                <button @click="edit(i)" class="edit mr-4">
                  edit
                  <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M6.09284 1.82031H1.74513C1.41568 1.82031 1.09972 1.95122 0.866762 2.18423C0.633804 2.41724 0.50293 2.73327 0.50293 3.0628V11.7602C0.50293 12.0897 0.633804 12.4058 0.866762 12.6388C1.09972 12.8718 1.41568 13.0027 1.74513 13.0027H10.4405C10.77 13.0027 11.086 12.8718 11.3189 12.6388C11.5519 12.4058 11.6827 12.0897 11.6827 11.7602V7.41151"
                        stroke="#193074"
                        stroke-width="0.844573"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M10.7506 0.888921C10.9977 0.641775 11.3328 0.50293 11.6822 0.50293C12.0317 0.50293 12.3668 0.641775 12.6139 0.888921C12.861 1.13607 12.9998 1.47127 12.9998 1.82079C12.9998 2.1703 12.861 2.50551 12.6139 2.75265L6.71341 8.65447L4.229 9.27571L4.8501 6.79074L10.7506 0.888921Z"
                        stroke="#193074"
                        stroke-width="0.844573"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button @click="deleteStudentGroup(i)" class="delete">
                  Delete
                  <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M12.1394 1.18701H2.41721C1.65015 1.18701 1.02832 1.80884 1.02832 2.5759V12.2981C1.02832 13.0652 1.65015 13.687 2.41721 13.687H12.1394C12.9065 13.687 13.5283 13.0652 13.5283 12.2981V2.5759C13.5283 1.80884 12.9065 1.18701 12.1394 1.18701Z"
                        stroke="#9A031E"
                        stroke-width="0.868087"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M5.19531 5.35303L9.36198 9.51969"
                        stroke="#9A031E"
                        stroke-width="0.868087"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.36198 5.35303L5.19531 9.51969"
                        stroke="#9A031E"
                        stroke-width="0.868087"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 hidden-md-and-up">
          <div class="send-container">
            <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
              Cancel
            </button>
            <button class="add-email send" @click="validate">
              Save progress
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
// import SelectUi from "@/components/reusable/ui/select-ui";
import Apis from "@/services/apis";
import {mapGetters} from "vuex";

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    facultyId: {
      type: String
    }
  },
  // components: {SelectUi},
  data: () => ({
    closable: false,
    editingIndex: -1,
    user_categories: [],
    isEditing: false,
    currentStudentGroup: "",
    instructors: [],
    selected_user_category: "",
    faculty: {
      name: "",
      description: "",
    },
    error: "",
    dean: {
      id: ""
    },
    addedStudentGroups: [],
  }),
  computed: {
    ...mapGetters('faculties', {state: "faculty"}),
    visible() {
      return 1;
    },
    // instructor_names() {
    //   const res = []
    //   for (const i in this.instructors) {
    //     res.push(`${this.instructors[i].sur_name} ${this.instructors[i].other_names}`)
    //   }
    //   return res
    // }
  },
  async beforeMount() {
    setTimeout(() => {
      const dialog = document.querySelector(".v-dialog--active");
      dialog.style.maxWidth = "1078px";
      // dialog.style.setProperty("height", "538px", "important");
      // dialog.style.setProperty("min-height", "538px", "important");
    }, 0);

    // let res = await Apis.get(`user/college/${this.$store.state.user.user.college}/INSTRUCTOR`);
    // this.instructors = res.data.data;

    if (this.editMode) {
      await this.$store.dispatch("faculties/getFaculty", this.facultyId)
      this.faculty = {name: this.state.name, description: this.state.description}
    }
  },
  watch: {
    error() {
      if (this.error != "")
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.error,
          status: "danger",
          uptime: 2000,
        }).then(() => {
          this.error = ""
        })
    }
  }
  ,
  methods: {
    // getStudentGroups(){
    //   Apis.get(`user_groups/college/`).then(d => {
    //
    //   })
    // },
    addStudentGroup() {
      if (this.currentStudentGroup == "")
        this.error = "Please enter the student group name"
      else if (this.currentStudentGroup.length < 5)
        this.error = "Student group name too short"
      else {
        const count = this.addedStudentGroups.filter(s => s.name == this.currentStudentGroup)
        if (!count.length) {
          this.addedStudentGroups.unshift({name: this.currentStudentGroup})
          this.currentStudentGroup = ""
        } else {
          this.error = "Dupplicate names not allowed"
        }
      }
    },
    saveStudentGroupChanges() {
      const dupplicates = this.addedStudentGroups.filter(s => s.name == this.currentStudentGroup)
      if (dupplicates.length > 1 || (dupplicates.length && this.addedStudentGroups.indexOf(dupplicates[0]) != this.editingIndex)) {
        this.error = "Dupplicate names not allowed"
      } else {
        this.addedStudentGroups[this.editingIndex].name = this.currentStudentGroup;
        this.currentStudentGroup = ""
        this.isEditing = false
      }
    },
    edit(i) {
      this.isEditing = true;
      this.editingIndex = i;
      this.currentStudentGroup = this.addedStudentGroups[i].name
    },
    deleteStudentGroup(i) {
      this.addedStudentGroups.splice(i, 1)
    },
    select_dean(name) {
      console.log(name)
    }
    ,
    async createFaculty() {
      const res = this.editMode ? await Apis.update("faculty", this.facultyId, this.faculty) : await Apis.create("faculty", this.faculty);
      if (res.data.status != 200 && res.data.status != 201) {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: res.data.message,
          status: "danger",
          uptime: 2000,
        })
      } else {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.editMode ? "Changes saved" : "Faculty successfully created",
          status: "success",
          uptime: 2000,
        })

        if (!this.editMode || this.addedStudentGroups.length) {
          const unsaved = []
          for (const i in this.addedStudentGroups) {
            const response = await Apis.create("user_groups", {
              name: this.addedStudentGroups[i].name,
              faculty: res.data.data._id
            });
            if (response.data.status != 200 && response.data.status != 201) {
              this.$store.dispatch("app_notification/SET_NOTIFICATION", {
                message: response.data.message,
                status: "danger",
                uptime: 2000,
              })
              unsaved.push(this.addedStudentGroups[i])
            }
          }
          if (!unsaved.length) {
            this.$store.dispatch("app_notification/SET_NOTIFICATION", {
              message: "User groups added successfully",
              status: "success",
              uptime: 2000,
            })
            this.$emit('saved',this.addedStudentGroups.length)
            this.$emit('closeModal')
          } else
            this.addedStudentGroups = unsaved
        } else {
          this.$store.commit("faculties/UPDATE_FACULTY", {
            id: this.facultyId,
            name: this.faculty.name,
            description: this.faculty.description
          })
          this.$emit('closeModal')
        }
      }
    }
    ,
    validate() {
      if (this.faculty.name == "") {
        return this.error = "Faculty name is required"
      }
      if (this.faculty.name.length < 3) {
        return this.error = "Faculty name too short"
      }

      if (this.faculty.description == "") {
        return this.error = "Faculty description is required"
      }
      if (this.faculty.description.length < 10) {
        return this.error = "Faculty description too short"
      }
      if (!this.editMode && !this.addedStudentGroups.length)
        return this.error = "Please enter atleast one student group"

      this.createFaculty()
    }
  }
}
;
</script>

<style>
</style>
<style lang="scss">
.v-dialog:not(.v-dialog--fullscreen) {
  height: fit-content !important;
  width: 100% !important;
  border-radius: 0 !important;

  .faculty-dialog-body {
    height: 100%;
    padding: 30px;
    background-color: white;
    // padding-top: 50px;
    text-align: left;
    margin: auto;
    max-width: 1078px;

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
      .select-container {
        border: 0.954286px solid #858c94;
        box-sizing: border-box;
        border-radius: 7.63429px;
        max-width: 305.37px;
        width: 100%;
        height: 45.9px;
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: 400;
        font-size: 15.2686px;
        line-height: 23px;
        color: black;
        padding: 11.5px;
      }

      textarea {
        min-height: 122px;
        max-height: 200px;
        max-width: 100%;
      }

      select:focus {
        outline: none;
      }

      &.coloured {
        border-radius: 21.63px;
        background: #eeeeee;
        max-width: 305.37px;
        display: flex;

        svg {
          margin: 12px;
          fill: #193074;
        }

        input {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: 600;
          width: 250.37px;
          border: none;
          font-size: 15.2686px;
          line-height: 23px;
          /* identical to box height, or 150% */

          display: flex;
          align-items: center;

          color: #193074;
        }
      }
    }

    .add-email {
      width: 79.24px;
      height: 45.38px;

      &.send {
        width: 158px;
        height: 40.38px;
      }

      cursor: pointer;
      background: #193074;

      &.cancel {
        background: #ABABAB;
      }

      border-radius: 3.80952px;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 12.1905px;
      /* identical to box height, or 125% */

      text-align: center;

      color: #ffffff;
    }

    .add-student-group {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 12.4057px;
      line-height: 19px;
      color: #193074;
      margin-left: 6px;
    }

    .vertically--centered {
      height: 45.9px;
      padding-left: 12px;
    }

    .added-student-groups {
      max-height: 90px;
      overflow: auto;

      .item {
        display: flex;
      }

      .name {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 12.4057px;
        line-height: 19px;
        color: #193074;
        margin-right: 16px;
      }

      .actions {
        display: flex;

        .edit {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 19px;
          /* or 239% */

          color: #193074;
          margin-right: 14px;
        }

        .delete {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 19px;
          /* or 239% */

          color: #9a031e;
        }

        svg {
          margin-left: 11px;
          // width: 12px;
        }
      }
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .v-dialog:not(.v-dialog--fullscreen) .faculty-dialog-body {
    .send-container {
      display: flex;

      .add-email.send {
        width: 50%;
      }
    }
  }
}
</style>
