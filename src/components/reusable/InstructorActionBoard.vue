<template>
  <v-container>
    <v-row>
      <!-- <v-col class="col-12 title mt-md-3 ml-n8 d-block">Discussion Board</v-col> -->
      <v-col class="col-12 pa-0">
        <v-card
          class="ml-md-n4 ml-sm-1 attendants_list elevation-0"
          max-width="100%"
          tile
        >
          <v-list shaped>
            <v-list-item-group id="participantAttendance" color="primary">
              <v-list-item
                v-for="(participant, i) in participants"
                :key="i"
                two-line
              >
                <v-list-item-avatar>
                  <img v-if="participant.profile" :src="participant.profile" />
                  <v-avatar v-else size="37" class="avatar">
                    {{ participant.name | computeText }}
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="participant.name" />
                  <v-list-item-subtitle
                    class="font-weight-bold mt-2"
                    color="#0000"
                    v-text="`Attendance ${participant.attendance}%`"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="text-left">
        <v-btn
          color="#3CE970"
          class="white--text instructor-action mb-1 py-5 ml-n3"
          rounded
        >
          <v-icon class="pr-2" color="white">mdi-check</v-icon> Check
          attendance</v-btn
        >
        <v-btn
          color="#FFD248"
          class="white--text instructor-action mb-1 py-5 ml-n3"
          rounded
        >
          <v-icon class="pr-2" color="white">mdi-file-document-outline</v-icon>
          Release quiz</v-btn
        >
        <v-btn
          color="#FFD248"
          class="white--text instructor-action mb-1 py-5 ml-n3"
          rounded
        >
          <v-icon class="pr-2" color="white">mdi-check</v-icon> End class</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.attendants_list {
  border-radius: 27px !important;
}
.avatar {
  margin-top: 0px;
  background-color: $primary;
  color: white;
  cursor: pointer;
}
</style>