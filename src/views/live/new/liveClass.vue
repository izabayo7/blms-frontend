<template>
  <div class="live-class"
       :class="{'pt-7':(!participationInfo.isOfferingCourse || isStudentPresenting) && !$vuetify.breakpoint.mobile}">
    <div v-if="loaded && !error" class="live-class--wrapper"
         :class="{'mx-auto':!participationInfo.isOfferingCourse || isStudentPresenting}">
      <back v-if="!participationInfo.isOfferingCourse || isStudentPresenting" target="/"
            class="mt-6 hidden-sm-and-down"/>
      <div class="live-class--video" :class="`--${$vuetify.breakpoint.name}`">
        <div class="video">
          <div class="video--wrapper">
            <div class="video-el"
                 :class="`--${$vuetify.breakpoint.name} ${sidebarOpen ? '' : 'viewer'} ${participationInfo.isOfferingCourse ? '':'mx-auto'}`"
                 @mouseenter="toggleMenu(true)"
                 @mouseleave="toggleMenu(false)">
              <div class="no-video"
                   v-show="(noVideo && !isPresenting) || (isPresenting && participationInfo.isOfferingCourse && (currentPresenter ? currentPresenter._id == me.userInfo._id:true))">
                <div class="no-video--wrapper" :class="{presenting:isPresenting}">
                  <div v-if="isStudentPresenting || (currentPresenter ? currentPresenter.category == 'STUDENT': false)"
                       class="instructor-info">
                    <img
                        v-if="currentPresenter.profile"
                        :src="currentPresenter.profile + '?width=100'"
                        alt="profile picture" class="picture">
                    <v-avatar v-else class="avatar mr-0">
                      {{ currentPresenter.sur_name | computeText }}
                    </v-avatar>
                    <h2 class="name">{{
                        isStudentPresenting ? "YOU are" : `${currentPresenter ? currentPresenter.sur_name + ' ' + currentPresenter.other_names : ''}`
                      }}</h2>
                    <span class="source">presenting</span>
                  </div>
                  <div v-else-if="instructor" class="instructor-info">
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
                      <video id="video_screen_feed" class="show">
                        <!--                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">-->
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="!noVideo && !isPresenting" class="video-container">
                <video id="video_feed" class="show"
                       poster="https://apis.kurious.rw/assets/images/video-loader.gif">
                  <!--                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" >-->
                </video>
              </div>
              <button @click="playVideo" class="play_button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z"
                      fill="rgba(255,255,255,1)"/>
                </svg>
              </button>
              <video
                  v-show="isPresenting && ((currentPresenter && me) ? (currentPresenter._id != me.userInfo._id) : true)"
                  id="viewer_screen_feed" class="show">
                <!--                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" >-->
              </video>
              <transition name="fade">
                <div :class="`overlay ${noVideo? 'none' : ''}`" v-show="(showMenu || noVideo)">
                  <div class="head hidden-sm-and-down">
                    <div class="text">
                      <h2>{{ live_session.course.name }}: Chapter </h2>
                      <span class="live">Live</span>
                    </div>
                    <div class="time">
                      {{ elapsed_time }}
                    </div>
                  </div>
                  <div class="more-details">
                    <div
                        v-if="(me && currentPresenter ? currentPresenter._id != me.userInfo._id : false) || (userCategory == 'STUDENT' && !isStudentPresenting && instructor)"
                        class="speaking-user">
                      <div class="d-flex" v-if="currentPresenter || instructor">
                        <div class="profile">
                          <img
                              v-if="currentPresenter ? currentPresenter.profile : instructor.profile"
                              :src="currentPresenter ? currentPresenter.profile : instructor.profile + '?width=100'"
                              alt="profile picture" class="picture">
                          <v-avatar v-else class="avatar">
                            {{ (currentPresenter ? currentPresenter.sur_name : instructor.sur_name) | computeText }}
                          </v-avatar>
                        </div>
                        <div class="user">
                          <div class="names">{{
                              `${currentPresenter ? currentPresenter.sur_name + ' ' + currentPresenter.other_names : instructor.sur_name + ' ' + instructor.other_names}`
                            }}
                          </div>
                          <div class="vocal">Presenting</div>
                        </div>
                        <button v-if="userCategory != 'STUDENT' && !isStudentPresenting" @click="stop_presenter"
                                class="stop-presenting ml-4">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13" cy="13" r="13" fill="#E9E9E9"/>
                            <path
                                d="M16.875 10.0062L15.9938 9.125L12.5 12.6188L9.00625 9.125L8.125 10.0062L11.6188 13.5L8.125 16.9938L9.00625 17.875L12.5 14.3812L15.9938 17.875L16.875 16.9938L13.3812 13.5L16.875 10.0062Z"
                                fill="#626262"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div v-if="isStudentPresenting " class="presenter d-flex">
                      <div class="text">You are presenting</div>
                      <button @click="stop_presenting" class="stop-presenting">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="13" cy="13" r="13" fill="#E9E9E9"/>
                          <path
                              d="M16.875 10.0062L15.9938 9.125L12.5 12.6188L9.00625 9.125L8.125 10.0062L11.6188 13.5L8.125 16.9938L9.00625 17.875L12.5 14.3812L15.9938 17.875L16.875 16.9938L13.3812 13.5L16.875 10.0062Z"
                              fill="#626262"/>
                        </svg>
                      </button>
                    </div>
                    <div v-if="!participationInfo.isOfferingCourse && !$vuetify.breakpoint.mobile" class="users">
                      {{ participants.length }} watching
                    </div>
                  </div>
                  <div v-if="!$vuetify.breakpoint.mobile" class="live-comments-container">
                    <div class="heading d-flex">
                      <button @click="toogleComments" class="toogle-comments">
                        <svg v-if="newCommentAvailable" width="26" height="31" viewBox="0 0 26 31" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M21.0932 12.25H19.7911V14.3333H20.8328V22.6667H17.7078C17.4315 22.6667 17.1666 22.7764 16.9712 22.9718C16.7759 23.1671 16.6661 23.4321 16.6661 23.7083V25.3604L14.2776 22.9719C14.0823 22.7765 13.8174 22.6667 13.5411 22.6667H11.2786L9.19531 24.75H13.1099L16.9714 28.6115C17.117 28.7571 17.3026 28.8563 17.5047 28.8964C17.7067 28.9366 17.9161 28.916 18.1064 28.8372C18.2967 28.7583 18.4594 28.6249 18.5739 28.4536C18.6883 28.2823 18.7494 28.081 18.7495 27.875V24.75H21.0932C21.5765 24.7494 22.0399 24.5572 22.3816 24.2155C22.7234 23.8737 22.9156 23.4104 22.9161 22.9271V14.0729C22.9156 13.5896 22.7234 13.1263 22.3816 12.7845C22.0399 12.4428 21.5765 12.2506 21.0932 12.25Z"
                              fill="#F1F1F1"/>
                          <path
                              d="M7.29427 24.7507C7.018 24.7507 6.75305 24.6409 6.5577 24.4456C6.36235 24.2502 6.2526 23.9853 6.2526 23.709V20.584H3.90885C3.42556 20.5834 2.96221 20.3912 2.62047 20.0495C2.27872 19.7077 2.08649 19.2444 2.08594 18.7611V9.9069C2.08649 9.4236 2.27872 8.96026 2.62047 8.61851C2.96221 8.27677 3.42556 8.08454 3.90885 8.08398H16.9297C17.413 8.08454 17.8763 8.27677 18.2181 8.61851C18.5598 8.96026 18.7521 9.4236 18.7526 9.9069V18.7611C18.751 19.2447 18.5586 19.7081 18.2172 20.0507C18.0485 20.2203 17.8479 20.3548 17.6269 20.4463C17.4059 20.5379 17.1689 20.5847 16.9297 20.584H11.8922L8.03073 24.4454C7.83542 24.6408 7.57052 24.7506 7.29427 24.7507ZM4.16927 18.5007H7.29427C7.57054 18.5007 7.83549 18.6104 8.03084 18.8057C8.22619 19.0011 8.33594 19.2661 8.33594 19.5423V21.1944L10.7245 18.8059C10.9198 18.6105 11.1847 18.5007 11.4609 18.5007H16.6693V10.1673H4.16927V18.5007Z"
                              fill="#F1F1F1"/>
                          <circle cx="23" cy="3" r="3" fill="#3CE970"/>
                        </svg>
                        <svg v-else width="25" height="25" viewBox="0 0 25 25" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M21.0932 6.25H19.7911V8.33333H20.8328V16.6667H17.7078C17.4315 16.6667 17.1666 16.7764 16.9712 16.9718C16.7759 17.1671 16.6661 17.4321 16.6661 17.7083V19.3604L14.2776 16.9719C14.0823 16.7765 13.8174 16.6667 13.5411 16.6667H11.2786L9.19531 18.75H13.1099L16.9714 22.6115C17.117 22.7571 17.3026 22.8563 17.5047 22.8964C17.7067 22.9366 17.9161 22.916 18.1064 22.8372C18.2967 22.7583 18.4594 22.6249 18.5739 22.4536C18.6883 22.2823 18.7494 22.081 18.7495 21.875V18.75H21.0932C21.5765 18.7494 22.0399 18.5572 22.3816 18.2155C22.7234 17.8737 22.9156 17.4104 22.9161 16.9271V8.07292C22.9156 7.58962 22.7234 7.12627 22.3816 6.78453C22.0399 6.44279 21.5765 6.25055 21.0932 6.25Z"
                              fill="#F1F1F1"/>
                          <path
                              d="M7.29427 18.7507C7.018 18.7507 6.75305 18.6409 6.5577 18.4456C6.36235 18.2502 6.2526 17.9853 6.2526 17.709V14.584H3.90885C3.42556 14.5834 2.96221 14.3912 2.62047 14.0495C2.27872 13.7077 2.08649 13.2444 2.08594 12.7611V3.9069C2.08649 3.4236 2.27872 2.96026 2.62047 2.61851C2.96221 2.27677 3.42556 2.08454 3.90885 2.08398H16.9297C17.413 2.08454 17.8763 2.27677 18.2181 2.61851C18.5598 2.96026 18.7521 3.4236 18.7526 3.9069V12.7611C18.751 13.2447 18.5586 13.7081 18.2172 14.0507C18.0485 14.2203 17.8479 14.3548 17.6269 14.4463C17.4059 14.5379 17.1689 14.5847 16.9297 14.584H11.8922L8.03073 18.4454C7.83542 18.6408 7.57052 18.7506 7.29427 18.7507ZM4.16927 12.5007H7.29427C7.57054 12.5007 7.83549 12.6104 8.03084 12.8057C8.22619 13.0011 8.33594 13.2661 8.33594 13.5423V15.1944L10.7245 12.8059C10.9198 12.6105 11.1847 12.5007 11.4609 12.5007H16.6693V4.16732H4.16927V12.5007Z"
                              fill="#F1F1F1"/>
                        </svg>
                      </button>
                      <div v-if="showComments" class="title">
                        LIVE COMMENTS
                      </div>
                      <button @click="toogleComments" class="toogle-comments" :class="{'ml-auto': showComments}">
                        <svg v-if="showComments" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
                              fill="white"/>
                        </svg>

                        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.4102 7.41L10.8302 12L15.4102 16.59L14.0002 18L8.00016 12L14.0002 6L15.4102 7.41Z"
                                fill="white"/>
                        </svg>

                      </button>
                    </div>
                    <div :class="{'visible':showComments}" class="comments-area">
                      <div v-if="showComments" class="inner-comments">
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
                        <student-new-comment-with-photo @sent="addComment" :isLive="true" :isInVideo="true"/>
                      </div>
                    </div>
                  </div>
                  <div class="video-controls"
                       v-if="participationInfo.isOfferingCourse && (currentPresenter ? currentPresenter._id == this.me.userInfo._id : true)">
                    <div class="video-controls--wrapper"
                         :class="`${showComments?'':'centered'} ${$vuetify.breakpoint.mobile ? 'wide' : ''}`">
                      <button @click="toogleVideo" class="start-mute-video">
                      <span class="icon">
                        <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9992 3.17969L17.3633 8.63395L24.9992 14.0882V3.17969Z" stroke="white"
                              stroke-width="1.61152"
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
                        <svg v-if="audioEnabled" width="16" height="25" viewBox="0 0 16 25" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
