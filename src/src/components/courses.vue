<template>
  <div>
    <v-container v-if="$store.state.user.category === 'Student'" id="courses" fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mt-10">Ongoing Courses {{$vuetify.breakpoint.name}}</h2>
        </v-col>
      </v-row>
      <v-col class="course-heading col-12">
        <v-row>
            <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(course, i) in coursesfake" :key="i" cols="12" sm="6" md="4" class="n-padding">
            <kurious-student-course-card
              to="/courses/anyCourse"
              category="ongoing"
              :title="course.title"
              :instructor="course.instructor"
              :image="course.image"
              :description="course.description"
            />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev hidden-md-and-down" slot="button-prev"></div>
            <div class="swiper-button-next hidden-md-and-down" slot="button-next"></div>
          </swiper>
        </v-row>
      </v-col>
      <v-col class="course-heading col-12">
        <v-row>
          <v-col v-for="(course, i) in courses" :key="i" cols="12" sm="6" md="4" class="n-padding">
            <kurious-student-course-card
              to="/courses/anyCourse"
              category="ongoing"
              :title="course.name"
              :instructor="course.instructor"
              :image="`${course.coverPicture}`"
              :description="course.description"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <h2 class="second-title">Completed Courses</h2>
      </v-col>
      <v-col class="course-heading col-12">
        <v-row>
          <v-col v-for="(course, i) in coursesfake" :key="i" cols="12" sm="6" md="4">
            <kurious-student-course-card
              to="/courses/anyCourse"
              category="completed"
              :title="course.title"
              :instructor="course.instructor"
              :image="course.image"
              :description="course.description"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-container>
    <v-container v-if="$store.state.user.category === 'Instructor'" class="classes-home">
        <v-row>
            <v-col
            cols="12"
            md="6"
            class="classes-header mt-10"
            ><h2>Hey Mrs Ellen,</h2>
            <h3>Ready to start your classes?</h3>
            <div class="class-btns">
              <v-btn rounded text color="#000" dark :class="`published-btn ${type=='published' ? 'active-btn' : ''}`"  @click="type='published'">Published Courses</v-btn>
              <v-btn rounded text color="#000" dark :class="`unpublished-btn ${type=='unpublished' ? 'active-btn' : ''}`" @click="type='unpublished'">Unpublished Courses</v-btn>
            </div>
            <kurious-instructor-course-card
                v-for="(course, i) in activeCourses"
                :key="i"
                :course="course"
                v-on:childToParent="performAction"
              />
              {{activeCourses.length === 0 ? `${type} courses are empty`:''}}
            </v-col>
            <v-col
            cols="12"
            md="6"
            ><v-card class="hidden-md-and-down live-class">
                <v-row>
                    <v-col cols="12"><v-img :src="require('@/assets/images/live-class.svg')"></v-img></v-col>
                    <v-col><router-link to="/live-class"><v-icon dark class="video-icon">mdi-video</v-icon></router-link></v-col>
                    <v-col><p>Start Live Class</p></v-col>
                </v-row>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Apis from '@/services/apis'
export default {
  name: "courses",
    components: {
      Swiper,
      SwiperSlide
    },
  data: () => ({
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 0,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            200:{
              slidesPerView: 0.7
            },
						320: {
							slidesPerView: 1.2
						},
						480: {
							slidesPerView:2.8 ,
							spaceBetween: 10
						},
						550:{
							slidesPerView:3,
						},
						740: {
							slidesPerView: 2.5
						},
						1000: {
							slidesPerView: 3.3
						}
					}
        },
    type: 'unpublished',
    courses: [],
    coursesfake: [
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://media.inmobalia.com/imgV1/B8vEv5Xh_VThvnEqMx4G0YtA8lAADdw1sBC5uN5pSX6~ImMWYgK8f72a6_2V5Fsi3Ei28Kvmds~cBwEukMeKfUqYSWBBx9dABGpiKVqX3duVN6IEC7a3fmuwpC4jE02qSn1_fEuDmqtn3cNbb5YsvDhrezEpAj8jK1u2cB7hDtjnp3AjMGMJ6~dvCdzQTUzEhF7JQMwYxJv4fg68HkKU8sZFpu9wlzdv_yAQb6xKkB3xf53zeE9XnkLocRN_LBREHQ4O2b40z7mI6SsIADH4NFjdTEzU0BB1JLPy97TaP8VEuGQ8kY0VfXj44~0sKXt_9OXj9oUWLtb7LxRlF0sn6eXgIKhrovrdTA--.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://miro.medium.com/max/9792/0*12_kzzgXcbiJYV1K."
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://wallpaperset.com/w/full/1/6/4/125537.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://specials-images.forbesimg.com/imageserve/5e5a9cf5d378190007f4a850/960x0.jpg?fit=scale"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://i.pinimg.com/236x/4d/d8/87/4dd8874c58145397a2e0f94df7387d83--la-nature-beautiful-things.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://wallpaperaccess.com/full/1223056.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://wallpaperaccess.com/full/321138.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRr1KNpH1_IbWxuQJilqGt4oSu6DATg0e-d0w&usqp=CAU"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://assets.hongkiat.com/uploads/nature-photography/The-best-nature-photography-collection.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://i.ytimg.com/vi/Z4ls0-ZGnU4/maxresdefault.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg"
      },
      {
        title: "Economics for beginners",
        instructor: "Daniel Ryabatwa",
        description:
          "When trying to learn something most people try a lot of ways, but all of them end up ...",
        image:
          "https://image.jimcdn.com/app/cms/image/transf/dimension=374x10000:format=jpg/path/sa6549607c78f5c11/image/ib48ff80852353309/version/1556981139/bergen-norway-best-destinations-for-nature-lovers.jpg"
      }
    ]
  }),
  computed: {
    activeCourses () {
      return this.courses.filter(i => i.published === (this.type === 'published')).reverse()
    }
  },
  beforeMount () {
    this.getEssentials()
    if (this.activeCourses.length === 0) {
      
      this.type = 'published'
    }
    
  },
  methods: {
    async getEssentials() {
      const url = this.$store.state.user.category === 'Instructor' ? `course/instructor/${this.$store.state.user._id}` : this.$store.state.user.category === 'Student' ? `course/facility-college-year/5f0ab5f7deea002f14fd93a2` : undefined
      const courses = await Apis.get(url)
      if (!courses.data.includes('No')) {
        this.courses = courses.data
      } else if (this.$store.state.user.category === 'Student') {
        let x = 0
        console.log(x)
      }
    },
    async performAction (type,id) {
        let i = 0;
        for (const course of this.courses) {
          if (course._id === id) {
            if (type === 'delete') {
              const response = await Apis.delete('course', id)
              if (response.data.includes('Successfully')) {
                alert('yuhuuuu')
                this.courses.splice(i,1)
              } else {
                alert('opsss')
              }
            } else {
              const response = await Apis.update('course', id, {published: true})
              if (response.data._id) {
                course.published = true
              } else {
                alert('opsss')
              }
            }
            break
          }
          i++
        }

    }
  }
}
</script>

<style lang="scss" scoped>
.classes-home{
    background-color: #f8f8f8;
    height: 100%;
    padding-left: 40px;
}

</style>