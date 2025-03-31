<template>
  <div class="live-class">
    <div v-if="loaded && !error" class="live-class--wrapper">
      <div class="live-class--video" :class="`--${$vuetify.breakpoint.name}`">
        <back v-if="!participationInfo.isOfferingCourse" class="mt-6 hidden-sm-and-down"/>
        <div class="video">
          <div class="video--wrapper">
            <div class="video-el"
                 :class="`--${$vuetify.breakpoint.name} ${sidebarOpen ? '' : 'viewer'}`"
                 @mouseenter="toggleMenu(true)"
                 @mouseleave="toggleMenu(false)">
              <div class="no-video"
                   v-show="(noVideo && !isPresenting) || (isPresenting && participationInfo.isOfferingCourse)">
                <div class="no-video--wrapper" :class="{presenting:isPresenting}">
                  <div v-if="instructor" class="instructor-info">
                    <img
                        v-if="instructor.profile"
                        :src="instructor.profile + '?width=100'"
                        alt="profile picture" class="picture">
                    <v-avatar v-else class="avatar">
                      {{ instructor.sur_name | computeText }}
                    </v-avatar>
                    <h2 class="course">{{ live_session.course.name }}: {{ live_session.chapter.name }}</h2>
                    <span class="source">by instuctor</span>
                    <h2 class="name">{{
                        participationInfo.isOfferingCourse ? "YOU" : `${instructor ? instructor.sur_name + ' ' + instructor.other_names : ''}`
                      }}</h2>
                  </div>
                  <div class="screen-sharing-video" v-if="isPresenting">
                    <div class="screen-sharing-video--wrapper">
                      <h4>You are presenting your screen</h4>
                      <video id="video_screen_feed">
                        <!--                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">-->
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <video v-show="!noVideo && !isPresenting" id="video_feed">
                <!--                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" >-->
              </video>
              <button @click="playVideo" class="play_button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z"
                      fill="rgba(255,255,255,1)"/>
                </svg>
              </button>
              <video v-if="!participationInfo.isOfferingCourse" v-show="isPresenting"
                     id="viewer_screen_feed">
                <!--                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" >-->
              </video>
              <transition name="fade">
                <div :class="`overlay ${noVideo? 'none' : ''}`" v-show="(showMenu || noVideo)">
                  <div class="head hidden-sm-and-down">
                    <div class="text">
                      <h2>{{ live_session.course.name }}: Chapter </h2>
                      <span class="live" v-if="participationInfo.isOfferingCourse">Live</span>
                    </div>
                    <div v-if="participationInfo.isOfferingCourse" class="time">
                      {{ elapsed_time }}
                    </div>
                    <div v-else class="users">
                      {{ participants.length }} watching
                    </div>
                  </div>
                  <div class="video-controls" v-if="participationInfo.isOfferingCourse">
                    <div class="video-controls--wrapper">
                      <button @click="toogleVideo" class="start-mute-video">
                      <span class="icon">
                        <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9992 3.17969L17.3633 8.63395L24.9992 14.0882V3.17969Z" stroke="white" stroke-width="1.61152"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path
                            d="M15.1811 1H3.1817C1.97678 1 1 1.97678 1 3.1817V14.0902C1 15.2951 1.97678 16.2719 3.1817 16.2719H15.1811C16.386 16.2719 17.3628 15.2951 17.3628 14.0902V3.1817C17.3628 1.97678 16.386 1 15.1811 1Z"
                            stroke="white" stroke-width="1.61152" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                      </span>

                        <span class="text">{{ videoEnabled ? 'Stop video' : 'Start video' }}</span>
                      </button>
                      <button @click="toogleAudio" class="start-mute-mic">
                      <span class="icon">
                        <svg v-if="audioEnabled" width="16" height="25" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.91791 1.14258C7.11192 1.14258 6.33893 1.46276 5.76901 2.03268C5.19909 2.60261 4.87891 3.37559 4.87891 4.18158V12.2856C4.87891 13.0916 5.19909 13.8646 5.76901 14.4345C6.33893 15.0044 7.11192 15.3246 7.91791 15.3246C8.72391 15.3246 9.49689 15.0044 10.0668 14.4345C10.6367 13.8646 10.9569 13.0916 10.9569 12.2856V4.18158C10.9569 3.37559 10.6367 2.60261 10.0668 2.03268C9.49689 1.46276 8.72391 1.14258 7.91791 1.14258V1.14258Z" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.0023 10.2617V12.2877C15.0023 14.1684 14.2553 15.972 12.9254 17.3018C11.5956 18.6316 9.79198 19.3787 7.91133 19.3787C6.03067 19.3787 4.22705 18.6316 2.89722 17.3018C1.5674 15.972 0.820313 14.1684 0.820312 12.2877V10.2617" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.91406 19.376V23.428" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.85938 23.4297H11.9634" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg v-else width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9179 1.14258C11.1119 1.14258 10.3389 1.46276 9.76901 2.03268C9.19909 2.60261 8.87891 3.37559 8.87891 4.18158V12.2856C8.87891 13.0916 9.19909 13.8646 9.76901 14.4345C10.3389 15.0044 11.1119 15.3246 11.9179 15.3246C12.7239 15.3246 13.4969 15.0044 14.0668 14.4345C14.6367 13.8646 14.9569 13.0916 14.9569 12.2856V4.18158C14.9569 3.37559 14.6367 2.60261 14.0668 2.03268C13.4969 1.46276 12.7239 1.14258 11.9179 1.14258V1.14258Z" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.0023 10.2617V12.2877C19.0023 14.1684 18.2553 15.972 16.9254 17.3018C15.5956 18.6316 13.792 19.3787 11.9113 19.3787C10.0307 19.3787 8.22705 18.6316 6.89722 17.3018C5.5674 15.972 4.82031 14.1684 4.82031 12.2877V10.2617" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9141 19.376V23.428" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.85938 23.4297H15.9634" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.64453 17.8301L21.8692 2.96492" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                      </span>
                        <span class="text">{{ audioEnabled ? 'Mute' : 'Unmute' }}</span>
                      </button>
                      <!--                      <button class="start-mute-sound">-->
                      <!--                      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"-->
                      <!--                                              height="24"><path fill="none" d="M0 0h24v24H0z"/><path-->
                      <!--                          d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z"/></svg></span>-->
                      <!--                        <span class="text">Mute</span>-->
                      <!--                      </button>-->
                      <button class="start-share-screen" @click="shareScreen">
                      <span class="icon">
<svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.6649 14.721L21.6664 15.6105L25.5553 15.6122V16.8913H0.444737V15.6124H4.33341V15.1676V14.7229C4.10706 14.7229 3.88293 14.6783 3.67381 14.5917C3.46469 14.5051 3.27468 14.3781 3.11463 14.2181C2.95458 14.058 2.82762 13.868 2.741 13.6589C2.65438 13.4498 2.60979 13.2256 2.60979 12.9993V2.1674H2.6098L2.60979 2.16555C2.60885 1.93918 2.65274 1.71486 2.73894 1.50554C2.82513 1.29622 2.95192 1.10604 3.11199 0.945973C3.27206 0.785904 3.46224 0.659115 3.67156 0.572921C3.88088 0.486727 4.10519 0.442834 4.33156 0.443775V0.443779H4.33341H21.6652C22.1223 0.443779 22.5607 0.625374 22.884 0.948615C23.2071 1.27175 23.3887 1.70997 23.3888 2.16693C23.3888 2.16709 23.3888 2.16724 23.3888 2.1674L23.3775 12.9969L23.3775 12.9984C23.3785 13.4538 23.1987 13.891 22.8776 14.214C22.5565 14.537 22.1204 14.7193 21.6649 14.721Z" stroke="white" stroke-width="0.889474"/>
<path d="M14.8072 6.54275V6.92846L14.4253 6.98301C12.2833 7.28902 10.7774 8.20038 9.72706 9.40081C9.08889 10.1302 8.61162 10.9748 8.26532 11.871C9.82583 10.5095 11.8229 9.88169 14.3625 9.88169H14.8072V10.3264V11.8821L18.2226 8.46665L14.8072 5.05123V6.54275Z" stroke="white" stroke-width="0.889474"/>
</svg>


                      </span>
                        <span class="text">Share screen</span>
                      </button>
                      <button class="start-settings">
                      <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 14.999C13.6569 14.999 15 13.6559 15 11.999C15 10.3422 13.6569 8.99902 12 8.99902C10.3431 8.99902 9 10.3422 9 11.999C9 13.6559 10.3431 14.999 12 14.999Z" stroke="white" stroke-width="1.08216" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z" stroke="white" stroke-width="1.08216" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </span>
                        <span class="text">settings</span>
                      </button>
                    </div>
                  </div>
                  <div class="video-controls" v-else>
                    <div class="video-controls--wrapper viewer">
                      <span class="live">Live</span>
                      <div class="time">
                        {{ elapsed_time }}
                      </div>
                      <button @click="toogleFullScreen" class="ml-auto">
                        <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.72526 1H1.30859V6.41667" stroke="white" stroke-width="1.26923"/>
                          <path d="M15.8906 1H21.3073V6.41667" stroke="white" stroke-width="1.26923"/>
                          <path d="M21.3073 10.25V15.6667H15.8906" stroke="white" stroke-width="1.26923"/>
                          <path d="M1.30859 10.25V15.6667H6.72526" stroke="white" stroke-width="1.26923"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
              <!--              <div class="speaking-user">-->
              <!--                <div class="d-flex">-->
              <!--                  <div class="profile">-->
              <!--                    <img-->
              <!--                        :src="instructor ? instructor.profile + '?width=100' : ''"-->
              <!--                        alt="profile picture" class="picture">-->
              <!--                  </div>-->
              <!--                  <div class="user">-->
              <!--                    <div class="names">{{-->
              <!--                        participationInfo.isOfferingCourse ? "YOU" : `${instructor ? instructor.sur_name + ' ' + instructor.other_names : ''}`-->
              <!--                      }}</div>-->
              <!--                    <div class="vocal"></div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
          </div>
        </div>
        <div v-if="participationInfo.isOfferingCourse" class="live-comments"
             :class="`--${$vuetify.breakpoint.name} ${sidebarOpen ? '' : 'viewer'}`">
          <div class="live-comments--wrapper">
            <div class="_title">LIVE COMMENTS</div>
            <div class="student-new-comment">
              <student-new-comment-with-photo @sent="addComment" :isLive="true"/>
            </div>
            <div class="live-comments-container">
              <discussion
                  v-for="(comment, i) in comments"
                  :key="i"
                  :content="comment"
                  :verified="comment.sender.category !== 'STUDENT'"
                  :is-live="true"
                  @replied="replied"
              />

            </div>
          </div>
        </div>
        <div v-else class="live-class-details">
          <div class="live-class-details--wrapper">
            <h2 class="hidden-md-and-up">{{ live_session.course.name }}: Chapter </h2>
            <div class="description">{{ live_session.chapter.description }}
            </div>
            <div v-if="displayQuiz && quiz" class="quiz ml-auto ">
              <button @click="
