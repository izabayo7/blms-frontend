<template>
<v-container fluid>
  <v-card :to="to" class="course-card"  v-if="category=='ongoing'">
<v-row class="card-content">
            <v-col cols="5" class="course-image-side">
              <v-img
                v-bind:src="''+image"
                class="course-image"
              >
               </v-img>
            </v-col>
            <v-col cols="7" class="coure-details-side">
              <p class="course-title">{{title}}</p>
              <p class="course-instructor">{{instructor}}</p>
              <p class="course-description">{{description}}</p>
              <v-progress-linear
                v-model="power"
                color="#ffc100"
                class="course-progress"
                />
              <p class="course-completion">78% completion</p>
            </v-col>
          </v-row>
  </v-card>
  <v-card :to="to" class="course completed" v-else>
      <v-row>
          <v-col cols="12" id="cover-pic">
              <v-img
              class="course-image"
              v-bind:src="''+image"
              style="height: 217px"
              ></v-img>
          </v-col>
          <v-col cols="12" class="completed-results">
              <span class="title d-block text-truncate mb-2 mb-sm-1">{{ title }}</span>
              <span class="course-description text-caption d-block mb-6">{{ description }}</span>
            <h4> 
                <v-avatar size="30" class="user-profile">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="avatar"
                    >
                </v-avatar>
                Instructor {{ instructor }}</h4>
            <h4> <v-icon color="#ffd248">mdi-star-outline</v-icon> 4.2</h4>
          </v-col>
      </v-row>
  </v-card>
</v-container>
</template>

<script>
export default {
    data:() =>({
        power: 78,
        knowledge: 45
    }),
 props: {
     image: {
         type: String,
         default: 'https://randomuser.me/api/portraits/men/81.jpg'
     },
     title: {
         type: String,
         required: true
     },
     instructor: {
         type: String,
         required: true
     },
     description: {
         type: String,
         required: true
     },
     category: {
         type: String,
         required: true
     },
     to: {
         type: String,
         required: true
     }
 },
}
</script>

<style lang="scss" scoped>
    .course-card.v-card.v-sheet {
        width: 260px;
        height: 160px;
        border-radius: 12px;
        .course-image-side {
            padding: 35px 0 0;
            .course-image{
                height: 90px;
                width: 90px;
                border-radius: 45px;
                margin-left: 13px;
                border: 1px solid grey;
            }
        }
        .coure-details-side {
            margin: -110px 95px 0;
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
                margin-top: -5px;
            }
            .course-completion {
                font-size: 11px;
                font-weight: 700;
                margin-top: 3px;
            }
        }
    }
</style>