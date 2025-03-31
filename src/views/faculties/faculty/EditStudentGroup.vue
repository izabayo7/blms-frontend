<template>
  <div v-if="facultyCollegeYear" class="edit-student-group-container row">
    <div class="col-3">
      <button class="back">Back</button>
    </div>
    <div class="col-9">
      <div class="name">{{ facultyCollegeYear.name }}</div>
      <div class="input-group">
        <div class="label">student group name</div>
        <input class="input" v-model="name" type="text" />
      </div>
<!--      <div class="input-group">-->
<!--        <div class="label"></div>-->
<!--        <div class="input"></div>-->
<!--      </div>-->
      <div class="actions">
        <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
          Cancel
        </button>
        <button class="add-email send" @click="validate">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<script>

import {mapGetters} from "vuex";

export default {
  name: "EditStudentGroup",
  data() {
    return {
      numberOfNewNotifications: 4,
      cardActive: false,
      name:""
    };
  },
  methods: {},
  computed: {
    ...mapGetters('faculties', ['faculty']),
    ...mapGetters('faculty_college_year', ['facultyCollegeYear']),
  },
  watch:{
    facultyCollegeYear(){
      this.name = this.facultyCollegeYear.name
    }
  },
  async mounted() {
    await this.$store.commit('faculty_college_year/SET_SELECTED_FACULTY_COLLEGE_YEAR', this.$route.params.groupId);
    await this.$store.dispatch('faculties/getFaculty', this.$route.params.facultyId);
    await this.$store.dispatch('faculty_college_year/getFacultyCollegeYearsByFaculty', {facultyId: this.$route.params.facultyId})
  },
};
</script>
<style lang="scss">
.edit-student-group-container {
  background-color: #FFFFFF;
  min-height: 68vh;
  padding: 46px 52px;

  .back {
    width: 184px;
    height: 25.33px;
    background: #F8F8F8;
    border-radius: 4.75155px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12.354px;
    line-height: 15px;

    color: #193074;

  }

  .name {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
margin-bottom: 25px;

    color: #000000;
  }
  .label{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10.8279px;
    line-height: 15px;
    /* identical to box height, or 143% */

margin-bottom: 4px;
    color: #000000;
  }
  .input{
    width: 320px;
    height: 41px;
padding: 12px 20px;
    border: 1.54684px solid #BABABC;
    box-sizing: border-box;
    border-radius: 4px;

    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12.3747px;
    line-height: 15px;
    /* identical to box height, or 125% */


    color: #000000;
  }
  .actions{
    margin-top: 20px;
  }
  .add-email {
    width: 79.24px;
    height: 45.38px;

    &.send {
      width: 158px;
      height: 40.38px;
    }

    cursor: pointer;
    background: #193074;

    &.cancel {
      background: #ABABAB;
    }

    border-radius: 3.80952px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12.1905px;
    /* identical to box height, or 125% */

    text-align: center;

    color: #ffffff;
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .student-group-container {
    .actions {
      .content {
        left: -129px;
      }
    }
  }
}
</style>