openQuiz">
                Take quiz
              </button>
            </div>
            <div class="quiz ml-auto" v-else>
              <button disabled class="disabled">
                Take quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="participationInfo.isOfferingCourse" class="live-class--attendance">
        <div class="live-class--attendance--wrapper">
          <h3>ONLINE USERS : {{ participants.length }} </h3>
          <div class="online-users">
            <online-user v-for="user in participants.filter(x=>x.userInfo.category != 'INSTRUCTOR')"
                         :user="user.userInfo"
                         :key="`${(Date.now() * Math.random())}${user.name}`"/>
          </div>
        </div>
        <div class="live-class--actions">
          <div class="live-class--action attendance">
            <button @click="checkAttandance">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
            </span>
              <span class="text">CHECK ATTENDANCE</span>
            </button>
          </div>
          <div v-if="live_session.quiz" class="live-class--action release-quiz">
            <button v-if="!displayQuiz" @click="releaseQuiz">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>
            </span>
              <span class="text">RELEASE QUIZ</span>
            </button>
          </div>
          <div class="live-class--action end-class">
            <button @click="                      set_modal({
                        template: 'action_confirmation',
                        method: { action: 'live_session/change_confirmation',parameters: { value: true} },
                        title: 'End live session',
                        message: 'Are you sure you want to end this live session?'
                      })">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
                  fill="rgba(255,255,255,1)"/></svg>
            </span>
              <span class="text">END CLASS</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="live-class--attendance">
        <div class="live-class--attendance--wrapper long">
          <h3>DISCUSSION BOARD </h3>
          <h3 class="hidden-md-and-up">ONLINE USERS : {{ participants.length }} </h3>
          <div class="live-comments-container viewer">
            <discussion
                v-for="(comment, i) in comments"
                :key="i"
                :content="comment"
                :verified="comment.sender.category !== 'STUDENT'"
                :is-live="true"
                @replied="replied"
            />
          </div>
          <div class="student-new-comment">
            <student-new-comment-with-photo @sent="addComment" :isLive="true"/>
          </div>
        </div>
        <div v-if="participationInfo.isOfferingCourse" class="live-class--actions">
          <div class="live-class--action attendance">
            <button>
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
            </span>
              <span class="text">CHECK ATTENDANCE</span>
            </button>
          </div>
          <div class="live-class--action release-quiz">
            <button>
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>
            </span>
              <span class="text">RELEASE QUIZ</span>
            </button>
          </div>
          <div class="live-class--action end-class">
            <button @click="leaveRoom">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
                  fill="rgba(255,255,255,1)"/></svg>
            </span>
              <span class="text">END CLASS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="no-live" v-else>
      <div v-if="!loaded" class="loading">Loading</div>
      <div v-else class="not-found">Sorry {{ error }}</div>
    </div>
  </div>