<path
    d="M7.91791 1.14258C7.11192 1.14258 6.33893 1.46276 5.76901 2.03268C5.19909 2.60261 4.87891 3.37559 4.87891 4.18158V12.2856C4.87891 13.0916 5.19909 13.8646 5.76901 14.4345C6.33893 15.0044 7.11192 15.3246 7.91791 15.3246C8.72391 15.3246 9.49689 15.0044 10.0668 14.4345C10.6367 13.8646 10.9569 13.0916 10.9569 12.2856V4.18158C10.9569 3.37559 10.6367 2.60261 10.0668 2.03268C9.49689 1.46276 8.72391 1.14258 7.91791 1.14258V1.14258Z"
    stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path
    d="M15.0023 10.2617V12.2877C15.0023 14.1684 14.2553 15.972 12.9254 17.3018C11.5956 18.6316 9.79198 19.3787 7.91133 19.3787C6.03067 19.3787 4.22705 18.6316 2.89722 17.3018C1.5674 15.972 0.820313 14.1684 0.820312 12.2877V10.2617"
    stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.91406 19.376V23.428" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.85938 23.4297H11.9634" stroke="white" stroke-width="1.37952" stroke-linecap="round"
      stroke-linejoin="round"/>
</svg>
<svg v-else width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M11.9179 1.14258C11.1119 1.14258 10.3389 1.46276 9.76901 2.03268C9.19909 2.60261 8.87891 3.37559 8.87891 4.18158V12.2856C8.87891 13.0916 9.19909 13.8646 9.76901 14.4345C10.3389 15.0044 11.1119 15.3246 11.9179 15.3246C12.7239 15.3246 13.4969 15.0044 14.0668 14.4345C14.6367 13.8646 14.9569 13.0916 14.9569 12.2856V4.18158C14.9569 3.37559 14.6367 2.60261 14.0668 2.03268C13.4969 1.46276 12.7239 1.14258 11.9179 1.14258V1.14258Z"
    stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path
    d="M19.0023 10.2617V12.2877C19.0023 14.1684 18.2553 15.972 16.9254 17.3018C15.5956 18.6316 13.792 19.3787 11.9113 19.3787C10.0307 19.3787 8.22705 18.6316 6.89722 17.3018C5.5674 15.972 4.82031 14.1684 4.82031 12.2877V10.2617"
    stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9141 19.376V23.428" stroke="white" stroke-width="1.37952" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.85938 23.4297H15.9634" stroke="white" stroke-width="1.37952" stroke-linecap="round"
      stroke-linejoin="round"/>
