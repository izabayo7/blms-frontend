<template>
  <v-row id="regist-card">
    <v-col class="col-12">
      <v-row>
        <v-col class="col-12">
          <back class="ma-6" to="/administration" />
        </v-col>
        <v-col class="col-6 mx-auto mt-8">
          <v-card class="text-center mx-auto">
            <v-icon>mdi-account</v-icon>
            <p class="card--title">Welcome to user registration</p>
            <v-card-actions>
              <v-row>
                <v-col class="col-12 col-md-12">
                  <v-btn
                    @click="$router.push(`/administration/register/users/student`)"
                    rounded
                    large
                    class="white--text px-16 student-btn"
                    >Student Registration</v-btn
                  >
                </v-col>
                <v-col class="col-12 col-md-12">
                  <v-btn
                    @click="$router.push(`/administration/register/users/instructor`)"
                    rounded
                    large
                    class="px-16 teacher-btn"
                    >Teacher Registration</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    back: () => import("@/components/shared/back-button"),
  },
};
</script>

<style lang="scss" scoped>
#regist-card {
  background-color: #f9faff;
  .v-card {
    box-shadow: 0px 20px 40px rgba(135, 135, 135, 0.16);
    width: 70%;
    height: 120%;
    i.v-icon.notranslate.mdi.mdi-account.theme--light {
      color: $primary;
      font-size: 47px;
      border: 2px solid $primary;
      background-color: white;
      padding: 10px;
      border-radius: 36px;
      margin: -35px 155px 50px;
    }
    .card--title {
      font-size: 25px;
    }
    .v-card__actions {
      margin: 15px 35px 0;
      button.white--text.px-16.student-btn.v-btn.v-btn--contained.v-btn--rounded.theme--light.v-size--large {
        background-color: $primary;
        box-shadow: none;
      }
      button.px-16.teacher-btn.v-btn.v-btn--contained.v-btn--rounded.theme--light.v-size--large {
        background-color: transparent;
        box-shadow: none;
        color: $primary;
        border: 2px solid $primary;
      }
    }
  }
  .back--button {
    background-color: white;
  }
}
</style>