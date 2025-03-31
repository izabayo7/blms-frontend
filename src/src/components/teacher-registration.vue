<template>
  <v-app class="student-regist">
    <v-row>
      <v-col class="col-3 col-md-2 svg-side"></v-col>
      <v-col class="col-9 col-md-10 form-side">
        <v-form>
          <h1>Teacher Registration</h1>
         <v-row class="names">
                      <v-col class="names col-12 col-md-6">
                        <label>First name</label>
                        <v-text-field
                            solo
                            required
                        />
                      </v-col>
                      <v-col class="last-name">
                        <label>Last name</label>
                        <v-text-field
                            solo
                            required
                        />
                      </v-col>
                  </v-row>
          <label>Email</label>
            <v-text-field
              solo
              
              required
            />
            <label>Phone number</label>
            <v-text-field
              solo     
              required
              class="phone"
            />
            <label>National ID</label>
            <v-text-field
              placeholder="xxxx xxxx xxxx xxxx"
              solo
              required
              class="inputs id-number"
            />
            <label>Faculty</label>
            <v-text-field
              solo     
              required
              class="inputs"
            />
            <label for>Gender</label>
            <v-row>
              <v-col class="col-3" v-for="(gender,n) in genders" :key="n"> <v-icon :color="selectedgender === gender  ? '#FFD248' : '#B4B4B4'" @click="selectedgender = gender">mdi-checkbox-{{selectedgender === gender  ? 'marked' : 'blank'}}-circle{{selectedgender === gender  ? '' : '-outline'}}</v-icon> {{gender}}</v-col>
            </v-row>
            <v-btn rounded large class="yellow white--text px-16">Create Account</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data: ()=>({
    selectedgender: 'Male',
    genders: ['Male', 'Female']
  }),
}
</script>

<style lang="scss" scoped>

.student-regist{
  .svg-side{
    background-color: rgb(238, 238, 49);
  }
  .form-side{
    background-color: #eee;
    form.v-form {
        max-width: 500px;
        margin-left: 170px;
        .v-input.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed {
            margin-bottom: -23px;
        }
        .phone{
          width: 300px;
        }
        .inputs{
          width: 260px;
        }
        button.yellow.white--text.px-16.v-btn.v-btn--contained.v-btn--rounded.theme--light.v-size--large {
            width: 320px;
        }
        
      }
    }
  }
</style>