<path d="M1.64453 17.8301L21.8692 2.96492" stroke="white" stroke-width="1.37952" stroke-linecap="round"
      stroke-linejoin="round"/>
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
<path
    d="M21.6649 14.721L21.6664 15.6105L25.5553 15.6122V16.8913H0.444737V15.6124H4.33341V15.1676V14.7229C4.10706 14.7229 3.88293 14.6783 3.67381 14.5917C3.46469 14.5051 3.27468 14.3781 3.11463 14.2181C2.95458 14.058 2.82762 13.868 2.741 13.6589C2.65438 13.4498 2.60979 13.2256 2.60979 12.9993V2.1674H2.6098L2.60979 2.16555C2.60885 1.93918 2.65274 1.71486 2.73894 1.50554C2.82513 1.29622 2.95192 1.10604 3.11199 0.945973C3.27206 0.785904 3.46224 0.659115 3.67156 0.572921C3.88088 0.486727 4.10519 0.442834 4.33156 0.443775V0.443779H4.33341H21.6652C22.1223 0.443779 22.5607 0.625374 22.884 0.948615C23.2071 1.27175 23.3887 1.70997 23.3888 2.16693C23.3888 2.16709 23.3888 2.16724 23.3888 2.1674L23.3775 12.9969L23.3775 12.9984C23.3785 13.4538 23.1987 13.891 22.8776 14.214C22.5565 14.537 22.1204 14.7193 21.6649 14.721Z"
    stroke="white" stroke-width="0.889474"/>
