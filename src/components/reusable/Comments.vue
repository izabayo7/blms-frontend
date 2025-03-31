<template>
  <v-container id="comments">
    <v-row>
      <v-col class="col-2 col-md-1">
        <v-avatar size="42" color="#828282" class="user-profile mt-1">
          <!-- <img
                  v-if="$store.state.user.profile"
                      :src="`http://192.168.1.125:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
                      alt="avatar"
          >-->
          <v-img
            v-if="$store.state.user.profile"
            :src="`http://localhost:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
            alt="avatar"
          />
          <span
            v-else
            class="black--text"
          >{{ computText(`${$store.state.user.surName} ${$store.state.user.otherNames}`) }}</span>
        </v-avatar>
      </v-col>
      <v-col class="col-10 col-md-8">
        <v-textarea
          v-model="newcomment"
          rows="1"
          auto-grow
          type="text"
          class="mt-1"
          placeholder="write comment"
          solo
        >
          <template v-if="newcomment !== ''" v-slot:append-outer>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon :color="'info'" @click="sendComment()" v-text="'mdi-send'" />
            </v-slide-x-reverse-transition>
          </template>
        </v-textarea>
      </v-col>
      <v-col class="col-12 pa-0">
        <!-- <v-card class="ml-md-n4 ml-sm-1" width="100%" tile shaped> -->
        <v-list shaped flat>
          <v-list-item-group id="userMessages">
            <v-list-item
              v-for="(item, i) in messages"
              :key="i"
              three-line
            >
              <v-list-item-avatar>
                <img src="" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  class="comment--title font-weight-bold"
                >{{ item.userNames }} {{ item.time}}</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold mt-2 comment--content"
                  color="#0000"
                  v-text="item.content"
                />
                <v-list-item-subtitle class="font-weight-bold mt-2">
                  <v-row>
                    <v-col class="col-12">
                      <v-btn text @click="showReplyBox(i)">Reply</v-btn>
                      <v-btn text>
                        <v-icon color="#FFC100">mdi-chevron-down</v-icon>view reply
                      </v-btn>
                    </v-col>
                    <v-col class="reply--box d-none">
                      <v-row>
                        <v-col class="col-2 col-md-1">
                          <v-avatar size="42" color="#828282" class="user-profile ml-12 mt-1">
                            <!-- <img
                                v-if="$store.state.user.profile"
                                    :src="`http://192.168.1.125:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
                                    alt="avatar"
                            >-->
                            <v-img
                              v-if="$store.state.user.profile"
                              :src="`http://localhost:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
                              alt="avatar"
                            />
                            <span
                              v-else
                              class="black--text"
                            >{{ computText(`${$store.state.user.surName} ${$store.state.user.otherNames}`) }}</span>
                          </v-avatar>
                        </v-col>
                        <v-col class="col-10 col-md-8">
                          <v-textarea
                            v-model="newcomment"
                            rows="1"
                            auto-grow
                            type="text"
                            class="mt-1 ml-12"
                            placeholder="write comment"
                            solo
                          >
                            <template v-if="newcomment !== ''" v-slot:append-outer>
                              <v-slide-x-reverse-transition mode="out-in">
                                <v-icon :color="'info'" @click="sendComment()" v-text="'mdi-send'" />
                              </v-slide-x-reverse-transition>
                            </template>
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    newcomment: "",
    item: 1,
    instructor: {
      name: "Alice Rose",
      profile: "instructor.png",
    },
    messages: [
      {
        userProfile: "student1.png",
        userNames: "Joshua Kingsley",
        content:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea.",
        time: "08:15 pm",
      },
      {
        userProfile: "student2.png",
        userNames: "You",
        content:
          "Can you explain for us about that second point you said earlier.",
        time: "08:19 pm",
      },
      {
        userProfile: "student3.png",
        userNames: "James Bond",
        content: "When are we submitting the quiz?",
        time: "08:19 pm",
      },
      {
        userProfile: "student4.png",
        userNames: "Uwicyeza Gift",
        content: "This lesson is amazing",
        time: "08:29 pm",
      },
      {
        userProfile: "student3.png",
        userNames: "James Bond",
        content: "When are we submitting the quiz?",
        time: "08:19 pm",
      },
      {
        userProfile: "student4.png",
        userNames: "Uwicyeza Gift",
        content: "This lesson is amazing",
        time: "08:29 pm",
      },
    ],
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),
  computed: {
    userType() {
      return this.$store.state.user.category;
    },
  },
  methods: {
    computText(name) {
      let text = "";
      const forbiden = ["and", "of"];
      name.split(" ").forEach((val) => {
        if (!forbiden.includes(val)) text += val.substring(0, 1).toUpperCase();
      });

      return text;
    },
    sendComment() {
      alert("eleeeeeeh");
    },
    showReplyBox(index){
      const replyboxes = document.querySelectorAll('.reply--box')
      replyboxes[index].className = replyboxes[index].className.includes('d-none') ? replyboxes[index].className.replace('d-none', '') : replyboxes[index].className + ' d-none'
    },
  },
};
</script>

<style lang="scss">
#comments {
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 40px;
    padding: 0;
    border-top: 1px solid #e5e5e5;
  }
  ::-webkit-input-placeholder {
    /* Edge */
    color: #828282;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #828282;
  }

  ::placeholder {
    color: #828282;
  }
  .comment--title {
    color: #4a4a4a !important;
  }
  .comment--content {
    max-width: 100% !important;
    // max-width: 440px !important;
  }
  button.hidden-md-and-up.mr-n8.white--text.v-btn.v-btn--bottom.v-btn--contained.v-btn--fixed.v-btn--right.v-btn--rounded.theme--light.v-size--default {
    z-index: 999;
  }
}
</style>