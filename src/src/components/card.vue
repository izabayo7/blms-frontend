<template>
  <v-app class="course-new mt-10">
      <v-card class="course-card">
          <v-row class="card-content">
            <v-col cols="5" class="course-image-side">
              <v-img
                src="https://miro.medium.com/max/9792/0*12_kzzgXcbiJYV1K."
                class="course-image"
              >
               </v-img>
            </v-col>
            <v-col cols="7" class="coure-details-side">
              <p class="course-title">Economics for beginners</p>
              <p class="course-instructor">Daniel Ryabatwa</p>
              <p class="course-description">When trying to learn something most people try a lot of ways, but all of them end up ...</p>
              <v-progress-linear
                v-model="power"
                color="#ffc100"
                class="course-progress"
                />
              <p class="course-completion">78% completion</p>
            </v-col>
          </v-row>
      </v-card>
  </v-app>
</template>

<script>
export default {
    data:() =>({
        power: 78,
    }),
}
</script>

<style lang="scss" scoped>
.course-new{
    .course-card.v-card.v-sheet {
        margin-left: 10em;
        width: 260px;
        height: 160px;
        border-radius: 12px;
        .course-image-side {
            padding: 35px 0 0;
            .course-image{
                height: 90px;
                width: 90px;
                border-radius: 45px;
                margin-left: 25px;
                border: 1px solid grey;
            }
        }
        .coure-details-side {
            margin-top: 15px;
            .course-title {
                line-height: 1;
                color: #bbb;
                font-size: 14px;
            }
            .course-instructor {
                font-size: 12px;
                font-weight: 500;
                margin-top: -12px;
            }
            .course-description {
                font-size: 10px;
                line-height: 1.2;
                margin-top: -10px;
                color: #acacac;
            }
            .course-progress {
                height: 10px !important;
                width: 130px;
                border-radius: 3px;
                margin-top: -12px;
            }
            .course-completion {
                font-size: 11px;
                font-weight: 700;
                margin-top: 3px;
            }
        }
    }
}
</style>