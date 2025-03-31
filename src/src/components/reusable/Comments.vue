<template>
  <v-container>
    <v-row>
        <v-col class="col-12 pa-0">
            <v-card
                class="ml-md-n4 ml-sm-1"
                width="100%"
                tile
                shaped
            >
                <v-list shaped flat>
                <v-list-item-group id="userMessages">
                    <v-list-item
                      v-for="(item, i) in messages"
                      :key="i"
                      three-line
                      @mousedown="undefined"
                      @mouseup="undefined"
                      @click="u"
                    >
                      <v-list-item-avatar>
                        <img :src="`http://127.0.0.1:5500/src/assets/images/${item.userProfile}`">
                      </v-list-item-avatar>
                      <v-list-item-content>
                          <v-list-item-title> {{ item.userNames }} {{ item.time}}</v-list-item-title>
                          <v-list-item-subtitle class="font-weight-bold mt-2" color="#0000" v-text="item.content" />
                          <v-list-item-subtitle class="font-weight-bold mt-2"> <v-btn text> Reply </v-btn> <v-btn text> <v-icon color="#FFC100">mdi-chevron-down</v-icon> view reply </v-btn> </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                </v-list>
            </v-card>
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
        { userProfile: 'student3.png', userNames: 'James Bond', content: 'When are we submitting the quiz?', time: '08:19 pm' },
        { userProfile: 'student4.png', userNames: 'Uwicyeza Gift', content: 'This lesson is amazing', time: '08:29 pm' },
      ],
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }),
}
</script>