<path
    d="M14.8072 6.54275V6.92846L14.4253 6.98301C12.2833 7.28902 10.7774 8.20038 9.72706 9.40081C9.08889 10.1302 8.61162 10.9748 8.26532 11.871C9.82583 10.5095 11.8229 9.88169 14.3625 9.88169H14.8072V10.3264V11.8821L18.2226 8.46665L14.8072 5.05123V6.54275Z"
    stroke="white" stroke-width="0.889474"/>
</svg>


                      </span>
                        <span class="text">Share screen</span>
                      </button>
                      <button class="start-settings" @click="displaySettings = true">
                      <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M12 14.999C13.6569 14.999 15 13.6559 15 11.999C15 10.3422 13.6569 8.99902 12 8.99902C10.3431 8.99902 9 10.3422 9 11.999C9 13.6559 10.3431 14.999 12 14.999Z"
    stroke="white" stroke-width="1.08216" stroke-linecap="round" stroke-linejoin="round"/>
<path
    d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
    stroke="white" stroke-width="1.08216" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </span>
                        <span class="text">settings</span>
                      </button>
                      <button v-if="isStudentPresenting && !$vuetify.breakpoint.mobile" @click="stop_presenting"
                              class="start-settings">
                      <span class="icon">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M10.09 15.59L11.5 17L16.5 12L11.5 7L10.09 8.41L12.67 11H3V13H12.67L10.09 15.59ZM19 3H5C3.89 3 3 3.9 3 5V9H5V5H19V19H5V15H3V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
    fill="white"/>
</svg>

                      </span>
                        <span class="text">stop presenting</span>
                      </button>
                    </div>
                  </div>

                  <div v-else-if="!$vuetify.breakpoint.mobile && !isStudentPresenting && userCategory == 'STUDENT'"
                       class="live-class-details">
                    <div class="live-class-details--wrapper">
                      <div class="description">{{ live_session.chapter.description }}
                      </div>
                      <div class="d-flex">
                        <div v-if="(displayQuiz && quiz)" class="quiz ml-auto ">
                          <button @click="
openQuiz">
                            Take quiz
                          </button>
                        </div>
                        <button v-if="instructor" @click="requestPresenting(!isHandRaised,instructor._id)"
                                class="raise-hand" :class="{'mt-2':!(displayQuiz && quiz)}">
                          <div class="icon d-flex justify-center">
                            <svg width="37" height="46" viewBox="0 0 37 46" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M29.5586 31.7678L30.0518 31.773L30.0637 31.2799L30.2786 22.3733C30.314 20.9045 31.5356 19.7244 33.0047 19.7398C34.4685 19.7551 35.6245 20.9517 35.5892 22.4152L35.3232 33.4392C35.1681 39.8674 29.8081 45.0453 23.3784 44.978L23.3738 45.4221L23.3784 44.978L12.428 44.8635C6.00355 44.7964 0.904173 39.5176 1.05913 33.0946L1.62 9.84719C1.65544 8.37842 2.87707 7.19831 4.34619 7.21367C5.80997 7.22897 6.96593 8.4256 6.93062 9.88904L6.62229 22.6691L6.61006 23.1759L7.11691 23.1812L8.0449 23.1909L8.53808 23.196L8.54998 22.703L8.9396 6.55641L8.9396 6.55639C8.97498 5.08771 10.1967 3.90753 11.6658 3.92288C13.1296 3.93819 14.2855 5.13482 14.2502 6.59825L14.717 6.60951L14.2502 6.59825L13.8607 22.7448L13.8485 23.2515L14.3554 23.2568L15.2833 23.2665L15.7765 23.2717L15.7884 22.7786L16.2522 3.55717C16.2876 2.08839 17.5092 0.908284 18.9784 0.923641C20.4421 0.938943 21.5981 2.13558 21.5628 3.59901L21.099 22.8206L21.0868 23.3273L21.5937 23.3326L22.5217 23.3423L23.0148 23.3475L23.0267 22.8544L23.4163 6.70781C23.4517 5.23903 24.6734 4.05892 26.1425 4.07428C27.6063 4.08958 28.7622 5.28621 28.7269 6.74965L28.136 31.2461L28.1238 31.7528L28.6306 31.7581L29.5586 31.7678Z"
                                  stroke="white"/>
                            </svg>

                          </div>
                          <div class="text">{{ isHandRaised ? 'lower' : 'raise' }} hand</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="video-controls" v-else-if="userCategory == 'STUDENT'">
                    <div class="video-controls--wrapper viewer wide centered">
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
            </div>
          </div>
        </div>
        <div v-if="participationInfo.isOfferingCourse && !isStudentPresenting && $vuetify.breakpoint.mobile"
             class="live-comments"
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
        <div v-else-if="$vuetify.breakpoint.mobile" class="live-class-details non-absolute">
          <div class="live-class-details--wrapper white">
            <h2 class="hidden-md-and-up">{{ live_session.course.name }}: Chapter </h2>
            <div class="description">{{ live_session.chapter.description }}
            </div>
            <div class="d-flex">
              <div v-if="displayQuiz && quiz" class="quiz d-flex align-center">
                <button class="mt-0" @click="
