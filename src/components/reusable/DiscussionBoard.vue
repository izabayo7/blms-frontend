<template>
  <v-container>
    <v-row>
      <!-- <v-col class="col-12 title mt-md-3 ml-n8 d-block">Discussion Board</v-col> -->
      <v-col class="col-12 pa-0">
        <v-card class="ml-sm-1 discussion_card pa-4" tile max-width="100%">
          <v-list>
            <v-list-item three-line class="px-0">
              <v-list-item-avatar>
                <img v-if="host.profile" :src="host.profile" />
                <v-avatar v-else size="37" class="avatar">
                  {{ host.name | computeText }}
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                  v-text="host.name"
                />
                <v-list-item-subtitle class="font-weight-bold time mt-2"
                  >08:00 pm</v-list-item-subtitle
                >
                <v-list-item-subtitle class="font-weight-bold mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21.839"
                    height="26.798"
                    viewBox="0 0 21.839 26.798"
                    class="mr-4"
                  >
                    <g
                      id="Icon_feather-file-text"
                      data-name="Icon feather-file-text"
                      transform="translate(-5 -2)"
                    >
                      <path
                        id="Path_1715"
                        data-name="Path 1715"
                        d="M18.4,3H8.48A2.48,2.48,0,0,0,6,5.48V25.319A2.48,2.48,0,0,0,8.48,27.8H23.359a2.48,2.48,0,0,0,2.48-2.48V10.44Z"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_1716"
                        data-name="Path 1716"
                        d="M21,3v7.44h7.44"
                        transform="translate(-2.601)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_1717"
                        data-name="Path 1717"
                        d="M21.919,19.5H12"
                        transform="translate(-1.04 -2.861)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_1718"
                        data-name="Path 1718"
                        d="M21.919,25.5H12"
                        transform="translate(-1.04 -3.901)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_1719"
                        data-name="Path 1719"
                        d="M14.48,13.5H12"
                        transform="translate(-1.04 -1.821)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </g>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    class="mr-2"
                  >
                    <circle
                      id="Ellipse_96"
                      data-name="Ellipse 96"
                      cx="14"
                      cy="14"
                      r="14"
                      fill="#ffd248"
                    />
                    <g id="download-line" transform="translate(8 8)">
                      <path
                        id="Path_1720"
                        data-name="Path 1720"
                        d="M0,0H12.673V12.673H0Z"
                        fill="none"
                      />
                      <path
                        id="Path_1721"
                        data-name="Path 1721"
                        d="M3,10.977h9.5v1.056H3ZM8.28,7.9l3.206-3.206.747.747L7.752,9.921,3.272,5.44l.747-.747L7.224,7.9V2H8.28Z"
                        transform="translate(-1.416 -0.944)"
                        fill="#fff"
                      />
                    </g>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                  >
                    <circle
                      id="Ellipse_97"
                      data-name="Ellipse 97"
                      cx="14"
                      cy="14"
                      r="14"
                      fill="#ffd248"
                    />
                    <path
                      id="Icon_feather-bookmark"
                      data-name="Icon feather-bookmark"
                      d="M15.928,15.336l-4.214-3.01L7.5,15.336V5.7A1.2,1.2,0,0,1,8.7,4.5h6.02a1.2,1.2,0,0,1,1.2,1.2Z"
                      transform="translate(2.2 4)"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                  </svg>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  small
                  rounded
                  class="elevation-0 mt-n1 ml-n12"
                  height="27px"
                  width="100px"
                  color="rgb(60, 233, 112, .38)"
                  >instructor</v-btn
                >
              </v-list-item-action>
            </v-list-item>
            <v-divider />
            <v-list-item-group id="userMessages" color="primary">
              <v-list-item v-for="(item, i) in messages" :key="i" three-line>
                <v-list-item-avatar>
                  <img
                    v-if="item.profile"
                    :src="item.profile"
                  />
                  <v-avatar v-else size="37" class="avatar">
                    {{ item.userNames | computeText }}
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.userNames" />
                  <v-list-item-subtitle
                    class="font-weight-bold time mt-2"
                    v-text="item.time"
                  />
                  <v-list-item-subtitle
                    class="font-weight-bold mt-2"
                    color="#0000"
                  >
                    {{ item.content }}
                    <v-btn text class="d-block">
                      <v-icon color="#FFC100">mdi-chevron-down</v-icon> view
                      reply
                    </v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-text-field
          placeholder="Type something..."
          class="text-field"
          append-icon="mdi-send-circle"
          solo
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    host: {
      tpe: Object,
      required: true,
    },
  },
  data: () => ({
    instructor: {
      name: "Alice Rose",
      profile: "instructor.png",
    },
    messages: [
      {
        userProfile: "student1.png",
        userNames: "Joshua Kingsley",
        content: "Thank you sir, we can hear you.",
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
      // { userProfile: 'student3.png', userNames: 'James Bond', content: 'When are we submitting the quiz?', time: '08:19 pm' },
      // { userProfile: 'student4.png', userNames: 'Uwicyeza Gift', content: 'This lesson is amazing', time: '08:29 pm' },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.discussion_card {
  border-radius: 27px;
}
.live {
  color: #979797;
}
  .avatar {
    margin-top: 0px;
    background-color: $primary;
    color: white;
    cursor: pointer;
  }
</style>