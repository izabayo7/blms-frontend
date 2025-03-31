<template>
  <v-container>
    <v-row>
        <!-- <v-col class="col-12 title mt-md-3 ml-n8 d-block">Discussion Board</v-col> -->
        <v-col class="col-12 pa-0">
            <v-card
                class="ml-md-n4 ml-sm-1"
                max-width="396"
                tile
                shaped
            >
                <v-list>
                <v-list-item three-line :class="miniVariant && 'px-0'">
                  <v-list-item-avatar>
                    <img :src="`http://127.0.0.1:5500/Kurious-Frontend/src/assets/images/${instructor.profile}`">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold" v-text="instructor.name" />
                    <v-list-item-subtitle class="font-weight-bold mt-2">08:00 pm</v-list-item-subtitle>
                    <v-list-item-subtitle class="font-weight-bold mt-4">
                    <v-icon size="34" class="mr-3 ml-n1">mdi-file-document-outline</v-icon>
                    <v-btn fab x-small color="#FFC100" class="white--text elevation-0 mr-2"><v-icon>mdi-download-outline</v-icon></v-btn>
                    <v-btn fab x-small color="#FFC100" class="white--text elevation-0"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                      <v-btn small rounded class="elevation-0 mt-n4 ml-n12" height="27px" width="100px" color="rgb(60, 233, 112, .38)">instructor</v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
                <v-list-item-group id="userMessages" v-model="item" color="primary">
                    <v-list-item
                      v-for="(item, i) in messages"
                      :key="i"
                      three-line
                    >
                      <v-list-item-avatar>
                        <img :src="`http://127.0.0.1:5500/Kurious-Frontend/src/assets/images/${item.userProfile}`">
                      </v-list-item-avatar>
                      <v-list-item-content>
                          <v-list-item-title v-text="item.userNames" />
                          <v-list-item-subtitle class="font-weight-bold mt-2" v-text="item.time" />
                          <v-list-item-subtitle class="font-weight-bold mt-2" color="#0000">
                            {{ item.content }}
                            <v-btn text class="d-block"> <v-icon color="#FFC100">mdi-chevron-down</v-icon> view reply </v-btn>
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
            class="text-field ml-md-n6"
            append-icon="mdi-send-circle"
            solo
          />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
      item: 1,
      instructor: {
        name: 'Alice Rose',
        profile: 'instructor.png'
      },
      messages: [
        { userProfile: 'student1.png', userNames: 'Joshua Kingsley', content: 'Thank you sir, we can hear you.', time: '08:15 pm' },
        { userProfile: 'student2.png', userNames: 'You', content: 'Can you explain for us about that second point you said earlier.', time: '08:19 pm' },
        { userProfile: 'student3.png', userNames: 'James Bond', content: 'When are we submitting the quiz?', time: '08:19 pm' },
        { userProfile: 'student4.png', userNames: 'Uwicyeza Gift', content: 'This lesson is amazing', time: '08:29 pm' },
        // { userProfile: 'student3.png', userNames: 'James Bond', content: 'When are we submitting the quiz?', time: '08:19 pm' },
        // { userProfile: 'student4.png', userNames: 'Uwicyeza Gift', content: 'This lesson is amazing', time: '08:29 pm' },
      ],
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }),
}
</script>