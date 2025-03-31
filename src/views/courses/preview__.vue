<template>
  <!-- details container -->
  <section class="my-container">
    <!--      this is for student preview-->
    <v-row v-if="userCategory === 'STUDENT'">
      <back class="ma-6 mb-1 ml-16" to="/courses" />
      <v-col v-if="!loaded" class="col-12">
        <div class="ssc elevation-0 ssc-card student-card-skeleton ml mt-10">
          <div class="ssc-wrapper flex justify-between ml">
            <div class="w-60 mb-2 ml">
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
            <div class="w-40">
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
      <v-col v-else class="col-12 student">
        <!-- <button class="back">back</button> -->
        <main class="description">
          <h1 class="pb-5">{{ course.name }}</h1>
          <article class="desc pb-10">{{ course.description }}</article>

          <div class="instructor-profile">
            <article>
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
            <article class="owner">
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
              <v-avatar size="40" class="bg-color-one">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="62"
                  height="62"
                  viewBox="0 0 62 62"
                >
                  <circle
                    id="Ellipse_218"
                    data-name="Ellipse 218"
                    cx="31"
                    cy="31"
                    r="31"
                    fill="#fc6767"
                  />
                  <g id="noun_index_1232133" transform="translate(13 13)">
                    <g
                      id="Group_125"
                      data-name="Group 125"
                      transform="translate(5.5 4)"
                    >
                      <g id="Group_124" data-name="Group 124">
                        <rect
                          id="Rectangle_1142"
                          data-name="Rectangle 1142"
                          width="7.25"
                          height="2.417"
                          transform="translate(18.125 19.333)"
                          fill="#fff"
                        />
                        <rect
                          id="Rectangle_1143"
                          data-name="Rectangle 1143"
                          width="7.25"
                          height="2.417"
                          transform="translate(18.125 22.958)"
                          fill="#fff"
                        />
                        <rect
                          id="Rectangle_1144"
                          data-name="Rectangle 1144"
                          width="7.25"
                          height="2.417"
                          transform="translate(18.125 26.583)"
                          fill="#fff"
                        />
                        <path
                          id="Path_1949"
                          data-name="Path 1949"
                          d="M5.5,33H22.417V22.125h8.458V4H5.5ZM28.458,19.708H20V30.583H11.542V6.417H28.458ZM7.917,6.417H9.125V30.583H7.917Z"
                          transform="translate(-5.5 -4)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </v-avatar>
              <span class="content">{{
                `${course.chapters.length} chapter ${
                  course.chapters.length > 1 ? "s" : ""
                }`
              }}</span>
            </div>
            <div class="pt-4">
              <v-avatar size="40" class="bg-color-one">
                <svg
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
              </v-avatar>
              <span class="content"
                >{{ course.assignmentsLength }} assignments</span
              >
            </div>
          </article>
        </main>
        <main class="preview">
          <preview
            :image="course.cover_picture"
            :name="course.name"
            :dateUploaded="course.createdAt | formatDate"
            :progress="course.progress"
          />
        </main>
      </v-col>
    </v-row>
    <!--      end of student preview-->

    <!--      teacher preview-->
    <div class="teacher" v-if="userCategory === 'INSTRUCTOR'">
      <button @click="$router.go(-1)" class="back">back</button>
      <div class="preview-card row">
        <div class="preview-image col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <v-img
            v-if="course.cover_picture"
            :alt="course.name + ' cover photo'"
            class="preview-media"
            :src="`${course.cover_picture}?token=${$session.get('jwt')}`"
          >
          </v-img>
          <div
            v-else
            class="bg-color-one vertically--centered text-center preview-image"
            style="height: 100%"
          >
            <span class="text-h1 white--text">{{
              course.name | computeText
            }}</span>
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
                <div class="text">{{ course.chapters.length }} chapters</div>
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
                <div class="text">
                  {{ course.user_group.name }}
                  <verified-badge />
                </div>
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
                      fill="02A617"
                    />
                  </svg>
                </div>
                <div class="text">
                  {{ course.assignmentsLength }} assignments
                </div>
              </div>
              <!-- <div class="info-col col-sm-6 col-md-~4 col-lg-4 col-xl-4">
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
                <div class="text">
                  year {{ course.user_group.name }}
                </div>
              </div> -->
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
                <div class="text">
                  {{
                    `${course.attendedStudents || 0} Student${
                      course.attendedStudents > 1 ? "s" : ""
                    }`
                  }}
                </div>
              </div>
            </article>

            <!-- action buttons-->
            <article class="action-btns">
              <v-tooltip content-class="top tooltip" top>
                <template v-slot:activator="{ attrs, on }">
                  <div
                    @click="
                      course.chapters.length
                        ? $router.push(`/schedule_live`)
                        : undefined
                    "
                    :class="`act-btn preview ${
                      course.chapters.length ? '' : 'disabled'
                    }`"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <svg width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.6389 7.875V10.1405V10.8595V13.125V19.25C23.6389 19.5037 23.4172 19.75 23.1111 19.75H1.77778C1.47172 19.75 1.25 19.5037 1.25 19.25V1.75C1.25 1.49634 1.47172 1.25 1.77778 1.25H23.1111C23.4172 1.25 23.6389 1.49634 23.6389 1.75V7.875ZM25.7658 12.2342L24.0041 10.5L25.7658 8.76582L30.75 3.85948V17.1405L25.7658 12.2342Z" stroke="white" stroke-width="2.5"/>
</svg>

                  </div>
                </template>
                <span class="tooltip-content">Schedule live</span>
              </v-tooltip>
              <v-tooltip content-class="top tooltip" top>
                <template v-slot:activator="{ attrs, on }">
                  <div
                    @click="
                      course.chapters.length
                        ? $router.push(`/courses/${course.name}`)
                        : undefined
                    "
                    :class="`act-btn preview ${
                      course.chapters.length ? '' : 'disabled'
                    }`"
                    v-bind="attrs"
                    v-on="on"
                  >
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
                </template>
                <span class="tooltip-content">Preview course</span>
              </v-tooltip>
              <v-tooltip content-class="top tooltip" top>
                <template v-slot:activator="{ attrs, on }">
                  <div
                    @click="
                      course.chapters.length
                        ? tooglePublishCourse().then(() => {
                            $router.push('/courses');
                          })
                        : undefined
                    "
                    :class="`act-btn upload ${
                      course.chapters.length ? '' : 'disabled'
                    }`"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <svg
                      v-if="course.published"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30.205"
                      height="30.425"
                      viewBox="0 0 30.205 30.425"
                    >
                      <g
                        id="Icon_feather-upload"
                        data-name="Icon feather-upload"
                        transform="translate(32.628 33.571) rotate(-179)"
                      >
                        <path
                          id="Path_1962"
                          data-name="Path 1962"
                          d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                        <path
                          id="Path_1963"
                          data-name="Path 1963"
                          d="M25.5,12,18,4.5,10.5,12"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                        <path
                          id="Path_1964"
                          data-name="Path 1964"
                          d="M18,4.5v18"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                      </g>
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <g
                        id="Icon_feather-upload"
                        data-name="Icon feather-upload"
                        transform="translate(-3 -3)"
                      >
                        <path
                          id="Path_1962"
                          data-name="Path 1962"
                          d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                        <path
                          id="Path_1963"
                          data-name="Path 1963"
                          d="M25.5,12,18,4.5,10.5,12"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                        <path
                          id="Path_1964"
                          data-name="Path 1964"
                          d="M18,4.5v18"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                      </g>
                    </svg>
                  </div>
                </template>
                <span class="tooltip-content"
                  >{{ course.published ? "Unpublish" : "Publish" }} course</span
                >
              </v-tooltip>
              <v-tooltip content-class="top tooltip" top>
                <template v-slot:activator="{ attrs, on }">
                  <div
                    @click="$router.push(`/courses/edit/${course.name}`)"
                    class="act-btn update"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33.182"
                      height="33.182"
                      viewBox="0 0 33.182 33.182"
                    >
                      <g
                        id="Icon_feather-edit"
                        data-name="Icon feather-edit"
                        transform="translate(-1.5 -1.318)"
                      >
                        <path
                          id="Path_1965"
                          data-name="Path 1965"
                          d="M16.5,6H6A3,3,0,0,0,3,9V30a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V19.5"
                          fill="none"
                          stroke="#131313"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                        <path
                          id="Path_1966"
                          data-name="Path 1966"
                          d="M27.75,3.75a3.182,3.182,0,0,1,4.5,4.5L18,22.5,12,24l1.5-6Z"
                          fill="none"
                          stroke="#131313"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                        />
                      </g>
                    </svg>
                  </div>
                </template>
                <span class="tooltip-content">Update course</span>
              </v-tooltip>
              <v-tooltip content-class="top tooltip" top>
                <template v-slot:activator="{ attrs, on }">
                  <div
                    @click="
                      set_modal({
                        template: 'action_confirmation',
                        method: { action: 'courses/delete_course' },
                        title: 'Delete Course',
                        message: 'Are you sure you want to delete this course?',
                      })
                    "
                    class="act-btn delete"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="29"
                      viewBox="0 0 23 29"
                    >
                      <path
                        id="Icon_material-delete"
                        data-name="Icon material-delete"
                        d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21V6Z"
                        transform="translate(-6.5 -3.5)"
                        fill="none"
                        stroke="#fff"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </template>
                <span class="tooltip-content">Delete course</span>
              </v-tooltip>
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
  name: "preview_course",
  components: {
    preview: () => import("@/components/courses/Preview"),
    back: () => import("@/components/shared/back-button"),
    verifiedBadge: () => import("@/components/reusable/ui/VerifiedBadge"),
  },
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
  },
  watch: {
    $route() {
      this.findCourseByName({
        userCategory: this.userCategory.toLowerCase(),
        userId: this.$store.state.user.user._id,
        courseName: this.$route.params.name,
      });
    },
  },
  methods: {
    ...mapActions("courses", [
      "findCourseByName",
      "tooglePublishCourse",
      "deleteCourse",
    ]),
    ...mapActions("modal", ["set_modal"]),
  },
  created() {
    this.findCourseByName({
      userCategory: this.userCategory.toLowerCase(),
      user_name: this.$store.state.user.user.user_name,
      courseName: this.$route.params.name,
    });
  },
};
</script>
<style lang="scss" scoped>
button.back {
  margin: 2rem;
  padding: 0.2rem 2rem;
  border-radius: 30px;
  background-color: $main;
  box-shadow: 0 0 10px lighten($secondary, 3);
}

.teacher {
  background-color: $tertiary;
  min-height: 90vh;

  .preview-card {
    background-color: $main;
    overflow-wrap: anywhere;
    margin: auto;
    max-width: 80%;
    display: flex;
    flex-direction: row;

    // remove card overflow
    .v-responsive__content {
      display: none;
    }

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
        width: 50px;
        height: 50px;
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
  padding-top: 0rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  main {
    overflow-wrap: anywhere;

    &.description {
      padding-left: 2rem;

      h1 {
        font-size: 2.3rem;
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
          padding-left: 1rem;
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
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }

    &.preview {
      padding-right: 5rem;
    }
  }
}

.tooltip {
  background-color: #3d3d3d;

  span {
    color: white;
  }

  ::after {
    content: "";
    position: absolute;
    top: 25px;
    right: 53px;
    width: 12px;
    height: 12px;
    background-color: #3d3d3d;
    transform: rotate(226deg);
  }

  .instructor-card-skeleton {
    &.published {
      max-height: 222px;
    }

    &.unpublished {
      max-height: 187px;
    }

    max-width: 400px;
    margin-top: 40px;
    box-shadow: 0px 17px 34px rgba(116, 113, 113, 0.16);

    .ssc-circle {
      height: 110px;
      width: 110px;
    }

    .ssc-square {
      height: 20px;
    }
  }

  .student-card-skeleton {
    margin-top: 40px;

    .button {
      height: 82px !important;
    }
  }
}
</style>