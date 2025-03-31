<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  row">
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