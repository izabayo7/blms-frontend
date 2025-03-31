<template>
  <v-app id="school-page">
    <v-row>
      <v-col class="col-4 col-md-4 logo-side">
        <v-btn @click="$router.push(`/admin`)">
          <v-icon>mdi-chevron-left</v-icon>Back
        </v-btn>
        <div class="school-logo">
          <p>A</p>
          <v-icon class="edit-logo">mdi-pencil</v-icon>
        </div>
      </v-col>
      <v-col class="col-8 col-md-8 form-side">
        <v-form>
          <h2>School Details</h2>
          <label>School Name</label>
          <v-text-field outlined solo dense readonly value="African Leadership University"></v-text-field>
          <label>Email</label>
          <v-text-field outlined solo dense readonly value="alu@gmail.com"></v-text-field>
          <label>School Phone</label>
          <v-text-field outlined solo dense readonly value="0788324571"></v-text-field>
          <label>School Location</label>
          <v-text-field outlined solo dense readonly value="Kicukiro"></v-text-field>
          <v-btn class="edit-btn" @click="$router.push(`/edit-school-info`)">Edit Info</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#school-page {
  background-color: whitesmoke;
  padding-top: 10px;
  height: 624px;
  overflow: hidden;
  .logo-side {
    button.v-btn.v-btn--contained.theme--light.v-size--default {
      background-color: transparent !important;
      margin: 10px 40px 50px;
      height: 25px;
      border-radius: 20px;
      font-size: 11px;
    }
    .school-logo {
      background-color: yellow;
      width: 190px;
      height: 190px;
      margin-left: 50px;
      border-radius: 95px;
      p {
        text-align: center;
        font-size: 100px;
        padding-top: 12px;
        font-weight: 500;
      }
      i.v-icon.notranslate.edit-logo.mdi.mdi-pencil.theme--light {
        color: #000;
        border: 1px solid;
        font-size: 24px;
        padding: 5px;
        border-radius: 22px;
        margin: -45px 135px 0;
        cursor: pointer;
      }
    }
  }
  .form-side {
    h2 {
      margin-bottom: 30px;
    }
    .v-input--is-dirty.v-input--is-readonly.v-input--dense.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined {
      width: 400px;
    }
    button.edit-btn.v-btn.v-btn--contained.theme--light.v-size--default {
      color: #fff;
      background-color: lightgreen;
      box-shadow: none;
      width: 130px;
      margin-left: 125px;
    }
  }
}
</style>