</template>

<script>
import {WebRtcPeer} from "../../../plugins/kurentoLive/kurento-utils.js"
import Participant from "../../../plugins/kurentoLive/participants";
import {downloadAttachment} from "@/services/global_functions"
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import Discussion from "../../../components/Live/Discussion";
import {elapsedDuration, toLocal} from "@/services/global_functions"
import OnlineUser from "../../../components/Live/OnlineUser";
import StudentNewCommentWithPhoto from "../../../components/Live/StudentNewCommentWithPhoto";
import Apis from '../../../services/apis'
import {convertUTCDateToLocalDate, playSound} from "../../../services/global_functions";

const sound = require("../../../assets/audio/com.mp3");

export default {
  name: "liveClass",
  components: {
    Discussion,
    StudentNewCommentWithPhoto,
    OnlineUser,
    back: () => import("@/components/shared/back-button"),
  },
  data() {
    return {
      ws: null,
      participants: [],
      comments: [],
      me: null,
      interval: null,
      id: "",
      displayQuiz: false,
      elapsed_time: "",
      quiz: null,
      comment: "",
      noVideo: false,
      isPresenting: false,
      participationInfo: {name: "", room: "", isOfferingCourse: false},
      showMenu: false,
      videoEnabled: true,
      audioEnabled: true,
      live_session: null,
      error: null,
      loaded: false
    }
  },
  beforeMount() {
    Apis.get(`live_session/${this.$route.params.liveSessionId}`).then(async d => {
      if (d.data.status == 404) {
        this.error = d.data.message
      } else {
        const date = toLocal(new Date(d.data.data.date))
        const remainingTime = elapsedDuration(date)

        if (d.data.data.status == "FINISHED") {
          this.error = "The meeting expired " + elapsedDuration(toLocal(new Date(d.data.data.updatedAt)))
        } else {

          if (remainingTime.includes('day') && remainingTime.includes('ago')) {
            this.error = "The meeting expired " + remainingTime
            this.finishSession()
          } else if (remainingTime.includes("in ")) {
            // if (remainingTime.includes("day")) {
            this.error = remainingTime
            // }
          } else {

            if (this.sidebarOpen)
              this.toggle()

            await Apis.create('user_logs', {live_session_id: d.data.data._id})

            this.live_session = d.data.data
            this.startCounting(d.data.data);

            this.initialiseSession()
            this.loadComments()
            let span = document.querySelector('.message-row span')
            if (!this.participationInfo.isOfferingCourse && span)
              span.className = "stud_span";
          }
        }
      }
      this.loaded = true
    })
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("live_session", ["end_class"]),

    ...mapState("sidebar_navbar", {sidebarOpen: "sidebar_expanded"}),
    instructor() {
      const el = this.participants.filter(e => e.userInfo.category == "INSTRUCTOR")
      return el[0] ? el[0].userInfo : undefined
    },
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
  methods: {
    ...mapMutations("sidebar_navbar", {toggle: "TOGGLE_SIDEBAR_EXPANSION"}),
    toogleFullScreen() {
      document.getElementById("video_feed").requestFullscreen()
    },
    playVideo() {
      document.getElementById("video_feed").play()
      document.querySelector('.play_button').style.display = 'none'
    },
    ...mapActions("modal", ["set_modal"]),
    downloadAttachment,
    openQuiz() {
      let route = this.$router.resolve(`/quiz/preview/${this.quiz.name}`);
      this.downloadAttachment(route.href)
    },
    ...mapActions("live_session", ["addParticipant"]),
    async loadComments() {
      Apis.get(`comment/live_session/${this.$route.params.liveSessionId}`).then(d => {
        this.comments = d.data.data
      })
    },
    initialiseSession() {
      //know if this user has ability to give live class
      this.participationInfo.isOfferingCourse = this.user.category.name === 'INSTRUCTOR'

      const self = this
      this.participationInfo.name = `${this.user.other_names} ${this.user.sur_name}`
      this.participationInfo.room = this.$route.params.liveSessionId

      const host = 'test.stream.kurious.rw'
      // const host = 'localhost:8080'

      this.ws = new WebSocket('wss://' + host + '/kurious_stream' + `?token=${this.$session.get("jwt")}`);

      this.ws.addEventListener('open', () => {
        self.register();
      })

      this.ws.onerror = function (evt) {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: evt,
          status: "danger",
          uptime: 2000,
        })
      };


      window.onbeforeunload = () => {
        this.ws.close();
        this.handleMediaTracks();
      };

      this.ws.onmessage = (message) => {
        let parsedMessage = JSON.parse(message.data);
        console.info('Received message: ', message);

        switch (parsedMessage.id) {
          case 'userId':
            self.id = parsedMessage.data;
            self.participationInfo.name = self.id;
            break;
          case 'roomClosed':
            if (!self.participationInfo.isOfferingCourse)
              self.set_modal({
                template: 'live_related_ended',
                title: 'Live class ended',
                message: 'Hey user, the class you were attending has ended.',
              })
            else {
              self.finishSession();
              this.onCloseRoom();
            }
            break;
          case 'screenAllowed':
            this.onExistingParticipants({data: []});
            break;
          case 'initialScreenOff':
            this.noVideo = true;
            break;
          case 'existingParticipants': {
            this.onExistingParticipants(parsedMessage);
            this.socket.emit("live_session/joined", {
              session_id: this.live_session._id
            });
            break;
          }
          case 'newParticipantArrived':
            this.onNewParticipant(parsedMessage);
            break;
          case 'participantLeft':
            this.onParticipantLeft(parsedMessage);
            break;
          case 'toogleMedia':
            this.toogleMedia(parsedMessage);
            break;
          case 'notification':
            this.isPresenting = parsedMessage.screenStatus;
            this.videoEnabled = parsedMessage.videoStatus;
            this.audioEnabled = parsedMessage.audioStatus;
            break;
          case 'receiveVideoAnswer':
            this.receiveVideoResponse(parsedMessage);
            break;
          case 'iceCandidate':
            if (self.participantIndex(parsedMessage.name) != -1) {
              self.participants[self.participantIndex(parsedMessage.name)].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
                if (error) {
                  console.error("Error adding candidate: " + error);
                  return null;
                }
              });
            }
            break;
          default:
            console.error('Unrecognized message', parsedMessage);
        }
      }
      this.ws.onclose = () => {
        console.trace();
        this.socket.emit("live_session/left", {
          session_id: this.live_session._id
        });
      }
      self.socket.on("live/quizReleased", (quiz) => {
        self.quiz = quiz;
        self.displayQuiz = true
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: self.participationInfo.isOfferingCourse ? 'Quiz was released' : 'Quiz time !',
          status: "info",
          uptime: 5000,
        });
      })

      self.socket.on("res/live/checkAttendance", ({code}) => {
        this.set_modal({
          template: 'live_related',
          method: {
            action: 'live_session/answerAttendance',
            parameters: {user: {id: self.instructor._id}, session_id: self.$route.params.liveSessionId}
          },
          title: 'ATTENDANCE CHECK',
          message: 'Hey user, are you there ? Type the code bellow to confirm ',
          code: code,
        })
      })

      self.socket.on("res/live/studentAnswered", ({id, attendance}) => {

        for (const i in self.participants) {
          if (self.participants[i].userInfo._id == id)
            self.participants[i].userInfo.attendance = attendance
        }

        self.participants.sort((a, b) => {
              return b.userInfo.attendance - a.userInfo.attendance
            }
        )
      })

      self.socket.on("comment/new", (result) => {
        // this.$store.commit(
        //     "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
        //     this.totalComments == "" ? 1 : this.totalComments + 1
        // );
        if (result.reply) {
          const comments = self.comments.filter(e => e._id == result.reply)
          if (comments.length) {
            if (comments[0].replies == undefined) {
              comments[0].replies = []
            }
            const replies = comments[0].replies.filter(e => e._id == result._id)
            if (!replies.length) {
              playSound(sound)
              self.replied({_id: result.reply, data: result});
            }
          }
        } else {
          const comments = self.comments.filter(e => e._id == result._id)
          if (!comments.length) {
            playSound(sound)
            self.comments.unshift(result);
          }
        }
      });
    },
    async finishSession() {
      await Apis.put(`live_session/${this.$route.params.liveSessionId}/status/FINISHED`)
      this.onCloseRoom()
      this.$router.push('/courses')
    },
    addComment(comment) {
      this.comments.unshift(comment)
    },
    replied(data) {
      this.comments.map((comment) => {
        if (comment._id === data._id) {
          if (!comment.replies) {
            comment.replies = []
          }
          comment.replies.unshift(data.data)
        }
      });
    },
    async getUserInfo(id) {
      const response = await Apis.get(`user/byId/${id}`)
      response.data.data.attendance = 20
      return response.data.data
    },
    toggleMenu(status) {
      this.showMenu = status
      const self = this;
      if (status) {
        setTimeout(() => {
          self.showMenu = false
        }, 4000)
      }
    },
    shareScreen() {
      if (!this.isPresenting) {
        setTimeout(() => {
          document.getElementById("video_screen_feed").srcObject.getVideoTracks()[0].addEventListener('ended', () =>
              this.shareScreen())
        }, 5000)
      }
      let message = {
        id: this.isPresenting ? 'stopSharingScreen' : 'shareScreen',
      }

      this.sendMessage(message);
      this.isPresenting = !this.isPresenting;
      if (!this.isPresenting) {
        this.sendMessage({
          id: "notifyUser",
          receiver: "ALL",
          videoStatus: this.videoEnabled,
          audioStatus: this.audioEnabled,
          screenStatus: this.isPresenting
        })
      }
    },
    register() {
      // document.getElementById('room-header').innerText = 'ROOM ' + this.participationInfo.room;
      // document.getElementById('join').style.display = 'none';
      // document.getElementById('room').style.display = 'block';

      let message = {
        id: 'joinRoom',
        name: this.participationInfo.name,
        room: this.participationInfo.room,
        record_session: this.live_session.record_session || false,
        offeringCourse: this.participationInfo.isOfferingCourse
      }
      this.sendMessage(message);
    },
    sendMessage(message) {
      let jsonMessage = JSON.stringify(message);
      this.ws.send(jsonMessage);
    },

    onNewParticipant(request) {
      if (request.name != this.participationInfo.name + '_screen') {
        this.receiveVideo(request.name);
      }
    },
    participantIndex(name) {
      const result = this.participants.filter(e => e.name == name)
      return this.participants.indexOf(result[0]);
    },
    removeParticipant(index) {
      this.participants.splice(index, 1)
    },
    receiveVideoResponse(result) {

      this.participants[this.participantIndex(result.name)].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    },

    callResponse(message) {
      if (message.response != 'accepted') {
        stop();
      } else {
        WebRtcPeer.processAnswer(message.sdpAnswer, function (error) {
          if (error) return console.error(error);
        });
      }
    },

    async onExistingParticipants(msg) {
      const self = this
      let constraints = self.isPresenting ? {
        audio: true,
        video: true
      } : {
        audio: true,
        video: {
          mandatory: {
            maxWidth: 320,
            maxFrameRate: 15,
            minFrameRate: 15
          }
        }
      };

      if (!this.participationInfo.isOfferingCourse) {
        constraints = null
      }

      let participant = new Participant(self.isPresenting ? `${this.participationInfo.name}_screen` : this.participationInfo.name, this, true, await this.getUserInfo(this.participationInfo.name.split('_')[0]));

      this.participants.push(participant);
      this.addParticipant({id: participant.userInfo._id})

      let video = participant.getVideoElement();

      let options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: participant.onIceCandidate.bind(participant)
      }

      if (self.isPresenting) {
        options.sendSource = 'screen'
      }

      participant.rtcPeer = this.participationInfo.isOfferingCourse ? new WebRtcPeer.WebRtcPeerSendonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            if (self.me === null)
              self.me = participant;
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));

          }) : new WebRtcPeer.WebRtcPeerRecvonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            if (self.me === null)
              self.me = participant;
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));

          });

      msg.data.forEach(this.receiveVideo);

      if (self.isPresenting) {
        self.sendMessage({
          id: "notifyUser",
          receiver: "ALL",
          videoStatus: this.videoEnabled,
          audioStatus: this.audioEnabled,
          screenStatus: this.isPresenting
        })
      }

    },
    releaseQuiz() {
      this.displayQuiz = true
      this.socket.emit("live/releaseQuiz", {
        quiz: this.live_session.quiz,
        receivers: this.$store.getters['live_session/participants']
      });
    },
    checkAttandance() {
      this.socket.emit("live/checkAttendance", {
        receivers: this.$store.getters['live_session/participants'],
        session_id: this.$route.params.liveSessionId
      });
      this.$store.dispatch("app_notification/SET_NOTIFICATION", {
        message: 'Attendance popup sent',
        status: "info",
        uptime: 5000,
      });
    },
    toogleVideo() {
      let message = {
        id: 'toogleMedia',
        isVideo: true,
        enabled: this.me.rtcPeer.videoEnabled
      }
      this.sendMessage(message);
      this.me.rtcPeer.videoEnabled = !this.me.rtcPeer.videoEnabled;
      this.videoEnabled = !this.videoEnabled;
    },
    toogleAudio() {
      let message = {
        id: 'toogleMedia',
        isVideo: false,
        enabled: this.me.rtcPeer.audioEnabled
      }
      this.sendMessage(message);
      this.me.rtcPeer.audioEnabled = !this.me.rtcPeer.audioEnabled
      this.audioEnabled = !this.audioEnabled;
    },
    leaveRoom() {
      this.sendMessage({
        id: this.participationInfo.isOfferingCourse ? 'closeRoom' : 'leaveRoom'
      });
      if (!this.participationInfo.isOfferingCourse) {
        this.onCloseRoom();
      }
    },
    onCloseRoom() {
      for (let key in this.participants) {
        this.participants[key].dispose();
      }

      this.ws.close();
      this.handleMediaTracks();
      this.$router.push('/')
    },
    async receiveVideo(sender) {
      let participant = sender == this.participationInfo.name ? this.participants[this.participantIndex(sender)] : new Participant(sender, this, false, await this.getUserInfo(sender.split('_')[0]));
      if (participant.userInfo.category == "INSTRUCTOR") {
        let video = participant.getVideoElement();
        let options = {
          remoteVideo: video,
          onicecandidate: participant.onIceCandidate.bind(participant)
        }

        participant.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly(options,
            function (error) {
              if (error) {
                return console.error(error);
              }
              this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            })
      }
      if (sender != this.participationInfo.name) {
        this.participants.push(participant);
        this.addParticipant({id: participant.userInfo._id})
        if (this.participationInfo.isOfferingCourse) {
          this.sendMessage({
            id: "notifyUser",
            receiver: participant.name,
            videoStatus: this.videoEnabled,
            audioStatus: this.audioEnabled,
            screenStatus: this.isPresenting
          })

          // notify new user if quiz was released
          if (this.displayQuiz)
            this.socket.emit("live/releaseQuiz", {
              quiz: this.live_session.quiz,
              receivers: [{id: participant.userInfo._id}]
            });
        }
      }
    },

    onParticipantLeft(request) {
      this.participants[this.participantIndex(request.name)].dispose();
      this.removeParticipant(this.participantIndex(request.name))
      // let participant = this.participants[request.name];
      //
      // delete this.participants[request.name];
    },
    toogleMedia(obj) {
      if (obj.isVideo) {
        if (obj.enabled == this.noVideo) {
          this.noVideo = !this.noVideo
        }
      }
    },
    stopTracks(tracks) {
      for (const i in tracks) {
        tracks[i].stop()
      }
    },
    startCounting(live_session) {
      this.interval = setInterval(() => {
        this.elapsed_time = elapsedDuration(convertUTCDateToLocalDate(new Date(live_session.date.replace("00:00", live_session.time))));
      }, 1000)
    },
    handleMediaTracks() {
      const screen = document.getElementById("video_screen_feed");
      const video = document.getElementById("video_feed");
      if (video)
        if (video.srcObject) {
          this.stopTracks(video.srcObject.getTracks())
        }
      if (screen)
        if (screen.srcObject) {
          this.stopTracks(screen.srcObject.getTracks())
        }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.ws)
      this.ws.close();
    this.handleMediaTracks();
    clearInterval(this.interval)
    next();
  }
  ,
  watch: {
    videoEnabled() {
      this.noVideo = !this.videoEnabled
    },
    end_class() {
      if (this.end_class)
        this.leaveRoom()
    },
    participants() {
      if (!this.instructor) {
        let video = document.getElementById("video_feed");
        video.setAttribute('poster', 'https://apis.kurious.rw/assets/images/video-loader.gif')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/sass/imports/live-class';
</style>
