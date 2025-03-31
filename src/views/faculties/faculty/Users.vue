<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="tabular-users">
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header />
          </div>
<!--          <div class="table" v-if="usersOnFaculties.length > 0">-->
<!--            <table-ui :data="usersOnFaculties" :options="options"/>-->
<!--          </div>-->

          <div class="table">
            <table-ui >
              <template #tableHeaderRow>
                <table-head-row :cols="options.keysToShow" />
              </template>

<!--              rows-->
              <template #tableRows>
                <table-row :data="user" v-for="user in usersOnFaculties" :key="user._id">
                  <template #cols>
                    <td >{{user.sur_name}}</td>
                    <td>{{user.other_names}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.gender}}</td>
                  </template>
                </table-row>
              </template>
            </table-ui>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import TableHeader from "../../../components/reusable/ui/table-header";
import TableUi from "../../../components/reusable/table/TableUi";
import {mapGetters} from "vuex";
import TableHeadRow from "../../../components/reusable/table/TableHeadRow";
import TableRow from "../../../components/reusable/table/TableRow";

export default {
  //TODO using dynamic students from backend
name: "FacultyUsers",
  components: {TableRow, TableHeadRow, TableUi, TableHeader,},
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
    },
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