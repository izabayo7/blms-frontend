<template>
  <v-container fluid class="dashboard_page instructor px-6 pl-md-14 pt-9">
    <div v-if="$vuetify.breakpoint.width > 900">
      <v-row class="page_title">
        <div class="upper">Dashboard</div>
        <div class="lower">Overviewer</div>
      </v-row>
      <v-row class="mt-6 px-4">
        <div class="v-col col-12 col-md-6 pa-0">
          <div class="row">
            <div class="v-col col-12 col-md-6 pa-0">
              <div class="college_info">
                <div class="d-flex justify-center align-center">
                  <div class="icon">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 17 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M3.39659 7.02735V9.64482L8.63995 12.1445L13.8833 9.64482V7.02735L8.63995 9.52703L3.39659 7.02735ZM8.63995 0.365906L0.400391 4.2921L8.63995 8.2183L15.3814 5.00536V9.52703H16.8795V4.2921L8.63995 0.365906Z"
                          fill="#FF7700"
                      />
                    </svg>
                  </div>
                  <div class="number">0</div>
                </div>
                <div class="label">Number of courses</div>
              </div>
            </div>
            <div class="v-col col-12 col-md-6 pa-0">
              <div class="college_info">
                <div class="d-flex justify-center align-center">
                  <div class="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                        <path
                            d="M16.7227 11.7764C18.1027 11.7764 19.2127 10.6564 19.2127 9.27637C19.2127 7.89637 18.1027 6.77637 16.7227 6.77637C15.3427 6.77637 14.2227 7.89637 14.2227 9.27637C14.2227 10.6564 15.3427 11.7764 16.7227 11.7764ZM9.22266 10.7764C10.8827 10.7764 12.2127 9.43637 12.2127 7.77637C12.2127 6.11637 10.8827 4.77637 9.22266 4.77637C7.56266 4.77637 6.22266 6.11637 6.22266 7.77637C6.22266 9.43637 7.56266 10.7764 9.22266 10.7764ZM16.7227 13.7764C14.8927 13.7764 11.2227 14.6964 11.2227 16.5264V18.7764H22.2227V16.5264C22.2227 14.6964 18.5527 13.7764 16.7227 13.7764ZM9.22266 12.7764C6.89266 12.7764 2.22266 13.9464 2.22266 16.2764V18.7764H9.22266V16.5264C9.22266 15.6764 9.55266 14.1864 11.5927 13.0564C10.7227 12.8764 9.88266 12.7764 9.22266 12.7764Z"
                            fill="#FF7700"/>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  <div class="number">0</div>
                </div>
                <div class="label">Number of students</div>
              </div>
            </div>
            <div class="v-col col-12 pa-0">
              <div class="details">
                Recent assignment submissions (0)
              </div>
              <div class="college_info long">
                <div class="body">
                  <div v-if="1==9" class="empty d-flex justify-center align-center">
                    <div>
                      <div class="title">No submission to show</div>
                      <div>Create a course to see more traffic here!</div>
                    </div>
                  </div>
                  <div class="data">
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  View reports
                </div>
              </div>
            </div>
            <div class="v-col col-12 d-flex">
              <div>
                <button
                    class="lower_buttons"
                    @click="$router.push('/course/new')"
                >
                  Create course
                </button>
              </div>
              <div>
                <button
                    class="lower_buttons outlined vertically--centered"
                    @click="$router.push('/live/schedule')"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.0846 7.58317H7.58464V11.0832H6.41797V7.58317H2.91797V6.4165H6.41797V2.9165H7.58464V6.4165H11.0846V7.58317Z"
                        fill="#193074"/>
                  </svg>

                  Schedule live class
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="v-col col-12 col-md-6 py-0">
          <v-row class="pa-0 px-md-6 pa-xl-0 pa-lg-0">
            <v-col class="col-12 col-md-6 pt-0">
              <small-card
                  :total="user_statistics.total_users"
                  :data="{
                  start: 'Grade-book',
                  end: 'Marking status',
                  total: 36,
                  colors: ['#193074','rgba(25, 48, 116, 0.24)']
                }"
                  template="INSTRUCTOR"
              />
            </v-col>
            <v-col class="col-12 col-md-6 pt-0">
              <small-card
                  :total="total_courses"
                  :data="{
                  start: 'Performance',
                  end: 'Overall success score',
                  total: 75,
                  colors: ['#3CE970','rgba(25, 48, 116, 0.24)']
                }"
                  template="INSTRUCTOR"
              />
            </v-col>
            <v-col class="col-12">
              <div class="details near">
                Recent assignment submissions (0)
              </div>
              <div class="recent-discussions">
                <div class="body">
                  <div v-if="1==1" class="empty vertically--centered">
                    <div>
                      <div class="title">It feels lonely here</div>
                      <div>Create a course to see more traffic here!</div>
                    </div>
                  </div>
                  <div v-else class="data">
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                    <div class="d-flex">
                      <div class="student-name">Manzi gustave</div>
                      <div class="course-name mx-auto">Managing personal ...</div>
                      <div class="time">2 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-row>
    </div>
    <div v-else>
      <v-row class="page_title d-flex">
        <div class="col-6">
          <div class="upper">Dashboard</div>
          <div class="lower">Overviewer</div>
        </div>
        <div class="col-6 vertically--centered">
          <button
              class="lower_buttons outlined vertically--centered ma-0"
              @click="$router.push('/live/schedule')"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M11.0846 7.58317H7.58464V11.0832H6.41797V7.58317H2.91797V6.4165H6.41797V2.9165H7.58464V6.4165H11.0846V7.58317Z"
                  fill="#193074"/>
            </svg>

            Schedule live class
          </button>
        </div>
        <div class="col-6">
          <small-card
              :total="user_statistics.total_users"
              :data="{
                  start: 'Grade-book',
                  end: 'Marking status',
                  total: 36,
                  colors: ['#193074','rgba(25, 48, 116, 0.24)']
                }"
              :width="10"
              template="INSTRUCTOR"
          />
        </div>
        <div class="col-6">
          <small-card
              :total="total_courses"
              :data="{
                  start: 'Performance',
                  end: 'Overall success score',
                  total: 75,
                  colors: ['#3CE970','rgba(25, 48, 116, 0.24)']
                }"
              template="INSTRUCTOR"
              :width="10"
          />
        </div>
        <div class="col-6">
          <div class="college_info">
            <div class="d-flex justify-center align-center">
              <div class="icon">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M3.39659 7.02735V9.64482L8.63995 12.1445L13.8833 9.64482V7.02735L8.63995 9.52703L3.39659 7.02735ZM8.63995 0.365906L0.400391 4.2921L8.63995 8.2183L15.3814 5.00536V9.52703H16.8795V4.2921L8.63995 0.365906Z"
                      fill="#FF7700"
                  />
                </svg>
              </div>
              <div class="number">0</div>
            </div>
            <div class="label">Number of courses</div>
          </div>
        </div>
        <div class="col-6">
          <div class="college_info">
            <div class="d-flex justify-center align-center">
              <div class="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                    <path
                        d="M16.7227 11.7764C18.1027 11.7764 19.2127 10.6564 19.2127 9.27637C19.2127 7.89637 18.1027 6.77637 16.7227 6.77637C15.3427 6.77637 14.2227 7.89637 14.2227 9.27637C14.2227 10.6564 15.3427 11.7764 16.7227 11.7764ZM9.22266 10.7764C10.8827 10.7764 12.2127 9.43637 12.2127 7.77637C12.2127 6.11637 10.8827 4.77637 9.22266 4.77637C7.56266 4.77637 6.22266 6.11637 6.22266 7.77637C6.22266 9.43637 7.56266 10.7764 9.22266 10.7764ZM16.7227 13.7764C14.8927 13.7764 11.2227 14.6964 11.2227 16.5264V18.7764H22.2227V16.5264C22.2227 14.6964 18.5527 13.7764 16.7227 13.7764ZM9.22266 12.7764C6.89266 12.7764 2.22266 13.9464 2.22266 16.2764V18.7764H9.22266V16.5264C9.22266 15.6764 9.55266 14.1864 11.5927 13.0564C10.7227 12.8764 9.88266 12.7764 9.22266 12.7764Z"
                        fill="#FF7700"/>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

              </div>
              <div class="number">0</div>
            </div>
            <div class="label">Number of students</div>
          </div>
        </div>
        <div class="col-12">              <div class="details near">
          Recent assignment submissions (0)
        </div></div>
        <div class="col-12"><div class="college_info long">
          <div class="body">
            <div v-if="1==9" class="empty d-flex justify-center align-center">
              <div>
                <div class="title">No submission to show</div>
                <div>Create a course to see more traffic here!</div>
              </div>
            </div>
            <div class="data">
              <div>
                <div class="d-flex">
                  <div class="student-name">Manzi gustave</div>
                  <div class="course-name mx-auto">Managing personal ...</div>
                </div>
                <div class="time">2 minutes ago</div>
              </div>
              <div>
                <div class="d-flex">
                  <div class="student-name">Manzi gustave</div>
                  <div class="course-name mx-auto">Managing personal ...</div>
                </div>
                <div class="time">2 minutes ago</div>
              </div>
              <div>
                <div class="d-flex">
                  <div class="student-name">Manzi gustave</div>
                  <div class="course-name mx-auto">Managing personal ...</div>
                </div>
                <div class="time">2 minutes ago</div>
              </div>
              <div>
                <div class="d-flex">
                  <div class="student-name">Manzi gustave</div>
                  <div class="course-name mx-auto">Managing personal ...</div>
                </div>
                <div class="time">2 minutes ago</div>
              </div>
            </div>
          </div>
          <div class="footer">
            View reports
          </div>
        </div></div>
        <div class="col-12">              <div class="details near">
          Recent assignment submissions (0)
        </div></div>
        <div class="col-12 mb-16"><div class="recent-discussions">
          <div class="body">
            <div v-if="1==2" class="empty vertically--centered">
              <div>
                <div class="title">It feels lonely here</div>
                <div>Create a course to see more traffic here!</div>
              </div>
            </div>
            <div v-else class="data">
              <div class="d-flex mb-4 mb-md-0">
                <div class="student-name">Manzi gustave</div>
                <div class="ml-auto">
                <div class="course-name">Managing personal ...</div>
                <div class="time">2 minutes ago</div>
                </div>
              </div>
              <div class="d-flex mb-4 mb-md-0">
                <div class="student-name">Manzi gustave</div>
                <div class="ml-auto">
                <div class="course-name">Managing personal ...</div>
                <div class="time">2 minutes ago</div>
                </div>
              </div>
              <div class="d-flex mb-4 mb-md-0">
                <div class="student-name">Manzi gustave</div>
                <div class="ml-auto">
                  <div class="course-name">Managing personal ...</div>
                  <div class="time">2 minutes ago</div>
                </div>
              </div>
              <div class="d-flex mb-4 mb-md-0">
                <div class="student-name">Manzi gustave</div>
                <div class="ml-auto">
                  <div class="course-name">Managing personal ...</div>
                  <div class="time">2 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div></div>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
// import Apis from "@/services/apis";

export default {
  name: "ApplicationDashboard",
  data: () => ({
    showInviteUsers: false,
    showFacultyModal: false,
    user_statistics: {},
    total_faculties: 0,
    total_courses: 0,
    total_student_groups: 0,
  }),
  components: {
    SmallCard: () => import("@/components/dashboard/information-card"),
  },
  methods: {
    ...mapActions("modal", ["set_modal"]),
  },
  async beforeMount() {

  },
};
</script>

<style lang="scss">
@import '../../../assets/sass/imports/dashboard';
</style>