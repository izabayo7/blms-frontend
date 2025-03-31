<template>
  <!-- details container -->
  <section v-if="course != undefined" class="my-container">
    <!--      this is for student preview-->
    <div class="student" v-if="userCategory === 'Student'">
      <main class="description">
        <h1 class="pb-5">{{course.name}}</h1>
        <article class="desc pb-10">{{ course.description }}</article>

        <div class="instructor-profile">
          <article>
            <img v-if="course.instructor.profile" :src="instructor.profile" alt="profile picture" />
            <v-avatar v-else size="50" class="bg-color-one">
              <span class="white--text" >{{computeText(`${course.instructor.surName} ${course.instructor.otherNames}`)}}</span>
            </v-avatar>
          </article>
          <article class="owner">
            <h3>{{ `${course.instructor.surName} ${course.instructor.otherNames}`}}</h3>
            <p class="facility">PHD, web development</p>
          </article>
        </div>

        <article class="infos pt-10">
          <div>
            <span class="icon">icon</span>
            <span
              class="content"
            >{{ `${course.chapters.length} chapter ${course.chapters.length > 1 ? 's' : ''}` }}</span>
          </div>
          <div>
            <span class="icon">icon</span>
            <span class="content">{{course.assignmentsLength}} assignments</span>
          </div>
        </article>
      </main>
      <main class="preview">
        <preview
          :image="course.coverPicture"
          :name="course.name"
          :dateUploaded="course.createdAt | formatDate"
          :progress="course.progress"
        />
      </main>
    </div>
    <!--      end of student preview-->

    <!--      teacher preview-->
    <div class="teacher" v-if="userCategory === 'Instructor'">
      <button class="back">back</button>

      <div class="preview-card row">
        <div class="preview-image col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <img
            v-if="course.coverPicture"
            :alt="course.name + ' cover photo'"
            class="preview-media"
            :src="course.coverPicture"
          />
          <div v-else class="bg-color-one no-image text-center preview-image" style="height: 100%">
            <span class="text-h1 white--text">{{computeText(course.name)}}</span>
          </div>
        </div>
        <div class="preview-content col-sm-12 col-md-12 col-lg-8 col-xl-8">
          <main class="description">
            <h1 class="py-5">{{ course.name }}</h1>
            <article class="desc pb-10">{{ course.description }}</article>

            <!--                course informations-->
            <article class="course-info row">
              <div class="info-col col-sm-6 col-md-~4 col-lg-4 col-xl-4">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="101.476"
                    height="93.705"
                    viewBox="0 0 101.476 93.705"
                  >
                    <g
                      id="Icon_ionic-ios-book"
                      data-name="Icon ionic-ios-book"
                      transform="translate(-3.382 -4.5)"
                    >
                      <path
                        id="Path_7"
                        data-name="Path 7"
                        d="M27.275,4.507c13.2,0,24.405,6.809,24.405,20.012v3.9h0V97.71a.48.48,0,0,1-.927.171v-.024c-2.514-8.347-9.323-16.5-20.085-17.206C22.32,80.114,14.34,83.8,7.946,89.705a2.63,2.63,0,0,1-1.611.708h-1.1c-.9,0-1.855-.659-1.855-1.489V18.2C3.358,10.364,14.071,4.507,27.275,4.507Z"
                        transform="translate(0 0.017)"
                      />
                      <path
                        id="Path_8"
                        data-name="Path 8"
                        d="M43.108,4.5C29.905,4.5,18.7,11.309,18.7,24.512v3.9h0V97.7a.48.48,0,0,0,.927.171v-.024c2.514-8.347,9.616-16.571,20.085-17.206,8.029-.488,15.595,2.685,22.721,9.054a2.776,2.776,0,0,0,1.611.708h1.1c.9,0,1.855-.659,1.855-1.489V18.167C67.025,10.357,56.311,4.5,43.108,4.5Z"
                        transform="translate(37.858)"
                      />
                    </g>
                  </svg>
                </div>
                <div class="text">{{course.chapters.length}} chapters</div>
              </div>
              <div class="info-col col-sm-6 col-md-~4 col-lg-4 col-xl-4">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="101.875"
                    height="87.321"
                    viewBox="0 0 101.875 87.321"
                  >
                    <path
                      id="Icon_ionic-md-school"
                      data-name="Icon ionic-md-school"
                      d="M20.783,53.891v19.4l32.4,18.533,32.4-18.533v-19.4l-32.4,18.533ZM53.187,4.5,2.25,33.607,53.187,62.714,94.869,38.905V72.424h9.255V33.607Z"
                      transform="translate(-2.25 -4.5)"
                    />
                  </svg>
                </div>
                <div class="text">{{course.facilityCollegeYear.facilityCollege.facility.name}}</div>
              </div>
              <div class="info-col col-sm-6 col-md-~4 col-lg-4 col-xl-4">
                <div class="icon">
                  <svg
                    id="Group_14"
                    data-name="Group 14"
                    xmlns="http://www.w3.org/2000/svg"
                    width="102.4"
                    height="111.134"
                    viewBox="0 0 102.4 111.134"
                  >
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M63.425,264.095a7.985,7.985,0,0,0,7.976,7.976h86.448a7.985,7.985,0,0,0,7.976-7.976V202.2H63.425Z"
                      transform="translate(-63.425 -160.937)"
                    />
                    <path
                      id="Path_19"
                      data-name="Path 19"
                      d="M81.65,47a2.659,2.659,0,0,0-2.659,2.659V61.3H71.4a7.985,7.985,0,0,0-7.976,7.976V82.946h102.4V69.28a7.985,7.985,0,0,0-7.976-7.976h-7.591V49.659a2.659,2.659,0,1,0-5.317,0V61.3H84.309V49.659A2.659,2.659,0,0,0,81.65,47Z"
                      transform="translate(-63.425 -47)"
                    />
                  </svg>
                </div>
                <div class="text">{{ course.updatedAt | formatDate }}</div>
              </div>
              <div class="info-col col-sm-6 col-md-~4 col-lg-4 col-xl-4">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="125.952"
                    viewBox="0 0 100 125.952"
                  >
                    <path
                      id="Path_16"
                      data-name="Path 16"
                      d="M129.65,58.926,98.832,28.376A6.458,6.458,0,0,0,94.008,26.5H40.679A9.5,9.5,0,0,0,31.3,35.879V143.073a9.321,9.321,0,0,0,9.379,9.379h81.2a9.5,9.5,0,0,0,9.379-9.379V63.75C131.526,61.874,130.454,60.266,129.65,58.926ZM52.739,83.581H77.661a3.484,3.484,0,1,1,0,6.968H52.739a3.484,3.484,0,1,1,0-6.968Zm53.329,49.845H52.739a3.484,3.484,0,0,1,0-6.968h53.329a3.237,3.237,0,0,1,3.484,3.484A3.378,3.378,0,0,1,106.068,133.426Zm0-21.439H52.739a3.484,3.484,0,1,1,0-6.968h53.329a3.484,3.484,0,0,1,0,6.968Zm-5.9-53.329a1.266,1.266,0,0,1-1.34-1.34V40.167l18.491,18.491Z"
                      transform="translate(-31.3 -26.5)"
                    />
                  </svg>
                </div>
                <div class="text">{{course.assignmentsLength}} assignments</div>
              </div>
              <div class="info-col col-sm-6 col-md-~4 col-lg-4 col-xl-4">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100.9"
                    height="70.63"
                    viewBox="0 0 100.9 70.63"
                  >
                    <path
                      id="Icon_awesome-user-friends"
                      data-name="Icon awesome-user-friends"
                      d="M30.27,37.565A17.657,17.657,0,1,0,12.612,19.907,17.649,17.649,0,0,0,30.27,37.565ZM42.378,42.61H41.069a24.379,24.379,0,0,1-21.6,0H18.162A18.167,18.167,0,0,0,0,60.772v4.54A7.569,7.569,0,0,0,7.567,72.88h45.4a7.569,7.569,0,0,0,7.567-7.567v-4.54A18.167,18.167,0,0,0,42.378,42.61Zm33.3-5.045A15.135,15.135,0,1,0,60.54,22.43,15.139,15.139,0,0,0,75.675,37.565Zm7.567,5.045h-.6a19.881,19.881,0,0,1-13.937,0h-.6a17.511,17.511,0,0,0-8.781,2.428,23.072,23.072,0,0,1,6.259,15.734v6.054c0,.347-.079.678-.095,1.009H93.332a7.569,7.569,0,0,0,7.567-7.567A17.649,17.649,0,0,0,83.242,42.61Z"
                      transform="translate(0 -2.25)"
                    />
                  </svg>
                </div>
                <div class="text">year {{course.facilityCollegeYear.collegeYear.digit}}</div>
              </div>
              <div class="info-col col-sm-6 col-md-~4 col-lg-4 col-xl-4">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100.864"
                    height="70.605"
                    viewBox="0 0 100.864 70.605"
                  >
                    <path
                      id="Icon_awesome-users"
                      data-name="Icon awesome-users"
                      d="M15.13,32.509A10.086,10.086,0,1,0,5.043,22.423,10.1,10.1,0,0,0,15.13,32.509Zm70.6,0A10.086,10.086,0,1,0,75.648,22.423,10.1,10.1,0,0,0,85.735,32.509Zm5.043,5.043H80.691a10.057,10.057,0,0,0-7.108,2.931A23.053,23.053,0,0,1,85.419,57.725h10.4a5.038,5.038,0,0,0,5.043-5.043V47.639A10.1,10.1,0,0,0,90.778,37.552Zm-40.346,0A17.651,17.651,0,1,0,32.781,19.9,17.642,17.642,0,0,0,50.432,37.552Zm12.1,5.043H61.228a24.37,24.37,0,0,1-21.591,0H38.328A18.16,18.16,0,0,0,20.173,60.751V65.29a7.567,7.567,0,0,0,7.565,7.565H73.127a7.567,7.567,0,0,0,7.565-7.565V60.751A18.16,18.16,0,0,0,62.536,42.6ZM27.281,40.484a10.057,10.057,0,0,0-7.108-2.931H10.086A10.1,10.1,0,0,0,0,47.639v5.043a5.038,5.038,0,0,0,5.043,5.043H15.429A23.111,23.111,0,0,1,27.281,40.484Z"
                      transform="translate(0 -2.25)"
                    />
                  </svg>
                </div>
                <div
                  class="text"
                >{{`${course.attendedStudents} Student${course.attendedStudents > 1 ? 's' : ''}`}}</div>
              </div>
            </article>

            <!--                action buttons-->
            <article class="action-btns">
              <div class="act-btn preview">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="110"
                  height="82.727"
                  viewBox="0 0 110 82.727"
                >
                  <g
                    id="Icon_feather-eye"
                    data-name="Icon feather-eye"
                    transform="translate(3.5 -1)"
                  >
                    <path
                      id="Path_9"
                      data-name="Path 9"
                      d="M1.5,42.364S19.682,6,51.5,6s50,36.364,50,36.364-18.182,36.364-50,36.364S1.5,42.364,1.5,42.364Z"
                      transform="translate(0 0)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="7"
                    />
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M53.833,33.666A20.166,20.166,0,1,1,33.666,13.5,20.166,20.166,0,0,1,53.833,33.666Z"
                      transform="translate(17.834 8.697)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="7"
                    />
                  </g>
                </svg>
              </div>
              <div class="act-btn upload">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="106"
                  height="106"
                  viewBox="0 0 106 106"
                >
                  <g
                    id="Icon_feather-upload"
                    data-name="Icon feather-upload"
                    transform="translate(-1.5 -1.5)"
                  >
                    <path
                      id="Path_11"
                      data-name="Path 11"
                      d="M104.5,22.5V43.256c0,5.732-4.975,10.378-11.111,10.378H15.611C9.475,53.634,4.5,48.987,4.5,43.256V22.5"
                      transform="translate(0 50.866)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="7"
                    />
                    <path
                      id="Path_12"
                      data-name="Path 12"
                      d="M68.989,30.445,39.744,4.5,10.5,30.445"
                      transform="translate(14.756)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="7"
                    />
                    <path
                      id="Path_13"
                      data-name="Path 13"
                      d="M18,4.5V66.767"
                      transform="translate(36.5)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="7"
                    />
                  </g>
                </svg>
              </div>
              <div class="act-btn update">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="88.871"
                  viewBox="0 0 100 88.871"
                >
                  <path
                    id="Icon_awesome-edit"
                    data-name="Icon awesome-edit"
                    d="M69.9,14.434l15.66,15.66a1.7,1.7,0,0,1,0,2.4L47.639,70.406,31.528,72.195A3.377,3.377,0,0,1,27.8,68.462l1.788-16.111L67.5,14.434A1.7,1.7,0,0,1,69.9,14.434Zm28.125-3.976L89.549,1.986a6.79,6.79,0,0,0-9.583,0L73.819,8.132a1.7,1.7,0,0,0,0,2.4l15.66,15.66a1.7,1.7,0,0,0,2.4,0l6.146-6.146a6.79,6.79,0,0,0,0-9.583ZM66.667,60.094V77.767H11.111V22.212h39.9a2.135,2.135,0,0,0,1.476-.608l6.944-6.944A2.083,2.083,0,0,0,57.951,11.1H8.333A8.335,8.335,0,0,0,0,19.434V80.545a8.335,8.335,0,0,0,8.333,8.333H69.444a8.335,8.335,0,0,0,8.333-8.333v-27.4a2.087,2.087,0,0,0-3.559-1.476l-6.944,6.944A2.135,2.135,0,0,0,66.667,60.094Z"
                    transform="translate(0 -0.007)"
                  />
                </svg>
              </div>
              <div class="act-btn delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="111"
                  height="122.111"
                  viewBox="0 0 111 122.111"
                >
                  <g
                    id="Icon_feather-trash"
                    data-name="Icon feather-trash"
                    transform="translate(1 2.5)"
                  >
                    <path
                      id="Path_14"
                      data-name="Path 14"
                      d="M4.5,9h100"
                      transform="translate(0 16.222)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="7"
                    />
                    <path
                      id="Path_15"
                      data-name="Path 15"
                      d="M86.52,25.222V103a11.2,11.2,0,0,1-11.289,11.111H18.789A11.2,11.2,0,0,1,7.5,103V25.222m16.933,0V14.111A11.2,11.2,0,0,1,35.721,3H58.3A11.2,11.2,0,0,1,69.587,14.111V25.222"
                      transform="translate(7.49)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="7"
                    />
                  </g>
                </svg>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
    <!--      end of teacher preview-->
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Course-details",
  components: {
    preview: () => import("@/components/courses/Preview"),
  },
  data() {
    return {
      course: undefined,
    };
  },
  filters: {
    //format date
    formatDate(dateToFormat) {
      const dateFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }); // format to format the date
      const formatedDate = dateFormat.formatToParts(new Date(dateToFormat)); //lets format date
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year },
      ] = formatedDate; //lets destruct data from the formated date

      return `${day} ${month} ${year}`;
    },
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.category;
    },
    // get courses ongoing and finished
    ...mapGetters("courses", ["selectedCourse", "loaded"]),
  },
  methods: {
    ...mapActions("courses", ["getCourses", "findCourseByName"]),
  },
  async created() {
    this.findCourseByName({
      userCategory: this.$store.state.user.category.toLowerCase(),
      userId: this.$store.state.user._id,
      courseName: this.$route.params.name,
    }).then((course) => {
      this.course = course;
    });
  },
};
</script>
<style lang="scss" scoped>
.teacher {
  background-color: $tertiary;
  min-height: 90vh;

  button.back {
    margin: 2rem;
    padding: 0.2rem 2rem;
    border-radius: 30px;
    background-color: $main;
    box-shadow: 0 0 10px lighten($secondary, 3);
  }
  .preview-card {
    background-color: $main;
    margin: auto;
    max-width: 80%;
    display: flex;
    flex-direction: row;

    .preview-image {
      padding: 0;
      align-self: stretch;
      .preview-media {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .course-info {
      .info-col {
        display: flex;
      }
      .icon {
        //background-color: $secondary;
        //padding: .5rem;
        svg {
          width: 23px;
          height: 23px;
        }
      }
      .text {
        padding-left: 1rem;
      }
    }

    .action-btns {
      margin: 2rem auto;
      width: fit-content;
      display: flex;

      .act-btn {
        padding: 0.5rem;
        margin: 0 1rem;
        border-radius: 50%;
        cursor: pointer;

        svg {
          fill: $main;
          width: 30px;
          height: 30px;
          path {
            stroke: $main;
            //stroke-width: 3px;
          }
        }
      }

      .preview {
        background-color: $info;
      }
      .upload {
        background-color: $success;
        svg {
          transform: scale(0.9);
        }
      }
      .update {
        background-color: darken($secondary, 7);
      }
      .delete {
        background-color: $danger;
      }
    }
  }
}
.student {
  background: white;
  // width:100%;
  height: 100%;
  margin: 0;
  padding: 2rem;
  padding-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  main {
    &.description {
      padding-left: 2rem;

      h1 {
        font-size: 3rem;
        max-width: 30rem;
      }

      .owner {
        padding-left: 1rem;
        color: #717070;

        p {
          margin: 0;
          padding: 0;
          color: #717070;
          font-size: 0.8rem;
        }
      }
      .infos {
        .content {
          color: #717070;
          font-size: 1.1rem;
        }
      }

      .desc {
        color: #717070;
        max-width: 25rem;
      }
      // style the instructor profile
      .instructor-profile {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 50px;
          cursor: pointer;
        }
      }
    }
    &.preview {
      padding-right: 5rem;
    }
  }
}
</style>