openQuiz">
                  Take quiz
                </button>
              </div>
              <button v-if="instructor" @click="requestPresenting(!isHandRaised,instructor._id)" class="raise-hand">
                <div class="icon d-flex justify-center">
                  <svg width="37" height="46" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M29.5586 31.7678L30.0518 31.773L30.0637 31.2799L30.2786 22.3733C30.314 20.9045 31.5356 19.7244 33.0047 19.7398C34.4685 19.7551 35.6245 20.9517 35.5892 22.4152L35.3232 33.4392C35.1681 39.8674 29.8081 45.0453 23.3784 44.978L23.3738 45.4221L23.3784 44.978L12.428 44.8635C6.00355 44.7964 0.904173 39.5176 1.05913 33.0946L1.62 9.84719C1.65544 8.37842 2.87707 7.19831 4.34619 7.21367C5.80997 7.22897 6.96593 8.4256 6.93062 9.88904L6.62229 22.6691L6.61006 23.1759L7.11691 23.1812L8.0449 23.1909L8.53808 23.196L8.54998 22.703L8.9396 6.55641L8.9396 6.55639C8.97498 5.08771 10.1967 3.90753 11.6658 3.92288C13.1296 3.93819 14.2855 5.13482 14.2502 6.59825L14.717 6.60951L14.2502 6.59825L13.8607 22.7448L13.8485 23.2515L14.3554 23.2568L15.2833 23.2665L15.7765 23.2717L15.7884 22.7786L16.2522 3.55717C16.2876 2.08839 17.5092 0.908284 18.9784 0.923641C20.4421 0.938943 21.5981 2.13558 21.5628 3.59901L21.099 22.8206L21.0868 23.3273L21.5937 23.3326L22.5217 23.3423L23.0148 23.3475L23.0267 22.8544L23.4163 6.70781C23.4517 5.23903 24.6734 4.05892 26.1425 4.07428C27.6063 4.08958 28.7622 5.28621 28.7269 6.74965L28.136 31.2461L28.1238 31.7528L28.6306 31.7581L29.5586 31.7678Z"
                        stroke="#BABABC"/>
                  </svg>

                </div>
                <div class="text">{{ isHandRaised ? 'lower' : 'raise' }} hand</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="participationInfo.isOfferingCourse && !isStudentPresenting" class="live-class--attendance"
           :class="{'mt-0': userCategory == 'STUDENT' && $vuetify.breakpoint.mobile}">
        <div class="live-class--attendance--wrapper">
          <h3>ONLINE USERS : {{ participants.length }} </h3>
          <div class="online-users">
            <online-user v-for="user in participants.filter(x=>x.userInfo.category != 'INSTRUCTOR')"
                         :user="user.userInfo"
                         :key="`${(Date.now() * Math.random())}${user.name}`" @accept_presenter="accept_presenter"
                         @deny_presenter="deny_presenter"/>
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
                        method: { action: 'live_session/change_confirmation',parameters: { value: 'end_class'} },
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
      <div v-if="(!participationInfo.isOfferingCourse || isStudentPresenting) && $vuetify.breakpoint.mobile"
           class="live-class--attendance" :class="{'mt-0': userCategory == 'STUDENT' && $vuetify.breakpoint.mobile}">
        <div class="live-class--attendance--wrapper long mb-13">
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
        <div v-if="participationInfo.isOfferingCourse && !isStudentPresenting" class="live-class--actions">
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
    <media-sources-selection :videoEl="me? me.getVideoElement() : undefined" :stream="me ? me.rtcPeer.getLocalStream():undefined"
                             :peerConnection="me ?me.rtcPeer.peerConnection:undefined" :show="displaySettings"
                             @closeSettings="displaySettings = false"/>
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
import MediaSourcesSelection from "@/components/Live/MediaSourcesSelection";

const sound = require("../../../assets/audio/com.mp3");

