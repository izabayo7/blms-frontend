<template>
  <v-container fluid id="student-regist" class="pa-0">
    <v-row>
      <v-col class="col-3 col-md-3 pa-0 form--bg">
        <div class="svg-side"></div>
      </v-col>
      <v-col class="col-9 col-md-9 form-side form--bg">
        <v-form>
          <v-row>
            <v-col class="col-12">
              <h1
                class="font-weight-bold form-title pt-5"
              >{{`${$route.name.includes('Student') ? 'Student' : 'Faculty'}`}} Registration</h1>
            </v-col>
            <v-col class="col-12 col-md-6">
              <label>Faculty Name</label>
              <v-text-field v-model="facultyName" type="text" solo />
            </v-col>
            <!-- <v-col class="col-12 col-md-6">
              <label>Last Name</label>
              <v-select v-model="dean" :items="instructorNames" solo class="group-select"></v-select>
            </v-col>
            <v-col class="col-12">
              <v-row v-if="instructors.length > 0" class="quiz-details pa-4 quiz-select">
                <v-col class="col-6">
                  Email:
                  <span class="font-weight-bold">{{instructors[activeIndex].email}}</span>
                </v-col>
                <v-col class="col-6">
                  Phone number:
                  <span class="font-weight-bold">{{instructors[activeIndex].phone}}</span>
                </v-col>
              </v-row>
            </v-col>-->
            <v-col class="col-8 mx-auto">
              <v-btn
                rounded
                x-large
                class="yellow white--text px-16"
                @click="saveFuclty"
              >Create account</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <kurious-dialog :show="show" :message="message" :modal="modal" color="#ffd248" :status="status">
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-check</v-icon>
      <v-row slot="actions">
        <v-col class="col-10 mx-auto my-0">
          <v-btn
            rounded
            x-large
            color="#ffd248"
            class="white--text px-16 mx-2"
            @click="resetFields();show = false"
          >Add New Faculty</v-btn>
          <v-btn
            id="panel--btn"
            rounded
            x-large
            color="#ffd248"
            class="orange--text px-16 mx-2"
            to="/register/users"
          >Back To Panel</v-btn>
        </v-col>
      </v-row>
    </kurious-dialog>
  </v-container>
</template>

<script>
import Apis from "@/services/apis";
export default {
  data: () => ({
    message: "",
    show: false,
    status: 200,
    modal: true,
    instructorNames: [],
    instructorCodes: [],
    activeIndex: 0,
    instructors: [],
    facultyName: "",
    dean: "",
  }),
  beforeMount() {
    if (this.$route.name.includes("Student")) {
      this.getFaculties();
    }
  },
  methods: {
    async getInstructors() {
      try {
        const response = await Apis.get(
          `instructor/college/${this.$store.state.user.college}`
        );
        for (const instructor of response.data) {
          this.instructorNames.push(
            instructor.surName + " " + instructor.otherNames
          );
          this.instructorCodes.push(instructor._id);
          this.instructors.push(instructor);
        }
      } catch (error) {
        if (error.request && !error.response) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    resetFields() {
      this.facultyName = "";
      this.dean = "";
      this.activeIndex = 0;
    },
    async saveFuclty() {
      try {
        // this.dean = this.instructorCodes[
        //   this.instructorNames.indexOf(this.faculty)
        // ];
        await Apis.create("facility", {
          name: this.facultyName,
        });
        this.message = "Faculty Registered";
        this.show = "true";
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#student-regist {
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 40px;
    padding: 0;
  }
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot:focus-within {
    border-bottom: 4px solid #ffc100;
  }
  .v-text-field input.id-inputs {
    flex: 1 1 auto;
    // border: 1px solid;
    line-height: 20px;
    padding: 8px 0 8px;
    margin: 4px 12px;
    max-width: 20%;
    min-width: 0px;
    /* width: 48% !important; */
    text-align: center !important;
  }
  .svg-side {
    background-color: rgb(238, 238, 49);
    width: 85% !important;
    height: 100%;
  }
  .form--bg {
    background-color: #f9faff;
  }
  .form-side {
    form.v-form {
      max-width: 500px;
      margin-left: 135px;
      .form-title {
        color: #3d3d3d;
      }
      .phone {
        width: 300px;
      }
      .inputs {
        width: 260px;
      }
      button.yellow.white--text.px-16.v-btn.v-btn--contained.v-btn--rounded.theme--light.v-size--large {
        width: 320px;
      }
    }
  }
}
</style>