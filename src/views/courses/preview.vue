<template>
  <!-- details container -->
  <section class="my-container">
    <!--      this is for student preview-->
    <v-row v-if="userCategory === 'STUDENT'">
      <div class="white back-container">
        <back class="ma-6 mb-1 ml-16" to="/courses"/>
      </div>
      <v-col v-if="!loaded" class="col-12">
        <div class="ssc elevation-0 ssc-card student-card-skeleton ml mt-10">
          <div class="ssc-wrapper d-md-flex justify-between ml">
            <div :class="`w-${$vuetify.breakpoint.mdAndUp ? 60 : 100} w-100 mb-2 ml`">
              <div class="ssc-head-line mb w-50"></div>
              <div class="ssc-line w-60 mb-2 mt-8"></div>
              <div class="ssc-line w-60 mb-2"></div>
              <div class="ssc-line w-60 mb-2"></div>
              <div class="ssc-line w-60 mb-2"></div>
              <div class="ssc-line w-60 mb-2"></div>
              <div class="ssc-line w-60 mb-2"></div>
              <div class="ssc-line w-40 mb-8"></div>
              <div class="ssc-wrapper flex">
                <div class="w-20">
                  <div class="ssc-circle mb"></div>
                </div>
                <div class="w-50 mt-2 mr">
                  <div class="ssc-line w-70 mb-2"></div>
                  <div class="ssc-line w-70"></div>
                </div>
              </div>
              <div class="ssc-wrapper flex mt py-0">
                <div class="w-20">
                  <div class="ssc-circle mb"></div>
                </div>
                <div class="w-50 mt-2 mr">
                  <div class="ssc-line w-50 mt-2"></div>
                </div>
              </div>
              <div class="ssc-wrapper flex pt-0">
                <div class="w-20">
                  <div class="ssc-circle mb"></div>
                </div>
                <div class="w-50 mt-2 mr">
                  <div class="ssc-line w-50 mt-2"></div>
                </div>
              </div>
            </div>
            <div :class="`w-${$vuetify.breakpoint.mdAndUp ? 40 : 80}`">
              <div class="ssc ssc-card elevation-0">
                <div class="ssc-wrapper pa-0">
                  <div class="ssc-square w-100" style="height: 20rem"></div>
                </div>
                <div class="ssc-wrapper flex ml pb-0">
                  <div class="w-50 mt-2 mr">
                    <div class="ssc-head-line w-70"></div>
                  </div>
                  <div class="w-20">
                    <div class="ssc-circle mb"></div>
                  </div>
                </div>
                <div class="ssc-wrapper flex ml py-0">
                  <div class="w-90 mt-2 mr">
                    <div class="ssc-head-line w-90"></div>
                  </div>
                </div>
                <div class="ssc-wrapper flex ml">
                  <div class="w-60 mb-2 mt-2 mx-auto">
                    <div class="ssc-head-line w-90" style="height: 38px"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col v-else class="col-12 pa-0 pa-md-8 student d-md-flex">

        <main class="preview mt-sm-4 hidden-md-and-up">
          <preview
              :image="course.cover_picture"
              :name="course.name"
              :dateUploaded="course.createdAt | formatDate"
              :progress="course.progress"
              :isLive="isLive"
              :class_id="nearestLiveSession ? nearestLiveSession._id : undefined"
          />
        </main>
        <main class="description">
          <h1 class="pb-5">{{ course.name }}</h1>
          <article class="desc pb-10">{{ course.description }}</article>

          <div class="instructor-profile">
            <article @mouseenter="mouseOnPic($event,course.user.user_name,'user-profile-card')"
                     >
              <img
                  v-if="course.user.profile"
                  :src="`${course.user.profile}?width=50`"
                  alt="profile picture"
              />
              <v-avatar v-else size="50" class="bg-color-one">
                <span class="white--text">{{
                    `${course.user.sur_name} ${course.user.other_names}`
                        | computeText
                  }}</span>
              </v-avatar>
            </article>
            <article @mouseenter="mouseOnPic($event,course.user.user_name,'user-profile-card')"
                      class="owner">
              <h3>
                {{ `${course.user.sur_name} ${course.user.other_names}` }}
              </h3>
              <p class="faculty">
                <!-- {{
                  `${course.faculty_college_year.faculty_college.faculty.name} year ${course.faculty_college_year.college_year.digit}`
                }} -->
                Instructor
              </p>
            </article>
          </div>

          <article class="infos pt-10">
            <div>
              <!--              <v-avatar size="40" class="bg-color-one">-->
              <svg class="p-icon" xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62">
                <circle id="Ellipse_218" data-name="Ellipse 218" cx="31" cy="31" r="31" fill="#fc6767"/>
                <g id="noun_index_1232133" transform="translate(13 13)">
                  <g id="Group_125" data-name="Group 125" transform="translate(5.5 4)">
                    <g id="Group_124" data-name="Group 124">
                      <rect id="Rectangle_1142" data-name="Rectangle 1142" width="7.25" height="2.417"
                            transform="translate(18.125 19.333)" fill="#fff"/>
                      <rect id="Rectangle_1143" data-name="Rectangle 1143" width="7.25" height="2.417"
                            transform="translate(18.125 22.958)" fill="#fff"/>
                      <rect id="Rectangle_1144" data-name="Rectangle 1144" width="7.25" height="2.417"
                            transform="translate(18.125 26.583)" fill="#fff"/>
                      <path id="Path_1949" data-name="Path 1949"
                            d="M5.5,33H22.417V22.125h8.458V4H5.5ZM28.458,19.708H20V30.583H11.542V6.417H28.458ZM7.917,6.417H9.125V30.583H7.917Z"
                            transform="translate(-5.5 -4)" fill="#fff"/>
                    </g>
                  </g>
                </g>
              </svg>

              <!--              </v-avatar>-->
              <span class="content">{{
                  `${course.chapters.length} chapter ${
                      course.chapters.length > 1 ? "s" : ""
                  }`
                }}</span>
            </div>
            <div>
              <!--              <v-avatar size="40" class="bg-color-one">-->
              <svg
                  class="p-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="62"
                  height="62"
                  viewBox="0 0 62 62"
              >
                <circle
                    id="Ellipse_219"
                    data-name="Ellipse 219"
                    cx="31"
                    cy="31"
                    r="31"
                    fill="#3ce970"
                />
                <g id="noun_Assignment_1833812" transform="translate(15 15)">
                  <path
                      id="Path_1950"
                      data-name="Path 1950"
                      d="M8.453,45.716h.905v-1.81H9.81V43H8v.905h.453Z"
                      transform="translate(-3.284 -22.443)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1145"
                      data-name="Rectangle 1145"
                      width="1"
                      height="1"
                      transform="translate(6 27)"
                      fill="#fff"
                  />
                  <path
                      id="Path_1951"
                      data-name="Path 1951"
                      d="M2.25,24.13l.655.328V28.7a.453.453,0,0,0,.453.453H24.63a.453.453,0,0,0,.453-.453V18.234L29.1,10.815a.453.453,0,0,0-.2-.62L27.1,9.289a.452.452,0,0,0-.6.189l-1.412,2.607V2.453A.453.453,0,0,0,24.63,2H5.621a.453.453,0,0,0-.453.453V16.076a2.267,2.267,0,0,0-1.81,2.217,2.227,2.227,0,0,0,.2.923A1.813,1.813,0,0,0,2,21.009v2.716a.453.453,0,0,0,.25.4Zm6.741,0a.453.453,0,0,0,.25-.4V22.367h.453v1.81H8.9ZM27.082,10.295l1,.5L22.63,20.861l-1-.5ZM20.621,22.587,19.9,23.8l-.212-1.273L21.1,21.107l1.22.61-.353,2.117-1.3.432.728-1.214ZM24.177,2.905V13.757l-3.535,6.526-1.764,1.764a.452.452,0,0,0-.126.394l.453,2.716a.453.453,0,0,0,.59.355l2.716-.905a.453.453,0,0,0,.3-.355l.44-2.641.924-1.706v8.345H8.336V25.083h1.81a.453.453,0,0,0,.453-.453V21.914a.453.453,0,0,0-.453-.453H9.242v-.453a1.813,1.813,0,0,0-1.559-1.793L7.69,19.2h2.457a.453.453,0,0,0,.453-.453V16.031a.453.453,0,0,0-.453-.453H7.431a.453.453,0,0,0-.453.453v.464a2.243,2.243,0,0,0-.905-.418V2.905ZM7.884,18.294v-1.81h1.81v1.81ZM2.905,21.009A.906.906,0,0,1,3.81,20.1h.624a.453.453,0,0,0,.3-.793,1.338,1.338,0,0,1-.47-1.017,1.358,1.358,0,0,1,2.716,0,1.338,1.338,0,0,1-.47,1.017.453.453,0,0,0,.3.793h.624a.906.906,0,0,1,.905.905v2.436l-.655.328a.453.453,0,0,0-.25.4v4.073H3.81V24.177a.453.453,0,0,0-.25-.4l-.655-.327Z"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1146"
                      data-name="Rectangle 1146"
                      width="11"
                      height="2"
                      transform="translate(12 4)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1147"
                      data-name="Rectangle 1147"
                      width="11"
                      height="1"
                      transform="translate(12 11)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1148"
                      data-name="Rectangle 1148"
                      width="9"
                      height="1"
                      transform="translate(12 17)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1149"
                      data-name="Rectangle 1149"
                      width="6"
                      height="1"
                      transform="translate(12 23)"
                      fill="#fff"
                  />
                  <path
                      id="Path_1952"
                      data-name="Path 1952"
                      d="M13.453,9.621h2.716a.453.453,0,0,0,.453-.453V6.453A.453.453,0,0,0,16.168,6H13.453A.453.453,0,0,0,13,6.453V9.168A.453.453,0,0,0,13.453,9.621Zm.453-2.716h1.81v1.81h-1.81Z"
                      transform="translate(-6.021 -2.19)"
                      fill="#fff"
                  />
                  <path
                      id="Path_1953"
                      data-name="Path 1953"
                      d="M13.453,22.621h2.716a.453.453,0,0,0,.453-.453V19.453A.453.453,0,0,0,16.168,19H13.453a.453.453,0,0,0-.453.453v2.716A.453.453,0,0,0,13.453,22.621Zm.453-2.716h1.81v1.81h-1.81Z"
                      transform="translate(-6.021 -9.306)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1150"
                      data-name="Rectangle 1150"
                      height="1"
                      transform="translate(28 2)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1151"
                      data-name="Rectangle 1151"
                      height="1"
                      transform="translate(28 3)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1152"
                      data-name="Rectangle 1152"
                      width="1"
                      transform="translate(28 3)"
                      fill="#fff"
                  />
                  <rect
                      id="Rectangle_1153"
                      data-name="Rectangle 1153"
                      width="2"
                      transform="translate(26 3)"
                      fill="#fff"
                  />
                </g>
              </svg>
              <!--              </v-avatar>-->
              <span class="content"
              >{{ course.assignmentsLength }} assignments</span
              >
            </div>
          </article>
        </main>
        <main class="preview mt-sm-4 hidden-sm-and-down">
          <preview
              :image="course.cover_picture"
              :name="course.name"
              :dateUploaded="course.createdAt | formatDate"
              :progress="course.progress"
              :isLive="isLive"
              :class_id="nearestLiveSession ? nearestLiveSession._id : undefined"
          />
        </main>
      </v-col>
    </v-row>
    <!--      end of student preview-->

    <!--      teacher preview-->
    <div class="teacher" v-if="userCategory === 'INSTRUCTOR' || userCategory === 'ADMIN'  && course">
      <div v-if="!isLive" class="teacher instructor_preview">
          <back class="mb-6" :target="userCategory === 'ADMIN' ? `/faculties/${course.user_group.faculty._id}/courses` : '/courses'"/>
        <div class="tabs-container d-flex">
          <div class="item cursor-pointer" @click="panel1=true" :class="panel1? 'active' : ''">Course details</div>
          <div class="item cursor-pointer" @click="panel1=false" :class="panel1? '' : 'active'">Students list</div>
        </div>
        <div class="tabs-body">
          <div class="tab d-md-flex">
            <div v-if="course ? course.cover_picture : false"
                 class="cover"
                 :style="`background-image: url('`+`${course.cover_picture}?width=300&token=${$session.get('jwt')}');`">
            </div>
            <div v-show="panel1" class="content">
              <div class="course-title">
                {{ course.name }}
              </div>
              <div class="course-description">
                {{ course.description }}
              </div>
              <div class="details row">
                <div class="col col-6 pb-0 col-md-4">
                  <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.96155 0.875C7.70035 0.875 10.029 2.28908 10.029 5.03076V5.84303V20.2282C10.029 20.2515 10.0209 20.274 10.006 20.2919C9.9911 20.3097 9.97042 20.3218 9.94754 20.326C9.92466 20.3302 9.90103 20.3263 9.88076 20.3148C9.8605 20.3034 9.84487 20.2853 9.83661 20.2635V20.2577C9.59487 19.3047 9.06427 18.4498 8.31756 17.8102C7.57084 17.1706 6.64456 16.7776 5.66571 16.6851C4.79317 16.6623 3.92511 16.8173 3.11438 17.1407C2.30366 17.4641 1.56723 17.9491 0.949938 18.5662C0.858231 18.6511 0.740196 18.7019 0.615517 18.7103H0.384881C0.19749 18.7103 8.56326e-06 18.5734 8.56326e-06 18.4011V3.7183C-0.00503659 2.0916 2.21987 0.875 4.96155 0.875Z"
                        fill="black"/>
                    <path
                        d="M16.1105 0.870117C13.3717 0.870117 11.043 2.2842 11.043 5.02588V5.83671V20.2233C11.043 20.2466 11.0511 20.2691 11.066 20.287C11.0809 20.3048 11.1016 20.3169 11.1245 20.3211C11.1474 20.3253 11.171 20.3214 11.1913 20.31C11.2115 20.2985 11.2271 20.2804 11.2354 20.2586V20.2536C11.4835 19.3039 12.016 18.4528 12.7615 17.8142C13.507 17.1757 14.4298 16.7802 15.4063 16.6809C16.2789 16.6573 17.1471 16.8119 17.9579 17.1352C18.7687 17.4585 19.5051 17.9438 20.1221 18.5613C20.2151 18.6442 20.3324 18.6948 20.4565 18.7054H20.6843C20.8716 18.7054 21.0691 18.5685 21.0691 18.3962V3.70837C21.0771 2.08672 18.8521 0.870117 16.1105 0.870117Z"
                        fill="black"/>
                  </svg>
                  {{ course.chapters.length }} chapters
                </div>
                <div class="col col-6 pb-0 col-md-4">
                  <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.18566 14.7335V20.3372L15.5473 25.6886L24.9082 20.335V14.7335L15.5473 20.0849L6.18566 14.7335ZM15.5473 0.462891L0.832031 8.87171L15.5473 17.2798L27.5886 10.4018V20.0849H30.2626V8.87171L15.5473 0.462891Z"
                        fill="black"/>
                  </svg>
                  {{ course.user_group.faculty.name }}
                </div>
                <div class="col col-6 pb-0 col-md-4">
                  <svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.686426 10.4721H22.173C22.3342 10.4725 22.4887 10.5367 22.6027 10.6507C22.7167 10.7647 22.7809 10.9192 22.7813 11.0804V24.2562C22.7811 24.9013 22.5248 25.5199 22.0686 25.976C21.6125 26.4321 20.9939 26.6885 20.3488 26.6887H2.51061C1.86553 26.6885 1.24693 26.4321 0.790794 25.976C0.334656 25.5199 0.078316 24.9013 0.078125 24.2562L0.078125 11.0804C0.0785057 10.9192 0.142717 10.7647 0.256713 10.6507C0.370709 10.5367 0.525212 10.4725 0.686426 10.4721ZM22.7813 8.24216V6.41798C22.7811 5.77291 22.5248 5.1543 22.0686 4.69817C21.6125 4.24203 20.9939 3.98569 20.3488 3.9855H17.9163V1.35049C17.916 1.18927 17.8517 1.03477 17.7377 0.920775C17.6238 0.806779 17.4692 0.742568 17.308 0.742188H15.2813C15.1201 0.742568 14.9656 0.806779 14.8516 0.920775C14.7376 1.03477 14.6734 1.18927 14.673 1.35049V3.9855H8.1864V1.35049C8.18602 1.18927 8.12181 1.03477 8.00781 0.920775C7.89382 0.806779 7.73932 0.742568 7.5781 0.742188H5.55139C5.39018 0.742568 5.23568 0.806779 5.12168 0.920775C5.00768 1.03477 4.94347 1.18927 4.94309 1.35049V3.9855H2.51061C1.86553 3.98569 1.24693 4.24203 0.790794 4.69817C0.334656 5.1543 0.078316 5.77291 0.078125 6.41798L0.078125 8.24216C0.0785057 8.40338 0.142717 8.55788 0.256713 8.67188C0.370709 8.78587 0.525212 8.85008 0.686426 8.85046H22.173C22.3342 8.85008 22.4887 8.78587 22.6027 8.67188C22.7167 8.55788 22.7809 8.40338 22.7813 8.24216Z"
                        fill="black"/>
                  </svg>
                  {{ course.updatedAt | formatDate }}
                </div>
                <div class="col col-6 pb-0 col-md-4">
                  <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.0903 6.15848V0.0322298H1.0811C0.794377 0.0322298 0.519394 0.146131 0.316648 0.348878C0.113902 0.551624 0 0.826607 0 1.11333L0 22.0147C0 22.3014 0.113902 22.5764 0.316648 22.7791C0.519394 22.9819 0.794377 23.0958 1.0811 23.0958H16.2166C16.5033 23.0958 16.7783 22.9819 16.981 22.7791C17.1838 22.5764 17.2977 22.3014 17.2977 22.0147V7.23959H11.1714C10.8847 7.23959 10.6097 7.12569 10.4069 6.92294C10.2042 6.72019 10.0903 6.44521 10.0903 6.15848ZM12.9732 16.7893C12.9729 16.9326 12.9158 17.0699 12.8145 17.1711C12.7132 17.2724 12.5759 17.3295 12.4327 17.3299H4.86497C4.72172 17.3295 4.58445 17.2724 4.48316 17.1711C4.38187 17.0699 4.3248 16.9326 4.32441 16.7893V16.429C4.3248 16.2857 4.38187 16.1485 4.48316 16.0472C4.58445 15.9459 4.72172 15.8888 4.86497 15.8884H12.4327C12.5759 15.8888 12.7132 15.9459 12.8145 16.0472C12.9158 16.1485 12.9729 16.2857 12.9732 16.429V16.7893ZM12.9732 13.9064C12.9729 14.0496 12.9158 14.1869 12.8145 14.2882C12.7132 14.3895 12.5759 14.4466 12.4327 14.4469H4.86497C4.72172 14.4466 4.58445 14.3895 4.48316 14.2882C4.38187 14.1869 4.3248 14.0496 4.32441 13.9064V13.546C4.3248 13.4028 4.38187 13.2655 4.48316 13.1642C4.58445 13.0629 4.72172 13.0059 4.86497 13.0055H12.4327C12.5759 13.0059 12.7132 13.0629 12.8145 13.1642C12.9158 13.2655 12.9729 13.4028 12.9732 13.546V13.9064ZM12.9732 10.6631V11.0235C12.9729 11.1667 12.9158 11.304 12.8145 11.4053C12.7132 11.5065 12.5759 11.5636 12.4327 11.564H4.86497C4.72172 11.5636 4.58445 11.5065 4.48316 11.4053C4.38187 11.304 4.3248 11.1667 4.32441 11.0235V10.6631C4.3248 10.5198 4.38187 10.3826 4.48316 10.2813C4.58445 10.18 4.72172 10.1229 4.86497 10.1225H12.4327C12.5759 10.1229 12.7132 10.18 12.8145 10.2813C12.9158 10.3826 12.9729 10.5198 12.9732 10.6631ZM17.2977 5.52352V5.79812H11.5318V0.0322298H11.8064C11.9486 0.0318813 12.0894 0.0595851 12.2209 0.113755C12.3524 0.167924 12.4718 0.247496 12.5725 0.347912L16.9827 4.76242C17.184 4.96462 17.2972 5.23819 17.2977 5.52352Z"
                        fill="black"/>
                  </svg>
                  {{ course.assignmentsLength }} assignments
                </div>
                <div class="col col-md-3">
                  <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.533 7.12236C17.1744 7.12236 17.8015 6.93215 18.3348 6.57577C18.8682 6.21939 19.2839 5.71285 19.5294 5.12022C19.7749 4.52758 19.8391 3.87546 19.714 3.24632C19.5888 2.61717 19.2799 2.03927 18.8263 1.58569C18.3727 1.1321 17.7948 0.823207 17.1657 0.698063C16.5366 0.572919 15.8844 0.637147 15.2918 0.882626C14.6992 1.1281 14.1926 1.54381 13.8362 2.07717C13.4799 2.61053 13.2897 3.23759 13.2896 3.87905C13.2878 4.30548 13.3705 4.72804 13.5328 5.12236C13.6952 5.51667 13.934 5.87493 14.2356 6.17646C14.5371 6.47799 14.8953 6.71682 15.2897 6.87917C15.684 7.04152 16.1065 7.12418 16.533 7.12236ZM7.88413 7.12236C8.5256 7.12236 9.15266 6.93215 9.68602 6.57577C10.2194 6.21939 10.6351 5.71285 10.8806 5.12022C11.126 4.52758 11.1903 3.87546 11.0651 3.24632C10.94 2.61717 10.6311 2.03927 10.1775 1.58569C9.72391 1.1321 9.14601 0.823207 8.51687 0.698063C7.88773 0.572919 7.23561 0.637147 6.64297 0.882626C6.05033 1.1281 5.5438 1.54381 5.18742 2.07717C4.83104 2.61053 4.64082 3.23759 4.64082 3.87905C4.63901 4.30548 4.72166 4.72804 4.88401 5.12236C5.04636 5.51667 5.28519 5.87493 5.58672 6.17646C5.88826 6.47799 6.24652 6.71682 6.64083 6.87917C7.03514 7.04152 7.45771 7.12418 7.88413 7.12236ZM7.88413 9.28457C5.36516 9.28457 0.316406 10.5495 0.316406 13.0684V15.7712H15.4519V13.0684C15.4519 10.5495 10.4031 9.28457 7.88413 9.28457ZM16.533 9.28457C16.2194 9.28457 15.8627 9.3062 15.4843 9.33863C16.1182 9.73771 16.6441 10.2867 17.0155 10.9372C17.387 11.5877 17.5925 12.3197 17.6141 13.0684V15.7712H24.1007V13.0684C24.1007 10.5495 19.0519 9.28457 16.533 9.28457Z"
                        fill="black"/>
                  </svg>
                  {{ course.user_group.name }}
                </div>
                <div class="col col-6 pb-0 col-md-4 ml-auto">
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.5299 11.7087C15.9619 11.5062 15.035 11.4925 14.6242 11.339C14.3079 11.2567 14.0092 11.1175 13.7428 10.9282C13.6308 10.4563 13.5823 9.97148 13.5986 9.48672C13.8098 9.28406 13.9809 9.04347 14.1031 8.77751C14.2257 8.3211 14.307 7.85459 14.346 7.38361C14.346 7.38361 14.6804 7.52776 14.8123 6.85675C14.9241 6.28017 15.1367 5.97529 15.0812 5.54934C15.0257 5.12338 14.7871 5.22501 14.7871 5.22501C15.0459 4.62877 15.1471 3.97607 15.0812 3.32947C15.0772 2.91332 14.9877 2.50243 14.8182 2.12238C14.6486 1.74232 14.4026 1.40123 14.0956 1.12033C13.7885 0.839423 13.4269 0.624722 13.0333 0.489585C12.6397 0.354447 12.2224 0.301765 11.8076 0.334815C11.3927 0.301744 10.9754 0.35415 10.5815 0.488791C10.1877 0.623431 9.82561 0.837445 9.51776 1.1176C9.20991 1.39774 8.96281 1.73807 8.79174 2.11753C8.62068 2.49699 8.52928 2.90751 8.5232 3.32371C8.45795 3.96975 8.55712 4.62181 8.81149 5.21924C8.81149 5.21924 8.57365 5.11762 8.51743 5.54357C8.46122 5.96953 8.67023 6.27872 8.78483 6.85531C8.91672 7.5292 9.25114 7.38217 9.25114 7.38217C9.29057 7.85309 9.37186 8.31957 9.49403 8.77607C9.61623 9.04203 9.78738 9.28261 9.99855 9.48528C10.0149 9.97004 9.96639 10.4548 9.8544 10.9267C9.58871 11.1162 9.28966 11.2539 8.97294 11.3325C8.56788 11.4896 7.6403 11.5098 7.06731 11.7124C6.37645 11.9713 5.78258 12.4375 5.36709 13.0472C4.95161 13.6569 4.73486 14.3801 4.74654 15.1178H18.8456C18.8594 14.3799 18.6442 13.6558 18.2295 13.0453C17.8148 12.4347 17.221 11.9678 16.5299 11.7087Z"
                        fill="black"/>
                    <path
                        d="M5.93281 9.2409C6.52819 9.23288 7.1113 9.07047 7.6251 8.76953C6.83949 7.57888 7.26473 6.19002 7.10328 4.8927C7.09534 4.59752 7.02633 4.30719 6.9006 4.04001C6.77488 3.77283 6.59516 3.5346 6.37279 3.34032C6.15042 3.14605 5.89021 2.99996 5.60856 2.91125C5.32692 2.82254 5.02996 2.79314 4.73639 2.82491H4.71621C4.42437 2.79718 4.12995 2.82958 3.85112 2.92009C3.57229 3.0106 3.31497 3.1573 3.09506 3.35115C2.87514 3.54499 2.6973 3.78186 2.57251 4.04712C2.44771 4.31238 2.37862 4.60041 2.36949 4.89342C2.20732 6.1857 2.65778 7.73167 1.85272 8.77026C2.36812 9.06625 2.95608 9.21206 3.55006 9.19117C3.58082 9.47572 3.56376 9.76342 3.4996 10.0424C3.32518 10.1877 3.11523 10.2839 2.8913 10.3213C2.44714 10.4174 2.00891 10.5391 1.57884 10.686C1.23426 10.8661 0.945446 11.1369 0.743601 11.4692C0.541757 11.8015 0.43456 12.1826 0.433594 12.5714H4.50359C4.87353 11.9105 5.4404 11.3814 6.12524 11.0579C6.52212 10.8916 6.94693 10.8021 7.37716 10.7941C7.37716 10.7941 7.5696 10.4899 6.93607 10.3732C6.59936 10.2992 6.2727 10.1853 5.96308 10.0337C5.8665 9.92559 5.93281 9.2409 5.93281 9.2409Z"
                        fill="black"/>
                    <path
                        d="M17.6884 9.2409C17.093 9.23288 16.5099 9.07047 15.9961 8.76953C16.7817 7.57888 16.3565 6.19002 16.5179 4.8927C16.5258 4.59752 16.5949 4.30719 16.7206 4.04001C16.8463 3.77283 17.026 3.5346 17.2484 3.34032C17.4708 3.14605 17.731 2.99996 18.0126 2.91125C18.2943 2.82254 18.5912 2.79314 18.8848 2.82491H18.905C19.1968 2.79718 19.4912 2.82958 19.7701 2.92009C20.0489 3.0106 20.3062 3.1573 20.5261 3.35115C20.746 3.54499 20.9239 3.78186 21.0487 4.04712C21.1735 4.31238 21.2426 4.60041 21.2517 4.89342C21.4139 6.1857 20.9634 7.73167 21.7685 8.77026C21.2531 9.06625 20.6651 9.21206 20.0711 9.19117C20.0404 9.47572 20.0574 9.76342 20.1216 10.0424C20.296 10.1877 20.506 10.2839 20.7299 10.3213C21.1741 10.4174 21.6123 10.5391 22.0423 10.686C22.3869 10.8661 22.6757 11.1369 22.8776 11.4692C23.0794 11.8015 23.1866 12.1826 23.1876 12.5714H19.1176C18.7477 11.9105 18.1808 11.3814 17.4959 11.0579C17.0991 10.8916 16.6743 10.8021 16.244 10.7941C16.244 10.7941 16.0516 10.4899 16.6851 10.3732C17.0218 10.2992 17.3485 10.1853 17.6581 10.0337C17.7547 9.92559 17.6884 9.2409 17.6884 9.2409Z"
                        fill="black"/>
                  </svg>
                  {{
                    `${course.attendedStudents || 0} student${
                        course.attendedStudents > 1 ? "s" : ""
                    }`
                  }}
                </div>
              </div>
              <div class="actions">
                <div class="mx-auto">
                  <div v-if="userCategory === 'INSTRUCTOR'" class="tooltip hidden-sm-and-down" @click="
                      course.chapters.length
                        ? $router.push(`/live/schedule`)
                        : undefined
                    ">
                    <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M24.9279 50.0345C38.6607 50.0345 49.7933 38.9019 49.7933 25.1691C49.7933 11.4363 38.6607 0.303711 24.9279 0.303711C11.1951 0.303711 0.0625 11.4363 0.0625 25.1691C0.0625 38.9019 11.1951 50.0345 24.9279 50.0345Z"
                          fill="black"/>
                      <path
                          d="M32.6389 22.875V25.1405V25.8595V28.125V34.25C32.6389 34.5037 32.4172 34.75 32.1111 34.75H10.7778C10.4717 34.75 10.25 34.5037 10.25 34.25V16.75C10.25 16.4963 10.4717 16.25 10.7778 16.25H32.1111C32.4172 16.25 32.6389 16.4963 32.6389 16.75V22.875ZM34.7658 27.2342L33.0041 25.5L34.7658 23.7658L39.75 18.8595V32.1405L34.7658 27.2342Z"
                          stroke="white" stroke-width="2.5"/>
                    </svg>
                    <div class="tooltip-text">
                      Schedule live
                    </div>
                  </div>
                  <div class="tooltip" @click="
                      course.chapters.length
                        ? $router.push(`/courses/${course.name}`)
                        : undefined
                    ">
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M25.6037 50.0345C39.3364 50.0345 50.4691 38.9019 50.4691 25.1691C50.4691 11.4363 39.3364 0.303711 25.6037 0.303711C11.8709 0.303711 0.738281 11.4363 0.738281 25.1691C0.738281 38.9019 11.8709 50.0345 25.6037 50.0345Z"
                          fill="black"/>
                      <path
                          d="M13.7148 25.5297C13.7148 25.5297 18.0393 16.8809 25.607 16.8809C33.1747 16.8809 37.4991 25.5297 37.4991 25.5297C37.4991 25.5297 33.1747 34.1785 25.607 34.1785C18.0393 34.1785 13.7148 25.5297 13.7148 25.5297Z"
                          stroke="white" stroke-width="2.16221" stroke-linecap="round" stroke-linejoin="round"/>
                      <path
                          d="M28.8499 25.5294C28.8499 26.1709 28.6597 26.798 28.3033 27.3313C27.9469 27.8647 27.4404 28.2804 26.8478 28.5259C26.2551 28.7714 25.603 28.8356 24.9739 28.7104C24.3447 28.5853 23.7668 28.2764 23.3132 27.8228C22.8596 27.3692 22.5507 26.7913 22.4256 26.1622C22.3005 25.533 22.3647 24.8809 22.6102 24.2883C22.8556 23.6956 23.2713 23.1891 23.8047 22.8327C24.3381 22.4763 24.9651 22.2861 25.6066 22.2861C26.4668 22.2861 27.2917 22.6278 27.9 23.2361C28.5082 23.8443 28.8499 24.6693 28.8499 25.5294Z"
                          stroke="white" stroke-width="2.16221" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="tooltip-text">
                      Preview course
                    </div>
                  </div>
                  <div v-if="userCategory === 'INSTRUCTOR'" class="tooltip" @click="
                      course.chapters.length
                        ?                       set_modal({
                        template: 'action_confirmation',
                        method: { action: 'courses/tooglePublishCourse' },
                        title: `${course.published ? 'Unpublish' : 'Publish'} Course`,
                        message: `Are you sure you want to ${course.published ? 'unpublish' : 'publish'} this course?`,
                      })
                        : $store.dispatch(`app_notification/SET_NOTIFICATION`, {
                  message: 'Can not publish course without chapters',
                  status: 'danger',
                  uptime: 2000,
                  })
                    ">
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M25.1623 50.0345C38.895 50.0345 50.0276 38.9019 50.0276 25.1691C50.0276 11.4363 38.895 0.303711 25.1623 0.303711C11.4295 0.303711 0.296875 11.4363 0.296875 25.1691C0.296875 38.9019 11.4295 50.0345 25.1623 50.0345Z"
                          fill="black"/>
                      <path
                          d="M35.038 28.7744V33.0988C35.038 33.6723 34.8102 34.2222 34.4047 34.6277C33.9992 35.0332 33.4492 35.261 32.8758 35.261H17.7403C17.1669 35.261 16.6169 35.0332 16.2114 34.6277C15.8059 34.2222 15.5781 33.6723 15.5781 33.0988V28.7744"
                          stroke="white" stroke-width="2.16221" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M30.7134 21.2063L25.3079 15.8008L19.9023 21.2063" stroke="white" stroke-width="2.16221"
                            stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M25.3086 15.8008V28.774" stroke="white" stroke-width="2.16221" stroke-linecap="round"
                            stroke-linejoin="round"/>
                    </svg>
                    <div class="tooltip-text">
                      {{ course.published ? "Unpublish" : "Publish" }} course
                    </div>
                  </div>
                  <div v-if="userCategory === 'INSTRUCTOR'" class="tooltip"
                       @click="$router.push(`/courses/edit/${course.name}/details`)">
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M25.7248 50.0345C39.4575 50.0345 50.5901 38.9019 50.5901 25.1691C50.5901 11.4363 39.4575 0.303711 25.7248 0.303711C11.992 0.303711 0.859375 11.4363 0.859375 25.1691C0.859375 38.9019 11.992 50.0345 25.7248 50.0345Z"
                          fill="black"/>
                      <path
                          d="M24.8042 16.5869H17.2364C16.663 16.5869 16.113 16.8147 15.7075 17.2202C15.302 17.6257 15.0742 18.1757 15.0742 18.7491V33.8846C15.0742 34.458 15.302 35.008 15.7075 35.4135C16.113 35.819 16.663 36.0468 17.2364 36.0468H32.3719C32.9453 36.0468 33.4953 35.819 33.9008 35.4135C34.3063 35.008 34.5341 34.458 34.5341 33.8846V26.3168"
                          stroke="white" stroke-width="2.16221" stroke-linecap="round" stroke-linejoin="round"/>
                      <path
                          d="M32.9102 14.9649C33.3408 14.5373 33.9233 14.2978 34.5302 14.2988C35.137 14.2999 35.7187 14.5414 36.1478 14.9705C36.5769 15.3997 36.8185 15.9813 36.8195 16.5882C36.8206 17.195 36.5811 17.7776 36.1535 18.2082L25.883 28.4787L21.5586 29.5598L22.6397 25.2354L32.9102 14.9649Z"
                          stroke="white" stroke-width="2.16221" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="tooltip-text">
                      Update course
                    </div>
                  </div>
                  <div v-if="!course.published" class="tooltip" @click="
                      set_modal({
                        template: 'action_confirmation',
                        method: { action: 'courses/delete_course' },
                        title: 'Delete Course',
                        message: 'Are you sure you want to delete this course?',
                      })
                    ">
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M25.2834 50.0345C39.0161 50.0345 50.1487 38.9019 50.1487 25.1691C50.1487 11.4363 39.0161 0.303711 25.2834 0.303711C11.5506 0.303711 0.417969 11.4363 0.417969 25.1691C0.417969 38.9019 11.5506 50.0345 25.2834 50.0345Z"
                          fill="black"/>
                      <path
                          d="M18.7959 32.7371C18.7977 33.31 19.026 33.859 19.4311 34.2641C19.8363 34.6693 20.3852 34.8976 20.9582 34.8993H29.607C30.1799 34.8976 30.7289 34.6693 31.134 34.2641C31.5391 33.859 31.7675 33.31 31.7692 32.7371V19.7639H18.7959V32.7371ZM32.8503 16.5206H29.0664L27.9853 15.4395H22.5798L21.4987 16.5206H17.7148V18.6828H32.8503V16.5206Z"
                          stroke="white" stroke-width="1.44147"/>
                    </svg>
                    <div class="tooltip-text">
                      Delete course
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="!panel1" class="content second">
              <div class="title">{{ course.name }}</div>
              <div class="subtitle">{{ course.attendedStudents }} Attendees</div>
              <div class="students customScroll">
                <div v-for="(stud, i) in student_list" :key="i" class="individual row">
                  <div class="col-12 col-md-4 name mr-auto" @mouseenter="mouseOnPic($event,stud.user.user_name,'user-profile-card')">{{ stud.user.sur_name }} {{ stud.user.other_names }}</div>
                  <div class="col-12 col-md-4 progress ml-auto">
                    <div class="text mx-auto">{{ Math.round(stud.progress) }} %</div>
                    <progress :value="stud.progress" max="100"></progress>
                  </div>
                  <div class="col-12 col-md-4 joinedon ml-auto">Joined on {{ stud.createdAt  | formatDate }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="live_course">
        <div class="d-lg-flex">
          <div class="left-pane">
            <div class="d-flex">
              <div class="icon">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="25" cy="25" r="25" fill="#FC6767"/>
                  <path d="M37 20L30 25L37 30V20Z" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path
                      d="M28 18H17C15.8954 18 15 18.8954 15 20V30C15 31.1046 15.8954 32 17 32H28C29.1046 32 30 31.1046 30 30V20C30 18.8954 29.1046 18 28 18Z"
                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="title">LIVE BROADCAST DETAILS</div>
            </div>
            <div class="d-flex detail">
              <div class="subtitle">Course :</div>
              <div class="sub-text">{{ course.name }}</div>
            </div>
            <div class="d-flex detail">
              <div class="subtitle">Chapter :</div>
              <div class="sub-text"> {{ chapterIndex > -1 ? course.chapters[chapterIndex].name : '' }}</div>
            </div>
            <div class="d-flex detail">
              <div class="subtitle">Scheduled date :</div>
              <div class="sub-text">{{ nearestLiveSession.date | formatDate }}</div>
            </div>
            <div class="d-flex detail">
              <div class="subtitle">Scheduled Time :</div>
              <div class="sub-text">{{ nearestLiveSession.time }} Local time</div>
            </div>
          </div>
          <div class="right-pane ml-auto mx-auto">
            <svg width="194" height="125" viewBox="0 0 194 125" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M139.582 30L124.996 45.0893C132.289 55.625 132.289 69.2857 124.996 79.8214L139.582 94.9107C157.119 76.875 157.119 49.6429 139.582 30ZM168.319 0L154.167 14.5536C178.216 41.5179 178.216 82.0536 154.167 110.446L168.319 125C202.178 90.2679 202.265 36.1607 168.319 0Z"
                  fill="#FF4E4E"/>
              <path
                  d="M54.1644 30L68.75 45.0893C61.4572 55.625 61.4572 69.2857 68.75 79.8214L54.1644 94.9107C36.6269 76.875 36.6269 49.6429 54.1644 30ZM25.4272 0L39.5787 14.5536C15.5298 41.5179 15.5298 82.0536 39.5787 110.446L25.4272 125C-8.43231 90.2679 -8.51913 36.1607 25.4272 0Z"
                  fill="#FF4E4E"/>
              <circle cx="96.8711" cy="59.376" r="15.625" fill="#FF4E4E"/>
            </svg>
            <div class="mb-1">{{ connected_users.length }} user{{connected_users.length > 1 ? 's' : ''}} connected</div>
            <div>Started {{  elapsed_time }}</div>
            <div>
              <button @click="
        $router.push(`/live/${nearestLiveSession._id}`)
      ">{{ userCategory === 'ADMIN' ? 'JOIN STREAM' : 'GO LIVE' }}
              </button>
            </div>
          </div>
        </div>
        <!--        <div class="bottom-pane">-->
        <!--          <div class="d-lg-flex">-->
        <!--            <div>-->
        <!--              <div class="title">Quiz attempt rate</div>-->
        <!--              <div class="chart"></div>-->
        <!--              <div class="text">00 out of 32 students attempted</div>-->
        <!--            </div>-->
        <!--            <div>-->
        <!--              <div class="title">Attendance</div>-->
        <!--              <div class="chart"></div>-->
        <!--              <div class="text">00 out of 32 students attended</div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>

    </div>
    <!--      end of teacher preview-->
  </section>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Api from "@/services/apis.js"
import {calculateNearestLiveSession, elapsedDuration, convertUTCDateToLocalDate} from "@/services/global_functions"
import userSimpleCard from "../../mixins/user-simple-card.mixin";
import axios from "axios";

export default {
  name: "preview_course",
  data: () => ({
    panel1: true,
    student_list: [],
    chapterIndex: -1,
    nearestLiveSession: undefined,
    connected_users: [],
    elapsed_time: "",
  }),
  components: {
    preview: () => import("@/components/courses/Preview"),
    back: () => import("@/components/shared/back-button"),
    // verifiedBadge: () => import("@/components/reusable/ui/VerifiedBadge"),
  },
  mixins: [userSimpleCard],
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    // get the current course
    ...mapGetters("courses", ["course"]),
    loaded() {
      return this.course !== undefined;
    },
    isLive() {
      if (!this.nearestLiveSession) return false;
      for (const i in this.course.chapters) {
        if (this.course.chapters[i].live_sessions.length) {
          // if()
          if ((new Date(this.course.chapters[i].live_sessions[0].date) <= new Date(new Date().toISOString().substring(0, 10)))) {
            if (convertUTCDateToLocalDate(new Date(this.nearestLiveSession.date.replace("00:00", this.nearestLiveSession.time))) <= new Date(new Date().toGMTString())) {
              return true;
            }
          }
        }
      }
      return false;
    }
  },
  watch: {
    $route() {
      this.findCourseByName({
        userCategory: this.userCategory.toLowerCase(),
        userId: this.$store.state.user.user._id,
        courseName: this.$route.params.name,
      });
    },
    panel1() {
      if (!this.panel1 && !this.student_list.length)
        this.loadStudents();
    },
    async nearestLiveSession(){
      if(this.nearestLiveSession){
        const res = await axios.get(`https://stream.kurious.rw/api/live_sessions/${this.nearestLiveSession._id}/users`)
        if(res.data)
          this.connected_users = res.data
      }
    }
  },
  methods: {
    ...mapActions("courses", [
      "findCourseByName",
      "tooglePublishCourse",
      "deleteCourse",
    ]),
    startCounting(live_session) {
      this.interval = setInterval(() => {
        this.elapsed_time = elapsedDuration(convertUTCDateToLocalDate(new Date(live_session.date.replace("00:00", live_session.time))));
      }, 1000)
    },
    ...mapActions("modal", ["set_modal"]),
    async loadStudents() {
      const {data} = await Api.get(`course/${this.course._id}/attendants`)
      this.student_list = data.data
    },
  },
  created() {
    this.findCourseByName({
      userCategory: this.userCategory.toLowerCase(),
      user_name: this.$store.state.user.user.user_name,
      courseName: this.$route.params.name,
    }).then(() => {
      this.nearestLiveSession = calculateNearestLiveSession(this.course)
      if (this.nearestLiveSession)
        this.startCounting(this.nearestLiveSession);
      if (this.nearestLiveSession) {
        for (const i in this.course.chapters) {
          if (this.course.chapters[i]._id == this.nearestLiveSession.target.id) {
            this.chapterIndex = i;
            break;
          }
        }
      }
    })
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/sass/imports/preview-course';
</style>
