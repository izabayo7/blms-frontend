<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div v-if="coursesByFaculty.length > 0" class="faculties-container  row">
<!--      <div class="tabular-users">-->
<!--        <div class="table-wrapper mt-6" v-if="coursesByFaculty.length > 0">-->

<!--&lt;!&ndash;          table header&ndash;&gt;-->
<!--          <div class="table-header">-->
<!--            <table-header />-->
<!--          </div>-->
<!--&lt;!&ndash;          list of courses in table form&ndash;&gt;-->
<!--          <div class="table">-->
<!--            <table-ui :options="options" :data="coursesByFaculty"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    <div class="col-12 col-md-4"
         v-for="(course, i) in coursesByFaculty"
         :key="i">
      <student-course-card category="ongoing" :course="course"/>
    </div>
  </div>
  <div v-else class="empty-faculties">
    <div class="wrapper">
      <div class="icon">
        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.95829 23.6142V30.7808L21.5 37.625L34.0416 30.7808V23.6142L21.5 30.4583L8.95829 23.6142ZM21.5 5.375L1.79163 16.125L21.5 26.875L37.625 18.0779V30.4583H41.2083V16.125L21.5 5.375Z" fill="#989899"/>
        </svg>
      </div>
      <div class="title">No courses created</div>
      <div class="subtitle">You can invite instructors to this faculty <br> to start creating courses  by clicking on
      </div>
      <button  class="action">
        Invite users
      </button>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";


export default {
  //TODO using dynamic students from backend
name: "FacultyCourses",
  components: {StudentCourseCard: () => import("@/components/courses/StudentCourseCard"),},
  data(){
    return{
      courses:[],
      facultyId:this.$route.params.facultyId,
      options:{
        keysToShow:[ "name",  "published",  "status"]
      }
    }
  },
  computed:{
    ...mapGetters('faculties',['faculty']),
    ...mapGetters('courses',['coursesByFaculty']),
  },
  methods:{

  },
  async mounted(){
    await this.$store.dispatch('faculties/getFaculty', this.facultyId);
    await this.$store.dispatch('courses/getCourseByFaculty',{facultyId:this.facultyId})
    await this.$store.dispatch('faculties/changeHeader',{title:"Courses List"})
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/sass/imports/tableEmptyState';
.my-faculties{
  height: 100%;
  width:100%;

  .faculties-container{
    height: 100%;
    width:90%;

    .header{
      @include admin-page-header;
    }

  }
}
</style>