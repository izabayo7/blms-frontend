
<!--faculties list page-->
<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">

<!--    faculty header-->
      <div class="header">
        <div class="header-wrapper d-flex ">
<!--          header title-->
          <div class="heading col d-flex align-center">
            <div class="icon">
              <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="38" viewBox="0 0 49 38" fill="none">
                  <rect x="36.2266" y="10.3643" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.916 28.3897H48.8837C48.5444 24.2775 45.0995 21.046 40.8998 21.046C36.7002 21.046 33.2553 24.2775 32.916 28.3897Z" fill="#193074"/>
                  <rect x="26.8804" y="0.350098" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <rect x="14.1958" y="0.350098" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <rect x="4.18213" y="10.3643" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.871582 28.3895H16.8392C16.5 24.2774 13.0551 21.0459 8.85541 21.0459C4.65574 21.0459 1.21083 24.2774 0.871582 28.3895Z" fill="#193074"/>
                  <rect x="20.2056" y="19.0428" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8926 37.0682H32.8602C32.521 32.956 29.0761 29.7245 24.8764 29.7245C20.6767 29.7245 17.2318 32.956 16.8926 37.0682Z" fill="#193074"/>
                </svg>
              </div>
            </div>
            <div class="text-content">
              <h4>Dashboard</h4>
              <h2>Faculties List</h2>
            </div>
          </div>

<!--          search bar-->
          <div class="search col">
            <div class="search-wrapper">
              <search  placeholder="Search user"/>
            </div>
          </div>

<!--          add user button-->
          <div class="add-user d-flex justify-end col">
            <div class="add-user-button">
              <button-ui>
                <template #content>Create faculty</template>
              </button-ui>
            </div>
          </div>
        </div>
      </div>


<!--    table of faculties-->
      <div class="tabular-faculties">
        <div class="table-wrapper" v-if="faculties.length > 0">

<!--          table header-->
          <div class="table-header">
            <table-header />
          </div>

<!--          list of faculties in table-->
          <div class="table">
            <table-ui :options="options"  :data="faculties"/>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import buttonUi from '@/components/reusable/ui/button-ui'
import Search from "../../components/reusable/Search2";
import TableHeader from "../../components/reusable/ui/table-header";
import TableUi from "../../components/reusable/ui/table-ui";
import apis from "../../services/apis";
import moment from "moment";
import {mapGetters} from 'vuex'

export default {
name: "Faculties",
  components: {TableUi, TableHeader, Search, buttonUi},
  data(){
    return{
      faculties:[],
      options:{
        keysToShow:[ "name", "attendants", "total_courses", "total_student_groups", "total_students", "createdAt"]
      },
    }
  },
  computed:{
    ...mapGetters('user',['user'])
  },
  created(){

    this.loadFaculties();
  },
  methods:{
    loadFaculties(){
      apis.get(`faculty/college/${this.user.college}`)
        .then(({data:{data}}) => {
          let filteredFaculties = [];

          data.map(faculty => {

            faculty.createdAt = moment(faculty.createdAt).format("DD MMM  YYYY")
            faculty.updatedAt = moment(faculty.updatedAt).format("DD MMM YYYY")
            //TODO finalising faculties

            filteredFaculties.push(faculty)
          })
          this.faculties = filteredFaculties;
        })
        .catch(err => {
          console.log(err)
        })
    }
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