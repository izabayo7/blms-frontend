<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="tabular-users">
        <div class="table-wrapper mt-6" v-if="courses.length > 0">

<!--          table header-->
          <div class="table-header">
            <table-header />
          </div>

<!--          list of courses in table form-->
          <div class="table">
            <table-ui :options="options" :data="courses"/>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import TableHeader from "../../../components/reusable/ui/table-header";
import TableUi from "../../../components/reusable/ui/table-ui";
import apis from "../../../services/apis";
import moment from "moment";

export default {
  //TODO using dynamic students from backend
name: "FacultyCourses",
  components: {TableUi, TableHeader},
  data(){
    return{
      faculty:{},
      courses:[],
      options:{
        keysToShow:[ "name",  "published",  "status",  "updatedAt",  "createdAt"]
      }
    }
  },
  methods:{
    /**
     * getting faculty information based on faculty id provided in query parameters
     */
    getFacultyInformation(){
      const {facultyId} = this.$route.params;

      apis.get(`faculty/${facultyId}`)
        .then(({data}) => {
          this.faculty = data;
        })
    },

    /**
     * get courses from specific faculty, faculty id passed in route params
     */
    getFacultyCourses(){
      const {facultyId} = this.$route.params;
      let filteredCourses = [];

      apis.get(`course/faculty/${facultyId}`)
        .then(({data:{data}}) => {

           data.map(course => {

            course.createdAt = moment(course.createdAt).format("DD MMM  YYYY")
            course.updatedAt = moment(course.updatedAt).format("DD MMM YYYY")
            //TODO finalising courses

            filteredCourses.push(course)
          })

          console.log(filteredCourses)

          this.courses = filteredCourses;
           console.log(this.courses)
        })

      console.log(this.courses)
    }
  },
  mounted(){
    this.getFacultyCourses();
    this.getFacultyInformation();
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