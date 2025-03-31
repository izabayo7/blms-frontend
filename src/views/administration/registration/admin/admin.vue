<template>
  <v-container fluid id="registrations" class="pa-0">
    <v-row>
      <v-col class="col-12 col-md-4 vertically--centered">
        <img src="@/assets/images/admin-registration.svg" />
      </v-col>
      <v-col class="col-12 col-md-8 registration-panel">
        <div class="customScroll">
          <v-row>
            <v-col class="col-8 mx-auto">
              <v-form>
                <v-row>
                  <v-col class="col-12">
                    <h1 class="head--text font-weight-bold form-title pt-4">
                      ADMIN REGISTRATION
                    </h1>
                  </v-col>
                  <v-col class="col-12 col-md-6 py-0">
                    <label>School Name</label>
                    <v-text-field v-model="schoolName" type="text" solo />
                  </v-col>
                  <v-col class="col-12 col-md-6 py-0">
                    <label>School Email</label>
                    <v-text-field v-model="schoolEmail" type="email" solo />
                  </v-col>
                  <v-col class="col-12 col-md-6 py-0">
                    <label>First Name</label>
                    <v-text-field v-model="surName" type="text" solo />
                  </v-col>
                  <v-col class="col-12 col-md-6 py-0">
                    <label>Last Name</label>
                    <v-text-field v-model="otherNames" type="text" solo />
                  </v-col>
                  <v-col class="col-12 py-0">
                    <label>Email</label>
                    <v-text-field v-model="email" type="email" solo />
                  </v-col>
                  <v-col class="col-12 py-0">
                    <label>Phone number</label>
                    <div
                      class="v-input theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed"
                    >
                      <div class="v-input__control">
                        <div class="v-input__slot">
                          <div class="v-input__prepend-inner">
                            <div
                              class="v-input__icon v-input__icon--prepend-inner mx-2"
                            >
                              +250
                            </div>
                          </div>
                          <div class="v-text-field__slot">
                            <input
                              id="input-230"
                              v-model="phone"
                              type="number"
                              placeholder="xxxx"
                            />
                          </div>
                        </div>
                        <div class="v-text-field__details">
                          <div class="v-messages theme--light">
                            <div class="v-messages__wrapper"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col class="col-12 py-0">
                    <label>National Id</label>
                    <div
                      class="v-input theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed"
                    >
                      <div class="v-input__control">
                        <div class="v-input__slot">
                          <div class="v-text-field__slot">
                            <input
                              class="id-inputs"
                              max="10000"
                              @keyup="checkLength(0)"
                              type="number"
                              placeholder="xxxx"
                            />
                            <input
                              class="id-inputs"
                              max="10000"
                              @keyup="checkLength(1)"
                              type="number"
                              placeholder="xxxx"
                            />
                            <input
                              class="id-inputs"
                              max="10000"
                              @keyup="checkLength(2)"
                              type="number"
                              placeholder="xxxx"
                            />
                            <input
                              class="id-inputs"
                              max="10000"
                              @keyup="checkLength(3)"
                              type="number"
                              placeholder="xxxx"
                            />
                          </div>
                        </div>
                        <div class="v-text-field__details">
                          <div class="v-messages theme--light">
                            <div class="v-messages__wrapper"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col class="col-12 py-0">
                    <label>Gender</label>
                    <v-row>
                      <v-col
                        class="col-4"
                        v-for="(gender, n) in genders"
                        :key="n"
                      >
                        <v-icon
                          :class="
                            selectedgender === gender
                              ? 'selected--gender'
                              : 'unselected--gender'
                          "
                          @click="selectedgender = gender"
                          >mdi-checkbox-{{
                            selectedgender === gender ? "marked" : "blank"
                          }}-circle{{
                            selectedgender === gender ? "" : "-outline"
                          }}</v-icon
                        >
                        {{ gender }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col class="col-8 mx-auto">
                    <v-btn
                      rounded
                      x-large
                      class="bg--primary px-16"
                      @click="saveSchoolAndAdmin"
                      >Create account</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <kurious-dialog
      :show="show"
      :message="message"
      :modal="modal"
      color="#ffd248"
      :status="status"
    >
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-check</v-icon>
      <v-row slot="actions">
        <v-col class="col-10 mx-auto my-0">
          <v-btn
            rounded
            x-large
            color="#ffd248"
            class="white--text px-16 mx-2"
            @click="
              resetFields();
              show = false;
            "
            >Add New Admin</v-btn
          >
          <v-btn
            id="panel--btn"
            rounded
            x-large
            color="#ffd248"
            class="orange--text px-16 mx-2"
            to="/register/users"
            >Back To Panel</v-btn
          >
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
    selectedgender: "Male",
    genders: ["Male", "Female"],
    schoolName: "",
    schoolEmail: "",
    surName: "",
    otherNames: "",
    nationalId: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
  }),
  methods: {
    checkLength(index) {
      const nationalIdInputs = document.querySelectorAll(".id-inputs");
      if (parseInt(nationalIdInputs[index].value) > 10000) {
        nationalIdInputs[index].style.color = "red";
      } else {
        nationalIdInputs[index].style.color = "inherit";
        if (index === 3) {
          this.nationalId = `${nationalIdInputs[0].value}${nationalIdInputs[1].value}${nationalIdInputs[2].value}${nationalIdInputs[3].value}`;
        }
      }
    },
    async saveSchoolAndAdmin() {
      try {
        const response = await Apis.create("college", {
          name: this.schoolName,
          email: this.schoolEmail,
        });
        this.message = "Admin Registered";
        await Apis.create("admin", {
          surName: this.surName,
          otherNames: this.otherNames,
          phone: `0${this.phone}`,
          gender: this.selectedgender,
          DOB: this.DOB,
          email: this.email,
          nationalId: this.nationalId,
          college: response.data._id,
        });
        this.message = "Admin Registered";
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
<style lang="scss">
#registrations {
  .illustration {
    height: 12px;
  }
  label {
    color: #6a6a6a;
    font-size: 16px;
    font-weight: 600;
  }
  .registration-panel {
    background-color: #fafbfd;
    height: 100vh;
    .customScroll {
      height: inherit;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  .form-title {
    font-size: 30px;
  }
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 40px;
    padding: 0;
  }
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot:focus-within {
    border-bottom: 4px solid $primary;
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
  .col {
    padding-top: 0 !important;
    // padding-bottom: 0 !important;
  }
  .bg--primary {
    background-color: $primary !important;
    color: white !important;
  }
  .head--text {
    color: $primary !important;
  }
  .selected--gender {
    color: $primary !important;
  }
  .unselected--gender {
    color: #b4b4b4 !important;
  }
}
</style>