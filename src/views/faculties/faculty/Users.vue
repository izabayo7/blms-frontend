<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="tabular-users">
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header />
          </div>
          <div class="table" v-if="usersOnFaculties.length > 0">
            <table-ui :data="usersOnFaculties" :options="options"/>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import TableHeader from "../../../components/reusable/ui/table-header";
import TableUi from "../../../components/reusable/ui/table-ui";
import {mapGetters} from "vuex";

export default {
  //TODO using dynamic students from backend
name: "FacultyUsers",
  components: {TableUi, TableHeader,},
  data(){
    return{
      students:[],
      facultyId:this.$route.params.facultyId,
      options:{
        keysToShow:[ "sur_name",  "other_names",  "email",  "gender"]
      }
    }
  },
  computed:{
    ...mapGetters('faculties',['faculties']),
    ...mapGetters('users',['usersOnFaculties']),
    faculty(){
      return this.faculties
    }
  },
  async mounted(){

  // if there is no faculty loaded load it based on this route id
    if(this.faculty.length <= 0)
      await this.$store.dispatch("faculties/getFaculties",this.facultyId)

    await this.$store.dispatch('faculties/changeHeader',{head:this.faculty.name,title:"Users List"})

    await this.$store.dispatch('users/loadUsersBasedOnFaculties',{facultyId:this.faculty._id,category:"STUDENT"})
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