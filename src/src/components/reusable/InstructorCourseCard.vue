<template>
  <div class="class-view">
      <v-card :class="`class-card ${course.published ? '' : 'unpublished-card'}`">
          <v-row class="first-row">
            <v-col class="col-md-7 col-7 content-side">
              <p class="course-title">Economics Basics</p>
              <p class="course-chapters">16 Chapters</p>
              <p :class="`course-description ${course.published ? 'hidden-md-and-down' : ''}`">Learn about the basics of compound interest</p>
              <p :class="`published-date ${course.published ? 'hidden-md-and-down' : ''}`" v-if="course.published">Published on 7th July</p>
              <v-btn class="edit-btn">Edit Course <v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-col>
            <v-col class="col-md-5 col-5 image-side">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    class="hidden-md-and-up menu-btn"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list class="mt-10">
                  <v-list-item
                    v-for="(item, i) in course.published ? publishedList : unPublishedList"
                    :key="i"
                    class="menu-list"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-img
              src="https://miro.medium.com/max/9792/0*12_kzzgXcbiJYV1K."
              class="course-image hidden-md-and-down"></v-img>
              <p class="course-students" v-if="course.published">60 students</p>
            </v-col>
          </v-row>
          <v-row class="second-row hidden-md-and-down">
            <v-col class="col-md-6">
              <v-btn text color="error" class="action-btn" v-if="course.published">Unpublish Course</v-btn>
              <v-btn text color="error" class="action-btn" v-else>Delete Course</v-btn>
            </v-col>
            <v-col class="col-md-6">
              <v-btn text  class="action-btn">Preview Course</v-btn>
            </v-col>
          </v-row>
      </v-card>
  </div>
</template>

<script>
export default {
    data:() =>({
        power: 67,
        publishedList: [
        { title: 'Preview Course' },
        { title: 'Edit Course' },
        { title: 'Unpublish Course' },
      ],
      unPublishedList: [
        { title: 'Publish Course' },
        { title: 'Edit Course' },
        { title: 'Delete Course' },
      ],
    }),
    props: {
     course:{
         type: Object,
         required: true
     },
 }
}
</script>

<style lang="scss" scoped>
.class-view{
  .class-card{
    width: 350px;
    margin-top: 40px;
    border-radius: 15px;
    background-color: #eee;
    .first-row{
      background-color: #fff !important;
      width: 350px;
      margin-left: 0;
      border-radius: 10px;
      padding-left: 10px;
      .content-side{
            .course-title {
                font-weight: 600;
            }
            .course-chapters {
                margin-top: -18px;
                font-size: 12px;
                font-weight: 900;
                color: #9a9a9a;
            }
            p.course-description {
                margin-top: -6px;
                font-weight: 500;
                line-height: 1;
            }
            .published-date {
                font-size: 12px;
                color: #9a9a9a;
            }
            .edit-btn{
                box-shadow: 0 7px 14px rgb(114, 114, 114, .16);
                background: #ffd248;
                color: #fff;
                font-size: 11px;
                height: 30px;
                border-radius: 15px;
            .mdi-arrow-right::before {
                font-size: 18px;
                padding-left: 10px;
          }
        }
      }
      .image-side{
        .course-image {
            height: 110px;
            width: 110px;
            border-radius: 55px;
            border: 2px solid #ffd248;
            margin: 6px 0;
        }
        .course-students {
            margin: 18px 18px 0;
            color: #9a9a9a;
            font-size: 14px;
            font-weight: 500;
        }
      }
    }
    .second-row{
      width: 350px;
      margin-left: 0;
      height: 38px;
      .action-btn {
          margin-top: -10px;
      }
    }
  }
  @media (max-width: 800px){
    .class-view{
      
      .class-card{
        width: 280px !important;
        .first-row{
          height: 155px;
          .menu-btn{
            margin-left: 85px;
            }
          }
        }
    }
    .class-card{
      width: 280px !important;
    .first-row{
      height: 155px;
      .menu-btn{
        margin-left: 85px;
      }
    }      
    }
  }
}
</style>
