<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="tabular-users">
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header />
          </div>
          <div class="table">
            <table-ui :data="students" :options="options"/>
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
name: "FacultyInstructors",
  components: {TableUi, TableHeader,},
  data(){
    return{
      faculty:{},
      students:[],
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
     * get students from specific faculty, faculty id passed in route params
     */
    getFacultyStudents(){
      const {facultyId} = this.$route.params;
      let filteredStudents = [];

      apis.get(`course/faculty/${facultyId}`)
        .then(({data:{data}}) => {

           data.map(student => {

            student.createdAt = moment(student.createdAt).format("DD MMM  YYYY")
            student.updatedAt = moment(student.updatedAt).format("DD MMM YYYY")
            //TODO finalising courses

            filteredStudents.push(student)
          })

          console.log(filteredStudents)

          this.courses = filteredStudents;
           console.log(this.courses)
        })

      console.log(this.courses)
    }

  },
  created(){
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