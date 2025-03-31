<template>
  <v-container fluid id="registrations">
    <v-row>
      <v-col class="col-12 col-md-4 pt-16">
        <v-img class="mt-16 centerd" src="@/assets/images/Admin-rafiki.png" alt="avatar" />
      </v-col>
      <v-col class="col-12 col-md-8 registration-panel">
        <v-row>
          <v-col class="col-8 mx-auto">
            <v-form>
              <v-row>
                <v-col class="col-12">
                  <h1 class="yellow--text font-weight-bold form-title pt-4">ADMIN REGISTRATION</h1>
                </v-col>
                <v-col class="col-12 col-md-6">
                  <label for>First Name</label>
                  <v-text-field type="text" solo />
                </v-col>
                <v-col class="col-12 col-md-6">
                  <label for>Last Name</label>
                  <v-text-field type="text" solo />
                </v-col>
                <v-col class="col-12">
                  <label for>Email</label>
                  <v-text-field type="email" solo />
                </v-col>
                <v-col class="col-12">
                  <label for>Phone number</label>
                  <div
                    class="v-input theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed"
                  >
                    <div class="v-input__control">
                      <div class="v-input__slot">
                        <div class="v-input__prepend-inner">
                          <div class="v-input__icon v-input__icon--prepend-inner mx-2">+250</div>
                        </div>
                        <div class="v-text-field__slot">
                          <input id="input-230" type="number" placeholder="xxxx" />
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
                <v-col class="col-12">
                  <label for>National Id</label>
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
                <v-col class="col-12">
                  <label for>Gender</label>
                  <v-row>
                    <v-col class="col-4" v-for="(gender,n) in genders" :key="n"> <v-icon :color="selectedgender === gender  ? '#FFD248' : '#B4B4B4'" @click="selectedgender = gender">mdi-checkbox-{{selectedgender === gender  ? 'marked' : 'blank'}}-circle{{selectedgender === gender  ? '' : '-outline'}}</v-icon> {{gender}}</v-col>
                  </v-row>
                </v-col>
                <v-col class="col-12">
                  <label for>Password</label>
                  <v-text-field type="email" solo />
                </v-col>
                <v-col class="col-12">
                  <label for>Confirm password</label>
                  <v-text-field type="email" solo />
                </v-col>
                <v-col class="col-8 mx-auto">
                  <v-btn rounded x-large class="yellow white--text px-16">Create account</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: ()=>({
    selectedgender: 'Male',
    genders: ['Male', 'Female']
  }),
  methods: {
    checkLength(index) {
      const nationalIdInputs = document.querySelectorAll(".id-inputs");
      if (nationalIdInputs[index].value > 10000){
        nationalIdInputs[index].style.color = "red";
      } else {
        nationalIdInputs[index].style.color = "inherit";
      }
    },
  },
};
</script>
<style lang="scss">
#registrations {
  .registration-panel {
    background-color: #fafbfd;
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
  .col{
    padding-top: 0 !important;
    // padding-bottom: 0 !important;
  }
}
.yellow{
        background-color: #FFD248 !important;
    }
</style>