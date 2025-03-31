<template>
  <div id="regist-card">
    <v-btn @click="$router.push(`/admin`)">
      <v-icon>mdi-chevron-left</v-icon>Back
    </v-btn>
    <v-card>
      <v-icon>mdi-account</v-icon>
      <v-card-title>Welcome to user registration</v-card-title>
      <v-card-actions>
        <v-row>
          <v-col class="col-12 col-md-12">
            <v-btn
              @click="$router.push(`/register/users/student`)"
              rounded
              large
              class="white--text px-16 student-btn"
            >Student Registration</v-btn>
          </v-col>
          <v-col class="col-12 col-md-12">
            <v-btn
              @click="$router.push(`/register/users/instructor`)"
              rounded
              large
              class="px-16 teacher-btn"
            >Teacher Registration</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#regist-card {
  button.v-btn.v-btn--contained.theme--light.v-size--default {
    margin: 20px 55px -20px;
    height: 25px;
    border-radius: 20px;
    font-size: 11px;
    i.v-icon.notranslate.mdi.mdi-chevron-left.theme--light {
      font-size: 20px;
    }
  }
  .v-card {
    width: 380px;
    height: 300px;
    margin: 100px auto;
    margin: 100px auto;
    i.v-icon.notranslate.mdi.mdi-account.theme--light {
      color: dodgerblue;
      font-size: 47px;
      border: 2px solid dodgerblue;
      padding: 10px;
      border-radius: 36px;
      margin: -35px 155px 0;
    }
    .v-card__title {
      margin: -5px 5px 0;
      font-size: 25px;
    }
    .v-card__actions {
      margin: 15px 35px 0;
      button.white--text.px-16.student-btn.v-btn.v-btn--contained.v-btn--rounded.theme--light.v-size--large {
        background-color: dodgerblue;
        box-shadow: none;
      }
      button.px-16.teacher-btn.v-btn.v-btn--contained.v-btn--rounded.theme--light.v-size--large {
        background-color: transparent;
        box-shadow: none;
        color: dodgerblue;
        border: 2px solid dodgerblue;
      }
    }
  }
}
</style>