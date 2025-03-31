<template>
  <v-app class="course-new">
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(course,index) in coursesfake" :key="index">
        <v-card class="course-card">
          <v-row class="card-content">
            <v-col cols="5" class="course-image-side">
              <v-img
                :src="course.image"
                class="course-image"
              >
               </v-img>
            </v-col>
            <v-col cols="7" class="coure-details-side">
              <p class="course-title">{{course.title}}</p>
              <p class="course-instructor">{{course.instructor}}</p>
              <p class="course-description">{{course.description}}</p>
              <v-progress-linear
                v-model="power"
                color="#ffc100"
                class="course-progress"
                />
              <p class="course-completion">78% completion</p>
            </v-col>
          </v-row>
      </v-card>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </v-app>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  data: () => ({
    swiperOption: {
          slidesPerView: 3,
          spaceBetween: 0,
          slidesPerGroup: 3,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        coursesfake: [
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://media.inmobalia.com/imgV1/B8vEv5Xh_VThvnEqMx4G0YtA8lAADdw1sBC5uN5pSX6~ImMWYgK8f72a6_2V5Fsi3Ei28Kvmds~cBwEukMeKfUqYSWBBx9dABGpiKVqX3duVN6IEC7a3fmuwpC4jE02qSn1_fEuDmqtn3cNbb5YsvDhrezEpAj8jK1u2cB7hDtjnp3AjMGMJ6~dvCdzQTUzEhF7JQMwYxJv4fg68HkKU8sZFpu9wlzdv_yAQb6xKkB3xf53zeE9XnkLocRN_LBREHQ4O2b40z7mI6SsIADH4NFjdTEzU0BB1JLPy97TaP8VEuGQ8kY0VfXj44~0sKXt_9OXj9oUWLtb7LxRlF0sn6eXgIKhrovrdTA--.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://miro.medium.com/max/9792/0*12_kzzgXcbiJYV1K."
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://wallpaperset.com/w/full/1/6/4/125537.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://specials-images.forbesimg.com/imageserve/5e5a9cf5d378190007f4a850/960x0.jpg?fit=scale"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://i.pinimg.com/236x/4d/d8/87/4dd8874c58145397a2e0f94df7387d83--la-nature-beautiful-things.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://wallpaperaccess.com/full/1223056.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://wallpaperaccess.com/full/321138.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRr1KNpH1_IbWxuQJilqGt4oSu6DATg0e-d0w&usqp=CAU"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://assets.hongkiat.com/uploads/nature-photography/The-best-nature-photography-collection.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://i.ytimg.com/vi/Z4ls0-ZGnU4/maxresdefault.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg"
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://image.jimcdn.com/app/cms/image/transf/dimension=374x10000:format=jpg/path/sa6549607c78f5c11/image/ib48ff80852353309/version/1556981139/bergen-norway-best-destinations-for-nature-lovers.jpg"
      }
    ]
  })
    ,components:{Swiper,SwiperSlide}
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