export default {
  name: "liveClass",
  components: {
    Discussion,
    StudentNewCommentWithPhoto,
    OnlineUser,
    MediaSourcesSelection,
    back: () => import("@/components/shared/back-button"),
  },
  data() {
    return {
      displaySettings: false,
      ws: null,
      isHandRaised: false,
      newCommentAvailable: false,
      participants: [],
      presenter_id: undefined,
      currentPresenter: undefined,
      comments: [],
      me: null,
      interval: null,
      id: "",
      displayQuiz: false,
      elapsed_time: "",
      quiz: null,
      comment: "",
      noVideo: false,
      showComments: false,
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
            if (!this.participationInfo.isOfferingCourse) {
              let div = document.querySelector('.main-content')
              div.style.background = 'radial-gradient(87.57% 87.57% at 59.46% 43.68%, #193074 0%, rgba(0, 0, 0, 0.92) 100%)';
              if (span)
                span.className = "stud_span";
            }

          }
        }
      }
      this.loaded = true
    })
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("live_session", ["live_session_confirmation"]),

    ...mapState("sidebar_navbar", {sidebarOpen: "sidebar_expanded"}),
    instructorParticipant() {
      const el = this.participants.filter(e => e.userInfo.category == "INSTRUCTOR" && e.userInfo._id == this.live_session.course.user)
      return el[0]
    },
    instructor() {
      return this.instructorParticipant ? this.instructorParticipant.userInfo : undefined
    },
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    isStudentPresenting() {
      return this.participationInfo.isOfferingCourse && this.userCategory == 'STUDENT'
    }
  },
  methods: {
    handleRoomClosed(){
      if (!this.participationInfo.isOfferingCourse)
        this.set_modal({
          template: 'live_related_ended',
          title: 'Live class ended',
          message: 'Hey user, the class you were attending has ended.',
        })
      else {
        this.finishSession();
        this.onCloseRoom();
      }
    },
    goodbye(e) {
      if (!e) e = window.event;
      //e.cancelBubble is supported by IE - this will kill the bubbling process.
      e.cancelBubble = true;
      e.returnValue = 'You sure you want to leave?'; //This is displayed on the dialog

      //e.stopPropagation works in Firefox.
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        this.sendMessage({
          id: 'leaveRoom'
        });
        this.ws.close();
      }
    },
    create_videoElement(id) {
      let element = document.querySelector(`#video_feed${id}`)
      if (!element) {
        element = document.createElement('video')
        element.setAttribute('id', `video_feed${id}`)
        document.querySelector('.video-container').appendChild(element)
      }
      return element
    },
    stop_presenter() {
      let id = this.currentPresenter._id;
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'cancel_presenting'
      });
      this.currentPresenter = undefined
      this.onViewerStopedPresenting()
    },
    async hideVideos() {
      const video = document.getElementById("video_feed");
      if (video.className != '' && this.instructor)
        video.className = ''

      let displayedVideos = document.querySelectorAll('video.show')
      for (const i in displayedVideos) {
        if (displayedVideos[i].id ? !displayedVideos[i].id.includes('_screen') : false)
          displayedVideos[i].className = '';
      }
    },
    async displaySrcVideo() {
      if (this.me) {

        await this.hideVideos();

        if ((this.currentPresenter ? this.currentPresenter._id == this.me.userInfo._id : this.me.userInfo._id == this.live_session.course.user) || this.isStudentPresenting) {
          console.log('\n\n\ninner\n\n\n')
          let video = this.me.getVideoElement()
          video.muted = true
          video.setAttribute('class', 'show')
        } else {
          console.log('twageze aha')
          for (let i in this.participants) {
            console.log(`\n\nparticipantId: ${this.participants[i].userInfo._id}\ncurrentPresenter: ${this.currentPresenter ? this.currentPresenter._id : this.instructor._id}\n`)
            if (this.participants[i].userInfo._id == (this.currentPresenter ? this.currentPresenter._id : this.instructor._id)) {
              console.log('twageze mo imbere')
              console.log(`\n\nparticipantId: ${this.participants[i].userInfo._id}\ncurrentPresenter: ${this.currentPresenter ? this.currentPresenter._id : this.instructor._id}\n`)
              const video = this.participants[i].getVideoElement();
              video.muted = false
              video.setAttribute('class', 'show')
              break;
            }
          }
        }
      }
    },
    stopped_presenting(forced) {
      if (forced) {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: 'Sorry your the instructor canceled your presentation',
          status: "info",
          uptime: 5000,
        })
        if (this.isPresenting) {
          this.shareScreen();
        }
      }
      this.isPresenting = false;
      this.participationInfo.isOfferingCourse = false
      this.me.rtcPeer.enabled = false
      this.displaySrcVideo()
    },
    presenterChanged(id) {
      console.log(`\n\n\nYahindutse wlh ${id}\n\n\n`)
      document.querySelector('video.show').className = ''
      if (this.me.userInfo._id == this.live_session.course.user) {
        this.me.rtcPeer.enabled = false
        if (this.isPresenting) {
          this.shareScreen();
        }
      }

      for (let i in this.participants) {
        if (this.participants[i].userInfo._id == id) {
          let vid = document.querySelector(`video#video_feed${id}`)
          vid.setAttribute('class', 'show')
          setTimeout(() => {
            vid.play()
          }, 500)
          this.currentPresenter = this.participants[i].userInfo;
          break;
        }
      }
    },
    onHandRaisedOrLowerd(sender, raisedHand) {
      for (const i in this.participants) {
        if (this.participants[i].userInfo._id == sender) {
          this.participants[i].userInfo.raisedHand = raisedHand
          break;
        }
      }
    },
    handlePresentationResponse(sender, allowed) {
      this.isHandRaised = false;
      if (allowed) {
        if (!this.isStudentPresenting)
          this.set_modal({
            template: 'presentation_request',
            method: {action: 'live_session/change_confirmation', parameters: {value: 'accept_presenting'}},
          })
      } else
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: 'Sorry your request to present was denied',
          status: "danger",
          uptime: 2000,
        })
    },
    accept_presenter(id) {
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'accept_presenting'
      });
      this.onHandRaisedOrLowerd(id, false)
      // let me = this.me
      // me.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly({},
      //     function (error) {
      //       if (error) {
      //         return console.error(error);
      //       }
      //       this.generateOffer(me.offerToReceiveVideo.bind(me));
      //
      //     });
    },
    requestPresenting(raiseHand, id) {
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: raiseHand ? 'request_presenting' : 'revert_presenting_request'
      });
      this.onHandRaisedOrLowerd(id, false)
    },
    deny_presenter(id) {
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'deny_presenting'
      });
      this.onHandRaisedOrLowerd(id, false)
    },
    onViewerStopedPresenting() {
      this.start_presenting()
    },
    start_presenting() {
      this.participationInfo.isOfferingCourse = true;
      this.isPresenting = false
      // live/presenterChanged
      const session_id = this.live_session._id;
      const receivers = []
      this.participants.map(x => {
        if (x.name != this.me.name) {
          receivers.push({id: x.userInfo._id})
        } else {
          this.me.rtcPeer.enabled = true

          if (!this.audioEnabled)
            this.me.rtcPeer.audioEnabled = false

          if (!this.videoEnabled)
            this.me.rtcPeer.videoEnabled = false

          this.displaySrcVideo()
          // this.me.getVideoElement().play()
        }
      })
      console.log(receivers, session_id)
      this.socket.emit("live/presenterChanged", {
        receivers,
        session_id
      });
      this.currentPresenter = this.me.userInfo
    },
    stop_presenting() {
      let id = this.instructor._id;
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'finished_presenting'
      });
    },
    toogleComments() {
      this.showComments = !this.showComments;
    },
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
      let route = this.$router.resolve(`/assessments/quiz/preview/${this.quiz.name}`);
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

      const host = 'stream.kurious.rw'
      // const host = 'localhost:8081'

      this.ws = new WebSocket('wss://' + host + '/kurious_stream' + `?token=${this.$session.get("jwt")}`);
      // this.ws = new WebSocket('ws://' + host + '/kurious_stream' + `?token=${this.$session.get("jwt")}`);

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


      // window.onbeforeunload = () => {
      //   this.sendMessage({
      //     id: 'leaveRoom'
      //   });
      //   this.ws.close();
      //   // this.handleMediaTracks();
      // };

      window.addEventListener('beforeunload', this.goodbye)

      this.ws.onmessage = (message) => {
        let parsedMessage = JSON.parse(message.data);
        console.info('Received message: ', message);

        switch (parsedMessage.id) {
          case 'userId':
            self.id = parsedMessage.data;
            self.participationInfo.name = self.id;
            break;
          case 'roomClosed':
            self.handleRoomClosed();
            break;
          case 'screenAllowed':
            this.onExistingParticipants({data: []});
            break;
          case 'initialScreenOff':
            this.noVideo = true;
            break;
          case 'existingParticipants': {
            this.onExistingParticipants(parsedMessage);
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
            if (!this.isStudentPresenting) {
              this.isPresenting = parsedMessage.screenStatus;
            }
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
      self.socket.on("live/classEnded", () => {
        self.handleRoomClosed()
      })
      self.socket.on("res/live/presentation_request/sent", ({message}) => {
        if (['request_presenting', 'revert_presenting_request'].includes(message)) {
          this.isHandRaised = !this.isHandRaised;
        } else if (message == 'finished_presenting') {
          self.stopped_presenting()
        }
      })
      self.socket.on("res/live/presentation_request", ({message, sender}) => {
        // [request_presenting, revert_presenting_request, accept_presenting, deny_presenting
        if (message === 'request_presenting')
          this.onHandRaisedOrLowerd(sender, true)
        else if (message === 'revert_presenting_request')
          this.onHandRaisedOrLowerd(sender, false)
        else if (message === 'accept_presenting')
          this.handlePresentationResponse(sender, true)
        else if (message === 'deny_presenting')
          this.handlePresentationResponse(sender, false)
        else if (message === 'cancel_presenting')
          this.stopped_presenting(true)
        else if (message === 'currentPresenter')
          this.presenter_id = sender
        else
          this.onViewerStopedPresenting()
        console.log(message)
      })
      self.socket.on("live/presenterChanged", ({id, session_id}) => {
        console.log('\n\n', {id, session_id}, '\n\n')
        if (session_id == self.live_session._id) {
          self.presenterChanged(id)
        }
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
        if (!self.showComments) {
          self.newCommentAvailable = true
        }
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
    },
    shareScreen() {
      console.log('called !!!!!!!')
      // if (!this.isPresenting) {
      //   setTimeout(() => {
      //     document.getElementById("video_screen_feed").srcObject.getVideoTracks()[0].addEventListener('ended', () =>
      //         this.shareScreen())
      //   }, 5000)
      // }
      // console.clear()
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
      console.log(message)
      let jsonMessage = JSON.stringify(message);
      this.ws.send(jsonMessage);
    },

    onNewParticipant(request) {
      if (request.name != this.participationInfo.name + '_screen') {
        console.log(request.name)
        this.receiveVideo(request.name);
      }
    },
    participantIndex(name) {
      const result = this.participants.filter(e => e.name == name)
      return this.participants.indexOf(result[0]);
    },
    removeParticipant(index) {
      if (!this.participants[index].name.includes('_screen') && (this.currentPresenter ? (this.currentPresenter._id == this.participants[index].userInfo._id) : this.instructor._id == this.participants[index].userInfo._id)) {
        this.currentPresenter = undefined
        if (this.live_session.course.user == this.me.userInfo._id) {
          this.onViewerStopedPresenting()
        } else {
          document.querySelector('video').setAttribute('class', 'show')
        }
      }
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

      // if (!this.participationInfo.isOfferingCourse) {
      //   constraints = null
      // }
      let userInfo = await this.getUserInfo(this.participationInfo.name.split('_')[0])
      let participant = new Participant(self.isPresenting ? `${this.participationInfo.name}_screen` : this.participationInfo.name, this, true, userInfo, this.create_videoElement(userInfo._id));

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
      } else {
        console.log("isPresenting mf: " + self.isPresenting)
      }

      participant.rtcPeer = new WebRtcPeer.WebRtcPeerSendonly(options,
          function (error) {
            if (error) {
              console.error(error);
            }
            if (self.me === null)
              self.me = participant;

            video.muted = true

            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            if (self.presenter_id) {
              // console.clear()
              console.log('tumusanzemo wlh')
              self.presenterChanged(self.presenter_id)
              self.presenter_id = undefined
            } else {
              if (!self.participationInfo.isOfferingCourse) {
                if (self.instructorParticipant) {
                  participant.rtcPeer.enabled = false
                  self.displaySrcVideo();
                }
              } else {
                self.displaySrcVideo();
              }
            }
            if (self.isPresenting) {
              document.getElementById("video_screen_feed").srcObject.getVideoTracks()[0].addEventListener('ended', () =>
                  self.shareScreen())
            }
          })

      // participant.rtcPeer = this.participationInfo.isOfferingCourse ? new WebRtcPeer.WebRtcPeerSendonly(options,
      //     function (error) {
      //       if (error) {
      //         return console.error(error);
      //       }
      //       if (self.me === null)
      //         self.me = participant;
      //       this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      //
      //     }) : new WebRtcPeer.WebRtcPeerRecvonly(options,
      //     function (error) {
      //       if (error) {
      //         return console.error(error);
      //       }
      //       if (self.me === null)
      //         self.me = participant;
      //       this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      //
      //     });

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
      let participant;
      if (sender == this.participationInfo.name)
        participant = this.participants[this.participantIndex(sender)]
      else {
        let userInfo = await this.getUserInfo(sender.split('_')[0]);
        participant = new Participant(sender, this, false, userInfo, this.create_videoElement(userInfo._id));
        console.log(participant)
      }
      // if (participant.userInfo.category == "INSTRUCTOR") {
      let video = participant.getVideoElement();
      let options = {
        remoteVideo: video,
        onicecandidate: participant.onIceCandidate.bind(participant)
      }
      // let self = this
      participant.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
          })
      // }
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

          if (this.isStudentPresenting)
            this.socket.emit("live/presentation_request", {
              receiver: {id: participant.userInfo._id},
              message: 'currentPresenter'
            });

          // notify new user if quiz was released
          if (this.displayQuiz)
            this.socket.emit("live/releaseQuiz", {
              quiz: this.live_session.quiz,
              receivers: [{id: participant.userInfo._id}]
            });
        } else if (participant.userInfo.category == 'INSTRUCTOR' && !this.isStudentPresenting) {
          this.me.rtcPeer.enabled = false
          this.displaySrcVideo()
        }
      }
    },

    onParticipantLeft(request) {
      this.displaySrcVideo();
      console.log(this.participants, this.participantIndex(request.name))
      this.participants[this.participantIndex(request.name)].dispose();
      console.log(this.participants)
      this.removeParticipant(this.participantIndex(request.name))
      console.log(this.participants)
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
    if (this.ws) {
      this.sendMessage({
        id: 'leaveRoom'
      });
      this.ws.close();
    }
    this.handleMediaTracks();
    clearInterval(this.interval)
    next();
  }
  ,
  watch: {
    presenter_id() {
      if (this.presenter_id != undefined && this.me) {
        console.log('tumusanzemo wlh')
        this.presenterChanged(this.presenter_id)
        this.presenter_id = undefined
      }
    },
    videoEnabled() {
      this.noVideo = !this.videoEnabled
    },
    showComments() {
      if (this.showComments && this.newCommentAvailable) {
        this.newCommentAvailable = false
      }
    },
    live_session_confirmation() {
      if (this.live_session_confirmation == 'end_class')
        this.leaveRoom()
      else {
        if (this.live_session_confirmation == 'accept_presenting') {
          this.start_presenting()
        }
        if (this.live_session_confirmation !== '') {
          this.$store
              .dispatch(
                  'live_session/change_confirmation', {value: ''}
              )
        }
      }
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
