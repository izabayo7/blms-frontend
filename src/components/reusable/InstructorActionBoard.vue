<template>
  <v-container>
    <v-row>
        <!-- <v-col class="col-12 title mt-md-3 ml-n8 d-block">Discussion Board</v-col> -->
        <v-col class="col-12 pa-0">
            <v-card
                class="ml-md-n4 ml-sm-1"
                max-width="300"
                tile
                shaped
            >
                <v-list shaped>
                <v-list-item-group id="studentAttendance" v-model="item" color="primary">
                    <v-list-item
                      v-for="(student, i) in students"
                      :key="i"
                      two-line
                    >
                      <v-list-item-avatar>
                        <img :src="`http://127.0.0.1:5500/Kurious-Frontend/src/assets/images/${student.userProfile}`">
                      </v-list-item-avatar>
                      <v-list-item-content>
                          <v-list-item-title v-text="student.userNames" />
                          <v-list-item-subtitle class="font-weight-bold mt-2" color="#0000" v-text="student.attendance" />
                      </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                </v-list>
            </v-card>
        </v-col>
        <v-col>
          <v-btn color="#FFC100" class="white--text instructor-action mb-1 py-5 ml-n3" rounded> <v-icon class="pr-2">mdi-check</v-icon> Check attendance</v-btn>
          <v-btn color="#FFC100" class="white--text instructor-action mb-1 py-5 ml-n3" rounded> <v-icon class="pr-2">mdi-file-document-outline</v-icon> Release quiz</v-btn>
          <v-btn color="#3CE970" class="white--text instructor-action mb-1 py-5 ml-n3" rounded> <v-icon class="pr-2">mdi-check</v-icon> End class</v-btn>
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
      students: [
        { userProfile: 'student1.png', userNames: 'Joshua Kingsley', attendance: 'Attendance 100%' },
        { userProfile: 'student2.png', userNames: 'You', attendance: 'Attendance 100%' },
        { userProfile: 'student3.png', userNames: 'James Bond', attendance: 'Attendance 100%' },
        { userProfile: 'student4.png', userNames: 'Uwicyeza Gift', attendance: 'Attendance 100%' },
        // { userProfile: 'student3.png', userNames: 'James Bond', attendance: 'Attendance 100%' },
        // { userProfile: 'student4.png', userNames: 'Uwicyeza Gift', attendance: 'Attendance 100%' },
      ],
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }),
}
</script>